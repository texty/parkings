(function(d3){
    if (window.__this_is_mobile__ == "mobile") {
        // or if you have multiple videos:
        $('video').each(function () {
            enableInlineVideo(this);
            setTimeout(function () { if (this.play) this.play(); }, 500); // example
        });
        return;
    }

    var size, width, touch;

    if (window.__this_is_mobile__ == "middle") {
        width = 480;
        size = "size2";
        touch = true;
        d3.select(".desktop-container").classed("container", false).classed("container-fluid", true);
        d3.select(".desktop-container > .row").classed("row", false).classed("row-fluid", true);
        var annotation = {text: "Тягніть лінію на графіку і дивіться, як змінювалася кількість автомобілів протягом дня", w: 80, left: -110, tr: 15};

    } else {
        width = 530;
        size = "size1";
        touch = false;
        var annotation = {text: "Рухайте мишею по графіку і дивіться, як змінювалася кількість автомобілів протягом дня", w: 150, left: -180, tr: 75};
    }
    
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    var source = $("#parking-card-template").html();
    var template = Handlebars.compile(source);

    function render(div, context) {
        div.html(template(context));

        var chart1 = chart()
                .size(context.size)
                .height(100)
                .day(context.day)
                .touch(touch)
            ;

        var frame1 = frame()
            .parking(context.p)
            .day(context.day)
            .size(context.size);


        div.select(".chart-container").call(chart1);
        div.select(".frame-container").call(frame1);

        frame1.renderFrame();
        chart1.onmove(function(xc) {frame1.move(xc)});
    }
    
    // var q = d3.queue(1);
    


    parkings_data.forEach(function(p, i) {
        var container = d3.select('#main-container-' + p.number);
        var parking_group = container.append("div")
            .attr("class", "parking-group")
            .attr("id", "parking" + (i+1));

        p.days.forEach(function (day, i) {
            var context = {p: p, day: day, size: p[size], parkings: parkings_data, annotation: annotation};

            var div = parking_group.append("div").attr("class", "single-parking").classed("hidden", i!=0);
            render(div, context);

            div.selectAll("ul.breadcrumb li").on("click", function(d, li_index) {
               parking_group.selectAll("div.single-parking").classed("hidden", function(d,i){ return i!= li_index});
            });

        });
    });

})(d3);


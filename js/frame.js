function frame() {

    var width = 530
        , height = 406
        , curve
        , number
        , date

        , format = d3.format("02.0f")

        ;


    function my(selection) {
        selection.each(function() {

            var frame = d3.select(this);


            frame
                .style("background-image", "url('data/" + number + "/" + width + "/first/" + date + ".jpg')");
                // .style("width", inpx(width))
                // .style("height", inpx(height));


            // .on("click", function(){console.log(d3.mouse(this)[0] + "," + d3.mouse(this)[1])});

            if (curve) {
                frame.select("svg.svg-frame-overlay")
                    // .attr("width", inpx(width))
                    // .attr("height", inpx(height))
                    .append("path")
                    .attr("d", curve);
            }

            
            //
            // var preload = container.append("div")
            //     .attr("class", "preload-container")
            //     .style("width", "1px")
            //     .style("height", "1px");
            //
            // var files = [];
            //
            // for (var i=0; i<=1; i++) {
            //     files.push(frames_image_path + "_" + format(i) + ".jpg");
            // }
            //
            // preload.selectAll("div.preload")
            //     .data(files)
            //     .enter()
            //     .append("div")
            //     .append("img")
            //     .attr("class", "preload")
            //     .style("width", "1px")
            //     .style("height", "1px")
            //     .each(function(d){
            //         var that = this;
            //         queue.defer(function(cb){
            //             console.log("started " + d);
            //             $(that).on("load", function () {console.log(d); cb()});
            //             d3.select(that).attr("src", d);
            //         });
            //     })
            // // .style("background-image", function(d){return "url('" + d + "')"})
            // ;


            var offsetScale = d3.scaleLinear().domain([0, width - 1]).range([0, 191]);
            var frame_n_;

            my.move = function(xc) {
                if (xc < 0 || xc > width) return;

                var frame_n = Math.floor(offsetScale(xc));
                if (frame_n == frame_n_) return;

                frame.style("background-image", "url('data/" + number + "/" + width + "/frames/" + date + "_" + format(Math.floor(frame_n / 100)) + ".jpg')");
                frame.style("background-position", "0px " + -(frame_n % 100) * height + "px");
                
                // //todo remove log
                console.log(xc + " " + frame_n);
                console.log(frame.style("background-image") + " // " + frame.style("background-position"));
                frame_n_ = frame_n;
            };
        });
    }

    my.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return my;
    };

    my.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    };

    my.curve = function (value) {
        if (!arguments.length) return curve;
        curve = value;
        return my;
    };

    my.number = function (value) {
        if (!arguments.length) return number;
        number = value;
        return my;
    };

    my.date = function (value) {
        if (!arguments.length) return date;
        date = value;
        return my;
    };


    function inpx(value) {
        return value + "px";
    }

    return my;
}


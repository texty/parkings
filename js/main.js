(function(d3){
    if (window.__this_is_mobile__ == "mobile") return;
    var width;
    if (window.__this_is_mobile__ == "middle") {
        width = 480;
        size = "size2"
    } else {
        width = 530;
        size = "size1"
    }
    
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    var source = $("#parking-card-template-" + width).html();
    var template = Handlebars.compile(source);

    function render(div, context) {
        div.html(template(context));
        renderAxis(div, context.size.w);

        var chart1 = chart()
                .size(context.size)
                .height(100)
                .day(context.day)
            ;

        var control1 = control();

        var frame1 = frame()
            .parking(context.p)
            .day(context.day)
            .size(context.size);


        div.select(".chart-container").call(chart1);
        div.select(".control-container").call(control1);
        div.select(".frame-container").call(frame1);

        frame1.renderFrame();


        if (width == 530) {
            control1.onmove(function(xc) {chart1.move(xc); frame1.move(xc)});
            chart1.onmove(function(xc) {control1.move(xc); frame1.move(xc)});
        } else {
            chart1.onmove(function(xc) {frame1.move(xc)});
        }
        
        function renderAxis(div, width) {
            var axis = {
                530: '<path class="domain" stroke="#000" d="M0.5,0V0.5H530.5V0"></path><g class="tick" opacity="1" transform="translate(0.5,0)"><text fill="#000" y="8" dy="0.71em">07</text></g><g class="tick" opacity="1" transform="translate(33.625,0)"><text fill="#000" y="8" dy="0.71em">08</text></g><g class="tick" opacity="1" transform="translate(66.75,0)"><text fill="#000" y="8" dy="0.71em">09</text></g><g class="tick" opacity="1" transform="translate(99.875,0)"><text fill="#000" y="8" dy="0.71em">10</text></g><g class="tick" opacity="1" transform="translate(133,0)"><text fill="#000" y="8" dy="0.71em">11</text></g><g class="tick" opacity="1" transform="translate(166.125,0)"><text fill="#000" y="8" dy="0.71em">12</text></g><g class="tick" opacity="1" transform="translate(199.25,0)"><text fill="#000" y="8" dy="0.71em">13</text></g><g class="tick" opacity="1" transform="translate(232.375,0)"><text fill="#000" y="8" dy="0.71em">14</text></g><g class="tick" opacity="1" transform="translate(265.5,0)"><text fill="#000" y="8" dy="0.71em">15</text></g><g class="tick" opacity="1" transform="translate(298.625,0)"><text fill="#000" y="8" dy="0.71em">16</text></g><g class="tick" opacity="1" transform="translate(331.75,0)"><text fill="#000" y="8" dy="0.71em">17</text></g><g class="tick" opacity="1" transform="translate(364.875,0)"><text fill="#000" y="8" dy="0.71em">18</text></g><g class="tick" opacity="1" transform="translate(398,0)"><text fill="#000" y="8" dy="0.71em">19</text></g><g class="tick" opacity="1" transform="translate(431.125,0)"><text fill="#000" y="8" dy="0.71em">20</text></g><g class="tick" opacity="1" transform="translate(464.25,0)"><text fill="#000" y="8" dy="0.71em">21</text></g><g class="tick" opacity="1" transform="translate(497.375,0)"><text fill="#000" y="8" dy="0.71em">22</text></g><g class="tick" opacity="1" transform="translate(530.5,0)"><text fill="#000" y="8" dy="0.71em">23</text></g>',
                480: '<path class="domain" stroke="#000" d="M0.5,0V0.5H480.5V0"></path><g class="tick" opacity="1" transform="translate(0.5,0)"><text fill="#000" y="8" dy="0.71em">07</text></g><g class="tick" opacity="1" transform="translate(30.5,0)"><text fill="#000" y="8" dy="0.71em">08</text></g><g class="tick" opacity="1" transform="translate(60.5,0)"><text fill="#000" y="8" dy="0.71em">09</text></g><g class="tick" opacity="1" transform="translate(90.5,0)"><text fill="#000" y="8" dy="0.71em">10</text></g><g class="tick" opacity="1" transform="translate(120.5,0)"><text fill="#000" y="8" dy="0.71em">11</text></g><g class="tick" opacity="1" transform="translate(150.5,0)"><text fill="#000" y="8" dy="0.71em">12</text></g><g class="tick" opacity="1" transform="translate(180.5,0)"><text fill="#000" y="8" dy="0.71em">13</text></g><g class="tick" opacity="1" transform="translate(210.5,0)"><text fill="#000" y="8" dy="0.71em">14</text></g><g class="tick" opacity="1" transform="translate(240.5,0)"><text fill="#000" y="8" dy="0.71em">15</text></g><g class="tick" opacity="1" transform="translate(270.5,0)"><text fill="#000" y="8" dy="0.71em">16</text></g><g class="tick" opacity="1" transform="translate(300.5,0)"><text fill="#000" y="8" dy="0.71em">17</text></g><g class="tick" opacity="1" transform="translate(330.5,0)"><text fill="#000" y="8" dy="0.71em">18</text></g><g class="tick" opacity="1" transform="translate(360.5,0)"><text fill="#000" y="8" dy="0.71em">19</text></g><g class="tick" opacity="1" transform="translate(390.5,0)"><text fill="#000" y="8" dy="0.71em">20</text></g><g class="tick" opacity="1" transform="translate(420.5,0)"><text fill="#000" y="8" dy="0.71em">21</text></g><g class="tick" opacity="1" transform="translate(450.5,0)"><text fill="#000" y="8" dy="0.71em">22</text></g><g class="tick" opacity="1" transform="translate(480.5,0)"><text fill="#000" y="8" dy="0.71em">23</text></g>'
            };

            div.select(".cell1 .control-axis svg g").html(axis[width]);
        }
    }
    
    var q = d3.queue(1);
    
    var main_container = d3.select('#main-container');


    parkings_data.forEach(function(p, i) {
        var parking_group = main_container.append("div")
            .attr("class", "parking-group")
            .attr("id", "parking" + (i+1));

        p.days.forEach(function (day, i) {
            var context = {p: p, day: day, size: p[size], parkings: parkings_data};

            var div = parking_group.append("div").attr("class", "single-parking").classed("hidden", i!=0);
            render(div, context);

            div.selectAll("ul.breadcrumb li").on("click", function(d, li_index) {
               parking_group.selectAll("div.single-parking").classed("hidden", function(d,i){ return i!= li_index});
            });

        });
    });

})(d3);


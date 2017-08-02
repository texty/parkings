function weirdo() {

    var width = 450
        , height = 300
        , control_image_path
        , frames_image_path
        , format = d3.format("02.0f")
        , frame_overlay
        , left_bar = 80
        , chart_margin = {left: 0, top: 40, right: 0, bottom: 15}
        , control_height = 200
        , chart_height = 150
        , data
        , declared_income
        , handicap_rate = 1
        , uah_format = (function(){ var f = d3.format(".0f"); return function(v) {return f(v) + " ₴"}})()
        , percent_format = d3.format(".0%")
        , price
        , cars
        , queue
        , curve
        , top_axis_height = 10
        , control_left_top = 0
        ;
    

    function my(selection) {
        selection.each(function() {

            var container = d3.select(this)
                .style("width", inpx(left_bar + width));

            // preload

            var preload = container.append("div")
                .attr("class", "preload-container")
                .style("width", "1px")
                .style("height", "1px");

            var files = [];

            for (var i=0; i<=1; i++) {
                files.push(frames_image_path + "_" + format(i) + ".jpg");
            }

            preload.selectAll("div.preload")
                .data(files)
                .enter()
                .append("div")
                .append("img")
                .attr("class", "preload")
                .style("width", "1px")
                .style("height", "1px")
                .each(function(d){
                    var that = this;
                    queue.defer(function(cb){
                        console.log("started " + d);
                        $(that).on("load", function () {console.log(d); cb()});
                        d3.select(that).attr("src", d);
                    });
                })
            // .style("background-image", function(d){return "url('" + d + "')"})
            ;


            // 0

            var top_axis_container = container
                .append("div")
                .attr("class", "top-axis-container")
                // .style("width", inpx(width))
                .style("height", inpx(top_axis_height));

            top_axis_container
                .append("div")
                .attr("class", "top-axis-left left")
                .style("width", inpx(left_bar))
                .append("div")
                .attr("class", "caption")
                .text("години:");

            var top_axis_g = top_axis_container
                .append("div")
                .attr("class", "top-axis-right right")
                .style("width", inpx(width))
                .style("height", inpx(top_axis_height))
                .append("svg")
                .attr("class", "top-axis")
                .attr("width", inpx(width))
                .attr("height", inpx(top_axis_height))
                .append("g");
                // .translate([0, top_axis_height]);

            // 2

            var control_container = container
                .append("div")
                .attr("class", "control-container");

            var control_left = control_container
                .append("div")
                .attr("class", "control-left left")
                .style("width", inpx(left_bar))
                .style("margin-top", inpx(control_left_top));

            control_left
                .append("div")
                .attr("class", "caption")
                .text("заповненість парковки:");

            var control_left_text = control_left
                .append("div")
                .attr("class", "number")
                .text("1.1");

            var control = control_container
                .append("div")
                .attr("class", "control-img-container")
                .style("width", inpx(width))
                .style("height", inpx(control_height));


            var control_img = control
                    .append("img")
                    .attr("class", "control-img")
                    .attr("src", control_image_path)
                    .attr("alt", "тягни")
                ;

            var control_line = control
                .append("div")
                .attr("class", "vertical-line")
                .style("height", inpx(control_height));

            var offsetScale = d3.scaleLinear().domain([0, width - 1]).range([0, 191]);
            var frame_n_;

            control_img.on("mousemove", onmove);


            // 1

            var frame_container = container
                .append("div")
                .attr("class", "frame-container");

            var frame_left = frame_container
                .append("div")
                .attr("class", "frame-left left")
                .style("width", inpx(left_bar));

             frame_left
                .append("div")
                .attr("class", "caption")
                .html("&nbsp;");
            //
            var frame_left_text = frame_left
                .append("div")
                .attr("class", "number")
                // .text("200%");

            var frame = frame_container
                .append("div")
                .attr("class", "img-frame")
                .style("background-image", "url('" + frames_image_path.replace("frames", "first") + ".jpg')")
                .style("width", inpx(width))
                .style("height", inpx(height))
                // .on("click", function(){console.log(d3.mouse(this)[0] + "," + d3.mouse(this)[1])});

            if (frame_overlay) {
                frame
                    .append("div")
                    .attr("class", "img-frame-overlay")
                    .style("width", inpx(frame_overlay.width))
                    .style("height", inpx(frame_overlay.height))
                    .style("margin-left", inpx(frame_overlay.left))
                    .style("margin-top", inpx(frame_overlay.top));
            }
            
            if (curve) {
                frame
                    .append("svg")
                    .attr("class", "svg-frame-overlay")
                    .attr("width", inpx(width))
                    .attr("height", inpx(height))
                    .append("path")
                    .attr("d", curve);
            }


            // 3

            var chart_container = container
                .append("div")
                .attr("class", "chart-container");


            var chart_left = chart_container
                .append("div")
                .attr("class", "chart-left left")
                .style("width", inpx(left_bar));

            var chart_svg_container = chart_container
                .append("div")
                .attr("class", "chart-svg-container right")
                .style("width", inpx(width))
                .style("height", inpx(chart_height));

            var svg = chart_svg_container
                .append("svg")
                .attr("width", inpx(width))
                .attr("height", inpx(chart_height));

            svg.html('<marker id="arrowhead" viewBox="-10 -10 20 20" refX="0" refY="0" markerWidth="16" markerHeight="16" stroke-width="1" orient="auto"><polyline stroke-linejoin="bevel" points="-6.75,-4.75 0,0 -6.75,4.75"></polyline></marker>');

            var w = width - chart_margin.left - chart_margin.right
                , h = chart_height - chart_margin.top - chart_margin.bottom
                , g = svg.append("g").translate([chart_margin.left, chart_margin.top])
                ;

            if (!data || declared_income != 0  && !declared_income) {
                console.error("Data is not set");
                return;
            }

            var x = d3.scaleTime()
                .domain(d3.extent(data, function(d) {return d.date}))
                .range([0, w]);

            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {return d.value})])
                .range([h, 0]);

            var line = d3.line()
                .x(function(d) { return x(d.date)})
                .y(function(d) { return y(d.value)});

            var area = d3.area()
                .x(function(d) {return x(d.date)})
                .y0(y(0))
                .y1(function(d) {return y(d.value)});

            var xAxis = d3.axisBottom(x)
                .ticks(17)
                .tickSizeOuter(0)
                .tickSizeInner(-h)
                .tickPadding(8)
                .tickFormat(d3.timeFormat("%H"));

            var yAxis = d3.axisLeft(y)
                .ticks(3)
                .tickSizeOuter(0)
                .tickSizeInner(0)
                .tickPadding(8);

            var topXAxis = d3.axisBottom(x)
                .ticks(17)
                .tickSizeOuter(0)
                .tickSizeInner(0)
                .tickPadding(-5)
                .tickFormat(d3.timeFormat("%H"));

            top_axis_g.call(topXAxis);


            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            var gYaxis = g.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis);

            gYaxis
                .append("text")
                .attr("class", "caption")
                .attr("y", -18)
                .attr("text-anchor", "end")
                .tspans(["кількість", "авто:"], 12)
                .attr("x", -8);

            gYaxis
                .append("text")
                .attr("class", "caption")
                .attr("y", h)
                .attr("dy", "1.5em")
                .attr("x", -8)
                .attr("text-anchor", "end")
                .text("години:");

            var calculations = calculate(data, declared_income, price, handicap_rate);

            // frame_left_text.text(uah_format(calculations.additional_income));
            control_left_text.text(percent_format(calculations.fullness));

            g.append("path")
                .datum(calculations.left)
                .attr("class", "area area-left")
                .attr("d", area);

            g.append("path")
                .datum(calculations.right)
                .attr("class", "area area-right")
                .attr("d", area);
            
            g.append("path")
                .datum(calculations.left_dashed)
                .attr("class", "area area-dashed")
                .attr("d", area);

            g.append("path")
                .datum(calculations.right_dashed)
                .attr("class", "area area-dashed")
                .attr("d", area);
            


            g.append("path")
                .datum(calculations.left_dashed)
                .attr("class", "line line-dashed")
                .attr("d", line);

            var path_left = g.append("path")
                .datum(calculations.left)
                .attr("class", "line line-left")
                .attr("d", line);

            var path_right = g.append("path")
                .datum(calculations.right)
                .attr("class", "line line-right")
                .attr("d", line);

            g.append("path")
                .datum(calculations.right_dashed)
                .attr("class", "line line-dashed")
                .attr("d", line);

            var annotation_g = g.append("g")
                .attr("class", "g-annotation")
                .translate([100, 0]);

            annotation_g
                .append("path")
                .attr("class", "line line-annotation")
                .attr('marker-end', 'url(#arrowhead)')
                // .attr("d", "M -35, -35 C -20, -35, 0, -25, 0, 0")
                .attr("d", "M 0, -35 C -10, -25, -10, -10, 0, 0");

            annotation_g
                .append("text")
                .attr("y", -35-5)
                .attr("text-anchor", "start")
                .tspans(["час за який заявлений добовий", "дохід зароблено"], 12)
                .attr("x", 10);



            var circle = g.append("circle")
                .attr("r", 5)
                .attr("cx", 0)
                .attr("cy", y(data[0].value));

            svg.on("mousemove", onmove);


            function onmove() {
                var xc = d3.mouse(this)[0];
                
                if (xc < 0 || xc > w) return;

                var frame_n = Math.floor(offsetScale(xc));
                if (frame_n == frame_n_) return;

                frame.style("background-image", "url('" + frames_image_path + "_" + format(Math.floor(frame_n / 100)) + ".jpg')");
                frame.style("background-position", "0px " + -(frame_n % 100) * height + "px");


                var date = x.invert(xc);
                for (var i = 0; i < data.length - 1; i++) {
                    if (data[i].date <= date && data[i+1].date > date) break;
                }

                var prev = data[i];
                var next = data[i+1];

                var ratio = (date.getTime() - prev.date.getTime()) / (5 * 60 * 1000);
                var v = prev.value + (next.value - prev.value) * ratio;
                var yc = y(v);

                circle
                    .attr("cx", xc)
                    .attr("cy", yc);

                control_line
                    .style("left", inpx(xc - 1));

                // //todo remove log
                console.log(xc + " " + frame_n);
                console.log(frame.style("background-image") + " // " + frame.style("background-position"));
                frame_n_ = frame_n;
            }


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

    my.control_image_path = function (value) {
        if (!arguments.length) return control_image_path;
        control_image_path = value;
        return my;
    };    
    
    my.frames_image_path = function (value) {
        if (!arguments.length) return frames_image_path;
        frames_image_path = value;
        return my;
    };
    
    my.control_height = function (value) {
        if (!arguments.length) return control_height;
        control_height = value;
        return my;
    };

    my.frame_overlay = function (value) {
        if (!arguments.length) return frame_overlay;
        var arr = value.split(":");
        frame_overlay = {width:arr[0], height:arr[1], left:arr[2], top:arr[3], angle: arr[4] ? arr[4]: ""};
        return my;
    };

    my.data = function (value) {
        if (!arguments.length) return data;
        data = value;
        return my;
    };

    my.declared_income = function (value) {
        if (!arguments.length) return declared_income;
        declared_income = value;
        return my;
    };

    my.handicap_rate = function (value) {
        if (!arguments.length) return handicap_rate;
        handicap_rate = value;
        return my;
    };

    my.price = function (value) {
        if (!arguments.length) return price;
        price = value;
        return my;
    };

    my.cars = function (value) {
        if (!arguments.length) return cars;
        cars = value;
        return my;
    };

    my.queue = function (value) {
        if (!arguments.length) return queue;
        queue = value;
        return my;
    };

    my.curve = function (value) {
        if (!arguments.length) return curve;
        curve = value;
        return my;
    };

    my.control_left_top = function (value) {
        if (!arguments.length) return control_left_top;
        control_left_top = value;
        return my;
    };


    function inpx(value) {
        return value + "px";
    }

    function calculate(data, declared_income) {
        var result = {};

        var working_data = data.slice(25 - 1, 132 + 1);

        var summ = 0;
        for (var i = 0; i < working_data.length; i++) {
            summ += working_data[i].value / 12 * handicap_rate * price;
            if (summ >= declared_income) break;
        }

        result.left = working_data.slice(0, i + 1);
        result.right = working_data.slice(i);
        result.left_dashed = data.slice(0, 25);
        result.right_dashed = data.slice(132);

        var dashed_sum = result.left_dashed.reduce(summf, 0)
            +result.right_dashed.reduce(summf, 0);

        var working_sum = result.left.reduce(summf, 0)
            +result.right.reduce(summf, 0);

        result.additional_income = dashed_sum / 12 * handicap_rate * price;
        result.working_day_income = working_sum / 12 * handicap_rate * price;

        result.dirty_income = result.working_day_income - declared_income;
        result.extended_working_day_income = result.working_day_income + result.additional_income;

        var total_cars = data.reduce(summf, 0);
        if (!cars) {
            cars = d3.max(data, function(d){return d.value});
        }

        result.fullness = total_cars / (cars * data.length);

        console.log(data[0].date);
        console.log(result);

        return result;
    }

    function summf(o, v) {
        return o + v.value;
    }

    return my;
}


function chart() {

    var width = 450
        , height = 100
        , day
        , queue
        , size
        , touch
        , _onmove = function() {}
        ;


    function my(selection) {
        selection.each(function() {

            var chart_container = d3.select(this)
                .style("width", inpx(size.w));
            
            var svg = chart_container
                .append("svg")
                .attr("width", inpx(size.w))
                .attr("height", inpx(height));

            var w = size.w
                , h = height
                , g = svg.append("g");
            
            
            var x = d3.scaleTime()
                .domain(d3.extent(day.data, function(d) {return d.date}))
                .range([0, w]);

            var y = d3.scaleLinear()
                .domain([0, d3.max(day.data, function(d) {return d.value})])
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

            var yAxis = d3.axisRight(y)
                .ticks(3)
                .tickSizeOuter(0)
                .tickSizeInner(0)
                .tickPadding(8);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            var gYaxis = g.append("g")
                .attr("class", "axis axis--y")
                .translate([w,0])
                .call(yAxis);

            gYaxis
                .append("text")
                .attr("class", "caption")
                .attr("y", -18)
                .attr("text-anchor", "end")
                .tspans(["кількість", "авто:"], 12)
                .attr("x", 16);

            g.append("path")
                .datum(day.calculations.left)
                .attr("class", "area area-left")
                .attr("d", area);

            g.append("path")
                .datum(day.calculations.right)
                .attr("class", "area area-right")
                .attr("d", area);

            g.append("path")
                .datum(day.calculations.left_dashed)
                .attr("class", "area area-dashed")
                .attr("d", area);

            g.append("path")
                .datum(day.calculations.right_dashed)
                .attr("class", "area area-dashed")
                .attr("d", area);



            g.append("path")
                .datum(day.calculations.left_dashed)
                .attr("class", "line line-dashed")
                .attr("d", line);

            var path_left = g.append("path")
                .datum(day.calculations.left)
                .attr("class", "line line-left")
                .attr("d", line);

            var path_right = g.append("path")
                .datum(day.calculations.right)
                .attr("class", "line line-right")
                .attr("d", line);

            g.append("path")
                .datum(day.calculations.right_dashed)
                .attr("class", "line line-dashed")
                .attr("d", line);

            var annotation_g = g.append("g")
                .attr("class", "g-annotation")
                .translate([120, 0]);

            annotation_g
                .append("path")
                .attr("class", "line line-annotation")
                .attr('marker-end', 'url(#arrowhead)')
                // .attr("d", "M -35, -35 C -20, -35, 0, -25, 0, 0")
                .attr("d", "M 0, -35 C -10, -35, -25, -25, -25, 0");

            annotation_g
                .append("text")
                .attr("y", -35-5)
                .attr("text-anchor", "start")
                .tspans(["час за який заявлений добовий", "дохід зароблено"], 12)
                .attr("x", 10);


            var ann2 = g.append("g")
                .attr("class", "g-annotation")
                .translate([320, 0]);

            ann2
                .append("path")
                .attr("class", "line line-annotation")
                .attr('marker-end', 'url(#arrowhead)')
                // .attr("d", "M -35, -35 C -20, -35, 0, -25, 0, 0")
                .attr("d", "M 0, -35 C -10, -35, -25, -25, -25, 0");

            ann2
                .append("text")
                .attr("y", -35-5)
                .attr("text-anchor", "start")
                .tspans(["реальний час, який би ", "мали оплатити автомобілісти"], 12)
                .attr("x", 10);

            var touch_width = 10, touch_height = 40;

            var touch_bar = g.append("g")
                .attr("class", "touchbar" + (touch ? " touch" : ""));

            if (touch) {
                touch_bar.append("rect")
                    .attr("x", -touch_width/2)
                    .attr("y", 0)
                    .attr("width", touch_width)
                    .attr("height", h)
                    .call(d3.drag().on("drag", dragged));

                touch_bar.append("line")
                    .attr("x1", -touch_width/2).attr("x2", -touch_width/2)
                    .attr("y1", h/2 - touch_height/2)
                    .attr("y2", h/2 + touch_height/2);

                touch_bar.append("line")
                    .attr("x1", touch_width/2).attr("x2", touch_width/2)
                    .attr("y1", h/2 - touch_height/2)
                    .attr("y2", h/2 + touch_height/2);
            }

            touch_bar.append("line")
                .attr("x1", 0).attr("x2", 0)
                .attr("y1", 0)
                .attr("y2", h);


            var circle = g.append("circle")
                .attr("r", touch ? 1 : 5)
                .attr("cx", 0)
                .attr("cy", y(day.data[0].value));

            if (touch) circle.attr("class", "touch");


            svg.on("mousemove", mousemove)
                .on("touchmove", touchmove);

            function move(xc) {
                if (xc < 0 || xc > w) return;

                var date = x.invert(xc);
                for (var i = 0; i < day.data.length - 1; i++) {
                    if (day.data[i].date <= date && day.data[i+1].date > date) break;
                }

                var prev = day.data[i];
                var next = day.data[i+1];

                var ratio = (date.getTime() - prev.date.getTime()) / (5 * 60 * 1000);
                var v = prev.value + (next.value - prev.value) * ratio;
                var yc = y(v);

                circle
                    .attr("cx", xc)
                    .attr("cy", yc);

                touch_bar.translate([xc, 0]);
            }

            function mousemove() {
                var xc = d3.mouse(this)[0];

                move(xc);
                _onmove(xc);
            }

            function touchmove() {
                var xc = d3.touches(this)[0][0];

                move(xc);
                _onmove(xc);
            }

            function dragged() {
                var xc = d3.event.x;

                move(xc);
                _onmove(xc);
            }


            my.move = move;
        });
    }

    my.size = function (value) {
        if (!arguments.length) return size;
        size = value;
        return my;
    };

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

    my.onmove = function(value) {
        if (!arguments.length) return _onmove;
        _onmove = value;
        return my;
    };

    my.day = function (value) {
        if (!arguments.length) return day;
        day = value;
        return my;
    };

    my.touch = function (value) {
        if (!arguments.length) return touch;
        touch = value;
        return my;
    };

    my.queue = function (value) {
        if (!arguments.length) return queue;
        queue = value;
        return my;
    };


    function inpx(value) {
        return value + "px";
    }

    return my;
}


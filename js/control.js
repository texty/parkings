function control() {

    var _onmove = function() {};


    function my(selection) {
        selection.each(function() {

            var container = d3.select(this);
            
            var control_img = container
                .select(".control-img");

            var width = +control_img.style("width")
                , height = +control_img.style("height"); 

            var control_line = container
                .select(".vertical-line");
            
            control_img.on("mousemove", mousemove)
                .on("touchmove", touchmove);

            function move(xc) {
                if (xc < 0 || xc > width) return;

                control_line
                    .style("left", inpx(xc - 1));
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
            
            
            my.move = move;
        });
    }

    function inpx(value) {
        return value + "px";
    }

    my.onmove = function(value) {
        if (!arguments.length) return _onmove;
        _onmove = value;
        return my;
    };

    return my;
}


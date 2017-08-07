function frame() {

    var size
        , day
        , parking
        , frame_list = [0, 1]
        , format = d3.format("02.0f")
        , high_z_index = 101
        , low_z_index = 1
        , first_frame_z_index = 102
        , overlay_z_index = 103
        ;

    var frames;

    function my(selection) {
        selection.each(function() {

            var container = d3.select(this);

            var width = size.w,
                height = size.h;

            var first_frame = container
                    .append("div")
                    .attr("class", "first-frame")
                    .style("width", inpx(width))
                    .style("height", inpx(height))
                    .style("z-index", first_frame_z_index)
                    .style("background-image", "url('data/" + parking.number + "/" + size.w + "/first/" + day.date + ".jpg')");

            frames = container
                .selectAll(".frame")
                .data(frame_list)
                .enter()
                .append("div")
                .attr("class", "frame")
                .style("width", inpx(width))
                .style("height", inpx(height))
                .style("z-index", low_z_index);


            if (size.curve) {
                container
                    .append("svg")
                    .attr("class", "svg-frame-overlay")
                    .attr("width", inpx(width))
                    .attr("height", inpx(height))
                    .style("z-index", overlay_z_index)
                    .append("path")
                    .attr("d", size.curve);
            }

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

                var img_number = Math.floor(frame_n/100);
                var offset = -(frame_n % 100) * height;

                first_frame.style("z-index", low_z_index);
                frames.style("background-position", function(d) {return d==img_number ? "0px " + offset + "px" : ""});
                frames.style("z-index", function(d) {return d==img_number ? high_z_index : low_z_index});
                
                frame_n_ = frame_n;
            };
        });
    }
    
    my.renderFrame = function () {
        frames.style("background-image", function(d) {
            return "url('data/" + parking.number + "/" + size.w + "/frames/" + day.date + "_" + format(d) + ".jpg')"
        });
        
        return my;
    };

    my.size = function (value) {
        if (!arguments.length) return size;
        size = value;
        return my;
    };

    my.day = function (value) {
        if (!arguments.length) return day;
        day = value;
        return my;
    };

    my.parking = function (value) {
        if (!arguments.length) return parking;
        parking = value;
        return my;
    };


    function inpx(value) {
        return value + "px";
    }

    return my;
}


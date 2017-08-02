(function(d3){
    if (window.__this_is_mobile__) return;
    
    var q = d3.queue(1);

    var w11 = weirdo()
            .width(600)
            .height(460)
            .control_height(200)
            .control_image_path("data/1/control/result_2017-05-24.jpg")
            .frames_image_path("data/1/frames/2017-05-24")
            // .frame_overlay("72:230:220:186")
            .data(parkings_data["2017-05-24"])
            .declared_income(300)
            .price(10)
            .cars(18)
            .curve("M265 197 L265 367 Z")
            .queue(q)
            .control_left_top(58)
        ;

    var w12 = weirdo()
            .width(600)
            .height(460)
            .control_height(200)
            .control_image_path("data/1/control/result_2017-05-25.jpg")
            .frames_image_path("data/1/frames/2017-05-25")
            // .frame_overlay("72:230:220:186")
            .data(parkings_data["2017-05-25"])
            .declared_income(230)
            .price(10)
            .cars(18)
            .curve("M265 197 L265 367 Z")
            .queue(q)
            .control_left_top(58)
        ;

    var w13 = weirdo()
            .width(600)
            .height(460)
            .control_height(200)
            .control_image_path("data/1/control/result_2017-05-26.jpg")
            .frames_image_path("data/1/frames/2017-05-26")
            // .frame_overlay("72:230:220:186")
            .data(parkings_data["2017-05-26"])
            .declared_income(200)
            .price(10)
            .cars(18)
            .curve("M265 197 L265 367 Z")
            .queue(q)
            .control_left_top(58)
        ;

    var w21 = weirdo()
            .width(600)
            .height(467)
            .control_height(200)
            .control_image_path("data/2/control/result_2017-06-14.jpg")
            .frames_image_path("data/2/frames/2017-06-14")
            .data(parkings_data["2017-06-14"])
            .declared_income(412)
            .handicap_rate(0.7)
            .price(7)
            .cars(31)
            .curve("M365 466 L512 68 Z")
            .queue(q)
            .control_left_top(58)
        ;

    var w22 = weirdo()
            .width(600)
            .height(467)
            .control_height(200)
            .control_image_path("data/2/control/result_2017-06-15.jpg")
            .frames_image_path("data/2/frames/2017-06-15")
            .data(parkings_data["2017-06-15"])
            .declared_income(395)
            .handicap_rate(0.7)
            .price(7)
            .cars(31)
            .curve("M365 466 L512 68 Z")
            .queue(q)
            .control_left_top(58)
        ;

    var w23 = weirdo()
            .width(600)
            .height(467)
            .control_height(200)
            .control_image_path("data/2/control/result_2017-06-16.jpg")
            .frames_image_path("data/2/frames/2017-06-16")
            .data(parkings_data["2017-06-16"])
            .declared_income(387)
            .handicap_rate(0.7)
            .price(7)
            .cars(31)
            .curve("M365 466 L512 68 Z")
            .queue(q)
            .control_left_top(58)
        ;

    var w31 = weirdo()
            .width(600)
            .height(338)
            .control_height(250)
            .control_image_path("data/3/control/result_2017-07-05.jpg")
            .frames_image_path("data/3/frames/2017-07-05")
            .data(parkings_data["2017-07-05"])
            .declared_income(90)
            .price(7)
            .cars(25)
            .curve("M13 168 L586 151 Z")
            .queue(q)
            .control_left_top(85)
        ;

    var w32 = weirdo()
            .width(600)
            .height(338)
            .control_height(250)
            .control_image_path("data/3/control/result_2017-07-06.jpg")
            .frames_image_path("data/3/frames/2017-07-06")
            .data(parkings_data["2017-07-06"])
            .declared_income(37)
            .price(7)
            .cars(25)
            .curve("M13 168 L586 151 Z")
            .queue(q)
            .control_left_top(85)
        ;

    var w33 = weirdo()
            .width(600)
            .height(338)
            .control_height(250)
            .control_image_path("data/3/control/result_2017-07-07.jpg")
            .frames_image_path("data/3/frames/2017-07-07")
            .data(parkings_data["2017-07-07"])
            .declared_income(0) //todo fake data
            .price(7)
            .cars(25)
            .curve("M13 168 L586 151 Z")
            .queue(q)
            .control_left_top(85)
        ;


    d3.select("#w11 .weirdo-left").call(w11);
    d3.select("#w12 .weirdo-left").call(w12);
    d3.select("#w13 .weirdo-left").call(w13);

    d3.select("#w21 .weirdo-left").call(w21);
    d3.select("#w22 .weirdo-left").call(w22);
    d3.select("#w23 .weirdo-left").call(w23);

    d3.select("#w31 .weirdo-left").call(w31);
    d3.select("#w32 .weirdo-left").call(w32);
    d3.select("#w33 .weirdo-left").call(w33);
})(d3);


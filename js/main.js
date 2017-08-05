(function(d3){
    if (window.__this_is_mobile__) return;
    
    var q = d3.queue(1);

    // var w11 = weirdo()
    //         .width(600)
    //         .height(460)
    //         .control_height(200)
    //         .control_image_path("data/1/control/result_2017-05-24.jpg")
    //         .frames_image_path("data/1/frames/2017-05-24")
    //         // .frame_overlay("72:230:220:186")
    //         .data(parkings_data["2017-05-24"])
    //         .declared_income(300)
    //         .price(10)
    //         .cars(18)
    //         .curve("M265 197 L265 367 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    //
    // var w12 = weirdo()
    //         .width(600)
    //         .height(460)
    //         .control_height(200)
    //         .control_image_path("data/1/control/result_2017-05-25.jpg")
    //         .frames_image_path("data/1/frames/2017-05-25")
    //         // .frame_overlay("72:230:220:186")
    //         .data(parkings_data["2017-05-25"])
    //         .declared_income(230)
    //         .price(10)
    //         .cars(18)
    //         .curve("M265 197 L265 367 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    //
    // var w13 = weirdo()
    //         .width(600)
    //         .height(460)
    //         .control_height(200)
    //         .control_image_path("data/1/control/result_2017-05-26.jpg")
    //         .frames_image_path("data/1/frames/2017-05-26")
    //         // .frame_overlay("72:230:220:186")
    //         .data(parkings_data["2017-05-26"])
    //         .declared_income(200)
    //         .price(10)
    //         .cars(18)
    //         .curve("M265 197 L265 367 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    //
    // var w21 = weirdo()
    //         .width(600)
    //         .height(467)
    //         .control_height(200)
    //         .control_image_path("data/2/control/result_2017-06-14.jpg")
    //         .frames_image_path("data/2/frames/2017-06-14")
    //         .data(parkings_data["2017-06-14"])
    //         .declared_income(412)
    //         .handicap_rate(0.7)
    //         .price(7)
    //         .cars(31)
    //         .curve("M365 466 L512 68 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    //
    // var w22 = weirdo()
    //         .width(600)
    //         .height(467)
    //         .control_height(200)
    //         .control_image_path("data/2/control/result_2017-06-15.jpg")
    //         .frames_image_path("data/2/frames/2017-06-15")
    //         .data(parkings_data["2017-06-15"])
    //         .declared_income(395)
    //         .handicap_rate(0.7)
    //         .price(7)
    //         .cars(31)
    //         .curve("M365 466 L512 68 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    //
    // var w23 = weirdo()
    //         .width(600)
    //         .height(467)
    //         .control_height(200)
    //         .control_image_path("data/2/control/result_2017-06-16.jpg")
    //         .frames_image_path("data/2/frames/2017-06-16")
    //         .data(parkings_data["2017-06-16"])
    //         .declared_income(387)
    //         .handicap_rate(0.7)
    //         .price(7)
    //         .cars(31)
    //         .curve("M365 466 L512 68 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    //
    // var w31 = weirdo()
    //         .width(600)
    //         .height(338)
    //         .control_height(250)
    //         .control_image_path("data/3/control/result_2017-07-05.jpg")
    //         .frames_image_path("data/3/frames/2017-07-05")
    //         .data(parkings_data["2017-07-05"])
    //         .declared_income(90)
    //         .price(7)
    //         .cars(25)
    //         .curve("M13 168 L586 151 Z")
    //         .queue(q)
    //         .control_left_top(85)
    //     ;
    //
    // var w32 = weirdo()
    //         .width(600)
    //         .height(338)
    //         .control_height(250)
    //         .control_image_path("data/3/control/result_2017-07-06.jpg")
    //         .frames_image_path("data/3/frames/2017-07-06")
    //         .data(parkings_data["2017-07-06"])
    //         .declared_income(37)
    //         .price(7)
    //         .cars(25)
    //         .curve("M13 168 L586 151 Z")
    //         .queue(q)
    //         .control_left_top(85)
    //     ;
    //
    // var w33 = weirdo()
    //         .width(600)
    //         .height(338)
    //         .control_height(250)
    //         .control_image_path("data/3/control/result_2017-07-07.jpg")
    //         .frames_image_path("data/3/frames/2017-07-07")
    //         .data(parkings_data["2017-07-07"])
    //         .declared_income(0) //todo fake data
    //         .price(7)
    //         .cars(25)
    //         .curve("M13 168 L586 151 Z")
    //         .queue(q)
    //         .control_left_top(85)
    //     ;


    //         .control_height(200)
    //         .control_image_path("data/2/control/result_2017-06-15.jpg")
    //         .frames_image_path("data/2/frames/2017-06-15")
    //         .data(parkings_data["2017-06-15"])
    //         .declared_income(395)
    //         .handicap_rate(0.7)
    //         .cars(31)
    //         .curve("M365 466 L512 68 Z")
    //         .queue(q)
    //         .control_left_top(58)
    //     ;
    
    var chart1 = chart()
        .width(530)
        .height(100)
        .day(parkings_data[0].days[0])
        .queue(q)
    ;

    var control1 = control();
    var frame1 = frame()
        .width(530).height(406).number(1).date("2017-05-24").curve("M235 177 L235 347 Z");
    
    d3.select(".chart-container").call(chart1);
    d3.select(".control-container").call(control1);
    d3.select(".frame-container").call(frame1);
    
    chart1.onmove(function(xc) {control1.move(xc); frame1.move(xc)});
    control1.onmove(function(xc) {chart1.move(xc); frame1.move(xc)});


})(d3);


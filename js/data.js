var parkings_data = (function(){

    var uah_format = (function(){ var f = d3.format(".0f"); return function(v) {return f(v) + " грн"}})();
    var date_format = function(v) {return moment(v).format("DD.MM.YYYY")};


    var parkings = [
        {
            name: "Басейна, 12",
            address: "вулиця Басейна, 12",
            number: 1,
            
            price: 10,
            cars: 18,
            handicap_rate: 1,
            map: {l: 84, t: 46},

            curve: "M50,81 L47,41 42,41 39,81Z",

            size1: {
                w: 530,
                h: 406,
                ch: 200,
                curve: "M235 177 L235 347 Z"
            },
            
            size2: {
                w: 480,
                h: 368,
                curve: "M209 153 L217 289 Z"
            },


            days: [
                {
                    date: "2017-05-24",
                    declared: 300,
                    data: [4,4,3,3,3,2,2,3,3,3,3,3,2,2,2,2,2,3,3,3,3,3,4,6,6,8,9,9,10,10,10,12,13,14,16,14,14,14,16,16,14,15,14,14,15,13,12,14,14,15,15,16,15,16,16,16,16,16,16,16,15,16,16,16,16,15,16,16,17,17,17,17,17,17,16,16,16,15,16,15,15,16,16,16,16,15,16,16,15,14,14,15,15,14,15,17,16,17,17,17,17,17,17,16,16,16,16,15,16,16,16,16,16,16,15,16,16,17,18,17,17,17,18,18,16,16,15,14,16,17,17,17,16,16,16,15,16,16,15,16,15,15,16,13,12,13,12,14,13,12,12,12,13,13,12,13,13,13,15,14,14,13,14,14,14,14,13,11,9,10,10,11,11,10,10,11,9,7,8,9,8,7,7,4,4,4,5,4,5,5,5,6,6]
                },
                {
                    date: "2017-05-25",
                    declared: 230,
                    data: [1,1,1,1,1,3,3,3,3,3,2,2,4,3,2,3,3,3,3,3,3,3,3,3,4,7,7,6,7,7,8,9,10,10,10,11,12,13,12,11,11,11,12,13,12,12,13,16,15,16,17,16,15,15,15,15,14,13,14,16,17,17,17,16,17,17,16,16,16,16,16,16,16,16,15,16,17,17,17,17,17,17,16,16,16,17,15,16,16,17,17,15,17,17,17,17,18,18,17,17,16,17,17,16,17,17,16,17,17,17,17,17,16,15,16,13,14,14,16,15,16,14,13,13,14,16,17,16,16,16,15,16,16,16,17,16,18,18,18,18,17,17,15,17,17,16,16,16,16,15,15,14,14,13,15,14,13,15,15,13,15,15,14,13,13,14,14,14,13,13,12,12,12,13,12,12,12,12,11,12,11,11,10,10,10,10,8,8,8,6,7,7,6]
                },
                {
                    date: "2017-05-26",
                    declared: 200,
                    data: [3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,4,3,2,2,3,2,4,6,6,8,8,9,11,9,11,14,14,15,15,16,16,16,16,16,16,16,16,16,16,16,16,13,14,15,15,15,16,16,16,15,15,15,16,15,16,16,16,15,15,16,15,16,16,16,15,16,16,16,16,16,16,16,16,16,16,16,16,16,15,16,16,15,15,15,15,15,15,15,14,13,15,15,15,14,15,15,15,15,15,16,16,15,15,14,15,15,15,13,14,15,15,15,15,15,14,15,15,15,15,15,14,14,16,16,15,15,14,14,11,13,16,16,13,15,16,16,16,16,14,13,13,13,14,15,15,15,14,15,16,16,16,15,16,16,16,14,14,16,15,14,13,13,14,13,12,12,11,11,12,11,10,8,8,8,8,8,8,8,8,7,7,7,8]
                }
            ]
        },
        {
            name: "Омеляновича-Павленка, 4",
            address: "вулиця Суворова, 4",
            number: 2,
            
            price: 7,
            cars: 31,
            handicap_rate: 0.7,
            map: {l: 320, t: 58},

            curve: "M70,95 L87,12.5 83,12 54,90Z",

            size1: {
                w: 530,
                h: 413,
                ch: 200,
                curve: "M313 404 453 55 Z"
            },

            size2: {
                w: 480,
                h: 374,
                curve: "M284 364 L412 48 Z"
            },

            days: [
                {
                    date: "2017-06-14",
                    declared: 412,
                    data: [12,12,13,13,13,12,13,16,17,15,15,17,16,18,18,19,19,21,17,17,18,19,19,18,23,23,20,20,19,19,21,21,22,25,25,23,22,23,23,23,26,25,26,28,25,28,26,29,29,29,29,28,28,28,26,27,29,29,28,26,25,28,29,28,29,29,28,28,29,29,27,29,28,29,29,28,29,26,28,29,29,28,29,26,28,28,29,31,31,27,29,29,29,30,30,29,30,30,29,30,30,30,30,30,28,31,31,31,31,29,28,29,28,30,30,30,29,29,29,29,29,29,30,23,21,20,26,22,20,18,19,19,20,20,21,19,19,24,22,22,22,19,19,17,22,23,20,27,23,24,23,22,21,19,21,21,23,22,23,23,22,23,25,24,23,21,24,26,26,25,27,23,21,22,22,22,22,22,24,24,23,21,20,19,22,20,18,20,17,19,20,18,16]
                },
                {
                    date: "2017-06-15",
                    declared: 395,
                    data: [3,2,2,4,4,4,4,5,6,7,9,10,12,9,6,8,7,7,4,8,9,10,7,9,8,6,8,10,11,12,14,17,15,18,18,23,23,20,20,21,16,19,18,20,20,24,24,22,21,22,27,26,23,24,22,21,27,27,28,26,27,27,27,27,28,28,28,27,27,25,24,25,21,23,23,25,25,26,26,26,25,27,27,26,28,31,31,31,30,28,26,23,27,25,25,25,24,24,23,25,24,22,25,26,23,28,28,28,27,26,26,27,27,28,27,29,29,29,29,27,28,29,30,29,27,26,30,23,20,16,18,16,20,20,21,20,15,14,14,16,21,21,22,17,15,16,15,16,19,21,19,20,26,26,24,25,24,24,25,24,22,25,24,21,21,25,26,26,26,25,22,20,23,25,21,22,22,25,23,20,18,15,15,15,15,14,9,9,7,6,6,5,9]
                },
                {
                    date: "2017-06-16",
                    declared: 387,
                    data: [3,2,1,3,3,6,4,3,4,4,5,7,8,8,8,9,12,13,13,13,13,14,15,12,12,13,12,14,14,12,12,12,12,12,11,12,13,17,18,21,19,17,18,16,19,19,21,23,23,21,26,26,25,27,26,27,27,28,26,26,29,26,26,25,26,27,29,30,28,30,29,26,26,30,27,27,29,26,26,26,27,29,26,27,27,26,26,29,24,23,28,27,26,23,24,24,22,23,23,22,24,22,27,28,24,26,26,26,25,21,26,28,29,27,25,19,20,19,21,23,26,25,22,22,25,26,27,24,23,22,21,20,23,21,20,19,19,22,22,21,22,27,30,29,26,23,26,27,25,26,27,27,27,27,28,27,27,26,27,27,26,27,28,30,26,29,30,30,29,26,27,27,27,24,22,20,20,20,22,23,21,22,18,22,23,22,23,23,22,24,21,17,18]
                }
            ]
        },
        {
            name: "Велика Васильківська, 58-50/23",
            address: "вулиця Велика Васильківська, 58-50/23",
            number: 3,
            
            price: 7,
            cars: 25,
            handicap_rate: 1,
            map: {l: 16, t: 120},

            curve: "M0,53 L30,52 65,50 91,48 99,47 95,41 67,42 31,43 4,46Z",

            size1: {
                w: 530,
                h: 298,
                ch: 250,
                curve: "M6 149 L521 134 Z"
            },

            size2: {
                w: 480,
                h: 270,
                curve: "M3 133 L478 121 Z"
            },

            days: [
                {
                    date: "2017-07-05",
                    declared: 90,
                    data: [4,4,4,4,4,4,4,4,4,4,4,6,6,7,7,7,6,6,6,6,6,6,6,6,5,6,7,9,9,10,10,10,10,10,10,10,9,10,9,11,11,11,11,11,11,11,10,10,11,13,13,14,14,15,16,19,19,18,21,20,20,18,18,19,18,18,20,21,19,18,19,21,21,22,21,22,21,21,22,22,22,24,24,25,24,23,24,24,23,24,23,22,23,22,22,21,22,22,23,24,24,24,22,23,22,22,22,21,21,21,18,18,17,16,18,20,20,19,19,18,18,19,20,18,18,16,16,15,15,15,15,15,14,13,13,12,12,13,13,13,14,11,12,13,12,12,11,10,8,7,7,7,9,9,11,10,10,10,10,10,11,12,12,12,11,10,8,9,8,8,7,9,9,8,8,8,8,7,7,7,7,6,7,6,7,6,6,6,6,6,6,6,7]
                },
                {
                    date: "2017-07-06",
                    declared: 37,
                    data: [6,6,6,6,7,7,7,7,6,5,5,6,8,9,9,9,8,9,9,8,8,9,9,9,10,10,9,9,9,8,8,8,10,11,13,14,14,13,13,13,13,15,16,14,11,14,14,14,13,12,12,13,14,13,13,15,16,17,18,18,19,16,16,17,18,18,18,18,17,20,23,23,23,20,21,22,23,23,23,24,24,23,23,23,23,22,23,21,21,20,20,22,22,23,22,22,22,21,19,20,18,19,18,20,19,19,19,20,21,20,19,18,21,19,21,19,19,19,20,20,18,17,17,17,18,18,17,17,17,17,17,17,17,16,13,14,15,13,12,12,13,14,13,14,13,15,16,17,14,13,13,12,12,13,13,12,12,11,12,12,12,10,8,8,8,8,8,8,7,8,7,7,7,7,9,9,9,9,10,10,11,10,9,9,9,9,9,9,8,8,9,9,10]
                },
                {
                    date: "2017-07-07",
                    declared: 0,
                    data: [7,7,7,7,7,7,7,7,7,7,7,8,9,10,9,11,11,11,11,11,11,9,9,9,8,7,8,9,9,9,9,9,8,9,14,14,14,15,15,15,14,13,14,14,13,13,14,14,14,14,17,15,15,15,15,15,15,16,16,16,15,14,13,13,13,13,14,13,15,16,15,14,14,15,16,15,15,15,15,15,15,15,15,15,18,16,16,17,14,14,13,13,16,15,14,14,15,16,15,15,16,16,15,16,16,16,14,14,14,14,14,13,14,14,14,15,15,16,13,13,12,12,12,12,12,12,12,13,12,11,12,12,8,8,8,8,8,8,8,9,9,10,10,8,8,8,6,7,8,9,10,9,12,10,10,11,10,13,13,13,12,12,12,11,12,10,11,11,11,9,9,9,9,10,10,9,8,8,7,8,8,10,9,7,9,8,8,9,9,9,11,10,10]
                }
            ]
        }
    ];

    parkings.forEach(function (p) {
        p.days.forEach(function (obj) {
            var base = moment(obj.date, "YYYY-MM-DD").hours(7).minutes(0);

            obj.data = obj.data.map(function(value, i) {
               return {
                   date: base.clone().add(i * 5, "minutes").toDate(),
                   value: value
               }
            })
        });
    });

    parkings.forEach(function(p) {
        p.days.forEach(function (obj) {
            obj.calculations = calculate(obj, p);
            obj.formatted = format(obj);
        });
    });

    function calculate(day, p) {
        var result = {};

        var working_data = day.data.slice(25 - 1, 132 + 1);

        var summ = 0;
        for (var i = 0; i < working_data.length; i++) {
            summ += working_data[i].value / 12 * p.handicap_rate * p.price;
            if (summ >= day.declared) break;
        }

        result.left = working_data.slice(0, i + 1);
        result.right = working_data.slice(i);
        result.left_dashed = day.data.slice(0, 25);
        result.right_dashed = day.data.slice(132);

        var dashed_sum = result.left_dashed.reduce(summf, 0)
            +result.right_dashed.reduce(summf, 0);

        var working_sum = result.left.reduce(summf, 0)
            +result.right.reduce(summf, 0);

        result.additional_income = dashed_sum / 12 * p.handicap_rate * p.price;
        result.working_day_income = working_sum / 12 * p.handicap_rate * p.price;

        result.dirty_income = result.working_day_income - day.declared;
        result.extended_working_day_income = result.working_day_income + result.additional_income;

        var total_cars = day.data.reduce(summf, 0);

        result.fullness = total_cars / (p.cars * day.data.length);


        // console.log(day.data[0].date);
        // console.log(result);

        return result;
    }

    function format(day) {
        return {
            date: date_format(day.date),
            declared: uah_format(day.declared),
            working_day_income: uah_format(day.calculations.working_day_income),
            extended_working_day_income: uah_format(day.calculations.extended_working_day_income)
        };
    }

    function summf(o, v) {
        return o + v.value;
    }

    return parkings;
})();



















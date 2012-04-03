
(function(WIN, DOC) {
    "use strict";

    var ELTest = WIN.ELTest || {},

    runDateTests = function() {

		test("Test to get the current month", function() {
			var month = ELUtils.date.getCurrentMonth();
		  	equal(month, "March", "The current month is " + month);
		});

        test("Test to get the current day", function() {
            var day = ELUtils.date.getDay();
            equal(day, "Thursday", "Today should be " +  day);
        });

	};

    WIN.ELTest = {
        runDateTests: runDateTests
    };

}(this, this.document));

(function(WIN, DOC) {
    "use strict";

    var ELTest = WIN.ELTest || {},

    runMoneyTests = function() {

		test("Test to get dollar amount from number", function() {
			var money = ELUtils.money.numberToCurrency(1000.00);
		  	equal(money, "$1,000.00", "Should be $1,000.00");
		});

        test("Test to get dollar amount from number", function() {
            var money = ELUtils.money.numberToCurrency(1000);
            equal(money, "$1,000.00", "Should be $1,000.00");
        });

        test("Test to get dollar amount from number", function() {
            var money = ELUtils.money.numberToCurrency(1000.456);
            equal(money, "$1,000.46", "Should be $1,000.46");
        });

        test("Test to get dollar amount from number", function() {
            var money = ELUtils.money.numberToCurrency("100");
            equal(money, "$100.00", "Should be $100.00");
        });

        test("Test to get dollar amount from number", function() {
            var money = ELUtils.money.numberToCurrency("235235235.45323");
            equal(money, "$235,235,235.45", "Should be $235,235,235.45");
        });

        test("Test to get euro amount from dollars", function() {
            var money = ELUtils.money.numberToCurrency("20.00", "EUR");
            equal(money, "€15.11", "Should be €15.11");
        });

        test("Test to get euro amount from dollars", function() {
            var money = ELUtils.money.numberToCurrency(20.00, "EUR");
            equal(money, "€15.11", "Should be €15.11");
        });

        test("Test to get dollar amount from number", function() {
            var money = ELUtils.money.numberToCurrency("ten");
            equal(money, "You must use a number", "You must use a number");
        });
        
	};

    WIN.ELTest = {
        runMoneyTests: runMoneyTests
    };

}(this, this.document));
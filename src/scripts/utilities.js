(function(WIN, DOC) {
    "use strict";

    var ELUtils = WIN.ELUtils || {},

        dateMethods = (function() {

            var month = ["January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"],
                d = new Date(),
                dateIns = null;

            function refreshDate() {
                d = new Date();
            }

            function DateInstance(dateInMS) {
                var d = this;
                if (!d instanceof DateInstance) {
                    d = new DateInstance();
                }

                return d;
            }

            DateInstance.prototype.getCurrentMonth = function() {
                var monthName = month[this.now.getMonth()];
                return monthName;
            };

            // Get the name of the current month
            DateInstance.getCurrentMonth = function() {
                refreshDate();
                var monthName = month[d.getMonth()];
                return monthName;
            };

            // Get the name of the current day
            DateInstance.getDay = function() {
                refreshDate();
                var day = ["Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"],
                    dayName = day[d.getDay()];

                return dayName;
            };

            return DateInstance;

        }()),


        timeMethods = {
            convertSecondsToHours: function(seconds) {
                if (!seconds) {
                    return 0;
                }
                var secsInHour = 60 * 60,
                    strBuilder = [];
                strBuilder.push(Math.floor(seconds / secsInHour) + ' hours');
                strBuilder.push(Math.floor((seconds % secsInHour) / 60) + ' minutes');
                strBuilder.push((seconds % secsInHour) % 60 + ' seconds');

                return strBuilder.join(' ');
            }
        },

        cookieMethods = (function() {
            var setCookie, getCookie;

            function CookieInstance(cookie) {
                if (cookie) {
                    return cookie;
                } else {
                    return null;
                }
            }

            // Set a Cookie
            CookieInstance.setCookie = function(name, value, exdays) {
                var exdate = new Date(),
                    cookieValue;
                exdate.setDate(exdate.getDate() + exdays);
                cookieValue = WIN.escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
                DOC.cookie = name + "=" + cookieValue;
                return DOC.cookie;
            };

            //Retrieve a Cookie
            CookieInstance.getCookie = function(cName) {
                var begin, end;

                if (DOC.cookie.length > 0) {
                    begin = DOC.cookie.indexOf(cName + "=");
                    if (begin !== -1) {
                        begin += cName.length + 1;
                        end = DOC.cookie.indexOf(";", begin);
                        if (end === -1) {
                            end = DOC.cookie.length;
                        }
                        return WIN.unescape(DOC.cookie.substring(begin, end));
                    }
                    return null;
                }
            };

            //Delete a Cookie
            CookieInstance.deleteCookie = function(cName) {
                if (this.getCookie(cName)) {
                    DOC.cookie = cName + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
                }
            };

            return CookieInstance;

        }()),

        urlMethods = (function() {

            var fn, methods = {
                href: (function() {
                    return WIN.location.href;
                }())
            };

            // Get hash tag from url
            methods.getHashTagfromUrl = function() {
                var hashValue = this.href.split('#');
                if (hashValue.length) {
                    return hashValue[1];
                } else {
                    return "";
                }
            };

            methods._splitQueryString = function() {
                var queryString = this.getQueryString(),
                    queryKeyValuePairs = queryString.split('&'),
                    urlObj = {},
                    i = 0,
                    len, keyval;

                for (len = queryKeyValuePairs.length; i < len; i += 1) {
                    keyval = queryKeyValuePairs[i].split('=');

                    urlObj[keyval[0]] = keyval[1];
                }

                return urlObj;
            };

            // Get query string from url
            methods.getQueryString = function() {
                var queryStrValue = this.href.split("?");
                if (queryStrValue.length) {
                    return queryStrValue[1];
                }
            };

            // Turn query string into an array

            // Get query string name from url
            methods.getQueryStringNameList = function() {
                var urlObj = this._splitQueryString(),
                    stringList = [],
                    item;

                for (item in urlObj) {
                    if (urlObj.hasOwnProperty(item)) {
                        stringList.push(item);
                    }
                }

                return stringList;
            };

            // Get query string value from url
            methods.getQueryStringValue = function(name_) {
                var queryStringArray = this._splitQueryString();
                if (queryStringArray && queryStringArray[name_]) {
                    return queryStringArray[name_];
                }
                return queryStringArray;
            };

            var urls = {};

            function UrlInstance(url_) {

                var u = (!(this instanceof UrlInstance)) ? new UrlInstance() : this;

                u.href = url_ || WIN.location.href;

                return u;
            }

            for (fn in methods) {
                if (methods.hasOwnProperty(fn)) {
                    UrlInstance.prototype[fn] = UrlInstance[fn] = methods[fn];
                }
            }

            return UrlInstance;
        }()),

        currencyMethods = ( function() {

            var methods = {};

            // Convert number to Currency (Dollars Or Euro). Defaults to Dollars if no currency value is given
            methods.numberToCurrency = function(number, currency) {  

                // format decimal currencies in JavaScript (display two decimal places and add commas to make larger numbers more readable)
                var formatCurrency =  function(amount) {

                    var num;

                    if (isNaN(number)) {
                        throw new Error("You must use a number");
                    }

                    if (amount) {
                        num = amount;
                    } else {
                        num = parseFloat(number);   
                    } 

                    var dollars = num.toFixed(2).split(".");
                    dollars[0] = dollars[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1,").split("").reverse().join("");  // Referenced from http://joncom.be/code/formatting-currency-with-javascript/
                    
                    num = dollars.join(".");

                    return num;

                };

                //Function that runs after exchangeRates JSON has been called
                var currencySuccess = function (data) {
                    var rates = data.rates,
                        dollar = parseInt(number);

                    for (var prop in rates) {
                        if(rates.hasOwnProperty(prop) && currency === prop) {
                        var rate = rates[prop],
                            amount = rate * dollar,
                            total = formatCurrency(amount);

                            console.log("€" + total);
                            return "€" + total;   // Why is this returning undefined !?!
                        }
                    } 

                };

                function exchangeRates() {
                    $.ajax({
                        url: 'http://openexchangerates.org/latest.json', // http://josscrowcroft.github.com/open-exchange-rates/
                        dataType: 'jsonp',
                        success: currencySuccess
                    });
                }

                if (currency === "EUR") {
                    //Convert to a different currency
                    exchangeRates();
                } else {
                    // Show Dollars 
                    return "$" + formatCurrency();
                }

            };

            return methods;

        }());

    //***************************************//
    WIN.ELUtils = {
        date: dateMethods,
        cookie: cookieMethods,
        money: currencyMethods,
        time: timeMethods,
        url: urlMethods
    };

}(this, this.document)); 
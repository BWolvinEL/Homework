(function (WIN, DOC) {
	"use strict";

	var ELUtils = WIN.ELUtils || {},

		dateMethods = (function () {

			var month = [	"January",
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
							"December"	],
				d = new Date(),
				dateIns = null;

			function refreshDate() {
				d = new Date();
			}

			function DateInstance(dateInMS) {
				var d = this;
				if (!d instanceof DateInstance) {
					d = new this;
				}
				d.lastName = "wolvine";

				return d;
			}
			DateInstance.prototype.getCurrentMonth = function () {
				var monthName = month[this.now.getMonth()];
				return monthName;
			};

		// Get the name of the current month
			DateInstance.getCurrentMonth = function () {
				refreshDate();
				var monthName = month[d.getMonth()];
				return monthName;
			};
					// Get the name of the current day
			DateInstance.getDay = function () {
				refreshDate();
				var day = [	"Sunday",
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday" ],
					dayName = day[d.getDay()];

				return dayName;
			};

			return DateInstance;

		}()),


		timeMethods = {
			convertSecondsToHours : function (seconds) {
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

		cookieMethods = {

		// Set a Cookie
			setCookie: function (name, value, exdays) {
				var exdate = new Date(),
					cookieValue;
				exdate.setDate(exdate.getDate() + exdays);
				cookieValue = WIN.escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
				DOC.cookie = name + "=" + cookieValue;
				return DOC.cookie;
			},

			//Read a Cookie
			readCookie: function (name) {

			},

			//Update a Cookie
			updateCookie : function (name) {

			}

		},

		url = WIN.location,

		urlMethods = {

		// Get hash tag from url
			getHashTagfromUrl: function () {
				var hashValue = url.hash.replace("#", "");
				if (url.hash) {
					return hashValue;
				}
			},

			// Get query string from url
			getQueryString : function () {
				var queryStrValue = url.search;
				if (queryStrValue) {
					return queryStrValue;
				}
			},

			// Turn query string into an array
			splitQueryString : function () {
				var queryString = this.getQueryString(),
					queryStringArray = queryString.split("=");
				return queryStringArray;
			},

			// Get query string name from url
			getQueryStringName : function () {
				var queryStringArray = this.splitQueryString(),
					queryStringName = queryStringArray[0].replace("?", "");
				return queryStringName;
			},

			// Get query string value from url
			getQueryStringValue : function () {
				var queryStringArray = this.splitQueryString(),
					queryStringValue = queryStringArray[1];
				return queryStringValue;
			}

		},

		currencyMethods = {

			// Display dollar amount from a number
			numberToCurrency : function (number_) {
				var number = number_.toString(),
					dollars = number.split(".")[0],
					cents = (number.split(".")[1] || "") + "00";
				dollars = dollars.split("").reverse().join("").replace(/(\d{3}(?!$))/g, '$1,').split("").reverse().join("");
				return "$" + dollars + "." + cents.slice(0, 2);
			}

		};

//***************************************//

	WIN.ELUtils = {
		date : dateMethods,
		cookie : cookieMethods,
		money : currencyMethods
	};

}(this, this.document));

(function () {
var ELUtils = window.ELUtils || {};

ELUtils.time = ELUtils.date || {}

// Date Methods //
//***************************************//
	
	var d = new Date();
	
	ELUtils.dateMethods = {
	
		// Get the name of the current month
		getCurrentMonth: function() {
			var month = new Array();
			month[0]="January";
			month[1]="February";
			month[2]="March";
			month[3]="April";
			month[4]="May";
			month[5]="June";
			month[6]="July";
			month[7]="August";
			month[8]="September";
			month[9]="October";
			month[10]="November";
			month[11]="December";
			
			var monthName = month[d.getMonth()];
			
			return monthName;
		},
		
		// Get the name of the current day
		getDay: function() {
			var day = new Array();
			day[0] = "Sunday";
			day[1] = "Monday";
			day[2] = "Tuesday";
			day[3] = "Wednesday";
			day[4] = "Thursday";
			day[5] = "Friday";
			day[6] = "Saturday";
			
			var dayName = day[d.getDay()]
			
			return dayName
		}
	
	}

// Time Methods //
//***************************************//

	// Convert seconds into hours ~ Rich Hamburg
	ELUtils.time.convertSecondsToHours = function (seconds) {
		if (!seconds) return 0;
		var secsInHour = 60*60;
		return (Math.floor(seconds/secsInHour) + ' hours ' + Math.floor((seconds%secsInHour)/60) + ' minutes ' + (seconds%secsInHour)%60 + ' seconds');            
	}

//***************************************//


// Cookie Methods //
//***************************************//

	ELUtils.cookieMethods = {
	
		// Set a Cookie 
		setCookie: function(name, value, exdays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = name + "=" + cookieValue;
			return document.cookie;
		},
		
		//Read a Cookie
		readCookie: function(name) {

		}
	}

//***************************************//


// PARSE URL Methods //
//***************************************//

	var url = window.location;
	
	ELUtils.parseURLMethods = {

		// Get hash tag from url
		getHashTagfromUrl: function() {
			var hashValue = url.hash.replace("#", "");
			if(url.hash) {
				return hashValue;
			}
		},

		// Get query string from url
		getQueryString:function() {
			var queryStrValue = url.search;
			if (queryStrValue) {
				return queryStrValue;
			}
		},

		// Turn query string into an array
		splitQueryString: function() {
			var queryString = this.getQueryString();
			var queryStringArray = queryString.split("=");
			return queryStringArray;
		},

		// Get query string name from url (extends ELUtils.splitQueryString)
		getQueryStringName: function() {
			var queryStringArray = this.splitQueryString();
			var queryStringName = queryStringArray[0].replace("?", "");
			return queryStringName;
		},

		// Get query string value from url (extends ELUtils.splitQueryString)
		getQueryStringValue: function() {
			var queryStringArray = this.splitQueryString();
			var queryStringValue = queryStringArray[1];
			return queryStringValue;
		}
	
	}

//***************************************//

window.ELUtils = ELUtils;
}());

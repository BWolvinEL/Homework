(function () {
var ELUtils = window.ELUtils || {};

ELUtils.time = ELUtils.date || {}

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

	// Set a Cookie 
	ELUtils.setCookie = function(name, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		documentcookie = name + "=" + cookieValue;
	}
	
	//Read a Cookie
	ELUtils.readCookie = function(cookie) {
	
	}

//***************************************//


// PARSE URL Methods //
//***************************************//

	var url = window.location;

	// Get hash tag from url
	ELUtils.getHashTagfromUrl = function() {
		var hashValue = url.hash.replace("#", "");
		if(url.hash) {
			return hashValue;
		}
	}

	// Get query string from url
	ELUtils.getQueryString = function() {
		var queryStrValue = url.search;
		if (queryStrValue) {
			return queryStrValue;
		}
	}

	// Turn query string into an array
	ELUtils.splitQueryString = function() {
		var queryString = ELUtils.getQueryString();
		var queryStringArray = queryString.split("=");
		return queryStringArray;
	}

	// Get query string name from url (extends ELUtils.splitQueryString)
	ELUtils.getQueryStringName = function() {
		var queryStringArray = ELUtils.splitQueryString();
		var queryStringName = queryStringArray[0].replace("?", "");
		return queryStringName;
	}

	// Get query string value from url (extends ELUtils.splitQueryString)
	ELUtils.getQueryStringValue = function() {
		var queryStringArray = ELUtils.splitQueryString();
		var queryStringValue = queryStringArray[1];
		return queryStringValue;
	}

//***************************************//

window.ELUtils = ELUtils;
}());

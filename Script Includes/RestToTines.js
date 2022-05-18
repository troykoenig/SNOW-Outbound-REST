var RestToTines = Class.create();
RestToTines.prototype = {
    initialize: function() {
    },

    generateRest: function(httpVerb, data) {
        var AccessKey = gs.getProperty('TinesApiKey');
        // Set looper
        var looper = 0;

        //Create Variables for RESTMessageV2
        var requestBody;
        var responseBody;
        var status;
        var sm;
        var restHttpVerb = httpVerb.toLowerCase();

        //Send Rest Message
        try{
            sm = new sn_ws.RESTMessageV2('global.Tines', restHttpVerb);  // Might throw exception if message doesn't exist or not visible due to scope.
            sm.setStringParameter("auth", AccessKey);
            sm.setRequestBody(data);
            sm.setHttpTimeout(10000); //In milliseconds. Wait at most 10 seconds for response from http request.
            response = sm.execute(); //Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.
            responseBody = response.haveError() ? response.getErrorMessage() : response.getBody();
            status = response.getStatusCode();

        } catch(ex) {
            responseBody = ex.getMessage();
            status = '500';
        } finally {
            requestBody = sm ? sm.getRequestBody():null;
        }

    },

    type: 'RestToTines'
};

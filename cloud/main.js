Parse.Cloud.beforeSave("Sickday_Requests", function(request, response) {

    request.object.set("request_recieved", true);
    response.success();
    
    
    var insuranceObject;
    var insuranceName;
    var query = new Parse.Query("Insurance");
    query.equalTo("username", request.user.get("email"));
                  
    query.first({
        success: function(object) {
            insuranceObject = object;
            insuranceName = object.get("insuranceName");
            console.log("there was no error");
        },
        error: function(error) {
            console.log("There was an error");
        }
    });
    
    
    var Mandrill = require('mandrill');
    Mandrill.initialize('NaNCUaLV1FuquyEE6jhC2Q');
    
    Mandrill.sendEmail({
      message: {
        text: "Name: " + request.user.get("firstname") + " " + request.user.get("lastname") + "\n" + "Insurance name: " + insuranceName,
        subject: "New Sickday request",
        from_email: request.user.get("email"),
        from_name: request.user.get("firstname") + " " + request.user.get("lastname"),
        to: [
          {
            email: "marcusmotill@gmail.com",
            name: "Your Name"
          }
        ]
      },
      async: true
    },{
      success: function(httpResponse) {
        console.log(httpResponse);
      },
      error: function(httpResponse) {
        console.error(httpResponse);
      }
    });
          
});
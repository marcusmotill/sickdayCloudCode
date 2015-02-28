
Parse.Cloud.afterSave("Sickday_Requests", function(request) {
    query = new Parse.Query("Sickday_Requests");
    query.get(request.object.id, {
        success: function(post) {
            post.set("request_recieved", true);
            post.save();
        },
        error: function(error) {
            console.error("Got an error " + error.code + " : " + error.message);
        }
    });
});

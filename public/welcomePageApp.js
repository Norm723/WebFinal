$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
        var studentName = $("#name").val();
        if (studentName === "") {
            $("#message").show()
            $("#message").fadeOut(10000);
            return false;
        }
        $.post('/',   // url to post to
			   { student: $("#name").val() }, // data to be submit
               function (data, status, jqXHR) {
                    $("#message").text(status);
                    $("#message").show();
                    $("#message").fadeOut(3000);
               })
               .done(function(){
                   sessionStorage.setItem('name', studentName);
                    location.href = "main.html/" + studentName; //route to students page
                })
                .fail(function(status) 
                    {alert('Failure!'+ ' Student: ' +  studentName  + ' not found!');
                });
        }); //end post
    return false;
}) 
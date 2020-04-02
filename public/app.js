$(document).ready(function () {
    //$('#loggedInAs').html('You are logged in as ' + sessionStorage.getItem('name'));
    // put the data from the database into the table
   // createTable(jsonData);
    var pageURL = window.location.href;
    var name = pageURL.substr(pageURL.lastIndexOf('/') + 1); //get students name from url
    //console.log(sname);
    $('td').click(function () {
        var failed = false;
        var row = $(this).closest("tr").index()-1;
        var col = $(this).closest("td").index();
        if ( ($(this).html() === "") && !$(this).hasClass("selected")) {
            if (canAdd($(this).parent())) { //add function to make it so can't add in same column
                
                //post to insert into database
                $.post('/add',   // url to post to
                { student: name,
                  time: row,
                  teacher: col, 
                }, // data to be submit
                function (data, status, jqXHR) {
                    
               })
               .done(function(){
                })
                .fail(function(status) 
                    { failed = true;
                    alert('Failed to set meeting! please try again!');
                    return;
                });//end post
                if(!failed) {
                    $(this).addClass("selected");
                    //$(this).css("background-color", "red");
                    //$(this).css("font-weight", "bold");
                    $(this).html(name);
                }

            } else {
                var sb = document.getElementById("snackbar");
                sb.innerHTML = "You can't have two or more meetings at the same time or with the same Teacher";
                sb.className = "show";
                setTimeout(function () { sb.className = sb.className.replace("show", ""); }, 3000);
            }
        } else if ($(this).html() === name){
            
            
            //post to delete from database (actually update)
            $.post('/delete',   // url to post to
            { student: name, //don't really need the name here, just update cell in db to free
              time: row,
              teacher: col, 
            }, // data to be submit
            function (data, status, jqXHR) {
                console.log(status);
           })
           .done(function(){
                
            })
            .fail(function(status) 
                {alert('Failed to cancel meeting! please try again!');
                return;
            });//end post
            $(this).removeClass("selected");
            $(this).html("");

        } else {
            var sbTaken = document.getElementById("snackbar");
            sbTaken.innerHTML = "This time slot is already taken.";
            sbTaken.className = "show";
            setTimeout(function () { sbTaken.className = sbTaken.className.replace("show", ""); }, 3000);
        }
        return false;
    })

    function canAdd(row) {
        var numOfCols = row.prop('childElementCount');
        var cols = row.children();
        var i = 1;
        while (i < numOfCols) {
            if ($(cols[i]).html() === name) {
                return false;
            }
            i++;
        }
        return true;
    }

})
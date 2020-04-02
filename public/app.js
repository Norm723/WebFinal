$(document).ready(function () {
    $('#loggedInAs').html('You are logged in as ' + sessionStorage.getItem('name'));
    // put the data from the database into the table
    createTable(jsonData);
    $('td').click(function () {
        if ($(this).html() === "") {
            if (canAdd($(this).parent())) {
                $(this).css("background-color", "red");
                $(this).css("font-weight", "bold");
                $(this).html(sessionStorage.getItem('name'));
                //post to database
            } else {
                var sb = document.getElementById("snackbar");
                sb.innerHTML = "You can't have two or more meetings at the same time.";
                sb.className = "show";
                setTimeout(function () { sb.className = sb.className.replace("show", ""); }, 3000);
            }
        } else if ($(this).html() === sessionStorage.getItem('name')){
            $(this).css("background-color", "white");
            $(this).html("");
            //delete from database
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
            if ($(cols[i]).html() === sessionStorage.getItem('name')) {
                return false;
            }
            i++;
        }
        return true;
    }

    function createTable(jsonData) {
        //dynamically build table
    }
})
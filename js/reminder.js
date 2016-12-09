function saveNote(){
    if (document.getElementById("note-name").value == ""){
        //TODO: Tooltip or something...
        console.log("EMPTY Title");
    }
    else if (document.getElementById("note-content").value == "") {
        //TODO: Tooltip or something...
        console.log("EMPTY Content");
    }
    else {
        // Adds a new reminder-notes div element with use of temporary name (suffix -new) in class name
        $("div.reminder-notes").append('<div class="item-new"></div>');
        $notesitem = $("div.item-new");

        // The x close sign
        $notesitem.append('<span class="close" onclick="deleteNote(this)">&times;</span>');

        $notesitem.append('<div class="title-new"></div>');
        $(".title-new").text($("input#note-name").val());
        $(".title-new").attr("class", "panel-heading");

        $notesitem.append('<div class="content-new"></div>');
        $(".content-new").text($("textarea#note-content").val());
        $(".content-new").attr("class", "panel-body");

        $notesitem.attr("class", "panel panel-default");

        // Clear the input field and textarea
        $('input#note-name').val('');
        $('textarea#note-content').val('');
    }
}

function deleteNote(location){
    // This is called from x close sign element
    location.parentElement.remove();
}
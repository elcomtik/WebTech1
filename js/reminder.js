function saveNote(){
    if (document.getElementById("note-name").value == ""){
        $('#note-name').css('border-color', 'red');
        $('#note-name').tooltip('show');
    }
    else if (document.getElementById("note-content").value == "") {
        $('#note-content').css('border-color', 'red');
        $('#note-content').tooltip('show');
    }
    else {
        //Clear styles of previously false input if there was any
        $('#note-name').css('border-color', '');
        $('#note-name').tooltip('destroy');
        $('#note-content').css('border-color', '');
        $('#note-content').tooltip('destroy');

        var newItem = storeNewNote();
        addNoteToPage(newItem.id, newItem.name, newItem.content);

        // Clear the input field and textarea
        $('input#note-name').val('');
        $('textarea#note-content').val('');
    }
}

function addNoteToPage(noteId, noteName, noteContent) {
    // Adds a new reminder-notes div element with use of temporary name (suffix -new) in class name
    $("div.reminder-notes").append('<div class="item-new"></div>');
    $notesitem = $("div.item-new");

    // The x close sign
    $notesitem.append('<span class="close" onclick="deleteNote(this)">&times;</span>');

    $notesitem.attr("id", noteId);
    $notesitem.append('<div class="title-new"></div>');
    $(".title-new").text(noteName);
    $(".title-new").attr("class", "panel-heading");
    $notesitem.append('<div class="content-new"></div>');
    $(".content-new").text(noteContent);
    $(".content-new").attr("class", "panel-body");

    $notesitem.attr("class", "panel panel-default");
}

// Stores new note to localStore
function storeNewNote() {
    var ni = {'id': 0, 'name': '', 'content': ''};

    ni.name = $("input#note-name").val();
    ni.content = $("textarea#note-content").val();
    ni.id = new Date().getTime();
    localStorage.setItem(String(ni.id), JSON.stringify(ni));

    return ni;
}

// This is called from x close sign element
function deleteNote(location){
    location.parentElement.remove();
    localStorage.removeItem(location.parentElement.getAttribute('id'));
}

// Loads the notes from localStore
window.onload = function() {
    for(var i in localStorage) {
        addNoteToPage(JSON.parse(localStorage.getItem(i)).id,
          JSON.parse(localStorage.getItem(i)).name, JSON.parse(localStorage.getItem(i)).content);
    }
}

console.log("Javascript connected");
const innerDiv= document.getElementById('note-container');
document.getElementById("send-btn").addEventListener("click", notecontainerBuilder);
const sendButton = document.getElementById('send-btn');
const textArea = document.getElementById('input');
var message = textArea.value;

function listofnote(params) {
  for (let i = 0; i < notes.length; i++) {
  const listItem = document.createElement("div");
  listItem.textContent = notes[i];
  list.appendChild(listItem);
}
}

function notecontainerBuilder() {
  const list = document.createElement("div");

  var createDivElement = function (className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
  };

  var createSpanElement = function (value, className) {
    var span = document.createElement('span');
    if (className) {
      span.className = className;
    }
    span.innerText = encodeHtmlEntity(value);
    return span;
  };

  this.createStickyNote = function (text) {
    var stickyNoteContainer = document.getElementById('note-container');
    var stickyNote = createSpanElement(text, 'note');
    stickyNoteContainer.insertBefore(stickyNote, document.getElementById('send-btn'));
    return stickyNoteContainer;
  };

  function encodeHtmlEntity(str) {
    return str.replace(/[\u00A0-\u9999<>&]/gim, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
  }

  return this.createStickyNote;
}

function savenote(){
  var field = document.getElementById("input");
  var settings = JSON.parse(note.value);
  var settings = null;

try {
    settings = JSON.parse(note.value);
}
catch (error) {
    if (error instanceof SyntaxError) {
        alert("There was a syntax error. Please correct it and try again: " + error.message);
    }
    else {
        throw error;
    }
}
}

function deleteNote() {
  var noteContainer = document.getElementById("note-container");
  var noteShow = document.getElementById("note-container");
  var notes = noteShow.getElementsById("note");

  for (var i = 0; i < notes.length; i++) {
    notes[i].onclick = function() {
      var noteText = this.innerHTML;
      var xhttp = new XMLHttpRequest();
      var url = "/delete-note";
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          
        }
      };
      xhttp.send("note_text=" + noteText);
      this.parentNode.removeChild(this);
    }
  }
}

function storeNote() {
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var note_data = {'title': title, 'content': content};

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "/getnote", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(note_data));
}

function notecreate(){
  let uploadList = document.getElementById("note-container");
  var entriesList = uploadList.getElementsByTagName("div")
  let uploadObject = {};
  uploadObject.notes = [];
  for (let i = 0; i < entriesList.length ; i++){
    let objEntry = {}
    objEntry.content = entriesList[i].getAttribute("note");
    uploadObject.notes.push(objEntry);
  }
  let xhttp = new XMLHttpRequest();
  let url = "/api/create_note"
  
    xhttp.onreadystatechange = function() {
      let strResponse = "Error: no response";
      if (this.readyState == 4 && this.status == 200) {
        strResponse = JSON.parse(this.responseText);
        alert(strResponse.message)
      }    
    };
    xhttp.open("PUT", url, true);
    var data = JSON.stringify(uploadObject)
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);

}
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function editNoteByTitleAndContent(title, content) {
  const notes = JSON.parse(fs.readFileSync('note.json'));
  const note = notes.find(note => note.title === title);
  if (!note) {
    return console.log('Note not found');
  }
  note.content = content;
  fs.writeFileSync('note.json', JSON.stringify(notes, null, 2));
}
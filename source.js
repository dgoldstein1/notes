// Add your javascript here

///////////////
// Variables //
///////////////

// list of json notes
// notes are in the form:
// {
//    ID : random number as string
//    text : string of content
//    color : six char hex string
//    editing : true / false (currently editing or not)
//
// }
var notes = []
// fixed colors to select from
const colors = {
    red : "#d67a81",
    purple : "#ed78e5",
    blue : "#9495e8",
    green : "#9ce88b",
    yellow : "#e8da8b",
    white : "#ffffff"
}
const defaultColor = colors.yellow;

/////////////
// Methods //
/////////////

// adds a new note to the list
var addNote = function() {
    notes.push({
        // very unlikely to have ID collisions with scope of this app
        ID : String(Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))),
        color : defaultColor,
        text : "",
        editing : false, // default to currently editing
    })
    renderNotes()
}

var saveNote = function(id) {
    for (let i in notes) {
        if (notes[i].ID == id) {
            // update text to what's in DOM
            notes[i].text = document.getElementById(id).textContent
            // set as not editing
            notes[i].editing = false;
            // update color
            let s = document.getElementById("select-" + id)
            notes[i].color = s.options[s.selectedIndex].value
            break;
        }
    }
    renderNotes()
}

var deleteNote = function(id) {
    for (let i in notes) {
        if (notes[i].ID == id) {
            notes.splice(i, 1)
            break;
        }
    }
    renderNotes()
}

var editNote = function (id) {
    for (let i in notes) {
        if (notes[i].ID == id) {
            notes[i].editing = true;
            break;
        }
    }
    renderNotes()
}

/**
 * generates note html
 * @param {object} note
 * @return {string} generated html
 **/
var generateNote = function(note) {
    // generate select color box
    let selectedColorName = ""
    let selectOptions = ""
    for (let i in colors) {
        colors[i] === note.color ?
            selectedColorName = i :
            selectOptions += `<option value="${colors[i]}">${i}</option>`
    }
    
    selectOptions = `<option value="${note.color}">${selectedColorName}</option>` + selectOptions
    
    return `
        <div id="box">
            <div>
                <div id="${note.ID}" contenteditable="${note.editing}" style="background-color:${note.color}">
                    ${note.text}
                </div>
            </div>
            <button onclick="deleteNote(${note.ID})">Delete</button>
            <button onclick="${note.editing ? `saveNote(${note.ID})` : `editNote(${note.ID})`}">${note.editing ? "Save" : "Edit"}</button>
            <select id="select-${note.ID}" name="select-${note.ID}" ${note.editing ? '' : 'disabled'}>
                ${selectOptions}
            </select>
        </div>
    `
}

// renders all notes onto 'buttonListRoot'
var renderNotes = function() {
    // first get el
    var root = document.getElementById("buttonListRoot")
    // check that it's defined
    if (!root)
        return console.error("Could not find root el")

    // generate each button
    let html = ""
    notes.map(n => html += generateNote(n))
    // update DOM
    root.innerHTML = html
}


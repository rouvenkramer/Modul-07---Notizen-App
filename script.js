

let notes = [];
let infos = [];
let topics = [];

let notesTrash = [];
let infosTrash = [];
let topicsTrash = [];



load()


//RENDER NOTES//
function render() {

    document.getElementById('newNoteDiv').classList.remove('d-none');
    document.getElementById('newNoteDiv').classList.add('newNote');

    let trashCount = notesTrash.length;
    document.getElementById('trashcanButton').innerText=trashCount;

    
    let content = document.getElementById('content');

    content.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {

        const allNotes = notes[i];
        const allInfos = infos[i];
        const allTopics = topics[i];
        content.innerHTML += `
        <div class="noteCard">

            <div class = "noteContainerInfoAndDeleteButton">
                <div class ="noteInfo">
                    ${allInfos} <br>
                </div>
                <div class="noteDeleteButton">
                    <button onclick="deleteNote(${i})">X</button>
                </div>
            </div>

            <div class = "noteContainerText">
                <div class="noteText">
                <h2>${allTopics}</h2><br>
                
                    ${allNotes} 
                </div>
           </div>
        </div>

        `
    }
}

//RENDER TRASH//
function renderTrash() {

    document.getElementById('newNoteDiv').classList.remove('newNote');
    document.getElementById('newNoteDiv').classList.add('d-none');

    let trashCount = notesTrash.length;
    document.getElementById('trashcanButton').innerText=trashCount;

    let content = document.getElementById('content');

    content.innerHTML = '';

    

    for (let i = 0; i < notesTrash.length; i++) {

        const allNotesTrash = notesTrash[i];
        const allInfosTrash = infosTrash[i];
        const allTopicsTrash = topicsTrash[i];
        content.innerHTML += `
        <div class="noteCard">

            <div class = "noteContainerInfoAndDeleteButton">
                <div class ="noteInfo">
                    ${allInfosTrash} <br>
                </div>
                <div class="noteDeleteButton">
                    <button onclick="deleteNoteTrash(${i})">X</button>
                </div>
            </div>

            <div class = "noteContainerText">
                <div class="noteText">
                <h2>${allTopicsTrash}</h2><br>
                
                    ${allNotesTrash} 
                </div>
           </div>
        </div>

        `
    }
}

function addNote() {

    const now = new Date();
    const dateString = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });


    let newNote = document.getElementById("noteInput");
    notes.push(newNote.value);
    infos.push(dateString + ' - ' + timeString)
    topics.push(noteTopic.value);

    newNote.value = '';
    noteTopic.value = '';

    render()
    save();
}

function deleteNote(i) {

    notesTrash.push(notes[i]);
    infosTrash.push(infos[i]);
    topicsTrash.push(topics[i]);

    notes.splice(i, 1);
    infos.splice(i, 1);
    topics.splice(i, 1);

    render();
    save();
}

function deleteNoteTrash(i) {

    alert('Die Notiz wird endgültig entfernt');

    notesTrash.splice(i, 1);
    infosTrash.splice(i, 1);
    topicsTrash.splice(i, 1);

    renderTrash();
    save();

}

function save() {

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);

    let infosAsText = JSON.stringify(infos);
    localStorage.setItem('infos', infosAsText);

    let topicsAsText = JSON.stringify(topics);
    localStorage.setItem('topics', topicsAsText);

    //Papierkorb//
    let notesTrashAsText = JSON.stringify(notesTrash);
    localStorage.setItem('notesTrash', notesTrashAsText);

    let infosTrashAsText = JSON.stringify(infosTrash);
    localStorage.setItem('infosTrash', infosTrashAsText);

    let topicsTrashAsText = JSON.stringify(topicsTrash);
    localStorage.setItem('topicsTrash', topicsTrashAsText);

}

function load() {

    let notesAsText = localStorage.getItem('notes');
    let infosAsText = localStorage.getItem('infos');
    let topicsAsText = localStorage.getItem('topics');

    //Papierkorb//
    let notesTrashAsText = localStorage.getItem('notesTrash');
    let infosTrashAsText = localStorage.getItem('infosTrash');
    let topicsTrashAsText = localStorage.getItem('topicsTrash');

    if (notesAsText && notesTrashAsText && infosAsText && infosTrashAsText && topicsAsText && topicsTrashAsText) {

        notes = JSON.parse(notesAsText);
        infos = JSON.parse(infosAsText);
        topics = JSON.parse(topicsAsText);

        notesTrash = JSON.parse(notesTrashAsText);
        infosTrash = JSON.parse(infosTrashAsText);
        topicsTrash = JSON.parse(topicsTrashAsText);

    } 
}


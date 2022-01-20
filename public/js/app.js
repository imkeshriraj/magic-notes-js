console.log('This is notes app');
showNotes()


// if user add a form to local storage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];

    } else {
        notesobj = JSON.parse(notes)
    }

    notesobj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    // console.log(notesobj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];

    } else {
        notesobj = JSON.parse(notes)
    }
    let html = "";
    notesobj.forEach(function(element, index) {
        html += `
        <div class="notecard card my-2 mx-2">

        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-success"><span id="b">Delete Note</span></button>
        </div>
    </div>`;
    });

    let notelElm = document.getElementById('notes');
    if (notesobj.length != 0) {
        notelElm.innerHTML = html;


    } else {
        notelElm.innerHTML = `<div class="alert alert-success" role="alert">
        Nothing to show! Please add note.
      </div>`
    }


}


function deleteNote(index) {
    console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];

    } else {
        notesobj = JSON.parse(notes)
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    console.log('Input event fired', inputVal);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none'
        }
        // console.log(cardTxt);

    })

})
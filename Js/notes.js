showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    localCall();                //function for to get data from local storage
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    //to access input text that is enter
    notesObj.push(myObj);                        //add text into Array object
    localStorage.setItem('notes', JSON.stringify(notesObj));     //To update local storage
    // console.log(notesObj);
    addTxt.value = "";
    addTitle.value="";
    showNotes();
});

//to display notes
function showNotes() {
    localCall();                //function for to get data from local storage
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="cardNotes card my-2 mx-2" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title">${index+1}- ${element.title}<hr>  </h5>
                    <p class="card-text font-weight-normal"> ${element.text}</p>
                    <botton id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</botton>
                </div>
            </div>`;
    });
    let noteElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `Nothing to show here "Add Notes"`;
    }
}

//Delete Notes
function deleteNote(index) {
    localCall();                //function for to get data from local storage
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}
//search 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let searchVal = search.value.toLowerCase();
    let card = document.getElementsByClassName('cardNotes');
    Array.from(card).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(searchVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log("fire");
    })
})
function localCall() {
    let notes = localStorage.getItem('notes');    //to get previous notes from localStorage
    if (notes == null) {                           //to cheack notes are empty are No?
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);            //to change string into  Array Object 
    }
}





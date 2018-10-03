// add the element to quizlist
function add_to_quizlist(quiz, place){
    let editfield = document.getElementById("edit_field");
    editfield.appendChild(quiz);
};

// creates the whole page view
function show_page(){
    let page = document.getElementById('admin_page');
    // create edit field for the quizes
    let editfield = document.createElement("div");
    editfield.id = "edit_field";
    page.appendChild(editfield);
    // create save all button
    let saveAll = document.createElement("button");
    saveAll.id = "save_all";
    saveAll.innerText="Save Quiz";
    saveAll.classList="btn btn-success";
    saveAll.onclick=storeQuiz;
    page.appendChild(saveAll);
    new_edit();
};

// load the page
window.onload = show_page();
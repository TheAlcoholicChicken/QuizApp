// add the element to quizlist
function add_to_quizlist(quiz, place){
    let editfield = document.getElementById("edit_field");
    editfield.appendChild(quiz);
};

function show_alert(msg){
    let alert_field = document.getElementById("alert_field")
    alert_field.innerHTML = msg;
    alert_field.style.display = "block"
    setTimeout(()=>{
        alert_field.innerHTML = "";
        alert_field.style.display = "none";
    }, 4000);
};

function show_num_of_quiz(){
    let qz_num = document.getElementById("qzn");
    qz_num.innerHTML = "Number of Questions: " + document.getElementsByClassName("quiz_question").length;
};

// creates the whole page view
function show_page(){
    let page = document.getElementById('admin_page');
    // create edit field for the quizes
    let editfield = document.createElement("div");
    editfield.id = "edit_field";
    page.appendChild(editfield);
    // a field that shows the number of quiz
    let qz_num = document.createElement("p");
    qz_num.id = "qzn";
    page.appendChild(qz_num);
    // create new question button
    let newQ = document.createElement("button");
    newQ.innerText="New Question";
    newQ.classList="btn btn-primary";
    newQ.onclick=new_edit;
    page.appendChild(newQ);
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
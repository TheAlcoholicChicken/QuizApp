// load question and enable edit mode
function load_questions(){
    console.log("loading questions")
};

// creates the whole page view
function show_page(){
    let page = document.getElementById('admin_page')
    let editfield = document.createElement("div")
    editfield.id = "edit_field"
    page.appendChild(editfield)
};

// load the page
window.onload = show_page()
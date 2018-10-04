// displays quizes for user without revealing the answer
function display_for_user(){
    user_qz_id = 1;
    retriveQuiz();
    document.getElementById("submit_all").onclick = check_answer;
};

// sets one question field for user
function set_one(content){
    let paper = document.getElementById("quizes_field");
    let quiz = document.createElement("div");
    quiz.classList="quiz";
    quiz.id = user_qz_id;
    user_qz_id++;
    quiz.innerHTML="<h4>Question "+quiz.id+":</h4>" + 
                    "<p class=\"quiz_question\">" + content.question + "</p>" + "<h5>Answers:</h5>";
    for(i=0;i<4;i++){
        let choice = document.createElement("p");
        let bullet = document.createElement("input");
        choice.innerHTML = content.choices[i];
        choice.classList = "choice";
        bullet.type = "radio";
        bullet.name = content.id;
        bullet.id = content.id + '_' + i;
        quiz.appendChild(bullet);
        quiz.appendChild(choice);
        quiz.appendChild(document.createElement("br"));
    }
    let marking = document.createElement("div");
    marking.id = quiz.id + '_m';
    quiz.appendChild(marking);
    paper.appendChild(quiz);
}

function show_alert(msg){
    let alert = document.getElementById("user_alert");
    alert.innerHTML = msg;
    alert.style.display = "block";
    setTimeout(()=>{
        alert.innerHTML = "";
        alert.style.display = "none";
    }, 5000);
}

window.onload = display_for_user();
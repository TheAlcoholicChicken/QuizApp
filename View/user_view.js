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
    let difficulty = '';
    if(content.difficulty){
        difficulty = "Hard";
    } else {
        difficulty = "Easy";
    }
    quiz.innerHTML="<h4>Question "+quiz.id + "</h4><div class='badge badge-secondary'>" + difficulty+"</div>" + 
                    "<p class=\"quiz_question\">" + content.question + "</p>" + "<h5>Answers:</h5>";
    for(i=0;i<4;i++){
        let choice = document.createElement("p");
        let bullet = document.createElement("input");
        let row = document.createElement("div");
        row.classList="qz_line";
        choice.innerHTML = content.choices[i];
        choice.classList = "choice_user";
        choice.id = content.id + '_' + i + 'txt';
        bullet.type = "radio";
        bullet.name = content.id;
        bullet.id = content.id + '_' + i;
        row.appendChild(bullet);
        row.appendChild(choice);
        quiz.appendChild(row);
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
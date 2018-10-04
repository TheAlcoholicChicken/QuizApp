var one_quiz={
    'question': String,
    'choices': {
        0: String,
        1: String,
        2: String,
        3: String
    },
    'answer': Number,
    'id': String
};

var file_name = "quizlist.json";

var quizes = [];

var quiz_id = 0;

var user_qz_id = 0;

function save_to_list(id){
    let quiz = document.getElementById(id);
    let question = "";
    let answer = "";
    let choices = [];
    for(i=0;i<4;i++){
        console.log(document.getElementsByName(id)[i].value);
    }
};

// returns one quiz in string to insert
function return_one_quiz(id){
    let qid = "q" + id;
    quizes.push(qid);
    let quiz = document.createElement("div");
    quiz.classList = "quiz";
    quiz.id = qid;
    quiz.innerHTML = "<h4>Question:</h4>"
    let question = document.createElement("textarea");
    question.id = qid + '_question';
    question.className="quiz_question";
    quiz.appendChild(question);
    let ans = document.createElement("h5");
    ans.innerHTML = "Answers:";
    quiz.appendChild(ans);
    for(i=1;i<5;i++){
        let choice = document.createElement("input");
        let bullet = document.createElement("input");
        choice.classList = "choice";
        bullet.type = "radio";
        choice.name=qid;
        choice.id = qid+'_'+i + '_'+ 'choice';
        bullet.name=qid;
        bullet.id = qid+'_'+i + '_'+ 'select';
        quiz.appendChild(bullet);
        quiz.appendChild(choice);
        quiz.appendChild(document.createElement("br"))
    }
    let deletebtn = document.createElement("button");
    deletebtn.innerText="Delete";
    deletebtn.classList="btn btn-danger";
    deletebtn.onclick=delete_question;
    deletebtn.id = qid + '_delete';
    quiz.appendChild(deletebtn);
    return quiz;
};
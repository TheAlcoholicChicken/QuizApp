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

var save_url = 'http://localhost:8080/save'
var dele_url = 'http://localhost:8080/delete'
var load_url = 'http://localhost:8080/load'
var drop_url = 'http://localhost:8080/drop'

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
        quiz.appendChild(document.createElement("br"));
    }
    let difficulty = document.createElement("label");
    difficulty.innerHTML = "Difficult? checked for yes: ";
    let checkbox = document.createElement("input");
    checkbox.type= "checkbox";
    difficulty.appendChild(checkbox);
    quiz.appendChild(difficulty);
    quiz.appendChild(document.createElement("br"));
    quiz.appendChild(document.createElement("br"));
    let deletebtn = document.createElement("button");
    deletebtn.innerText="Delete";
    deletebtn.classList="btn btn-danger";
    deletebtn.onclick=delete_question;
    deletebtn.id = qid + '_delete';
    quiz.appendChild(deletebtn);
    return quiz;
};

function remove_question(id){
    // remove certain question from quiz id list
    quizes.splice(quizes.indexOf(id), 1);
    document.getElementById(id).remove();
    qid = id.split('q')[1]
    console.log(qid);
    $.post(dele_url, {"id":(qid-1)}, ()=>{});
};

// store all quizes in the editing field
function storeQuiz(){
    // localStorage.clear();
    $.post(drop_url, {}, (err, res)=>{
        if(err) throw err;
    });
    for(let i in quizes){
        let quizhtml = document.getElementById(quizes[i]).childNodes;
        let quiz = {
            question: quizhtml[1].value,
            choices: {
                0: quizhtml[4].value,
                1: quizhtml[7].value,
                2: quizhtml[10].value,
                3: quizhtml[13].value
            },
            difficulty: quizhtml[15].lastChild.checked,
            answer: 0,
            id: i
        };
        console.log(quizhtml)
        if (quizhtml[6].checked){
            quiz.answer = 1;
        } else if (quizhtml[9].checked){
            quiz.answer = 2;
        } else if (quizhtml[12].checked){
            quiz.answer = 3;
        } else if (!quizhtml[3].checked){
            show_alert("No answer selected!");
            return;
        }
        if (quiz.question=="" || quiz.choices[0] == "" ||
            quiz.choices[1] == ""|| quiz.choices[2] == "" ||
            quiz.choices[3] == ""){
                show_alert("Empty Field!");
                return;
        }
        // localStorage.setItem(i, JSON.stringify(quiz));
        $.post(save_url, quiz, (err, msg)=>{
            if (err) throw err;
        });
    }
    console.log("saving quiz list");
};

function get_all_quizes(){
    $.post(load_url, {'foo':'bar'}).done((data)=>{
        console.log(data);
    });
};
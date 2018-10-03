var one_quiz={
    'question': String,
    'choices': {
        0: String,
        1: String,
        2: String,
        3: String
    },
    'answer': Number,
    'id': Number
};

var file_name = "quizlist.json";

var quizes = {};

// returns one quiz in string to insert
function return_one_quiz(id, question, answers){
    let quiz = document.createElement("div")
    quiz.classList = "quiz";
    quiz.innerHTML = "<input class=\"quiz_question\">";
    return quiz;
};
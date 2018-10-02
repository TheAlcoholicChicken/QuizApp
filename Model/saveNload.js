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

var quizes = {}

// returns one quiz in string to insert
function return_one_quiz(id, question, answers){
    let quiz = "<div class=\"quiz\"></div>"
    let question_html = "<div id=\"" + id + "\">" + question + "</div>";
    
    return quiz;
};
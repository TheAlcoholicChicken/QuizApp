// load all quizes for user to take
function retriveQuiz(){
    if (localStorage.length ==0){
        show_alert("No Quiz Available!");
    }
    for(let i=0;i<localStorage.length;i++){
        let quiz = JSON.parse(localStorage.getItem(i));
        set_one(quiz);
        console.log(quiz);
    }
};

// checks if the answers are correct
function check_answer(){
    console.log("checking answers");
    for(let i=0;i<localStorage.length;i++){
        let answer = JSON.parse(localStorage.getItem(i)).answer;
        // i is the question number, answer is the right answers choice number
        let correct = document.getElementById(i + '_' + answer);
        console.log(correct);
        console.log(i + '_' + answer);
    }
};
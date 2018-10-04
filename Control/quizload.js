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
    let score = 0;
    for(let i=0;i<localStorage.length;i++){
        let answer = JSON.parse(localStorage.getItem(i)).answer;
        // i is the question number, answer is the right answers choice number
        let correct = document.getElementById(i + '_' + answer);
        let result = document.getElementById((i+1) + '_m');
        if(!correct.checked){
            result.innerHTML = "wrong, correct answer highlighted in green";
            result.style.color = "red";
            let right_txt = document.getElementById(i + '_' + answer+'txt')
            right_txt.style.color = "green";
            right_txt.style.fontWeight = "bold";
        } else {
            result.innerHTML = "Correct!";
            result.style.color = "green";
            score++;
        }
    }
    let total = document.getElementById("mark");
    total.innerHTML = "Your Mark: " + score + "/" + localStorage.length;
    total.style.display = "block";
};
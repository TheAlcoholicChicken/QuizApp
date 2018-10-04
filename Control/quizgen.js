function id_gen(){
    quiz_id++;
    return quiz_id;
};

// creates a field to input quizes
function new_edit(){
    console.log("creating new edit field")
    let quiz = return_one_quiz(id_gen());
    add_to_quizlist(quiz);
    show_num_of_quiz();
};

function remove_question(id){
    // remove certain question from quiz id list
    quizes.splice(quizes.indexOf(id), 1);
    document.getElementById(id).remove();
};

// delete one quiz from var and view
function delete_question(){
    let question = this.id.split('_')[0];
    console.log("one deleted: " + question);
    remove_question(question);
    show_num_of_quiz();
};

// store all quizes in the editing field
function storeQuiz(){
    localStorage.clear();
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
            answer: 0,
            id: i
        };
        if (quizhtml[6].checked){
            quiz.anwswer = 1;
        } else if (quizhtml[9].checked){
            quiz.anwswer = 2;
        } else if (quizhtml[12].checked){
            quiz.anwswer = 3;
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
        localStorage.setItem(i, JSON.stringify(quiz));
    }
    console.log("saving quiz list");
};
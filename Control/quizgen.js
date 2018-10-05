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


// delete one quiz from var and view
function delete_question(){
    let question = this.id.split('_')[0];
    console.log("one deleted: " + question);
    remove_question(question);
    show_num_of_quiz();
};


// state
var state = {
    questions:
    [{ question: "What is the capital of Australia?", answer: ["Kabul", "Lisbon", "Canberra", "Seoul"], correct: 2 },
    { question: "What is the capital of Brazil?", answer: ["Damascus", "San Jose", "Havana", "Brasilia"], correct: 3 },
    { question: "What is the capital of Morocco?", answer: ["Rabat", "Bucharest", "Manila", "Lima"], correct: 0 },
    { question: "What is the capital of Peru?", answer: ["Berlin", "Beirut", "Lima", "Vientiane"], correct: 2 },
    { question: "What is the capital of Costa Rica?", answer: ["Baku", "San Jose", "Havana", "Taipei"], correct: 1 },
    { question: "What is the capital of Romania?", answer: ["Bucharest", "Warsaw", "Kiev", "Rabat"], correct: 0 },
    { question: "What is the capital of Syria?", answer: ["Damascus", "Jakarta", "Beirut", "Canberra"], correct: 0 },
    { question: "What is the capital of Indonesia?", answer: ["Taipei", "Havana", "Manila", "Jakarta"], correct: 3 },
    { question: "What is the capital of Ukraine?", answer: ["Berlin", "Bucharest", "Kiev", "Warsaw"], correct: 2 },
    { question: "What is the capital of Laos?", answer: ["Seoul", "Vientiane", "Jakarta", "Lisbon"], correct: 1 },],
    currentQuestion: null,
    correctCount: 0,
    incorrectCount: 0,
    selectCorrect: null,
    userSelection: null
}

// html templates
var template1 =
    '<div><input type="radio" name="answers" class="radioInput" value="" id="" />' +
    '<label for="" class="radioLabel">';
var template2 =
    '</label></div>';

// start quiz / next question
// function start() {
//     state.currentQuestion = 0;
//     console.log(state.currentQuestion);
// }

// function next() {
//     if (state.currentQuestion < 10) {
//         state.currentQuestion++;
//         console.log(state.currentQuestion);
//     }
//     else {
//         state.currentQuestion = 0;
//         console.log(state.currentQuestion);
//     }

// }

function play() {
    if (state.currentQuestion === null) {
        state.currentQuestion = 0;
        state.correctAnswer = null;
        console.log('current question index', state.currentQuestion);
        // start();
    }
    else if (state.currentQuestion < 10) {

        if (state.correctAnswer === null) {
            checkAnswer();
        }
        else {
            state.currentQuestion++;
            state.correctAnswer = null;
        }

        console.log('current question index', state.currentQuestion);
    }
    else {
        state.currentQuestion = 0;
        state.correctCount = 0;
        state.incorrectCount = 0;
        console.log('current question index', state.currentQuestion);
    }
    // else {
    //     next();
    // }
    render(state, $('.answers'));
}

// check answer
// TODO: either match against indexes or update value attribute and match strings
function checkAnswer() {
    state.radioButtonChecked = $('.radioInput:checked').val();
    state.correctAnswerIndex = state.questions[state.currentQuestion].correct;
    state.correctAnswer = state.questions[state.currentQuestion].answer[state.correctAnswerIndex];

    if (state.radioButtonChecked === state.correctAnswer) {
        // if (parseInt(state.radioButtonChecked) === state.correctAnswerIndex) {
        console.log("correct");
        state.correctCount++;
        state.selectCorrect = true;
    }
    else {
        console.log("wrong");
        state.incorrectCount++;
        state.selectCorrect = false;
        state.userSelection = state.radioButtonChecked;
    }
    console.log("correct answer index", state.correctAnswerIndex)
    console.log("radio check value", state.radioButtonChecked);
    console.log("correct answer is", state.correctAnswer);
}


// render page
function render(state, element) {
    // fill in quiz question

    if (state.currentQuestion === null) {
        $('.submitBtn').html('start');
    }
    else if (state.currentQuestion < 10) {
        // $('.question').show();
        $('.submitBtn').html('check');
        $('.answers').show();
        $('.player-info').show();
        $('.display-answer').hide();
        var quizQuestion = state.questions[state.currentQuestion].question;
        $('.question').show().html(quizQuestion);
        var htmlTemplate = state.questions[state.currentQuestion].answer.map(function (item, index) {
            var html = $(template1 + item + template2);

            html.find('input').attr('value', item);
            html.find('input').attr('id', index);
            html.find('label').attr('for', index);

            return html;
        })
        element.html(htmlTemplate);

        if (state.correctAnswer) {
            $('.submitBtn').html('next');
            $('.display-answer').show();
            let correctInput = $('input')[state.correctAnswerIndex];
            $(correctInput).siblings('label').addClass('correct');

            if (state.selectCorrect === false) {
                let incorrectInput = $('input')[state.questions[state.currentQuestion].answer.indexOf(state.userSelection)];
                $(incorrectInput).siblings('label').addClass('incorrect');
                // $(incorrectInput).siblings('label');
            }

            $('input').attr('disabled', true);
            $('.display-answer').html('the correct answer is: ' + state.correctAnswer);
        }

        console.log(quizQuestion);

    }
    else {
        $('.question').hide();
        $('.answers').hide();
        $('.display-answer').show().html('you got ' + state.correctCount + ' out of 10');
        $('.player-info').hide();
        $('.submitBtn').html('restart');
    }

    $('.current-question').html(state.currentQuestion + 1)
    $('.correct-score').html(state.correctCount);
    $('.incorrect-score').html(state.incorrectCount);
}

// listen
$('#quiz-form').submit(function (event) {
    event.preventDefault();
    // render(state, $('.answers'));
    play();
})
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
    currentQuestion: 0,
    correct: 0,
    incorrect: 0
}

// html template
var template1 =
    '<input type="radio" name="answers" id=""></input>' +
    '<label for="" class="a1">';
var template2 =
    '</label><br />';


// check answer
function checkAnswer() {

}

// start quiz / next question
function start() {
    state.currentQuestion += 1;
    $('.current-question').html(state.currentQuestion);
    $('.nextBtn').attr('disabled', false);
}

function next() {
    if ((state.currentQuestion >= 1) && (state.currentQuestion < 9)) {
        state.currentQuestion += 1;
        $('.current-question').html(state.currentQuestion);
        console.log(state.currentQuestion);
    }
    else {
        state.currentQuestion += 1;
        $('.current-question').html(state.currentQuestion);
        $('.nextBtn').addClass('hide-button');
        console.log("1010");
    }
}

function play() {
    if (state.currentQuestion === 0) {
        start();
    }
    else {
        next();
    }
}


// play again
function restart() {

}


// render
function render(state, element) {
    var quizQuestion = state.questions[state.currentQuestion].question;

    $('.question').html(quizQuestion);
    var htmlTemplate = state.questions[state.currentQuestion].answer.map(function (item) {
        var html = $(template1 + item + template2);

        return html;
    })
    $('.submitBtn').html('submit');

    $('.correct-score').html(state.correct);
    $('.incorrect-score').html(state.incorrect);
    play();

    element.html(htmlTemplate);
}



// listen
$('#quiz-form').submit(function (event) {
    event.preventDefault();
    render(state, $('.answers'));
})
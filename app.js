
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
// note: I had to wrap the input and label in a div in order to select them via jQuery; I tried
// many different methods for selecting the input and label but wasn't able to. Then my Thinkful mentor
// suggested wrapping it in a div and explained that the jQuery selector was attempting to find
// a child, but the input and label were not children, until wrapped in a div
// the app started working as soon as I made that change
var template1 =
    '<div><input type="radio" name="answers" class="radioInput" value="" id="" />' +
    '<label for="" class="radioLabel">';
var template2 =
    '</label></div>';

// start quiz
// this section starts the quiz, and if the quiz is on questions 1-10 it checks the answers
// before rendering the page
function play() {
    if (state.currentQuestion === null) {
        state.currentQuestion = 0;
        state.correctAnswer = null;
        console.log('current question index', state.currentQuestion);
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

    render(state, $('.answers'));
}

// check answer
// some new state keys are created here, for working with the user's answer
function checkAnswer() {
    state.radioButtonChecked = $('.radioInput:checked').val();
    state.correctAnswerIndex = state.questions[state.currentQuestion].correct;
    state.correctAnswer = state.questions[state.currentQuestion].answer[state.correctAnswerIndex];

    if (state.radioButtonChecked === state.correctAnswer) {
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

    console.log("state.radioButtonChecked", state.radioButtonChecked);
    // Note: the similar console log below would result in a string, but above, by adding the comma the
    // results are text and a number. If concatenated using the + sign it converts the whole thing to a string.
    // console.log("state.radioButtonChecked" + state.radioButtonChecked);
    console.log("state.correctAnswerIndex", state.correctAnswerIndex)
    console.log("state.correctAnswer", state.correctAnswer);
}

// render page
// this section renders the page to display the quiz question, the answer 
// options, and the user's score.
// When checking the user's answer, the page will render to display the
// the correct asnwer and highlight the user's answer in red if it was incorrect
function render(state, element) {

    if (state.currentQuestion === null) {
        // quiz start screen
        $('.submitBtn').html('start');
    }

    else if (state.currentQuestion < 10) {
        // rendering quiz for questions 1-10
        $('.submitBtn').html('check');
        $('.answers').show();
        $('.player-info').show();
        $('.display-answer').hide();
        // fill in quiz question
        var quizQuestion = state.questions[state.currentQuestion].question;
        $('.question').show().html(quizQuestion);
        console.log(quizQuestion);
        // build html to show the radio button options
        var htmlTemplate = state.questions[state.currentQuestion].answer.map(function (item, index) {
            var html = $(template1 + item + template2);
            // setting the input and label attributes so the label is clickable and the input
            // value takes on the item that was passed through via the map function
            html.find('input').attr('value', item);
            html.find('input').attr('id', index);
            html.find('label').attr('for', index);

            return html;
        })

        // rendering the page here
        // this was at the bottom of the entire render function, but it was over-writing some
        // of the elements which caused the jQuery selectors to fail
        element.html(htmlTemplate);

        if (state.correctAnswer) {
            // highlighting the correct answer in green via .correct css class
            $('.submitBtn').html('next');
            $('.display-answer').show();
            let correctInput = $('input')[state.correctAnswerIndex];
            $(correctInput).siblings('label').addClass('correct');

            if (state.selectCorrect === false) {
                // highlighting the user's choice, if it was incorrect, in pink via the .incorrect css class
                let incorrectInput = $('input')[state.questions[state.currentQuestion].answer.indexOf(state.userSelection)];
                $(incorrectInput).siblings('label').addClass('incorrect');
            }

            // disabling the radios while the app displays the answers
            $('input').attr('disabled', true);
            $('.display-answer').html('the correct answer is: ' + state.correctAnswer);
        }
    }

    else {
        // quiz is over; hiding playable parts to the quiz; displaying final score
        $('.question').hide();
        $('.answers').hide();
        $('.display-answer').show().html('you got ' + state.correctCount + ' correct out of 10');
        $('.player-info').hide();
        $('.submitBtn').html('restart');
    }

    // displaying on-going question number and user score
    $('.current-question').html(state.currentQuestion + 1)
    $('.correct-score').html(state.correctCount);
    $('.incorrect-score').html(state.incorrectCount);
}

// listen for submit button
$('#quiz-form').submit(function (event) {
    event.preventDefault();
    play();
})
let questions = [{
        'questions': 'Wie ist das Grundgerüst einer HTML Datei?',
        'answer_1': '&ltHTML&gt &ltHEAD&gt &ltBODY&gt &lt/BODY&gt &lt/HEAD&gt &lt/HTML&gt', // könnte auch <pre> text </pre> noch hinschreiben
        'answer_2': '&ltHTML&gt &lt/HTML&gt ',
        'answer_3': 'gibt kein Grundgerüst',
        'answer_4': '&ltHTML&gt &ltHEAD&gt &lt/HEAD&gt &ltBODY&gt &lt/BODY&gt &lt/HTML&gt',
        'right_answer': 4
    },
    {
        'questions': 'Gibt es ein Zeichenlimit für HTML Dateien?',
        'answer_1': 'ja 150.000 Zeichen',
        'answer_2': 'Nein',
        'answer_3': 'Nein, wenn JavaScript miteingebunden ist',
        'answer_4': 'Nein, wenn man alles in eine große Div packt',
        'right_answer': 2
    },
    {
        'questions': 'Wie kann man seine HTML-Datei stylen?',
        'answer_1': 'CSS',
        'answer_2': 'JavaScript',
        'answer_3': 'JSONs',
        'answer_4': 'gar nicht',
        'right_answer': 1
    },
    {
        'questions': 'Wie kann man Elemente in einer Div zentrieren?',
        'answer_1': 'mit !center',
        'answer_2': 'mit einer funktion in JS',
        'answer_3': 'auf dem Stuhl im Kreis drehen',
        'answer_4': 'mit display: flex, Justify-content: center, align-items: center',
        'right_answer': 4
    },
    {
        'questions': 'Wie bindet man eine style.css Datei in eine HTML Datei ein?',
        'answer_1': 'mit &ltlink rel="stylesheet" href="style.css"&gt im body bereich',
        'answer_2': 'geht nur mit pHp',
        'answer_3': 'mit &ltlink rel="stylesheet" href="style.css"&gt im head bereich',
        'answer_4': 'mit !important',
        'right_answer': 3
    },
];


let rightQuestions = 0
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sounds/win.mp3');
let AUDIO_FAIL = new Audio('sounds/loose.mp3');
let AUDIO_END = new Audio('sounds/quizend.mp3');


function init() {
    showQuestion();
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('all-questions').innerHTML = questions.length; // Anzahl der Fragen die beantwortet werden sollen mit der länge des JSONs angegeben
}


function showQuestion() {

    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressbar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndscreen() {
    // show endscreen
    document.getElementById('endscreen').style = '';
    document.getElementById('question-body').style = 'display: none';
    AUDIO_END.play();

    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
}


function updateToNextQuestion() {
    // show question
    let question = questions[currentQuestion];
    //statt bei init und bei next question könnte man die zahl unten auch mit einer Zeile weiterschalten lassen und zwar hier mit: documen.getElementById('current-question').innerHTML = currentQuestion +1
    document.getElementById('questiontext').innerHTML = question['questions'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function updateProgressbar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = ` ${percent} %`;
    document.getElementById('progress-bar').style = ` width: ${percent}%;`;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1); // selection = "answer_3".slice(-1)

    let idOfRightAnswer = `answer_${question['right_answer']}`; // damit gibt man in abhängigkeit der Frage an welche Antwort richtig ist (wichtig welche Antwort dann grün werden muss in der else abfrage)

    if (rightAnswerSelcted(selectedQuestionNumber)) { // richtige Frage beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success'); // warum ist hier (selection)? --> selection ist die Variable für die in der HTML datei stehenden komponenten (zb. bei der ersten Antwort function answer('answer_1'))
        AUDIO_SUCCESS.play();
        rightQuestions++; // immer wenn eine Frage richtig beantwortet wurde, wird der Variable immer +1 gegeben und somit im Endscreen angezeigt.
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // .parentNode gibt die classList auf das übergeordnete Element weiter. In dem Fall die Div mit der onclick answer() funktion
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('nex-button').disabled = false; // button wird wieder enabled wenn man auf ne antwort klickt
}


function rightAnswerSelcted(selectedQuestionNumber) { // man könnte die selectedQuestionNumber auch mit anderen Variablen hier ersetzen zb. beide mit nr
    return selectedQuestionNumber == questions[currentQuestion]['right_answer']; //question wurde hier mit questions[currentQuestion] ausgetauscht weil question nur in der Funktion answers(election) definiert wurde. 
}


function nextQuestion() {
    currentQuestion++; // damit currentQuestion nicht mehr 0 ist sondern 1, 2, 3...
    document.getElementById('nex-button').disabled = true;
    resetAnswerButtons();
    document.getElementById('current-question').innerHTML = currentQuestion + 1 // Frage wird unten links von 1 auf 2, 3, 4, 5 weiter gestellt
    showQuestion();

}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    document.getElementById('endscreen').style = 'display: none'; // endscreen ausblenden
    document.getElementById('question-body').style = ''; // questionBody einblenden
    rightQuestions = 0; // globale Variablen wieder auf 0 zurücksetzen
    currentQuestion = 0;
    init();
}
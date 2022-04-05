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


let currentQuestion = 0;


function init() {
    showQuestion();
    document.getElementById('all-questions').innerHTML = questions.length; // Anzahl der Fragen die beantwortet werden sollen mit der länge des JSONs angegeben
}


function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('questiontext').innerHTML = question['questions'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1); // selection = "answer_3".slice(-1)

    let idOfRightAnswer = `answer_${question['right_answer']}`; // damit gibt man in abhängigkeit der Frage an welche Antwort richtig ist (wichtig welche Antwort dann grün werden muss in der else abfrage)

    if (selectedQuestionNumber == question['right_answer']) {
        console.log('Richtige Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-success'); // warum ist hier (selection)? --> selection ist die Variable für die in der HTML datei stehenden komponenten (zb. bei der ersten Antwort function answer('answer_1'))
    } else {
        console.log('Falsche Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // .parentNode gibt die classList auf das übergeordnete Element weiter. In dem Fall die Div mit der onclick answer() funktion
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('nex-button').disabled = false; // button wird wieder enabled wenn man auf ne antwort klickt
}
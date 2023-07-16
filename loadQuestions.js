// We get the quiz variable from the sessionStorage.
let quiz = sessionStorage.getItem("quiz");

// We use the quiz variable to change the heading of the page. If it says ./ccna.json it'll be CCNA, else it is Security+.
const heading = document.querySelector("#exam-type");
if(quiz === "./ccna.json") {
    heading.textContent = "CCNA";
} else if(quiz === "./secplus.json") {
    heading.textContent = "Security+";
} else {
    heading.textContent = "Hallucinations";
}

// Dynamic import of the JSON file using session variables.
let filePath = quiz;

let quizImport = await import(filePath, {
  assert: { type: "json" },
});
const questions = quizImport.default 

// We get a reference to the form element.
const form = document.querySelector('form');
// We keep the state to 0 in the beginning. Once the form has been submitted we'll change the state to 1. The submit button will then reload the page, hence reset the state to 0.
let state = 0;

form.addEventListener('submit', (event) => {
    console.log(state);
    event.preventDefault();
    if(state === 1) {
        location.reload();
    } else {
        state = 1;
        // We assign a score of 0 to the user in the beginning.
        let score = 0;
        // We create an array to store the answers.
        let answers = [];

        // We loop through the questions to get the checked radio buttons.
        questions.questions.forEach((question, index) => {
            // We get the value of the checked radio button.
            const answer = document.querySelector(`input[name="${index}"]:checked`).value;
            console.log(answer);

            // We push the answer to the answers array.
            answers.push(answer);
            
            // We check if the answer is correct.
            if (answer === question.correct_answer) {
                score++;
            }
            else {
                // Create text with the explanation when you answer incorrectly.
                let answerTextEl = document.createElement('p');
                let answerText = question.explanation;
                // We add a class of .incorrect to the element we created for the answer text.
                answerTextEl.classList.add('incorrect');
                answerTextEl.textContent = `${question.correct_answer} - ${answerText}`;
                const questionEl = document.querySelector(`div.question:nth-child(${index + 1})`);
                questionEl.appendChild(answerTextEl);
            }

            // Change score on submit.
            let scoreEl = document.querySelector('.score');
            scoreEl.textContent = `You scored ${(score/answers.length * 100).toFixed(2)}%`;
            
            // Change submit button text to say reset.
            submit.value = "Reset";
        });
    }

});

// Create a submit button.
const submit = document.createElement('input');
submit.setAttribute('type', 'submit');
submit.classList.add('submit-button');

// Create all the questions that goes into the form.
questions.questions.forEach((question, index) => {
    console.log(question)
    const questionShown = form.innerHTML += `<div class="question"><p>${question.question}</p><div class="option"><input type="radio" name="${index}" value="A" checked="checked"><label>${question.option_a}</label></div><div class="option"><input type="radio" name="${index}" value="B"><label>${question.option_b}</label></div><div class="option"><input type="radio" name="${index}" value="C"><label>${question.option_c}</label></div><div class="option"><input type="radio" name="${index}" value="D"><label>${question.option_d}</label></div></div>`;
});

form.appendChild(submit);
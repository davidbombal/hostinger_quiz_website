// We get the quiz variable from the sessionStorage.
let quiz = sessionStorage.getItem("quiz");

// We use the quiz variable to change the heading of the page. If it says ./ccna.json it'll be CCNA, else it is Security+.
const heading = document.querySelector("#exam-type");
if (quiz === "./ccna.json") {
  heading.textContent = "CCNA";
} else if(quiz === "./ccna_bard.json") {
  heading.textContent = "CCNA Bard";
} else if(quiz === "./secplus.json") {
  heading.textContent = "Security+";
} else if(quiz === "./hallucinations.json") {
  heading.textContent = "Hallucinations";
}

// Dynamic import of the JSON file using session variables.
let filePath = quiz;

async function fetchQuestions(filePath) {
  const response = await fetch(filePath);
  const questions = await response.json();
  return questions;
}

const form = document.querySelector("form");
let state = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const questions = await fetchQuestions(filePath);

  if (state === 1) {
    location.reload();
  } else {
    state = 1;
    let score = 0;
    let answers = [];

    questions.questions.forEach((question, index) => {
      const answer = document.querySelector(`input[name="${index}"]:checked`).value;

      answers.push(answer);

      if (answer === question.correct_answer) {
        score++;
      } else {
        let answerTextEl = document.createElement("p");
        let answerText = question.explanation;
        answerTextEl.classList.add("incorrect");
        answerTextEl.textContent = `${question.correct_answer} - ${answerText}`;
        const questionEl = document.querySelector(`div.question:nth-child(${index + 1})`);
        questionEl.appendChild(answerTextEl);
      }

      let scoreEl = document.querySelector(".score");
      scoreEl.textContent = `You scored ${(score / answers.length * 100).toFixed(2)}%`;

      submit.value = "Reset";
    });
  }
});

const submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.classList.add("submit-button");

(async function createQuestions() {
  const questions = await fetchQuestions(filePath);

  questions.questions.forEach((question, index) => {
    form.innerHTML += `<div class="question"><p>${question.question}</p><div class="option"><input type="radio" name="${index}" value="A" checked="checked"><label>${question.option_a}</label></div><div class="option"><input type="radio" name="${index}" value="B"><label>${question.option_b}</label></div><div class="option"><input type="radio" name="${index}" value="C"><label>${question.option_c}</label></div><div class="option"><input type="radio" name="${index}" value="D"><label>${question.option_d}</label></div></div>`;
  });

  form.appendChild(submit);
})();

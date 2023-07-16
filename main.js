// We get references to the buttons on the page.

const ccnaBtn = document.querySelector("#ccna");
const ccnaBardBtn = document.querySelector("#ccnabard");
const secPlusBtn = document.querySelector("#secplus");
const hallucBtn = document.querySelector("#halluci");

// We add event listeners to the buttons.
// Depending on the button clicked we create a session variable called quiz and set it to the JSON file we want to load in hte quiz.html. The sessions variable allows us to share
// data between pages. We then redirect the user to the quiz.html page.

ccnaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("quiz", "./ccna.json");
    location.href="quiz.html";
});

ccnaBardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("quiz", "./ccna_bard.json");
    location.href="quiz.html";
});


secPlusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("quiz", "./secplus.json");
    location.href="quiz.html";
});

hallucBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("quiz", "./hallucinations.json");
    location.href="quiz.html";
});
// Get Real quote and Real Author
let author = "";
let quote = "";

let choiceCount = 0; // keep count of how many choices it took the user to get the right answer

let authors = []; // hold the 3 authors in array to make sure they do not repeat

// One of three choices must be the real realPosition. Determine the realPosition.
var realPosition = Math.floor(Math.random() * 3) + 1;     // returns a random integer from 0 to 9 


setup();

function setup() {

  console.log("begin setup");



  setupReal(realPosition);

  if (realPosition == 1) {
    // Real realPosition is in 1

    //set up fake for 2 and 3
    setupFake(2);
    setupFake(3);

  }
  else if (realPosition == 2) {
    // Real realPosition is in 2
    setupFake(1);
    setupFake(3);
  }
  else {
    // Real realPosition is in 3
    setupFake(1);
    setupFake(2);

  }

  const main = document.querySelector("main");
  // Remove white out
  setTimeout(() => {
    main.classList.remove('fade');
  }, 500);


}

function setupFake(realPosition) {
  console.log(realPosition);
  // Need to get two fake authors
  const mainQuote = document.querySelector(".main-quote");
  const authorLabel = document.querySelector(".author-label-" + realPosition);

  // Location for our request...
  axios.get("https://quote-garden.herokuapp.com/api/v2/quotes/random") // Type of request is GET.
    // Handle response...
    .then(response => {
      console.log(response);

      quote = response.data.quote.quoteText;
      author = response.data.quote.quoteAuthor;

      if (author.length == 0) {
        author = " Anonymous";
      }


      authorLabel.textContent = author;


    })
}


function setupReal(realPosition) {

  const authorLabel = document.querySelector(".author-label-" + realPosition);

  // Location for our request...
  axios.get("https://quote-garden.herokuapp.com/api/v2/quotes/random") // Type of request is GET.
    // Handle response...
    .then(response => {
      // Test test test! Are we getting anything?
      console.log(response); // Yep! Looks like our info we want is in response.data
      // Let's grab that space station's realPosition details!

      quote = response.data.quote.quoteText;
      author = response.data.quote.quoteAuthor;

      const mainQuote = document.querySelector(".main-quote");
      const author1 = document.querySelector(".author-label-1");
      const author2 = document.querySelector(".author-label-2");
      const author3 = document.querySelector(".author-label-3");

      mainQuote.textContent = quote;


      if (author.length == 0) {
        author = " Anonymous";
      }

      authorLabel.textContent = author;


    })
}

// Add event listener to Again button
const button = document.querySelector(".button");
button.addEventListener("click", againClick);

function againClick() {

  const main = document.querySelector("main");
  main.classList.add('fade');
  setTimeout(() => {
    window.location.reload();

  }, 1000);
}

// Add event listeners to author choices

const author1 = document.querySelector(".author-li-1");
const author2 = document.querySelector(".author-li-2");
const author3 = document.querySelector(".author-li-3");

author1.addEventListener("click", author1Click);
author2.addEventListener("click", author2Click);
author3.addEventListener("click", author3Click);

function author1Click() {
  checkUserAnswer(1);
}

function author2Click() {
  checkUserAnswer(2);
}


function author3Click() {
  checkUserAnswer(3);
}

function checkUserAnswer(userPosition) {
  const choice = document.querySelector(".author-label-" + userPosition)

  if (userPosition === realPosition) {
    choice.classList.add("picked-correct");
    choice.parentNode.classList.add("picked-correct-li");


    // Show again button
    const button = document.querySelector(".button");

    setTimeout(() => {
      button.classList.remove("hide");

    }, 1000);
  }
  else {
    choice.classList.add("picked-wrong");
  }

}
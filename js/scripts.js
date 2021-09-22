// Get Real quote and Real Author
let author = "";
let quote = "";
let genre = "";

let quotesReady = 0; // we need 3 quotes to be ready to remove scnreen white-out

let authors = []; // hold the 3 authors in array to make sure they do not repeat

// One of three choices must be the real realPosition. Determine the realPosition.
var realPosition = Math.floor(Math.random() * 3) + 1;     // returns a random integer from 0 to 9 

setup();

function setup() {

  setupReal(realPosition);

  if (realPosition == 1) {
    // Real realPosition is in 1

    // Set up fake for 2 and 3
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
}

function setupFakeTimed(position) {
  setTimeout(() => {
    setupFake(position);
  }, 500);
}

function setupFake(position) {

  // Results do not seem random if received too quickly, provide a sleep 
  // Sleep to help with random

  // Need to get two fake authors
  const mainQuote = document.querySelector(".main-quote");
  const authorLabel = document.querySelector(".author-label-" + position);

  // Location for our request...
  axios.get("https://quote-garden.herokuapp.com/api/v3/quotes/random") // Type of request is GET.
    // Handle response...
    .then(response => {
      console.log(response);

      quote = response.data.quote.quoteText;
      author = response.data.quote.quoteAuthor;

      // Process Data received from the user API before outputting to the user
      if (author.length == 0) {
        author = " Anonymous";
      }

      let match = false;
      for (previousAuthor of authors) {
        if (author == previousAuthor) {
          match = true;
        }
      }

      // Process Data received from the user API before outputting to the user
      // If this GET is giving us a duplicate author, re-run this function
      if (match) {
        setupFake(position);
      }
      else {
        // Author is unique
        authorLabel.textContent = author;
        authors.push(author);
        console.log(`push: ${author}`);
        quoteReady();
      }
    })
}

function uniqueAuthors() {
  return ((authors[0] != authors[1]) && (authors[1] != authors[2]) && (authors[0] != authors[2]));
}

// If we have 3 ready quotes, remove the white out
function quoteReady() {

  quotesReady++;
  if (quotesReady > 2) {

    // Make sure all authors are unique, or setup the authors again
    if (uniqueAuthors()) {
      const main = document.querySelector("main");
      main.classList.remove('fade');
    }
    else {
      quotesReady = 0;
      authors = [];
      setup();
    }
  }
}

function setupReal(realPosition) {

  const authorLabel = document.querySelector(".author-label-" + realPosition);

  // Location for our request...
  axios.get("https://quote-garden.herokuapp.com/api/v3/quotes/random") // Type of request is GET.
    // Handle response...
    .then(response => {

      console.log(response);

      quote = response.data.quote.quoteText;
      author = response.data.quote.quoteAuthor;
      genre = response.data.quote.quoteGenre;
      const mainQuote = document.querySelector(".main-quote");
      const author1 = document.querySelector(".author-label-1");
      const author2 = document.querySelector(".author-label-2");
      const author3 = document.querySelector(".author-label-3");

      mainQuote.textContent = quote;

      // Process Data received from the user API before outputting to the user
      if (author.length == 0) {
        author = " Anonymous";
      }

      authorLabel.textContent = author;
      authors.push(author);
      console.log(`push: ${author}`);

      quoteReady();

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

/**
 * Function will determine if the user's selection was the correct answer
 * @param {*} userPosition 
 */
function checkUserAnswer(userPosition) {
  const choice = document.querySelector(".author-label-" + userPosition)

  if (userPosition === realPosition) {
    choice.classList.add("picked-correct");
    choice.parentNode.classList.add("picked-correct-li");

    // Show again button
    const button = document.querySelector(".button");

    setTimeout(() => {
      button.classList.remove("hide");
      button.scrollIntoView();

    }, 1000);
  }
  else {
    choice.classList.add("picked-wrong");
  }

}

// easter egg
// spinning cat in footer
const footerImage = document.querySelector(".footer-image");
footerImage.addEventListener("click", function () {
  this.classList.add("rotate");
  setTimeout(() => {
    this.classList.remove("rotate");

  }, 1500);
});

// Add hint
const hint = document.querySelector(".hint");
hint.addEventListener("click", function () {

  this.innerText = `genre: ${genre}`;
});

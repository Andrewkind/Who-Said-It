/**
 * AJAX Examples
 */


/**
 * Axios AJAX Library Example
 */
// @link https://github.com/axios/axios
// axios; // If we don't get an error on this line, Axios is installed and working!

// Location for our request...
axios.get("https://quote-garden.herokuapp.com/api/v2/quotes/random") // Type of request is GET.
  // Handle response...
  .then(response => {
    // Test test test! Are we getting anything?
    console.log(response); // Yep! Looks like our info we want is in response.data
    // Let's grab that space station's position details!

    const quoteText = response.data.quote.quoteText;
    const quoteAuthor = response.data.quote.quoteAuthor;

    console.log(typeof(quoteText));
    console.log(quoteText);

    const mainQuote = document.querySelector(".main-quote");
    const author1 = document.querySelector(".author-label-1");
    const author2 = document.querySelector(".author-label-2");
    const author3 = document.querySelector(".author-label-3");

    mainQuote.textContent = quoteText;

    author1.textContent = quoteAuthor;
    author2.textContent = quoteAuthor;
    author3.textContent = quoteAuthor;


  })


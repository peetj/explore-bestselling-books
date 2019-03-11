'use strict';

const apiKey = '6Wzcjab7S4IeGCA4OB2zY0JPxfU3PwZq';

function openModal(responseBooks) {
    $('.quotes').click(function() {
        let modalID = $(this).parent().attr('id'); 
        $('.overlay').toggleClass('hidden');
        $('.modal').toggleClass('hidden');
        getQuotes(modalID);
    })
    closeModal();
}

function closeModal() {
    $('#close-modal').click(function() {
        $('.modal').toggleClass('hidden');
        $('.overlay').toggleClass('hidden');
        $('#modal-content').empty();
    })
}

//display quotes
function displayQuotes(quotesJson, bookAuthor) {
    // Flag to let us know if no quotes found
    let quotesNotFound = false;
    
    const bookQuotes = quotesJson.quotes;
    console.log(bookAuthor);
    for (let i = 0; i < bookQuotes.length; i++) {
        if (bookQuotes[i].author === bookAuthor) {
            $('#modal-content').append(
                `<blockquote>
                    ${bookQuotes[i].quote}
                    <footer>- ${bookQuotes[i].author}, from "${bookQuotes[i].publication}"</footer>
                </blockquote>`
            )
        }
        else {
            quotesNotFound = true;
            break;
        }
    }
    
    // Return only if nothing found
    if(quotesNotFound)
        return $('#modal-content').append(`<p>We do not have quotes for this book yet.</p>`);
}

function getQuotes(id) {

    //get title of responseBooks and create a url string for the quotes API
    
    let articles = $('article').toArray();

    for (let i = 0; i < articles.length; i++) {
        if (id === articles[i].id) {
            const bookTitle = articles[i].firstElementChild.nextElementSibling.innerText.split(' ');
            const bookAuthor = articles[i].firstElementChild.nextElementSibling.nextElementSibling.innerText;
            const joinTitle = bookTitle.join('+');
            const quotesAppUrl = 'https://goodquotesapi.herokuapp.com/title/';
            const quotesQuery = `${quotesAppUrl}${joinTitle}`;

            
            fetch(quotesQuery)
            .then(quotesResponse => {
                if (quotesResponse.ok) {
                    return quotesResponse.json();
                }
                throw new Error(response.statusText);
            })
            .then(quotesJson => displayQuotes(quotesJson, bookAuthor))
            .catch(error => $('#modal-content').append(`<p>We do not have quotes for this book yet.</p>`));
        }
    }
}

//display bestsellers list on load
function displayBestSellers(responseJson) {
    $('section').empty();

    const responseBooks = responseJson.results.books;

    for (let i = 0; i <responseBooks.length; i++) {
        $('section').append(
            `<article id="${i}">
                <img src="${responseBooks[i].book_image}">
                <h4>${responseBooks[i].title}</h4>
                <h5>${responseBooks[i].author}</h5>
                <a class="button quotes">Quotes</a>
                <a class="button buy" href="${responseBooks[i].amazon_product_url}" target="_blank">Buy</a>
            </article>`
        )
    }

    openModal();
}

function formatFictionString(paramsFiction) {
    const fictionItems = `${paramsFiction.date}/${paramsFiction.list}.json?api-key=${paramsFiction.api_key}`;
    return fictionItems;
}

//fetch bestsellers list data from New York Times API
function getBestSellers(key) {
    
    //combined print and ebook fiction
    const paramsFiction = {
        api_key: apiKey,
        list: "combined-print-and-e-book-fiction",
        date: "current"
    };

    //format url strings
    const fictionString = formatFictionString(paramsFiction);

    //combine url strings for fiction
    const fictionUrl = `https://api.nytimes.com/svc/books/v3/lists/${fictionString}`;

    fetch(fictionUrl) 
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayBestSellers(responseJson))
        .catch(error => alert(error.message));
}

function handler() {
    $(document).ready(function() {
        openModal();
        closeModal();
        getBestSellers(apiKey);
    })
}

$(handler);

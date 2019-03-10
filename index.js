'use strict';

const apiKey = '6Wzcjab7S4IeGCA4OB2zY0JPxfU3PwZq';

function openModal(responseBooks) {
    $('.quotes').click(function() {
        let modalID = $(this).parent().attr('id'); 
        $('.overlay').toggleClass('hidden');
        $('.modal').toggleClass('hidden');
        displayQuotes(modalID);
    })
    closeModal();
}

function closeModal() {
    $('#close-modal').click(function() {
        $('.modal').toggleClass('hidden');
        $('.overlay').toggleClass('hidden');
    })
}

//display quotes
function displayQuotes(id) {

    //get title of responseBooks and create a url string for the quotes API
    
    let articles = $('article').toArray();

    $('#modal').empty();

    for (let i = 0; i < articles.length; i++) {
        if (id === articles[i].id) {
            const bookTitle = articles[i].firstChild.nextSibling.nextSibling.nextSibling.innerText.split(' ');
            const joinTitle = bookTitle.join('+');
            const quotesAppUrl = 'https://goodquotesapi.herokuapp.com/title/'
            const quotesQuery = `${quotesAppUrl}${joinTitle}`

            
            $('#modal').append(
                `<blockquote>
                    
                </blockquote>`
            )
        }
    }
}

//display bestsellers list on load
function displayBestSellers(responseJson) {
    console.log('working');

    $('section').empty();

    const responseBooks = responseJson.results.books;

    for (let i = 0; i <responseBooks.length; i++) {
        $('section').append(
            `<article id="${i}">
                <img src="${responseBooks[i].book_image}">
                <h4>${responseBooks[i].title}</h4>
                <h5>${responseBooks[i].author}</h5>
                <a class="button quotes">Quotes</a>
                <a class="button buy" href="${responseBooks[i].amazon_product_url}">Buy</a>
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
    console.log(fictionUrl);

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
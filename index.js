'use strict';

const apiKey = '6Wzcjab7S4IeGCA4OB2zY0JPxfU3PwZq';

function openModal() {
    $('.quotes').click(function() {
        $('.overlay').toggleClass('hidden');
        $('.modal').toggleClass('hidden');
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

//filter list

//display bestsellers list on load
function displayBestSellers(responseJson) {
    console.log('working');

    $('section').empty();

    const responseBooks = responseJson.results.books;

    for (let i = 0; i <responseBooks.length; i++) {
        $('section').append(
            `<article>
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
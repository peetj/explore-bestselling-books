'use strict';

const apiKey = 'AkAEIxTxeQFT0ZwI';

function openModal() {
    $('.quotes').click(function() {
        $('.overlay').toggleClass('hidden');
        $('.modal').toggleClass('hidden');
    })
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
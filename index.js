'use strict';

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

//fetch bestsellers list data from New York Times API
function getBestSellers() {
    const params = {

    };

    fetch(url) 
        .then()
        .then()
        .catch();
}

function handler() {
    getBestSellers();
    openModal();
    closeModal();
}

$(handler);
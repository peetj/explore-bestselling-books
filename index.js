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

function handler() {
    openModal();
    closeModal();
}

$(handler);
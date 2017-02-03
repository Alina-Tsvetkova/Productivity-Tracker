$.fn.accordionSwitcher = (function () {
    $('.accordion-button').click (function () {
        $('.accordion-content').slideToggle("middle");
    })
});

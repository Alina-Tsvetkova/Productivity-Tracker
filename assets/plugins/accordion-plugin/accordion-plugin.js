$.fn.accordionSwitcher = (function () {
    $('.accordion_button').click (function () {
        $('.accordion_content').slideToggle("slow");
    })
});

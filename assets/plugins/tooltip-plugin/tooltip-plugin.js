$.fn.tooltipSwitcher = function (event) {
    $(this).mouseenter(
        function (event) {
            $(this).append('<div class="tooltip-small"></div>');
            event.stopPropagation();
            $(this).find('div').animate({
                    opacity: 'show',
                    top: '45'
                },
                'middle');
            var hoverTexts = $(this).attr('data-tooltip');
            $(this).find('div').text(hoverTexts);
            if ($(this).hasClass('tooltip-right')){
                $(this).find('.tooltip-small').addClass('small-tooltip-right');
            }
        });
    $(this).mouseleave(
        function () {
            $smallTooltip = $(this);
            $(this).find('div').animate({
                    opacity: 'hide',
                    top: '-45'
                },
                500);
            setTimeout(function () {
                $smallTooltip.children().remove('.tooltip-small');
            }, 100)

        });
};



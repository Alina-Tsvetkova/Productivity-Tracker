$.fn.tabSwitcher = function () {
    let tabPanel = $(this).find('.ui-tabs-panel');
    let anchors = $(this).find('.ui-tabs-anchor');
    anchors.filter(':first').addClass('ui-tabs-active');
    tabPanel.hide();
    tabPanel.filter(':first').show();
    $(this).find('a').click(function (event) {
        event.preventDefault();
        anchors.removeClass('ui-tabs-active');
        tabPanel.hide();
        tabPanel.filter(this.hash).fadeIn(1000);
        tabPanel.filter(this.hash).show();
        $(this).addClass('ui-tabs-active');
    });
}

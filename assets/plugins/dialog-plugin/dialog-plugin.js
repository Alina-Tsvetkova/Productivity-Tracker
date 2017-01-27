$.fn.dialogSwitcher = (function (param) {
    if (param === 'show') {
        console.log('opened');
        $(this).show();
    }
    else if (param === 'close') {
        $(this).fadeOut(700);
    }
});


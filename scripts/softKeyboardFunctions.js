// Force Go Button on Android Virtual Keyboard to close keyboard

(function($) {
    $(document).ready(function() {
        $('input[type=text]').keypress(function(event) {
            if(event.which == 13) {
                $(this).blur();
            }
        });
    });
})(jQuery);

$(document).on('ready', function() {
    // executes when HTML-Document is loaded and DOM is ready

});

$(window).on('load', function() {
    // executes when complete page is fully loaded, including all frames, objects and images

    // Navigation Scroll
    navigationScroll();

    // Panel Background
    panelBackground('.section__panel');

    // Search Field
    searchBox();

    //
    toggleMobileMenu ('.main-menu','.navbar-toggler');

    customPopover('.footer__sign-up__form', '.footer__sign-up__button')
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

function navigationScroll() {
    $("a[href^='#downloads']").on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        var hash = this.hash;
        // animate
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        },	1000, function () {
            window.location.hash = hash
        });

    });
}
function panelBackground (panel) {
    $(panel).each(function () {
        var attr = $(this).attr('data-image-src');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
        }

    });
}

function buttonUp(){
    var sbInput = $('.sb-search-input'),
        valux = sbInput.val();

    valux = $.trim(valux).length;

    if(valux !== 0){
        $('.sb-search-submit').css('z-index','99');
    } else{
        sbInput.val('');
        $('.sb-search-submit').css('z-index','-999');
    }
}

function searchBox() {
    var submitIcon = $('.sb-icon-search'),
        submitInput = $('.sb-search-input'),
        searchBox = $('.sb-search'),
        isOpen = false;

    $(document).mouseup(function(){
        if(isOpen === true){
            submitInput.val('');
            $('.sb-search-submit').css('z-index','-999');
            submitIcon.click();
        }
    });

    submitIcon.mouseup(function(){
        return false;
    });

    searchBox.mouseup(function(){
        return false;
    });

    submitIcon.click(function(){
        if(isOpen === false){
            searchBox.addClass('sb-search-open');
            isOpen = true;
        } else {
            searchBox.removeClass('sb-search-open');
            isOpen = false;
        }
    });
}

function toggleMobileMenu (menu,menuIcon) {
    isOpen = false;

    $(menuIcon).on('click', function(e) {
        if(isOpen === false){
            $(menu).addClass('menu-open');
            $(menuIcon).addClass('menu-open');
            isOpen = true;
        } else {
            $(menu).removeClass('menu-open');
            $(menuIcon).removeClass('menu-open');
            isOpen = false;
        }
    })
    $("body")
        .on("click", function () {
            //$(this).find(menu).slideUp();
            $(menu).removeClass('menu-open');
            $(menuIcon).removeClass('menu-open');
            isOpen = false;
        })
        .on("click", menu, function (event) {
            event.stopPropagation();
        })
        .on("click", menuIcon, function (event) {
            event.stopPropagation();
        });
}

function customPopover(popoverContainer, popoverButton) {
    var popoverContent = {
        'html': true,
        content: function () {
            return $(popoverContainer).html();
        }
    };

    $(function () {
        $(popoverButton).popover(popoverContent)
    });
}
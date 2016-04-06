var doc = jQuery(document);
doc.on('ready', function() {
    var body = jQuery('body');
    var header = jQuery('#oah-header');
    var nav = jQuery('.oah-nav');
    
    body.on('click', function(e) {
        if (nav.hasClass('oah-nav-active') && jQuery(e.target).closest('.oah-nav').length === 0) {
            nav.removeClass('oah-nav-active');
        }
    });

    jQuery('.oah-header-nav-trigger a').on('click', function(e) {
        e.preventDefault();
        nav.toggleClass('oah-nav-active');
        e.stopPropagation();
    });

    jQuery('.oah-nav-close, .oah-nav ul a').on('click', function(e) {
        e.preventDefault();
        nav.removeClass('oah-nav-active');
    });
    
    jQuery('.oah-header-nav-item a, .oah-nav ul a').on('click', function(e) {
        e.preventDefault();
        var hash = jQuery(this).attr('href');
        jQuery('html, body').animate({
            scrollTop: jQuery(hash).offset().top - header.height()
        }, 2000);
        if (window.history.pushState) {
            window.history.pushState({}, document.title, hash.replace('#', '/'));
        }
    });
    
    jQuery(window).on('scroll', function(e) {
        if (doc.scrollTop() === 0) {
            body.removeClass('oah-scroll');
        } else {
            body.addClass('oah-scroll');
        }
    });
    
    jQuery('.oah-masonry').each(function() {
        var masonry = jQuery(this);
        var filter = masonry.closest('.oah-section').find('.oah-sub-nav');
        if (filter.length > 0) {
            filter.find('li a').on('click', function(e) {
                e.preventDefault();

                filter.find('li a.active').removeClass('active');
                jQuery(this).addClass('active');
                var target = jQuery(this).attr('href').substr(1);
                var found = false;
                if (target !== '') {
                    masonry.find('.grid-item').each(function() {
                        var item = jQuery(this);
                        if (item.data('target').indexOf(target) >= 0) {
                            item.show();
                            found = true;
                        } else {
                            item.hide();
                        }
                    });
                }
                
                if (!found) {
                    masonry.find('.grid-item').show();
                }
                
                masonry.masonry();
            });
        }
        
        masonry.masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            resize: false
        });

        masonry.imagesLoaded().progress( function() {
            masonry.masonry('layout');
        });
    });
    
    // init
    if (doc.scrollTop() === 0) {
        body.removeClass('oah-scroll');
    } else {
        body.addClass('oah-scroll');
    }
    
    jQuery('.sponsors').owlCarousel({
        loop: true,
        margin: 15,
        autoWidth: true,
        autoplay: true,
        autoplayTimeoute: 7000,
        autoplayHoverPause: true,
        items: jQuery('.sponsors > .item').length
    });
    
    jQuery(window).trigger('footerResize');
});

jQuery(window).on('load', function() {
    var pathName = window.location.pathname.substring(1);
    if (pathName !== '' && jQuery('#' + pathName).length > 0) {
        jQuery('html, body').animate({
            scrollTop: jQuery('#' + pathName).offset().top - jQuery('#oah-header').height()
        }, 2000);
    }
    
    jQuery(window).trigger('footerResize');
}).on('resize', function() {
    jQuery('.oah-masonry').each(function() {
        jQuery(this).masonry();
    });
    window.setTimeout(function() {
        jQuery('.oah-masonry').each(function() {
            jQuery(this).masonry();
        });
    }, 1000);
    
    jQuery(window).trigger('footerResize');
}).on('footerResize', function() {
    var h = jQuery('#footer').outerHeight(true);
    if (h < window.innerHeight) {
        jQuery('body').addClass('oah-fancy-footer');
        jQuery('.footer-wrapper').height(h);
    } else {
        jQuery('body').removeClass('oah-fancy-footer');
        jQuery('.footer-wrapper').css('height', 'auto');
    }
});

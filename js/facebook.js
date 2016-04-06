window.fbAsyncInit = function() {
    FB.init({
        xfbml   : true,
        status  : false,
        version : 'v2.5'
    });
    
    FB.Event.subscribe('xfbml.render', function() {
        window.setTimeout(function() {
            jQuery(window).trigger('footerResize');
        }, 1000);
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/de_DE/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
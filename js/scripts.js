$(function(){

    $(".headline.large .part").fitText(1.1, {
        minFontSize: '20px',
        maxFontSize: '92px'
    });





    var app = {};

    app.menu = {
        mobile: function(){
            $("#mobile_menu_toggle").show();
            $("#menu").addClass("mobile_menu clear clearfix").hide();
        },
        desktop: function(){
            $("#mobile_menu_toggle").hide();
            $("#menu").removeClass("mobile_menu clear clearfix").show();
        }
    }







    function contact() {
        
        $("#contactform button").bind("click", function(){
                    
            var form = $("#contactform"),
                name = form.find("input[name='contact_name']"),
                email = form.find("input[name='contact_email']"),
                message = form.find("textarea[name='contact_message']"),
                button = form.find("button"),
                action = form.attr("action");
            
            // Validation
            (name.val() === '') ? name.addClass("error animated-fast shake") : name.removeClass("error animated-fast shake");
            (email.val() === '' || !validateEmail(email.val())) ? email.addClass("error animated-fast shake") : email.removeClass("error animated-fast shake");
            (message.val() === '') ? message.addClass("error animated-fast shake") : message.removeClass("error animated-fast shake");
            
            setTimeout(function(){
                $(".animated-fast.shake").removeClass("animated-fast shake");
            }, 1000);

            // If all good, send away
            if ($(".error").length === 0 || getURLParameter('novalid') === 'true') {
                                
                $(this).addClass("loading");
                $(this).html("Sending...");

                var pre_message = message.val(),
                    the_message = escape(pre_message);
                
                $.ajax({
                    type: "POST",
                    url: action,
                    data: 'contact_name=' + name.val() + '&contact_email=' + email.val() + '&contact_message=' + the_message,
                    error: function(){
                        button.html("There was an error. Try again please.");
                        button.removeClass("loading").addClass("error");
                    },
                    success: function() {
                        setTimeout(function(){
                            name.attr("disabled","disabled");
                            email.attr("disabled","disabled");
                            message.attr("disabled","disabled");
                            setTimeout(function(){
                                form.find("label:nth-child(1)").addClass("fadeOutLeft animated");
                            }, (200 * 1));
                            setTimeout(function(){
                                form.find("label:nth-child(2)").addClass("fadeOutLeft animated");
                            }, (200 * 2));
                            setTimeout(function(){
                                form.find("label:nth-child(3)").addClass("fadeOutLeft animated");
                            }, (200 * 3));
                            setTimeout(function(){
                                form.find("label").slideUp(500);
                            }, 200 * 6);
                            button.attr("disabled","disabled").html("Cheers for that. I'll get back to you soon. :)");
                            button.removeClass("loading").addClass("sent");
                        }, 1500);
                    }
                });
            }
        
            return false;
        });
        
        $("#contactform .error").bind("keyup blur", function(){
            var val = $(this).val();
            if (val === '') {
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }
        });
                
    }

    function gallery(args) {

        var allow_scroll = args.allow_scroll;
       
        $(".gallery_item .small_images img:not(.selected)").live("click", function(){
            var elem = $(this),
                id = elem.attr("data-item-id"),
                big_image_wrapper = $(".big_image_wrapper[data-item-id='" + id + "']"),
                big_img = $(".big_image[data-item-id='" + id + "']"),
                full = elem.attr("data-full");

            big_image_wrapper.addClass("loading");
            big_image_wrapper.find(".loader").show();

            var img = $('<img src="' + full + '" />');
            $(img).load(function() {
                setTimeout(function(){
                    big_img.attr("src", full);
                    big_image_wrapper.find(".loader").hide();
                    big_image_wrapper.removeClass("loading");
                    $(this).remove();
                }, 100);
            });

            if (allow_scroll) {
                $("html, body").stop(true, false).animate({scrollTop: ($("#item_images_"+id).offset().top - 20) }, 200);
            }
            
            $(".small_images img[data-item-id='" + id + "']").removeClass("selected");
            elem.addClass("selected");
            return false;
            
        });
        

        $(".gallery_item .big_image_wrapper").live("click", function(){
            var elem = $(this).find(".big_image"),
                id = elem.attr("data-item-id"),
                selected = $(".small_images .selected[data-item-id='" + id + "']"),
                next = selected.next("img"),
                first = $(".small_images img[data-item-id='" + id + "']:first");
            if (next.length === 0) {
                first.click();
            } else {
                next.click();
            }
            return false;
        });

    }

    function home_scroll(allow_retrun){

        if (allow_retrun == false) {
            return;
        }

        if ($("body.home").length > 0) {
            $(".arctic_scroll").arctic_scroll({
                speed: 800
            });
            $(".header nav ul li:first a").attr("href", "#body");
            var hash = window.location.hash;
            if (hash) {
                $("a[href='/" + hash + "']").click();
            }
        }
    }

    function home_header(allow_retrun){

        if (allow_retrun == false) {
            return;
        }

        if ($("body.home")) {
            function do_header(){
                var from_top = $(window).scrollTop();
                // console.log(from_top);
                if (from_top > 310) {
                    $("body").addClass("slimmer_header");
                } else {
                    $("body").removeClass("slimmer_header");
                }
            }
            $(window).scroll(function(){
                do_header();
            });
            do_header();
        }
    }

    contact();

    $("#mobile_menu_toggle").on("click touchstart", function(){
        $("#menu").slideToggle(300);
        return false;
    });

    $("body.home .arctic_scroll").arctic_scroll({
        speed: 800
    });

    mediaCheck({
        media: '(max-width: 800px)',
        entry: function() {
            app.menu.mobile();
        },
        exit: function(){
            app.menu.desktop();
        }
    });

    mediaCheck({
        media: '(min-width: 1000px)',
        entry: function() {
            home_scroll(true);
            home_header(true);
            gallery({"allow_scroll" : false});
        },
        exit: function(){
            home_scroll(false);
            home_header(false);
            gallery({"allow_scroll" : true});
        }
    });





    $(".portfolio_item img").click(function(){
        var id = $(this).attr("data-for");
        $("#" + id).show();
        alert(id);
        return false;
    });




    
});
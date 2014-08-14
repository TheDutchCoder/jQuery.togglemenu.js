/*!
 * jQuery.togglemenu.js
 *
 * A jQuery plugin to assist with hiding and showing navigation menus.
 *
 * Leveragres Modernizr's .mq() method to reset a menu, but will ignore it if
 * Modernizr isn't used.
 *
 * @author  Reinier Kaper <mail@thedutchcoder.com>
 * @example

$('.js-toggle-navigation').toggleMenu({
    nav: '.nav--main',
    subnav: '.nav--sub',
    reset: ['screen and (min-width: 40em)']
});

*/

;(function($, window, document, undefined) {


    /**
     * Add the togglemenu function to the jQuery functions.
     *
     * @param  Object options An object containing options for the plugin.
     * @return Object         Returns the jQuery object.
     */
    $.fn.togglemenu = function(options) {


        // The default options for the plugin.
        var defaults = {
            nav: null,
            subnav: null,
            reset: []
        };


        // Extend the options with all the defaults and overwrite any supplied
        // options.
        options = $.extend(defaults, options);


        // Loop through each item that the plugin is attached to.
        this.each(function(index) {

            var $window,
                $document,
                $trigger,
                $nav,

                nameSpace,
                windowWidth,
                clickEvent,
                isReset;

            $window = $(window);
            $document = $(document);
            $trigger = $(this);
            $nav = $(options.nav);

            nameSpace = '.togglemenu' + index;
            windowWidth = 0;
            isReset = false;


            // The click event is normalized in order to get correct body clicks
            // in certain mobile browsers.
            clickEvent = 'ontouchstart' in document.documentElement ?
                    'touchstart' + nameSpace :
                    'click' + nameSpace;



            function openNav() {

                event.preventDefault();

                $trigger
                    .addClass('is-active');

                $nav
                    .addClass('is-open');

            }

            function closeNav() {

                event.preventDefault();

                $trigger
                    .removeClass('is-active');

                $nav
                    .removeClass('is-open')
                    .addClass('is-closed')
                    .find(options.subnav)
                    .removeClass('is-open')
                    .addClass('is-closed');

            }

            function resetNav() {

                $trigger
                    .removeClass('is-active');

                $nav
                    .removeClass('is-open is-closed')
                    .find(options.subnav)
                    .removeClass('is-open is-closed');

            }

            function openSubnav($target) {

                var $subnav;

                $subnav = $target.next(options.subnav);

                if (!$subnav.hasClass('is-open')) {

                    event.preventDefault();

                    $subnav
                        .addClass('is-open');

                }

            }



            /**
             * Attaches all event handlers for this instance of the plugin.
             */
            function attachEventHandlers() {

                isReset = false;

                // Event handling for the trigger.
                //
                // The target should toggle when the trigger (or one of its
                // children) is clicked.
                // 
                // When a subnav item is clicked, the subnav should be opened.
                // Otherwise the link should be followed normally.
                // 
                // Clicks on any other element close the menu.
                $document.on(clickEvent, function(event) {

                    var $target;

                    $target = $(event.target);


                    // 1. The trigger (or one of its children) is clicked.
                    // 2. A subnav element is clicked.
                    // 3. Any other element is clicked.
                    if ($target.closest($trigger).length) {

                        if ($trigger.hasClass('is-active')) {

                            closeNav();

                        } else {

                            openNav();

                        }

                    } else if ($target.next(options.subnav).length) {

                        openSubnav($target);

                    } else {

                        closeNav();

                    }

                });

            }



            /**
             * Detaches all event handlers for this instance of the plugin.
             */
            function detachEventHandlers() {

                isReset = true;

                $document.off(clickEvent);

            }



            // When the viewport is resized and a media query is hit where the
            // menu should be reset, the menu is closed and all styling is
            // removed.
            // 
            // Attach this only once for performance!
            $window.on('resize' + nameSpace, function() {


                // Only trigger if media queries are provided and
                // Moderznir's .mq() method can be used.
                if (options.reset.length > 0 &&
                    typeof Modernizr === "object" &&
                    typeof Modernizr.mq === "function") {


                    // Check to see if the window really has resized as some
                    // mobile browsers trigger the resize event on scroll
                    // too.
                    if ($window.width() !== windowWidth) {

                        windowWidth = $window.width();


                        // Loop through the 'reset' queries to see if one of
                        // them has been matched to reset the menu.
                        for (var i = 0; i < options.reset.length; i++) {

                            if (Modernizr.mq(options.reset[i])) {

                                if (!isReset) {

                                    resetNav();
                                    detachEventHandlers();

                                }

                                return;

                            }

                        }

                        if (isReset) {

                            attachEventHandlers();

                        }

                    }

                }


            }).resize();


        });


        // Return the object for chaining.
        return this;

    };

})(jQuery, window, document);

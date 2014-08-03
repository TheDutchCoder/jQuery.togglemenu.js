/*!
 * toggle-menu.js
 *
 * A jQuery plugin to assist with hiding and showing navigation on mobile
 * devices.
 *
 * Leveragres Modernizr's .mq() method to reset then menu, but will ignore it if
 * Modernizr isn't used.
 *
 * @author  Reinier Kaper <reinier@scottbuckingham.com>
 * @example

$('.js-toggle-navigation').toggleMenu({
    target: '.nav--main',
    reset: ['screen and (min-width: 40em)']
});

*/

;(function($, window, document, undefined) {


    /**
     * Add the toggleMenu function to the jQuery functions.
     *
     * @param  Object options An object containing options for the plugin.
     * @return Object         Returns the jQuery object.
     */
    $.fn.toggleMenu = function(options) {


        // The default options for the plugin.
        var defaults = {
            target: null,
            reset: []
        };


        // Extend the options with all the defaults and overwrite any supplied
        // options.
        options = $.extend(defaults, options);


        // Loop through each item that the plugin is attached to.
        this.each(function() {

            var $window,
                $document,
                $trigger,
                $target,

                windowWidth,
                click;

            $window = $(window);
            $document = $(document);
            $trigger = $(this);
            $target = $(options.target);

            targetIsOpen = false;
            windowWidth = $window.width();


            // The click event is normalized in order to get correct body clicks
            // in certain mobile browsers.
            click = 'ontouchstart' in document.documentElement ?
                    'touchstart' :
                    'click';


            // When the viewport is resized and a media query is hit where the
            // menu should be reset, the menu is closed and all styling is
            // removed.
            $window.on('resize', function() {


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

                                resetMenu($trigger, $target);

                            }

                        }

                    }

                }


            }).resize();


            // Event handling for the trigger.
            //
            // The target should toggle when the trigger (or one of its
            // children) is clicked, otherwise it should close the target.
            $document.on(click, function(event) {

                var $event_target;

                $event_target = $(event.target);


                // Check to see if the clicked element, or it's ancestor is the
                // target.
                if ($event_target.closest($trigger).length) {

                    toggleMenu($trigger, $target, targetIsOpen);

                } else {

                    closeMenu($trigger, $target);

                }

            });


        });



        /**
         * Opens the menu and sets / removes the appropriate states on the
         * trigger and the target.
         */
        function openMenu($trigger, $target) {

            $trigger
                .addClass('is-active');

            $target
                .addClass('is-open')
                .removeClass('is-closed');

        }



        /**
         * Closes the menu an sets / removes the appropriate states on the
         * trigger and the target.
         */
        function closeMenu($trigger, $target) {

            $trigger
                .removeClass('is-active');

            $target
                .addClass('is-closed')
                .removeClass('is-open');

        }



        /**
         * Resets the menu to its original state and removes any jQuery
         * added styles.
         */
        function resetMenu($trigger, $target) {

            $trigger
                .removeClass('is-active');

            $target
                .removeClass('is-open is-closed')
                .attr('style', '');

        }



        /**
         * Toggles the menu between the 'is-open' and 'is-closed' state.
         */
        function toggleMenu($trigger, $target) {

            if ($target.hasClass('is-open')) {

                closeMenu($trigger, $target);

            } else {

                openMenu($trigger, $target);

            }

        }


        // Return the object for chaining.
        return this;

    };

})(jQuery, window, document);

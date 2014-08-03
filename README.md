toggle-menu.js
==============

A jQuery plugin for easy mobile navigation.

## Installation
Download the plugin file and put it wherever you like.
Simply reference it in your HTML like so:

```html
<script type='text/javascript' src='[path-to-your-scripts]/toggle-menu.js'></script>
```

## Markup (HTML)
The plugin requires a `trigger` and a `target`, where the trigger toggles classes on the target (and itself), so you can use CSS to show/hide/fade/etc. the elements as you like.

### Trigger
The trigger can be virtually anything, but I recommend using a `<button>` element as it's the most appropriate.

```html
<button type="button" class="js-toggle-menu">Toggle the menu</button>
```

### Target
The target can also be anything you want, but you'll most likely use a navigational element of some sort.

```html
<nav>
  <h1>Navigation</h1>
  <ul class="nav  nav--main">
    <li><a href="/there">There</a></li>
    <li><a href="/hither">Hither</a></li>
  </ul>
</nav>
```

## CSS
In order to provide maximum flexibility, the plugin will attach classes to both the `trigger` and `target` elements. These classes are so called "states" and the following class names are used:

1. `is-open`
2. `is-closed`
3. `is-active`
 
The first two states are used for the `target`, whereas the last state is only used on the `trigger`.

An example of how to use these states in CSS could be:
```css
.nav--main,
.nav--main.is-closed {
  display: none;
}

.nav--main.is-open {
  display: block;
}

.js-toggle-menu {
  color: #333;
  background-color: #fff;
}

.js-toggle-menu.is-active {
  color: #fff;
  background-color: #333;
}
```

## JavaScript
With the markup and CSS in place, you can call the plugin from within jQuery like so:

```js
$(document).ready(function() {
    
    $('.js-toggle-menu').toggleMenu({
        target: '.nav--main',
        reset: ['screen and (min-width: 40em)']
    });
    
});
```

Note how we select the button in jQuery `$('.js-toggle-menu')` and then attach the plugin to that button.
Also note how the `target:` in our options refers to the class on the `ul`.

## Modernizr
This plugin leverages Modernizr's method `.mq()`, which is used to check a media query.

If you provide one or more media queries in the `reset` option, then Modernizr will be used to see if the media query is matched and if co, it will reset the menu to it's closed state.

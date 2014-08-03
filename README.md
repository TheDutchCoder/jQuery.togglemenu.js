toggle-menu.js
==============

A jQuery plugin for easy mobile navigation.

## Installation
Download the plugin file and put it wherever you like.
Simply reference it in your HTML like so:

```html
<script type='text/javascript' src='[path-to-your-scripts]/toggle-menu.js'></script>
```

## Markup
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

## JavaScript
With the trigger and target in place, you can call the plugin from within jQuery like so:

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

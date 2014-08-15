jQuery.togglemenu.js
==============

A jQuery plugin for easy responsive navigation toggling.

## Installation
Download the plugin file and put it wherever you like.
Simply reference it in your HTML like so:

```html
<script type="text/javascript" src="[path-to-your-scripts]/jQuery.togglemenu.js"></script>
```

## Markup (HTML)
The plugin requires a `trigger` and a `nav`, where the `trigger` toggles classes on the `nav` (and itself), so you can use CSS to show/hide/fade/etc. the elements as you like.

### Trigger
The `trigger` can be virtually anything, but I recommend using a `<button>` element as it's the most appropriate.

```html
<button type="button" class="js-togglemenu">Toggle the menu</button>
```

### Nav
The `nav` can also be anything you want, but you'll most likely use a navigational element of some sort.
When using `subnav` elements, use a traditional mark-up pattern (e.g. a `ul` inside an `li`, following an `a`).

```html
<nav>
  <h1>Navigation</h1>
  
  <!-- let's put our button here -->
  <button type="button" class="js-togglemenu">Toggle the menu</button>
  
  <ul class="nav  nav--main">
    <li><a href="/books">Books/a></li>
    <li>
      <a href="/movies">Movies</a>
      <ul class="nav  nav--sub">
        <li><a href="/movies/thriller">Thriller</a></li>
        <li><a href="/movies/horror">Horror</a></li>
        <li>
          <a href="/movies/comedy">Comedy</a>
          <ul class="nav  nav--sub">
            <li><a href="/movies/comedy/the-big-lebowksi">The Big Lebowski</a></li>
            <li><a href="/movies/comedy/anchorman">Anchorman</a></li>
            <li><a href="/movies/comedy/zoolander">Zoolander</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

## CSS
In order to provide maximum flexibility, the plugin will attach classes to both the `trigger`, `nav` and `subnav` elements. These classes are so called "states" and the following classnames are used:

1. `is-open`
2. `is-closed`
3. `is-active`
 
The first two states are used for the `nav` and `subnav`, whereas the last state is only used on the `trigger`.

An example of how to use these states in CSS could be:
```css
.nav,
.nav.is-closed {
  display: none;
}

.nav.is-open {
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
    
    $('.js-togglemenu').togglemenu();
    
});
```

You probably want more control over which menu you want to target and what the menu's `subnav` is called. This examples shows all the options you can pass into the plugin:

```js
$(document).ready(function() {
    
    $('.js-togglemenu').togglemenu({
        nav: '.nav--main',
        subnav: '.nav--sub',
        namespace: 'mainmenu',
        reset: ['screen and (min-width: 40em)']
    });
    
});
```

### Notes
The options that you can input are as follows:

1. `nav`: the CSS selector for the menu you want to trigger (defaults to `nav > ul`);
2. `subnav`: the CSS selector for the submenus (defaults to `ul`);
3. `namespace`: namespace for this instance. This gives authors more control over handling events outside of the plugin. You can safely leave this blank in most cases;
4. `reset`: an array of media queries telling the plugin when the menu functionality must be completely reset. This will also remove all event handling associated with this instance. Very usefull when you want your navigation to behave differently on desktops for example.

## Modernizr
This plugin leverages Modernizr's method `.mq()`, which is used to check the `reset` media queries.

If you provide one or more media queries in the `reset` option, then Modernizr will be used to see if the media query is matched and if so, it will reset the menu to it's closed state.

If Modernizr isn't detected, or no media queries have been provided, the plugin will behave like configured.

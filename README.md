brick-progressbar
=================

# brick-progressbar

> A [Brick](https://github.com/mozilla/brick/) custom element.
> BootStrap Progressbar

## Demo

[Check it live!](http://mozbrick.github.io/brick-progressbar)

## Usage

1. Import Web Components polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="src/brick-progressbar.html">
    ```

3. Start using it:

    ```html
    <brick-progressbar min="200" max="500" value="340" showStatus striped active>
    </brick-progressbar>
    ```

## Options

Attribute         | Options    | Default     | Description
---               | ---        | ---         | ---
`min`             | *string*   | `0`         | Minimum value of Progressbar.
`max`             | *string*   | `100`       | Maximum value of Progressbar.
`value`           | *string*   | `0`         | Get/Set Value of Progressbar.
`type`            | *string*   | `default`   | Possible values are `success`, `info`, `danger`, and `warning`.
`striped`         | *boolean*  | `false`     | Uses a gradient to create a striped effect. Not available in IE8.
`active`          | *boolean*  | `false`     | Show animation on striped. Not available in IE8.
`showStatus`      | *boolean*  | `false`     | Show status like (e.g., `32%` or `350/500`).
`showActualValue` | *boolean*  | `false`     | Show status in Percentage (e.g., `32%`) if present, else show status in text (e.g., `350/500`).
`intermediate`    | *boolean*  | `false`     | Show Intermediate Progressbar.

## Development

Brick components use [Stylus](http://learnboost.github.com/stylus/) to generate their CSS.

This repository comes outfitted with a set of tools to ease the development process.

To get started:

* Install [Bower](http://bower.io/) & [Gulp](http://gulpjs.com/):

    ```sh
    $ npm install -g bower gulp
    ```

* Install local dependencies:

    ```sh
    $ npm install && bower install
    ```

While developing your component, there is a development server that will watch your files for changes and automatically re-build your styles and re-lint your code.

To run the development server:

* Run `gulp server`
* Navigate to `http://localhost:3001`

To simply build and lint your code, run `gulp build`.

You can also push your code to GitHub Pages by running `gulp deploy`.

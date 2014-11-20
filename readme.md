# Webapp bootstrap

## prerequisites


### Ruby

[Downloade here]( https://www.ruby-lang.org/en/downloads/ )

### Sass

```sh
$ gem install sass
```

### Node

[Downloade here]( http://nodejs.org/ )

### Gulp

```sh
$ npm install --g gulp
```

### Bower

```sh
$ npm install -g bower
```

## Build 

Step 1: install Front-end libraries

```sh
$ bower install
```

Step 2: Install toolchain

```sh
$ npm install
```

Step 3: generate initial compiled files

```sh
$ gulp
```

Step 4: Start watching for file changes

```sh
$ gulp watch
```

Step 5: Stop reading, start building.

## Tools

### Gulp

Automation of front-end toolchain. 

[Docs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

#### Tasks

* Compile sass to css and minimize
* Jshint javascript and minimize
* Optimize images
* Minimize html files
* Livereload page

#### Livereload

CSS edits and image changes apply live. CoffeeScript, SASS, LESS and others just work.

[Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

### Bower

Installing and updating of libraries

[Docs](http://bower.io/#getting-started)

### Sass 

Awesome css preprocessor. 

[Docs](http://sass-lang.com/)

## Frameworks

### Bourbon

A simple and lightweight mixin library for Sass.

[Docs](http://bourbon.io/docs/)

### Neat

A lightweight semantic grid framework for Sass and Bourbon.

[Docs](http://thoughtbot.github.io/neat-docs/latest/)

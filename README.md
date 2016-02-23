# Linnovate Test
=========================

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Run](#run)
- [TODO](#TODO)

## About

- [angular ^1.5](https://github.com/angular/angular.js.git)
- [bootstrap ^3.3.6](https://github.com/twbs/bootstrap.git)
- [angular-ui-bootstrap ^1.1.2](https://github.com/angular-ui/bootstrap)
- [angular-slick-carousel ^3.1.4](https://github.com/devmark/angular-slick-carousel)
- [babel-core ^6.3.21](https://github.com/babel/babel/tree/master/packages/babel-core)
- [webpack ^1.12.9](https://github.com/webpack/webpack)
- [sass ^3.4.21](https://github.com/sass/sass)

## Installation
```
$ git clone https://github.com/itayod/linnovateTest.git
$ cd linnovateTest
$ npm install
$ bower install
```

## Run
```
$ npm start
```
Create a server using `node` that take the configuration from webpack.config in hot mode.
Open your browser at [http://localhost:8080](http://localhost:8080).

## Features
=========================
- [Form]  - support in upload multipile images.
2. [Carousels]  - 2 carousels that connected to eachother (when one carousel move the other one also has to move correspondlly).
3. [MainCarousel]  - display the current image has link button description and title
4. [SubCarousel]  - display 5 images in what i called image-slider-card can be deleted and edit by double clicking or on the edit icon in the icons pannel
 

## TODO
1. [ ] combine the 2 different carousels to only one carousel.
2. [ ] add tests
3. [ ] refactor to redux

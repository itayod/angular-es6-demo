import angular from "angular";
import style from "./app.less";
import imageSlider from "../image-slider/image-slider.js";

export default angular.module('app',[imageSlider.name])
  .component('app',{
      template:require('./app.html'),
    });

import angular from "angular";
import style from "./app.scss";
//import imageListService from "../../services/images-list.js";
import ngStorage from "ngstorage";
import imageSlider from "../image-slider/image-slider.js";
import appForm from "../app-form/app-form.js";
import images from "./model.json";
import {AppController} from "./app-controller.js"
import {ImagesListService} from "./images-list-service.js"



//

export default angular.module('app',[ngStorage.name,imageSlider.name,appForm.name])
  .value('images',images.images)
  .service('imageList',ImagesListService)
  .directive('app',function(){
    return{
      template:require('./app.html'),
      controller:AppController,
      controllerAs:"app"
    }
  })


import angular from "angular";
import mock from "./model.json";
import style from "./app.less";
export default angular.module('app',['slickCarousel'])
.directive('app',function(){
  return{
    template:require('./app.html'),
    controller:appController,
    controllerAs:'app'
  }
});

class appController{
  constructor($scope,$timeout){
    this.timeout = $timeout;
    this.mainSlickConfig = {
      draggable: false,
      method:{},
      event:{
        beforeChange: function (event, slick, currentSlide, nextSlide) {
        },
      }
    };

    this.subSlickConfig = {
      draggable: false,
      method:{},
      event:{
        beforeChange: function (event, slick, currentSlide, nextSlide) {
        },
      }
    };

    this.model = mock;
  }


  switchSlide(slideId){
    this.timeout(()=>{
      this.subSlickConfig.method.slickGoTo(slideId-1)
      this.mainSlickConfig.method.slickGoTo(slideId-1)
    })
    console.log(slideId)
  }

}
import angular from "angular";
import mock from "./model.json";
import style from "./image-slider.less";
export default angular.module('imageSlider',['slickCarousel'])
.directive('imageSlider',function(){
  return{
    template:require('./image-slider.html'),
    controller:imageSliderController,
    controllerAs:'imageSlider'
  }
});

class imageSliderController{
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


  slidersControl(action,slideId){
    console.log(action);
    switch(action) {
      case 'go':
        this.timeout(()=> {
          this.subSlickConfig.method.slickGoTo(slideId - 1)
          this.mainSlickConfig.method.slickGoTo(slideId - 1)
        });
        break;
      case 'next':
        this.timeout(()=> {
          this.subSlickConfig.method.slickNext();
          this.mainSlickConfig.method.slickNext()
        });
        break;
      case 'prev':
        this.timeout(()=> {
          this.subSlickConfig.method.slickPrev();
          this.mainSlickConfig.method.slickPrev()
        });
        break;
      default:
      console.warn('illigal action');
    }

  }

}
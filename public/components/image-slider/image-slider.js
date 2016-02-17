import uiBotstrap from "angular-ui-bootstrap";
import ngAnimate from "angular-animate";
import stlye from "./image-slider.scss";
import imageSilderCard from "./children/image-slider-card/image-slider-card.js";
import imageSilderPointer from "./children/image-slider-pointer/image-slider-pointer.js";
import imageSilderCarouselInner from "./children/image-slider-carousel-inner/image-slider-carousel-inner.js";

export default angular.module('imageSlider',[ngAnimate,uiBotstrap,'slickCarousel',imageSilderCard.name,imageSilderPointer.name,imageSilderCarouselInner.name])
  .directive('imageSilder',function(){
    return{
      scope:{
        slides:"=",
        working: "=",
        imageDidUpadte: '&',
        imageDidRemove: '&'
      },
      template:require('./image-slider.html'),
      controller:imageSliderController,
      controllerAs:'imageSilder'
    }
  })

class imageSliderController{
  constructor($scope,$timeout){
    this._scope = $scope;
    this._timeout = $timeout
    this.slides = this._scope.slides;
    this.subSlickConfig = {
      draggable: false,
      method:{},
    };


    this._timeout(()=>{

      //i know its a little hacky but...
      var arrows = $(".image-slider-container")[0].getElementsByClassName('carousel-control')

      //prev arrow
      arrows[0].onclick = ()=>{
        this.subSlickConfig.method.slickPrev();
      }

      //next
      arrows[1].onclick =()=>{
        this.subSlickConfig.method.slickNext();
      }

    });

  }

  slideTo(id){

    angular.forEach(this.slides,(value)=>{
      if(value.id === id){
        value.active = true;
        this._scope.$digest();
      }
    });

    //todo function that check if next or prev should be called here
    this.subSlickConfig.method.slickGoTo(id - 1)
  }

  onImageUpdate(data){
    this._scope.imageDidUpadte({data:data});
  }

  onImageRemove(data){
    if(data.active === true){
      this._scope.working;
      this.slideTo(data,true);
    }
    this.subSlickIsWorking = true;
    this._timeout(()=>{
      this._scope.imageDidRemove({data:data.id});
      this.subSlickIsWorking = false;
    })
  }

}

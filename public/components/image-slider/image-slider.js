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
        imageDidUpadte: '&'
      },
      template:require('./image-slider.html'),
      controller:imageSliderController,
      controllerAs:'imageSilder'
    }
  })

class imageSliderController{
  constructor($scope,$timeout){
    this.scope = $scope;
    this.slides = this.scope.slides;

    this.subSlickConfig = {
      draggable: false,
      method:{},
    };


    $timeout(()=>{

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
    console.log(id);
    angular.forEach(this.slides,(value)=>{
      if(value.id === id){
        value.active = true;
        this.scope.$digest();
      }
    });
    //todo check if the last id or the first id and call to next or prev
    this.subSlickConfig.method.slickGoTo(id - 1)
  }

  imageDidUpdate(data){
    this.scope.imageDidUpadte({data:data});
  }



}

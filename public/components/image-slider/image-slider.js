import uiBotstrap from "angular-ui-bootstrap";
import ngAnimate from "angular-animate";
import stlye from "./image-slider.less";
import imageSilderCard from "./children/image-slider-card/image-slider-card.js";

export default angular.module('imageSlider',[ngAnimate,uiBotstrap,imageSilderCard.name,'slickCarousel'])
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

    this.loaderSrc = "/assets/film_loader_sq.gif"
    var loader = new Image();
    loader.src = $scope.loaderSrc;

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

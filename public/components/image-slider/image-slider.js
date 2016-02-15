import uiBotstrap from "angular-ui-bootstrap";
import ngAnimate from "angular-animate";
import stlye from "./image-slider.less";
import imageSilderCard from "./children/image-slider-card/image-slider-card.js";

export default angular.module('imageSlider',[ngAnimate,uiBotstrap,imageSilderCard.name,'slickCarousel'])
  .directive('imageSilder',function(){
    return{
      scope:{
        slides:"=",
        working: "="
      },
      template:require('./image-slider.html'),
      controller:imageSliderController,
      controllerAs:'imageSilder'
    }
  })

class imageSliderController{
  constructor($scope,$timeout){
    this.slides = $scope.slides;

    this.subSlickConfig = {
      draggable: false,
      method:{},
    };

    this.loaderSrc = "/assets/film_loader_sq.gif"
    var loader = new Image();
    loader.src = $scope.loaderSrc;

    $timeout(()=>{

      //i know its a little hacky but...
      var arrows = $(".image-slider-container").find("a")
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
    angular.forEach(this.slides,function(value){
      if(value.id === id){
        value.active = true;
      }
    });
    this.subSlickConfig.method.slickGoTo(id - 1)

  }


}

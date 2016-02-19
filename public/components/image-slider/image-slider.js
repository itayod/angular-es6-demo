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
  constructor($scope,$timeout,$interval){

    this._scope = $scope;
    this._timeout = $timeout;
    this._interval = $interval;
    this.slides = this._scope.slides;
    this.currentSlide = 1;
    this.subSlickConfig = {
      draggable: false,
      method:{},
    };
    this._timeout(()=>{

      this.intervalPromise = $interval(()=>{
        this.slideTo(this.currentSlide+1,'next',false,true)
      }, 3000,null,false);
    },100)

    this._scope.$on('$destroy', () =>{
      this.stopInterval()
    });

    this._timeout(()=>{

      //i know its a little hacky but...
      var arrows = $(".image-slider-container")[0].getElementsByClassName('carousel-control')

      //prev arrow
      arrows[0].onclick = ()=>{
        this.slideTo(false,'prev',true);
      }

      //next
      arrows[1].onclick =()=>{
        this.slideTo(false,'next',true);
      }

    });

  }

  stopInterval(){
    this._interval.cancel(this.intervalPromise);
  }

  /**
   *
   * @param {int} id the id to slide to
   * @param {string} action ("next" || "prev")
   * @param interval did interval called the function if not true it will stop the interval.
   */
  slideTo(id,action,skipMain,interval){

    this.updateCurrentSlide(id);

    this.updateSubCarousel(id,action)

    if(!interval || interval ===false){
      this.stopInterval();
    }

    if(!skipMain || skipMain ===false){
      this.updateMainCarousel(id)
    }


  }

  updateCurrentSlide(id){

    if(id === this.slides.length+1){
      this.currentSlide = 1;
    }else{
      this.currentSlide = id;
    }
  }

  //todo better algorithm that check if next or prev should be called here
  updateSubCarousel(id,action){
    if(action === 'next'){
      this.subSlickConfig.method.slickNext()
      return;
    }
    if(action === 'prev'){
      this.subSlickConfig.method.slickPrev()
      return
    }

    this.subSlickConfig.method.slickGoTo(id - 1)
  }

  updateMainCarousel(id){

    angular.forEach(this.slides,(value)=>{
      if(value.id === id){
        value.active = true;
        this._scope.$digest();
      }
    });

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

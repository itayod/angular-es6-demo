import style from "./image-slider-carousel-inner.scss";

export default angular.module('imageSliderCarouselInner',[])
.directive('imageSliderCarouselInner',function(){
    return{
      scope: {
        slide: "="
      },
      template: require("./image-slider-carousel-inner.html")
    }
  }
)


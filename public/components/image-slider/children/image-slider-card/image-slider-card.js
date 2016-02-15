import style from "./image-slide-card.less";

export default angular.module('imageSliderCard',[])
  .directive('imageSilderCard',function(){
    return{
      template: require("./image-slider-card.html"),
      scope:{
        image: '=',
        click: '&'
      }
    }
  })

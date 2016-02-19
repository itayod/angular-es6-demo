import style from "./image-slider-card.scss";

export default angular.module('imageSliderCard',[])
  .directive('imageSilderCard',function(){
    return{
      template: require("./image-slider-card.html"),
      scope:{
        image: '=',
        imageDidSelect: '&',
        imageDidEdit: '&',
        imageDidRemove: '&'
      },
      controller: ImageSliderCardController,
      controllerAs: 'imageSliderCard'
    }
  })


class ImageSliderCardController{

  constructor($scope,$element){
    this.form = {};
    this.scope = $scope;
    this.isEditting = false;

    $element.focusout(()=>{
      if(this.isEditting === true){
        this.isEditting = false;
        if(this.form.$valid){
          this.imageEdited();
        }
      }
    })

    $element.click(()=>{
      setTimeout(()=>{
        if(this.isEditting === false && !this.scope.image.active){
          this.scope.imageDidSelect({value:this.scope.image.id});
        }
      },50)
    })

    $scope.$watch('image.active',(n,o)=>{
      if(o === true && this.isEditting === true){
        this.isEditting = false;
        this.imageEdited();
      }
    })

  }

  editImage(){
    if(this.scope.image.active){
      this.isEditting = !this.isEditting;
    }
  }

  imageEdited(){
    this.form.image.id = this.scope.image.id;
    this.scope.imageDidEdit({data:this.form.image});
  }

  imageDidRemove(e,data){
    e.stopPropagation();
    this.scope.imageDidRemove(data)
  }


}
ImageSliderCardController.$inject=['$scope','$element'];
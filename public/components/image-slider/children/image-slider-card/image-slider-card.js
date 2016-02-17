import style from "./image-slider-card.scss";

export default angular.module('imageSliderCard',[])
  .directive('imageSilderCard',function(){
    return{
      template: require("./image-slider-card.html"),
      scope:{
        image: '=',
        imageDidSelect: '&',
        imageDidEdit: '&'
      },
      controller: ImageSliderCardController,
      controllerAs: 'imageSliderCard'
    }
  })


class ImageSliderCardController{

  constructor($scope,$element){
    this.form = {};
    this.isEditting = false;
    $element.dblclick(()=>{
      if($scope.image.active){
        this.isEditting = true;
        $scope.$digest();
      }
    });

    $element.focusout(()=>{
      if(this.isEditting === true){
        this.isEditting = false;
        if(this.form.$valid){
          this.imageEdited($scope);
        }
      }
    })

    $element.click(()=>{
      setTimeout(()=>{
        if(this.isEditting === false && !$scope.image.active){
          $scope.imageDidSelect({value:$scope.image.id});
        }
      },50)
    })

    $scope.$watch('image.active',(n,o)=>{
      if(o === true && this.isEditting === true){
        this.isEditting = false;
        this.emitImageEdited($scope);
      }
    })

  }

  imageEdited(scope){
    this.form.image.id = scope.image.id;
    scope.imageDidEdit({data:this.form.image});
  }




}


export default angular.module('filePicker',[])
  .directive('filePicker',function(){
    return{
      template:require('./file-picker.html'),
      controller:filePickerController,
      controllerAs:'filePicker',
      scope:{
        onFileSelect:'&'
      }
    }
  });

class filePickerController {

  constructor($element,$scope){
    var filePicker =$element.find('input');

    $(filePicker).change(function(){
      $scope.onFileSelect({data:this.files})
    });

  }

}


export default angular.module('filePicker',[])
  .directive('filePicker',function(){
    return{
      template:require('./file-picker.html'),
      controller:FilePickerController,
      controllerAs:'filePicker',
      scope:{
        onFileSelect:'&',
        required: '@'
      }
    }
  });

class FilePickerController {

  constructor($scope,$element){
    var filePicker =$element.find('input');

    $(filePicker).change(function(){
      $scope.onFileSelect({data:this.files})
    });

  }

}

FilePickerController.$inject=['$scope','$element'];
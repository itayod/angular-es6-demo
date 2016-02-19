import filePicker from "./children/file-picker/file-picker";
import style from "./app-form.scss";

export default angular.module('appForm',[filePicker.name])
  .directive('appForm',function(){
    return{
      template:require('./app-form.html'),
      controller:AppFormController,
      controllerAs:'appForm',
      scope:{
        onFormSubmit:'&'
      }
    }
  });

class AppFormController {

  constructor($scope,$q){
    this.scope = $scope;
    this._q = $q;
    this.form = {};
    this.form.files =[];
    this.fileSelected = false;
  }


  //todo check if file type is image if not give warning.
  fileDidSelect(data){
    this.fileSelected = true;
    var promises = [];

    for(var i=0; i<data.length; i++){
      var promise = this._renderImage(data[i]);
      promises.push(promise)
    }


    this._q.all(promises).then((value)=>{
      for(var i = 0; i < value.length; i++){
        this.form.files.push(value[i]);
      }
    })

  }

  onFormSubmit(data){
    //this.form = {};
    this.scope.onFormSubmit(data)
  }

  _renderImage(image){
    var deffered = this._q.defer();

    var reader = new FileReader();

    reader.onload = (event) =>{
      var url = event.target.result;
      deffered.resolve(url)
    };

    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(image);

    return deffered.promise
  }


}

AppFormController.$inject=['$scope','$q'];
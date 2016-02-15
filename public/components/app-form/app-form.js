import filePicker from "./children/file-picker/file-picker";

export default angular.module('appForm',[filePicker.name])
  .directive('appForm',function(){
    return{
      template:require('./app-form.html'),
      controller:appFormController,
      controllerAs:'appForm',
      scope:{
        onFormSubmit:'&'
      }
    }
  });

class appFormController {

  constructor($q){
    this._q = $q;
    this.form = {};
    this.form.files =[];
  }


  //todo check if file type is image if not give warning.
  fileDidSelect(data){

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
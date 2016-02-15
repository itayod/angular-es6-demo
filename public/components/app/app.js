import angular from "angular";
import style from "./app.less";
import imageListService from "../../services/images-list.js";
import imageSlider from "../image-slider/image-slider.js";
//import filePicker from "../file-picker/file-picker.js";
import appForm from "../app-form/app-form";
import mock from "./model.json";
//

export default angular.module('app',[imageListService.name,imageSlider.name,appForm.name])
  .config(function(imageListProvider){
    if(__DEV__){
      //var images = mock.images || {};
      //imageListProvider.setImageList(mock.images);
    }
  })
  .directive('app',function(){
    return{
      template:require('./app.html'),
      controller:appController,
      controllerAs:"app"
    }
  });

class appController{

  constructor(imageList,$q,$scope){
    this.slides = imageList.getImageList();
    this.working = false;
    this._imageList = imageList;
    this._scope = $scope;
    this._q = $q;
    this.dev =  __DEV__ ? true : false;

  }

  formDidSubmit(data){

    this.working = true;
    var images = [];

    images.push({
      id: this.slides.length +1,
      title: data.title,
      link:data.link,
      description: data.description,
      src:data.files[0],
      active: false
    });

    this.slides = this._imageList.addImages(images);

    setTimeout(()=>{
      this.working = false;
      this._scope.$digest();
    })

  }

  clearStorage(){
    this._imageList.clear(mock);
    location.reload();
  }


}

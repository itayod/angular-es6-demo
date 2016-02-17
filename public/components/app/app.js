import angular from "angular";
import style from "./app.scss";
import imageListService from "../../services/images-list.js";
import imageSlider from "../image-slider/image-slider.js";
import appForm from "../app-form/app-form";
import mock from "./model.json";
//

export default angular.module('app',[imageListService.name,imageSlider.name,appForm.name])
  .config(function(imageListProvider,$localStorageProvider){
    if(__DEV__){
      if(!$localStorageProvider.get('imageList')){
        var images = mock.images || {};
        imageListProvider.setImageList(mock.images);
      }
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

  constructor(imageList,$q,$scope,$timeout){
    this.slides = imageList.getImageList();
    this.working = false;
    this._imageList = imageList;
    this._scope = $scope;
    this._q = $q;
    this._timeout = $timeout;
    this.dev =  __DEV__ ? true : false;

  }

  formDidSubmit(data){

    this.working = true;
    var images = [];
    this.openAppForm = false;

    for(var i=0; i<data.files.length; i++)
    images.push({
      id: this.slides.length +i+1,
      title: data.title,
      link:data.link,
      description: data.description,
      src:data.files[i],
      active: false
    });

    this.slides = this._imageList.addImages(images);

    setTimeout(()=>{
      this.working = false;
      this._scope.$digest();
    })

  }

  onImageUpdate(data){
    this.slides = this._imageList.editImage(data);
  }

  onImageRemove(data){

      this.slides = this._imageList.removeImage(data);

  }


  clearStorage(){
    this._imageList.clear();
    location.reload();
  }


}

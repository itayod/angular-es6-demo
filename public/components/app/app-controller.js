export class AppController{

  constructor($scope,$q,$timeout,imageList){
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

    this.working = true;
    setTimeout(()=>{
      this.working = false;
      this.slides = this._imageList.removeImage(data);
      this._scope.$digest();
    })

  }

  //only for debug mode
  clearStorage(){
    this._imageList.clear();
    location.reload();
  }

}
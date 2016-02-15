import ngStorage from "ngstorage";

export default angular.module('imageList',[ngStorage.name])
.provider('imageList',function($localStorageProvider) {


  this.setImageList = (imageList)=>{
    this.imageList = imageList;
    $localStorageProvider.set('imageList',imageList)
  }


  this.$get = ($localStorage)=>{

    //take from local storage in case we did not set the imageList
    var images = this.imageList || $localStorage.imageList || {};

    return {
      getImageList: function() {
        return images;
      },
      addImages: function(data){
        //todo do it more elegant with like jquery merge
        for(var i=0; i<data.length; i++){
          images.push(data[i]);
        }
        $localStorage.imageList = images;
        return this.getImageList();
      },
      clear: function(){
        $localStorage.$reset()
      }

    };
  }
});


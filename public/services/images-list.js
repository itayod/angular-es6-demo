import ngStorage from "ngstorage";

export default angular.module('imageList',[ngStorage.name])
.provider('imageList',function($localStorageProvider) {


  this.setImageList = (imageList)=>{
    this.imageList = imageList;
    $localStorageProvider.set('imageList',imageList)
  }


  this.$get = ($localStorage)=>{

    //little hack to a mysterious bug
    var lcImages = $localStorage.imageList;
    if($localStorage.imageList) {
      for (var i = 0; i < lcImages.length; i++) {
        if (i == 0) {
          lcImages[i].active = true;
        }
        lcImages[i].active = false;
      }
    }

    //take from local storage in case we did not set the imageList
    var images = this.imageList || lcImages || {};

    return {
      getImageList: function() {
        return images;
      },
      addImages: function(data){
        //todo do it more elegant with like jquery merge
        for(var i=0; i<data.length; i++){
          images.push(data[i]);
          console.log(data[i])
          $localStorage.imageList.push(data[i]);
        }
        return this.getImageList();
      },
      clear: function(){
        $localStorage.$reset()
      }

    };
  }
});


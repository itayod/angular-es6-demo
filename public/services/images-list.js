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
          $localStorage.imageList.push(data[i]);
        }
        return this.getImageList();
      },
      editImage: function(image){

        for(var i=0; i<images.length; i++){
          if(image.id === images[i].id){

            $localStorage.imageList[i].title = images[i].title = image.title;
            $localStorage.imageList[i].description = images[i].description = image.description;
            return this.getImageList();
          }
        }

        console.warn("there is a weird error in the image list");
        return this.getImageList();
      },
      clear: function(){
        $localStorage.$reset()
      }

    };
  }
});


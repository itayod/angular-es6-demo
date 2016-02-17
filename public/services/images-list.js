import ngStorage from "ngstorage";

export default angular.module('imageList',[ngStorage.name])
//todo maybe refactor to just service?
.provider('imageList',function($localStorageProvider) {


  this.setImageList = (imageList)=>{
    this.imageList = imageList;
    $localStorageProvider.set('imageList',imageList)
  }


  this.$get = ($localStorage)=>{

    //little hack for a mysterious bug
    var lcImages = false;
    if($localStorage.imageList) {
      lcImages = updateImagesActive($localStorage.imageList,0)
    }

    function updateImagesActive(arr,index){
      for (var i = 0; i < arr.length; i++) {
        if (i == index) {
          arr[i].active = true;
        }
        arr[i].active = false;
      }
      return arr;
    }


    function updateImagesId(){
      for (var i = 0; i < images.length; i++) {
        images[i].id = i+1;
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
          $localStorage.imageList = images;
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
      removeImage: function(imageId,imageActive){
        images.splice(imageId-1, 1);
        //update the id after we remove image obj from the list
        updateImagesId();
        if(imageActive){
          images = updateImagesActive(imageId-1);
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



function updateImagesActive(arr,index){
  for (var i = 0; i < arr.length; i++) {
    if (i == index) {
      arr[i].active = true;
    }
    arr[i].active = false;
  }
  return arr;
}


function updateImagesId(images){
  for (var i = 0; i < images.length; i++) {
    images[i].id = i+1;
  }
  return images;
}



//take from local storage in case we did not set the imageList
//var images = this.imageList || lcImages || {};



export class ImagesListService {

  constructor(images,$localStorage){
    this._localStorage = $localStorage;

    this.defualtActiveImage = 0;
    this.images = this._localStorage.imageList || images;
    this.images = updateImagesActive(this.images,this.defualtActiveImage);

  }

  getImageList() {
    return this.images;
  }

  addImages(data) {
    //todo do it more elegant with like jquery merge
    for (var i = 0; i < data.length; i++) {
      this.images.push(data[i]);
      this.images = updateImagesActive(this.images,this.defualtActiveImage);
      this._localStorage.imageList = this.images;
      console.log(this.images);
    }
    return this.getImageList();
  }

  editImage(image) {

    for (var i = 0; i < this.images.length; i++) {
      if (image.id === this.images[i].id) {

        this._localStorage.imageList[i].title = this.images[i].title = image.title;
        this._localStorage.imageList[i].description = this.images[i].description = image.description;
        return this.getImageList();
      }
    }

    console.warn("odd error in the image list please check your model");
    return this.getImageList();
  }

  removeImage(imageId) {
    this.images.splice(imageId - 1, 1);

    //init the imageList we remove image obj from the list
    this.images = updateImagesId(this.images);
    this.images = updateImagesActive(this.images,this.defualtActiveImage);

    this._localStorage.imageList = this.images;
    return this.getImageList();
  }

  clear() {
    this._localStorage.$reset()
  }
}
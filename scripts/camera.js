(function($) {
    var imageData = {};

    //success callback for camera init. this allows us to pass extra info into callback
    var camSuccess = function($button, name) {
        return function(data) {
            imageData[name] = data;
            $button.html('<img src="'+data+'" style="width:100px;" />');
        }
    }


    $.camera = function(action, key) {
        if(action === 'get') {
            if(key) {
                return imageData[key];
            }else{
                return '';
            }
        }else if(action === 'clear') {
            //remove all stored images from memory
            imageData = {};
        }else if(action === 'init'){
            $('[data-camera]').each(function(i, ele) {
                $(ele).click(function(e) {
                    e.preventDefault();

                    $this = $(ele);

                    navigator.camera.getPicture(
                        camSuccess($this, $this.data('camera')),
                        function(message) {
                            alert("There was a problem taking the photo: " + message);
                        },
                        {
                            quality: 80,
                            destinationType : Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA, //TODO PHOTOLIBRARY
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 1024, //TODO, adjust sizes as needed. small is good for testing
                            targetHeight: 768,
                            allowEdit : false,
                            cameraDirection: Camera.Direction.BACK,
                            destinationType: Camera.DestinationType.FILE_URI
                        }
                    );

                    return false;
                });
            });
        }

    };

}(jQuery));

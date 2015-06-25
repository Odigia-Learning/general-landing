(function(){

  console.log('app.js');



  function imageLoader(imgs){
    for(var i = 0, x = imgs.length; i < x; i++){
      if(i != 0){
        imgs[i].src = imgs[i].getAttribute('data-src');
      }
    }
  };

  var images = document.getElementsByTagName('img');
  console.log(images);
  if(images && (images.length > 0)){
    imageLoader(images)
  };


})();

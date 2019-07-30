(function(){
    let $image = document.querySelector(".randomQuestion");
    let images = $image.getAttribute('data-imageList').split(',');
    
    const checkImage = path =>
      new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({
          path,
          status: 'ok'
        });
        img.onerror = () => resolve({
          path,
          status: 'error'
        });
    
        img.src = path;
      });
    
    const loadImg = (...paths) => {
      return Promise.all(paths.map(checkImage)).
      then(success => createSlideshow(success));
    }
    
    loadImg(...images)
    
    function createSlideshow(images) {
      console.log("all images loaded")
      let index = 0;
      let $img = document.querySelector(".randomQuestion");
      let duration = $img.getAttribute('data-duration');
    
      let timer = setInterval(() => {
           $img.setAttribute("src", images[index].path);
        index++;
        if (index >= images.length)
          index = 0;
      }, duration);
    
      $img.addEventListener("click", () => {
        clearInterval(timer);
      })
    }
    })();
    
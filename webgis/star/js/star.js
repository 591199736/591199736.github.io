function Star() {





    this.speed = 10;

    this.img = new Image();

    this.img.src = "img/star" + parseInt(Math.random() * 4 + 1) + ".png";

    this.img.style.width = 50 + 'px';

    this.img.style.height = 50 + 'px';

    this.img.style.top = Math.random() * window.innerHeight + 1 + 'px';

    this.img.style.left = Math.random() * window.innerWidth + 1 + 'px';

    document.body.appendChild(this.img);

}



Star.prototype.slip = function () {



    var that = this;

    function move() {

        that.img.style.top = that.img.offsetTop + that.speed + 'px';

        console.log(that.img.offsetTop + "star");

        console.log(window.innerHeight + "window");

        if (that.img.offsetTop > window.innerHeight) {

            clearInterval(sh);

            that.img.style.height = 0;

            that.img.style.width = 0;

        }

    }

    var sh = setInterval(move, 100);

}



setInterval(function () {

    for (var i = 1; i < 5; i++) {

        new Star().slip();

    }

}, 1000) 

  


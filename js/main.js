window.onload = function () {
    //intro music load
    var intro = new sound("assets/intro.mp3");
    //play intro music
    intro.play();
    //get high score from local storage
    var last_score = localStorage.getItem("hscore");

    var high_score = parseFloat(last_score);

    //if high score not number make it 0
    if (isNaN(high_score)) {
        high_score = 0;
    }

    //set the high score to view
    document.getElementById("highscore").innerHTML = high_score;

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
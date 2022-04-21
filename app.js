window.addEventListener("load", function () {
    const song = document.getElementById("song");
    const playButton = document.querySelector(".fa-play")
    const nextButton = document.querySelector(".fa-forward")
    const prevButton = document.querySelector(".fa-backward")
    const swapButton = document.querySelector(".fa-shuffle")
    const remaining = document.querySelector(".player-remaining")
    const duration = document.querySelector(".player-duration")
    const bar = document.querySelector("#progress-bar")
    let playing = true;
    playButton.addEventListener("click", handlerPlay)
    function handlerPlay() {
        if (playing) {
            song.play();
            playing = false;
        } else {
            song.pause();
            playing = true;
        }

    }
})
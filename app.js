window.addEventListener("load", function () {
    const song = document.getElementById("song");
    const playButton = document.querySelector(".fa-play")
    const nextButton = document.querySelector(".fa-forward")
    const prevButton = document.querySelector(".fa-backward")
    const swapButton = document.querySelector(".fa-shuffle")
    const remaining = document.querySelector(".player-remaining")
    const PlayerDuration = document.querySelector(".player-duration")
    const bar = document.querySelector("#progress-bar")
    const video = document.querySelector("#myVideo")
    let playing = true;
    playButton.addEventListener("click", handlerPlay)
    let songIndex = 1;
    function handlerPlay() {
        if (playing) {
            song.play();
            video.play()
            playButton.classList.remove("fa-play");
            playButton.classList.add("fa-pause");
            playing = false;
        } else {
            video.pause()
            song.pause();
            playButton.classList.remove("fa-pause");
            playButton.classList.add("fa-play");
            playing = true;
        }
    }
    nextButton.addEventListener("click", function () {
        handleSong(1);
    });
    prevButton.addEventListener("click", function () {
        handleSong(-1);
    });
    song.addEventListener("ended", function () {
        handleSong(1)
    })
    function handleSong(num) {
        if (num === 1) {
            songIndex++;
            if (songIndex === 11) {
                songIndex = 1
            }
            song.setAttribute("src", `./music/moonlover/Scarlet Heart Ryeo OST Part ${songIndex}.mp3`)
            playing = true
            handlerPlay()
        } else {
            songIndex--;
            if (songIndex === 0) {
                songIndex = 10
            }
            song.setAttribute("src", `./music/moonlover/Scarlet Heart Ryeo OST Part ${songIndex}.mp3`)
            playing = true
            handlerPlay()
        }
    }
    function displayTimer() {
        const { duration, currentTime } = song;
        if (!duration) {
            PlayerDuration.textContent = "0:00"
        } else {

            PlayerDuration.textContent = formatTimer(duration - currentTime)
        }
        remaining.textContent = formatTimer(currentTime)
        bar.max = duration
        bar.value = currentTime
    }
    function formatTimer(number) {
        const minute = Math.floor(number / 60);
        const second = Math.floor(number - minute * 60)
        return `${minute}:${second < 10 ? "0" + second : second}`;
    }
    bar.addEventListener("change", handleBar)
    function handleBar() {
        song.currentTime = bar.value;

    }
    const timer = setInterval(displayTimer, 900);

})
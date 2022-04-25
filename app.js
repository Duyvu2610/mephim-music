window.addEventListener("load", function () {
    /**
 * 1. Render song
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. Next/ Prev
 * 5. Random
 * 6. Next when ended
 * 7. Active Song
 * 8. Scroll active song into view
 * 9. Play Song when click
 */
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const title = $(".feature__info")
    const audio = $("#song")
    const video = $("#myVideo")
    const play = $(".fa-play")
    const shuffle = $(".fa-shuffle")
    const next = $(".fa-forward")
    const prev = $(".fa-backward")
    const progress = $("#progress-bar")
    const durationText = $(".player-duration")
    const currentTimeText = $(".player-remaining")
    const status = $(".feature__status")

    const app = {
        isRandom: false,
        isPlaying: false,
        currentIndex: 0,
        songs: [
            {
                name: "For You",
                singer: "Chen,Baekhyun,Xiumin (EXO)",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 1.mp3",
                image: "./image/moonlover/2147794.jpg",
                index: 0
            },
            {
                name: "Say Yes",
                singer: "Punch, Loco",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 2.mp3",
                image: "./image/moonlover/788082.jpg",
                index: 1
            }, {
                name: "I love you, I remember you",
                singer: "I.O.I",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 3.mp3",
                image: "./image/moonlover/1099287.jpg",
                index: 2
            }, {
                name: "Forgetting you",
                singer: "Davichi",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 4.mp3",
                image: "./image/moonlover/1661270.png",
                index: 3
            }, {
                name: "All with you",
                singer: "Tae Yeon",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 5.mp3",
                image: "./image/moonlover/1661276.jpg",
                index: 4
            }, {
                name: "Can you hear my heart",
                singer: "Epik High",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 6.mp3",
                image: "./image/moonlover/1661278.jpg",
                index: 5
            }, {
                name: "A lot like love",
                singer: "Baek Ah Yeon",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 7.mp3",
                image: "./image/moonlover/1661286.jpg",
                index: 6
            }, {
                name: "I confess",
                singer: "SG Wannabe",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 8.mp3",
                image: "./image/moonlover/1661295.png",
                index: 7
            }, {
                name: "Will be back",
                singer: "Im Sun Hae",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 9.mp3",
                image: "./image/moonlover/2147781.jpg",
                index: 8
            }, {
                name: "My Love",
                singer: "Lee Hi",
                path: "./music/moonlover/Scarlet Heart Ryeo OST Part 10.mp3",
                image: "./image/moonlover/2147793.jpg",
                index: 9
            }
        ],
        render: function () {
            const htmls = this.songs.map((song) => `
            <div class="item">
                <img src="${song.image}" alt="">
                <div class="item__info">
                    <h3 class="songName">${song.name}</h3>
                    <h3 class="songArtist">${song.singer}</h3>
                </div>
            </div>`)
            $(".list__item").innerHTML = htmls.join("")
        },
        defineProperties: function () {
            Object.defineProperty(this, "currentSong", {
                get: function () {
                    return this.songs[this.currentIndex]
                }
            })
        },
        handleEvent: function () {
            // xử lí khi play
            play.onclick = function () {
                if (app.isPlaying) {
                    audio.pause();
                    video.pause();
                } else {
                    audio.play();
                    video.play();
                }
                status.textContent = "Playing.."



            }
            // Khi song được play
            audio.onplay = function () {
                app.isPlaying = true
                play.classList.remove("fa-play")

            }

            // Khi song bi pause
            audio.onpause = function () {
                app.isPlaying = false
                play.classList.add("fa-play")

            }

            // Khi bai hat duoc chay
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }

            }
            // xu li khi tua
            progress.onchange = function (e) {
                audio.currentTime = e.target.value / 100 * audio.duration
            }
            // Khi next song
            next.onclick = function () {
                if (!app.isPlaying) {
                    video.play()
                }
                if (app.isRandom) {
                    app.randomSong()

                } else {
                    app.nextSong();
                }
                audio.play()
            }
            // Khi prev song
            prev.onclick = function () {
                if (!app.isPlaying) {
                    video.play()
                }
                if (app.isRandom) {
                    app.randomSong()
                } else {
                    app.prevSong();
                }
                audio.play()
            }
            // khi het bai se sang bai tiep theo
            audio.onended = function () {
                app.nextSong();
                audio.play()
            }
            // Thoi gian cua bai hat
            audio.onloadedmetadata = function () {
                const time = `${Math.floor(audio.duration / 60)}:${Math.ceil(audio.duration % 60) > 10 ? Math.ceil(audio.duration % 60) : "0" + Math.ceil(audio.duration % 60)}`
                durationText.textContent = time
            }
            // Khi random bai hat
            shuffle.onclick = function () {
                app.isRandom = !app.isRandom;
                shuffle.classList.toggle("isRandom")
            }

        },
        loadCurrentSong: function () {
            title.textContent = this.currentSong.name
            audio.src = this.currentSong.path
        },
        nextSong: function () {
            this.currentIndex++;
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
            this.loadCurrentSong()
        },
        prevSong: function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1;
            } this.loadCurrentSong()

        },
        randomSong: function () {
            let num
            do {
                num = Math.floor(Math.random() * this.songs.length)
            } while (num === this.currentIndex)
            this.currentIndex = num
            this.loadCurrentSong()
        },
        start: function () {
            // Định nghĩa các thuộc tính cho object
            this.defineProperties()

            // Lắng nghe và xử lí các sự kiện
            this.handleEvent()
            // Tải thông tin bài hát vào ui khi chạy ứng dụng
            this.loadCurrentSong()
            // Render playlist
            this.render()
        }
    }
    app.start()
})
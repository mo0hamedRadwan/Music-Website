const MusicURL = "https://files.abdwap2.com/uploads/songs/alan_walker_-_faded.mp3";
const music = new Audio(MusicURL);
music.volume = 0.01;
let index = 1;
// const Array

const songs = [
    {
        id:'1',
        songName: `On My Way <div class="subtitle">Alan Walker</div>`,
        poster: 'images/1.jpg'
    },
    {
        id:'2',
        songName: `Alan Walker-Fade <div class="subtitle">Alan Walker</div>`,
        poster: 'images/2.jpg'
    },
    {
        id:'3',
        songName: `Cartoon-on&on <div class="subtitle">Alan Walker</div>`,
        poster: 'images/3.jpg'
    },
    {
        id:'4',
        songName: `On My Way <div class="subtitle">Alan Walker</div>`,
        poster: 'images/1.jpg'
    },
    {
        id:'5',
        songName: `Alan Walker-Fade <div class="subtitle">Alan Walker</div>`,
        poster: 'images/2.jpg'
    },
    {
        id:'6',
        songName: `Cartoon-on&on <div class="subtitle">Alan Walker</div>`,
        poster: 'images/3.jpg'
    }
]

const songItems = Array.from(document.getElementsByClassName("songItem"));

songItems.forEach((elem , idx) => {
    const songImg   = elem.getElementsByTagName("img")[0];
    const songTitle = elem.getElementsByTagName("h5")[0];
    songImg.src = songs[idx].poster;
    songTitle.innerHTML = songs[idx].songName;
});

const masterPlay = document.getElementById("masterPlay");
const wave       = document.getElementsByClassName("wave")[0];

masterPlay.addEventListener('click' , () => {
    if(music.paused || music.currentTime <= 0){
        music.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add("active2");
    }else{
        music.pause();
        masterPlay.classList.remove("bi-pause-fill");
        masterPlay.classList.add("bi-play-fill");
        wave.classList.remove("active2");
    }
});


const playlistPlay = Array.from(document.getElementsByClassName("playlistPlay"));

const poster_master_player = document.getElementById("poster_master_player");
const title = document.getElementById("title");

const makeAllPlay = () => {
    playlistPlay.forEach((elem) => {
        elem.classList.add("bi-play-circle-fill");
        elem.classList.remove("bi-pause-circle-fill");
    })
}

const makeAllBackground = () => {
    songItems.forEach((elem) => {
        elem.style.backgroundColor = "rgba(105, 105, 170, 0)";
    });
}

playlistPlay.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        index = e.target.id.substr(5);
        makeAllPlay();
        e.target.classList.remove("bi-play-circle-fill");
        e.target.classList.add("bi-pause-circle-fill");
        music.src = "../audio/on_my_way_alanWalker.mp3";
        poster_master_player.src = `images/${(index%3 || 3)}.jpg`;
        music.play();

        let song_title = songs.filter((elem) => {
            return elem.id == index;
        });

        song_title.forEach((elem) => {
            const {songName} = elem;
            // console.log(songName)
            title.innerHTML = songName;
        });

        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add("active2");

        makeAllBackground();
        songItems[index - 1].style.backgroundColor = "rgba(105, 105, 170, 0.1)";
    });
});


const currentStart = document.getElementById("currentStart");
const currentEnd = document.getElementById("currentEnd");
const seek = document.getElementById("seek");
const bar2 = document.getElementById("time_bar");
const dot = document.getElementById("time_dot");

music.addEventListener("timeupdate", () => {
    /// Set Time of Music
    let music_cur = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);

    if(sec < 10)sec = '0' + sec;

    currentEnd.innerText = `${min}:${sec}`;

    min = Math.floor(music_cur/60);
    sec = Math.floor(music_cur%60);

    if(sec < 10)sec = '0' + sec;

    currentStart.innerText = `${min}:${sec}`;

    /// Change timebar 
    let progressBar = parseInt((music_cur / music_dur) * 100);
    seek.value = progressBar;
    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

music.addEventListener('ended' , () => {
    masterPlay.classList.remove("bi-pause-fill");
    masterPlay.classList.add("bi-play-fill");
    wave.classList.remove("active2");
});

const volIcon = document.getElementById("vol_icon");
const vol = document.getElementById("vol");
const vol_bar = document.getElementById("vol_bar");
const vol_dot = document.getElementById("vol_dot");

vol.addEventListener('change', () => {
    const vol_value = vol.value;
    if(vol_value == 0){
        volIcon.classList.remove("bi-volume-down-fill");
        volIcon.classList.remove("bi-volume-up-fill");
        volIcon.classList.add("bi-volume-mute-fill");
    }else if(vol_value > 0 && vol_value <= 50){
        volIcon.classList.add("bi-volume-down-fill");
        volIcon.classList.remove("bi-volume-up-fill");
        volIcon.classList.remove("bi-volume-mute-fill");
    }else{
        volIcon.classList.remove("bi-volume-down-fill");
        volIcon.classList.add("bi-volume-up-fill");
        volIcon.classList.remove("bi-volume-mute-fill");
    }
    music.volume = vol_value / 100;
    vol_bar.style.width = `${vol_value}%`;
    vol_dot.style.left = `${vol_value}%`;
});


const back = document.getElementById("back");
const next = document.getElementById("next");

back.addEventListener('click', () => {
    index--;
    if(index < 1)
        index = songItems.length;

    music.src = "../audio/on_my_way_alanWalker.mp3";
    poster_master_player.src = `images/${(index%3 || 3)}.jpg`;
    music.play();

    let song_title = songs.filter((elem) => {
        return elem.id == index;
    });

    song_title.forEach((elem) => {
        const {songName} = elem;
        // console.log(songName)
        title.innerHTML = songName;
    });

    makeAllPlay();
    document.getElementById(`play-${index}`).classList.remove("bi-play-fill");
    document.getElementById(`play-${index}`).classList.add("bi-pause-fill");
    makeAllBackground();
    songItems[index - 1].style.backgroundColor = "rgba(105, 105, 170, 0.1)";
});

next.addEventListener('click', () => {
    index++;
    if(index > songItems.length)
        index = 1;

    music.src = "../audio/on_my_way_alanWalker.mp3";
    poster_master_player.src = `images/${(index%3 || 3)}.jpg`;
    music.play();

    let song_title = songs.filter((elem) => {
        return elem.id == index;
    });

    song_title.forEach((elem) => {
        const {songName} = elem;
        // console.log(songName)
        title.innerHTML = songName;
    });

    makeAllPlay();
    document.getElementById(`play-${index}`).classList.remove("bi-play-fill");
    document.getElementById(`play-${index}`).classList.add("bi-pause-fill");
    makeAllBackground();
    songItems[index - 1].style.backgroundColor = "rgba(105, 105, 170, 0.1)";
});


const left_scroll = document.getElementById("left_scroll");
const right_scroll = document.getElementById("right_scroll");
const pop_songs = document.getElementsByClassName("pop_songs")[0];

left_scroll.addEventListener('click', () => {
    pop_songs.scrollLeft -= 100;
});

right_scroll.addEventListener('click', () => {
    pop_songs.scrollLeft += 100;
});


const left_scroll_2 = document.getElementById("left_scroll_2");
const right_scroll_2 = document.getElementById("right_scroll_2");
const items = document.getElementsByClassName("items")[0];

left_scroll_2.addEventListener('click', () => {
    items.scrollLeft -= 80;
});

right_scroll_2.addEventListener('click', () => {
    items.scrollLeft += 80;
});
window.onload = () => {
    daytime();
}

setInterval(function daytime() {
    let today = new Date();
    let day = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thrusday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    };

    document.querySelector("#stime").innerHTML = today.getHours() + ":" + today.getMinutes();
    // document.querySelector("#time").innerHTML = today.getHours()+":"+today.getMinutes();
    // document.querySelector("#day").innerHTML = day[today.getDay()];
}, 1000);


function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage =
        "url(" + track_list[track_index].cover + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;

    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);

}

function resetValues() {
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the total duration and the time left
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    }
}


function playlist(track_list) {
    root = document.querySelector(".music-list");
    track_list.map(item => {
        let li = document.createElement('li');
        li.textContent = item.name;
        root.appendChild(li);
    })
}

let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");


let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');

let track_list = [
    { name: "Beggin", path: './Assets/Music/Beggin.mp3', artist: "Mneskin", cover: 'Assets/CoverArt/s1.jpg' },
    { name: "Bohemian Rhapsody", path: './Assets/Music/Bohemian Rhapsody.mp3', artist: "Queens", cover: 'Assets/CoverArt/s2.jpg' },
    { name: "Broken", path: './Assets/Music/Broken.mp3', artist: "LovelytheBand", cover: 'Assets/CoverArt/s3.jpg' },
    { name: "Cheap Thrills", path: './Assets/Music/Cheap Thrills.mp3', artist: "Sia", cover: 'Assets/CoverArt/s4.jpg' },
    { name: "Demons", path: './Assets/Music/Demons.mp3', artist: "Imagine Dragons", cover: 'Assets/CoverArt/s5.jpg' },
    { name: "I want to Break Free", path: './Assets/Music/I want to Break Free.mp3', artist: "Queens", cover: 'Assets/CoverArt/s6.jpg' },
    { name: "Nothin' Breaks Like 💔", path: './Assets/Music/Nothing Breaks Like a Heart.mp3', artist: "Miley Cyrus", cover: 'Assets/CoverArt/s7.jpg' },
    { name: "Sunflower", path: './Assets/Music/Sunflower.mp3', artist: "Post Malone ft.Swae Lee", cover: 'Assets/CoverArt/s8.jpg' },
    { name: "We are the Champions", path: './Assets/Music/We are the Champions.mp3', artist: "Queens", cover: 'Assets/CoverArt/s9.jpg' }
]
playlist(track_list);
loadTrack(track_index);
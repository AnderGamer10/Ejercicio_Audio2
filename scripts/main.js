
const songs = [
    'media/AC-DC.mp3',
    'media/Aretha.mp3',
    'media/Bob Marley.mp3',
    'media/Red Hot Chili Peppers.mp3'
];

const audioEl = document.querySelector('#audio');

let current;

const playAudio = (id) => {
    current = id;
    audioEl.querySelector('source').src = songs[current];
    audioEl.load();
    audioEl.play();
}

document.querySelector('#control-previous').addEventListener('click', (ev) => {
    ev.preventDefault();
    playAudio(current === 0 ? 3 : --current);
});

document.querySelector('#control-next').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playAudio(current === 3 ? 0 : ++current);
});

document.querySelector('#control-play').addEventListener('click', (ev) => {
    ev.preventDefault();
});

document.querySelector('#audio').addEventListener('play', (ev) =>{
    console.log('playing', ev.target);
    document.querySelector('#control-play').textContent = 'pause';
});

document.querySelector('#audio').addEventListener('pause', (ev) =>{
    console.log('pausing', ev.target);
});

//document.querySelector('#audio').addEventListener('play', (ev) => {console.log('playing', ev.target);});

const neatTime = (time) => {
    // const hours = Math.floor((time % 86400) / 3600)
    const minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${minutes}:${seconds}`;
};

const progressFill = document.querySelector('.progress-filled');
const textCurrent = document.querySelector('.time-current');

audioEl.addEventListener('timeupdate', (ev) => {
    progressFill.style.width = `${audioEl.currentTime / audioEl.duration * 100}%`;
    textCurrent.textContent = `${neatTime(audioEl.currentTime)} / ${neatTime(audioEl.duration)}`;
});





const speedBtns = document.querySelectorAll('.speed-item');

speedBtns.forEach(speedBtn => {
    speedBtn.addEventListener('click', (ev) => {
        audioEl.playbackRate = ev.target.dataset.speed;
        speedBtns.forEach((item) => item.classList.remove('active'));
        ev.target.classList.add('active');
    });
});

window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case ' ':
            if (audioEl.paused) {
                audioEl.play();
            } else {
                audioEl.pause();
            }
            break;
        case 'ArrowRight':
            audioEl.currentTime += 5;
            break;
        case 'ArrowLeft':
            audioEl.currentTime -= 5;
            break;
    }
});

const volumeBtn = document.querySelector('#control-volume');
const volumeSlider = document.querySelector('.volume-slider');
const volumeFill = document.querySelector('.volume-filled');
let lastVolume = 1;

const syncVolume = (volume) => {
    if (volume > 0.5) {
        volumeBtn.textContent = 'volume_up';
    } else if (volume < 0.5 && volume > 0) {
        volumeBtn.textContent = 'volume_down';
    } else if (volume === 0) {
        volumeBtn.textContent = 'volume_mute';
    }
};

volumeBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (audioEl.volume) {
        lastVolume = audioEl.volume;
        audioEl.volume = 0;
        volumeBtn.textContent = 'volume_mute';
        volumeFill.style.width = '0';
    } else {
        audioEl.volume = lastVolume;
        syncVolume(audioEl.volume);
        volumeFill.style.width = `${audioEl.volume * 100}%`;
    }
});

volumeSlider.addEventListener('click', (ev) => {
    let volume = ev.offsetX / volumeSlider.offsetWidth;
    volume < 0.1 ? volume = 0 : volume;
    volumeFill.style.width = `${volume * 100}%`;
    audioEl.volume = volume;
    syncVolume(volume);
    lastVolume = volume;
});
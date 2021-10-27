
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
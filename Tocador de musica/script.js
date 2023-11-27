const songName = document.getElementById('song-name');
const song = document.getElementById('audio1');
const play = document.getElementById('play');

songName.innerText = 'Aquecendo a Nave';

function playSong(){
    song.play();
}
play.addEventListener('click',playSong)
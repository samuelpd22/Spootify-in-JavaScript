const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previus = document.getElementById('previus');


const aquecendoANave = {
    songName:  'Aquecendo a Nave',
    artist:'Duzz',
    file: 'meta'
};
const metamorfoseAvalanche = {
    songName:  'Metamorfose Avalanche',
    artist:'Duzz',
    file: 'nave'
};


let isPlaying = false;
const playlist = [aquecendoANave, metamorfoseAvalanche];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}
function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}
function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    
    } else {
        playSong();
    }
}
function initializeSong(){
    cover.src = `imagens/${playlist[index].file}.webp`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}
function previusSong(){
    if(index === 0  ){
        index = playlist.length -1;
    } else {
        index =  index -1;
    }
    initializeSong();
    playSong();

}
function nextSong(){
    if(index === 0  ){
        index = playlist.length -1;
    } else {
        index +=  0;
    }
    initializeSong();
    playSong();
    

}

initializeSong();

play.addEventListener('click',playPauseDecider);
previus.addEventListener('click',previusSong)
next.addEventListener('click', nextSong)

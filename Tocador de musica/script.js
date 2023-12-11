const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previus = document.getElementById('previus');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


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
let isShuffled = false;
const originalPlaylist = [aquecendoANave, metamorfoseAvalanche];
let sortedPlaylist = [...originalPlaylist];
let index = 0;
let repeatOn = false;


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
    cover.src = `imagens/${sortedPlaylist[index].file}.webp`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}
function previusSong(){
    if(index === 0  ){
        index = sortedPlaylist.length -1;
    } else {
        index =  index -1;
    }
    initializeSong();
    playSong();

}
function nextSong(){
    if(index === 0  ){
        index = sortedPlaylist.length -1;
    } else {
        index +=  0;
    }
    initializeSong();
    playSong();
    

}
function updateProgress(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);

}
function jumTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;

}
function shuffleArray(preShuffleArray){
    let size = preShuffleArray.length;
    const currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
         isShuffled = true;
         shuffleArray(sortedPlaylist);
         shuffleButton.classList.add('button-active');
    } else {
          isShuffled = false;
          sortedPlaylist = [...originalPlaylist];
          shuffleButton.classList.remove('button-active');
    }    
}


function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}
function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    } else {
        playSong();
    }
}
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min*60);

    return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}` ;
}
function updateCurrentTime(){
    songTime.innerText = toHHMMSS(song.currentTime);

}
function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);
    
}
initializeSong();

play.addEventListener('click',playPauseDecider);
previus.addEventListener('click',previusSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate',updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);

progressContainer.addEventListener('click',jumTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
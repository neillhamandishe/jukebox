// Dummy data of available CDs, ideally this would come from the backend
const albums = [
    {
        id: 1,
        name: '21',
        artist: 'Adele',
        trackCount: 12,
        imgUrl: './img/adele_21.png',
        tracks: [
            {
                id: 1,
                name: "Rolling In The Deep",
                duration: "3.49"
            },
            {
                id: 2,
                name: "Rumour Has It",
                duration: "3.43"
            },
            {
                id: 3,
                name: "Turning Tables",
                duration: "4.10"
            },
            {
                id: 4,
                name: "Don't You Remember",
                duration: "4.03"
            },
            {
                id: 5,
                name: "Set Fire To The Rain",
                duration: "4.01"
            },
            {
                id: 6,
                name: "He Won't Go",
                duration: "4.37"
            },

        ]
    },
    {
        id: 2,
        name: 'Strange Trails',
        artist: 'Lord Huron',
        trackCount: 14,
        imgUrl: './img/lord_huron_strangertrails.jpg',
        tracks: [
            {
                id: 14,
                name: "The Night We Met",
                duration: "3.28"
            }
        ]
    },
    {
        id: 3,
        name: 'Back From The Edge',
        artist: 'James Arthur',
        trackCount: 14,
        imgUrl: './img/james_arthur_backfromtheedge.jpg',
        tracks: [
            {
                id: 1,
                name: "Back From The Edge",
                duration: "3.54"
            },
            {
                id: 2,
                name: "Say You Won't Let Go",
                duration: "3.31"
            },
            {
                id: 3,
                name: "Prisoner",
                duration: "3.58"
            },
            {
                id: 4,
                name: "Can I Be Him",
                duration: "4.06"
            },
            {
                id: 5,
                name: "I Am",
                duration: "3.11"
            },
        ]
    },
    {
        id: 4,
        name: 'Equals',
        artist: 'Ed Sheeran',
        trackCount: 7,
        imgUrl: './img/ed_sheeran_equals.jpg',
        tracks: [
            {
                id: 1,
                name: "Tides",
                duration: "3.21"
            },
            {
                id: 2,
                name: "Shivers",
                duration: "3.34"
            },
            {
                id: 3,
                name: "First Times",
                duration: "3.12"
            },
            {
                id: 4,
                name: "Bad Habits",
                duration: "3.56"
            },
        ]
    },
    {
        id: 5,
        name: 'Breach',
        artist: 'Lewis Capaldi',
        trackCount: 7,
        imgUrl: './img/lewis_capaldi_breach.jpg',
        tracks: [
            {
                id: 1,
                name: "Someone You Loved",
                duration: "3.21"
            },
            {
                id: 2,
                name: "Bruises",
                duration: "3.34"
            },
            
        ]
    },

];
let selectedAlbum = {
    id: null,
    name: '',
    trackCount: 0
}
let playlist = [];

// UI Elements
const nowPlayingTitle = document.querySelector('.song-meta>.album-title');
const nowPlayingArtist = document.querySelector('.song-meta>.album-artist');
const nowPlayingArt = document.querySelector('.right>.album-cover');
const playlistUI = document.querySelector('.playlist');
const libraryGrid = document.querySelector('#library-grid');
const albumCards = [];
const searchInput = document.querySelector('#q');
const libraryTitle = document.querySelector('#library-title');
const searchForm = document.querySelector('#search-form');

// UI Layout Helpers
const layoutPlaylist = function(selectedAlbum){
    if(selectedAlbum){
        playlistUI.innerHTML = '';
        // create play item nodes
        selectedAlbum.tracks.forEach(track => {
            const trackItem = document.createElement('li');
            trackItem.setAttribute('class', 'play-item');
            trackItem.innerHTML = `${track.id}. ${track.name}`;
            playlistUI.appendChild(trackItem);
        });    
    }
}
const layoutNowPlaying = function (id){
    let selectedId;
    if (id){
        selectedId = id;
    }else{
        selectedId = Math.round(Math.random() * albums.length+1);
    }
    selectedAlbum = albums[selectedId];
    if(selectedAlbum){
        playlist = selectedAlbum.tracks;     
        // layout nowplaying
        nowPlayingTitle.innerHTML = selectedAlbum.name;
        nowPlayingArtist.innerHTML = selectedAlbum.artist;
        nowPlayingArt.setAttribute('src', selectedAlbum.imgUrl);
        layoutPlaylist(selectedAlbum);
    }
}

const layoutLibrary = function (albums){
    libraryGrid.innerHTML = '';
    albums.forEach(album =>{
        const albumItem = document.createElement('div');
        albumItem.className = 'album-card';
        albumItem.innerHTML = `
        <img src="${album.imgUrl}" alt="album art" class="album-art" />
            <div class="album-info">
            <h4 class="title">${album.name}</h4>
            <p class="artist">${album.artist}</p>
            <p class="track-count">${album.trackCount}</p>
        </div>
        `;
        albumItem.setAttribute('data-trackId', album.id);
        albumItem.setAttribute('data-artist', album.artist.toLowerCase());
        albumItem.setAttribute('data-album', album.name.toLowerCase());
        // albumItem.addEventListener('click', changeTrack(album.id));
        libraryGrid.appendChild(albumItem);
    });
}

const isEmpty = (str)=>{
    return str.trim() === "";
}
const filter = (q)=>{
    const albumNodes = document.querySelectorAll('.album-card');
    albumNodes.forEach(node =>{
        const {artist, album} = node.dataset;
        const wanted = album.includes(q.toLowerCase()) || artist.includes(q.toLowerCase());
        if(!wanted) node.style.display = 'none';
    });
}
const resetLibrary = ()=>{
    const albumNodes = document.querySelectorAll('.album-card');
    albumNodes.forEach(node =>{
        node.style.display = 'grid';
    });
}
const handleSearch = function(){
    const q = searchInput.value
    if(!isEmpty(q)){
        filter(q);
        libraryTitle.innerText = 'Results';
    }else{
        resetLibrary();
        libraryTitle.innerText = 'Library';
    }
}

document.addEventListener('DOMContentLoaded', function (){
    layoutNowPlaying();
    layoutLibrary(albums);
    console.log('domcontentloaded');
});
searchInput.addEventListener('input', handleSearch);
searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    handleSearch();
});
const changeTrack = (e)=>{
    console.log(e);
}
window.addEventListener('load', function(){
    const albumCards = document.querySelectorAll('.album-card');
    albumCards.forEach(card=>{
        card.addEventListener('click', changeTrack, true);
    })
});
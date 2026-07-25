// Spotify Clone - Vanilla JavaScript
// Complete Music Player Application

// ==================== APP STATE ====================
const appState = {
    albums: [],
    currentAlbumIndex: 0,
    songs: [],
    currentSongIndex: 0,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0, // 0: no repeat, 1: repeat all, 2: repeat one
    volume: 70,
    likedSongs: [],
    recentlyPlayed: [],
    playlists: [],
    currentSection: 'home',
    searchResults: { albums: [], songs: [] },
    theme: 'dark' // 'dark' or 'light'
};

// ==================== DOM ELEMENTS ====================
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration-time');
const volumeSlider = document.getElementById('volume-slider');
const volumeBtn = document.getElementById('volume-btn');
const volumePercent = document.getElementById('volume-percent');
const albumsGrid = document.getElementById('albums-grid');
const playerCover = document.getElementById('player-cover');
const playerSongName = document.getElementById('player-song-name');
const playerArtistName = document.getElementById('player-artist-name');
const recentlyPlayedGrid = document.getElementById('recently-played');

// Navigation elements
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');
const topSearch = document.getElementById('top-search');
const themeToggleBtn = document.getElementById('theme-toggle');

// Search elements
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Playlist elements
const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistModal = document.getElementById('playlist-modal');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalCreate = document.getElementById('modal-create');
const playlistNameInput = document.getElementById('playlist-name');
const playlistsContainer = document.getElementById('playlists-container');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
    loadFromLocalStorage();
    initializeTheme();
    await loadAlbums();
    setupEventListeners();
    updatePlayer();
});

// ==================== THEME MANAGEMENT ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('spotifyTheme') || 'dark';
    appState.theme = savedTheme;
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'light') {
        html.classList.add('light-theme');
        appState.theme = 'light';
        themeToggleBtn.textContent = '🌞';
        themeToggleBtn.title = 'Switch to Dark Mode';
    } else {
        html.classList.remove('light-theme');
        appState.theme = 'dark';
        themeToggleBtn.textContent = '🌙';
        themeToggleBtn.title = 'Switch to Light Mode';
    }
    
    localStorage.setItem('spotifyTheme', theme);
}

function toggleTheme() {
    const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// ==================== LOAD ALBUMS ====================
async function loadAlbums() {
    try {
        // Scan for albums in the songs folder
        const albumFolders = ['album1', 'album2', 'album3'];
        
        for (const folder of albumFolders) {
            try {
                const response = await fetch(`./songs/${folder}/info.json`);
                if (response.ok) {
                    const albumData = await response.json();
                    const album = {
                        id: folder,
                        title: albumData.title || 'Unknown Album',
                        artist: albumData.artist || 'Various Artists',
                        description: albumData.description || '',
                        cover: `./songs/${folder}/${albumData.cover || 'cover.svg'}`,
                        folderPath: `./songs/${folder}`,
                        songs: []
                    };
                    
                    appState.albums.push(album);
                } else {
                    // Create default album if info.json doesn't exist
                    const album = {
                        id: folder,
                        title: folder.replace(/([A-Z])/g, ' $1').trim(),
                        artist: 'Various Artists',
                        description: 'Album',
                        cover: generateDefaultCover(),
                        folderPath: `./songs/${folder}`,
                        songs: []
                    };
                    appState.albums.push(album);
                }
            } catch (error) {
                console.log(`Album ${folder} could not be loaded`);
            }
        }
        
        displayAlbums();
    } catch (error) {
        console.error('Error loading albums:', error);
    }
}

// ==================== LOAD SONGS FOR ALBUM ====================
async function loadSongsForAlbum(albumIndex) {
    const album = appState.albums[albumIndex];
    const songs = [];
    
    // Try to load songs list from JSON or detect from folder
    const songNames = generateDefaultSongList();
    
    for (let i = 0; i < songNames.length; i++) {
        const song = {
            id: `${album.id}-song-${i + 1}`,
            name: songNames[i],
            artist: album.artist,
            duration: Math.floor(Math.random() * 300) + 120, // Random duration 120-420 seconds
            url: `./songs/${album.id}/songs/song${i + 1}.mp3`,
            cover: album.cover,
            albumId: album.id
        };
        songs.push(song);
    }
    
    album.songs = songs;
    appState.songs = songs;
    return songs;
}

// ==================== DISPLAY FUNCTIONS ====================
function displayAlbums() {
    albumsGrid.innerHTML = '';
    
    appState.albums.forEach((album, index) => {
        const albumCard = createAlbumCard(album, index);
        albumsGrid.appendChild(albumCard);
    });
}

function createAlbumCard(album, index) {
    const card = document.createElement('div');
    card.className = 'album-card';
    card.innerHTML = `
        <div class="album-cover-container">
            <img src="${album.cover}" alt="${album.title}" class="album-cover" onerror="this.src='${generateDefaultCover()}'">
            <div class="play-button-overlay">▶</div>
        </div>
        <div class="album-info">
            <div class="album-title">${album.title}</div>
            <div class="album-artist">${album.artist}</div>
        </div>
    `;
    
    card.addEventListener('click', () => showAlbumDetail(index));
    card.querySelector('.play-button-overlay').addEventListener('click', (e) => {
        e.stopPropagation();
        playFirstSongOfAlbum(index);
    });
    
    return card;
}

function showAlbumDetail(albumIndex) {
    appState.currentAlbumIndex = albumIndex;
    showSection('album-detail-section');
    
    const album = appState.albums[albumIndex];
    document.getElementById('album-detail-title').textContent = album.title;
    
    loadSongsForAlbum(albumIndex).then(() => {
        displayAlbumSongs();
    });
}

function displayAlbumSongs() {
    const container = document.getElementById('album-songs-list');
    container.innerHTML = '';
    
    appState.songs.forEach((song, index) => {
        const songItem = createSongItem(song, index);
        container.appendChild(songItem);
    });
}

function createSongItem(song, index) {
    const item = document.createElement('div');
    item.className = 'song-item';
    if (appState.currentSongIndex === index && appState.isPlaying) {
        item.classList.add('playing');
    }
    
    item.innerHTML = `
        <img src="${song.cover}" alt="${song.name}" class="song-cover" onerror="this.src='${generateDefaultCover()}'">
        <div class="song-info">
            <div class="song-name">${song.name}</div>
            <div class="song-artist">${song.artist}</div>
        </div>
        <span class="song-duration">${formatTime(song.duration)}</span>
        <button class="song-play-btn">▶</button>
    `;
    
    item.addEventListener('click', () => playSong(index));
    return item;
}

function displayLikedSongs() {
    const container = document.getElementById('liked-songs-list');
    container.innerHTML = '';
    
    if (appState.likedSongs.length === 0) {
        container.innerHTML = '<p style="color: #B3B3B3;">No liked songs yet. Heart songs to add them here!</p>';
        return;
    }
    
    appState.likedSongs.forEach(songId => {
        const song = findSongById(songId);
        if (song) {
            const item = createSongItem(song, appState.songs.indexOf(song));
            container.appendChild(item);
        }
    });
}

function displayRecentlyPlayed() {
    recentlyPlayedGrid.innerHTML = '';
    
    const recentAlbums = appState.recentlyPlayed.slice(0, 6).map(albumId => 
        appState.albums.find(a => a.id === albumId)
    ).filter(Boolean);
    
    recentAlbums.forEach((album, index) => {
        const albumCard = createAlbumCard(album, appState.albums.indexOf(album));
        recentlyPlayedGrid.appendChild(albumCard);
    });
}

// ==================== MUSIC PLAYER FUNCTIONS ====================
function playMusic() {
    if (appState.songs.length === 0) {
        alert('Please select an album first');
        return;
    }
    
    const currentSong = appState.songs[appState.currentSongIndex];
    audioPlayer.src = currentSong.url;
    audioPlayer.play().catch(error => {
        console.log('Playback error - No audio file available');
        simulateAudioPlayback();
    });
    
    appState.isPlaying = true;
    playBtn.textContent = '⏸';
    updatePlayerDisplay();
    addToRecentlyPlayed(currentSong.albumId);
}

function pauseMusic() {
    audioPlayer.pause();
    appState.isPlaying = false;
    playBtn.textContent = '▶';
}

function togglePlayPause() {
    if (appState.isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playSong(index) {
    if (index < 0 || index >= appState.songs.length) return;
    
    appState.currentSongIndex = index;
    audioPlayer.currentTime = 0;
    playMusic();
    updateHighlightedSong();
}

function playFirstSongOfAlbum(albumIndex) {
    appState.currentAlbumIndex = albumIndex;
    loadSongsForAlbum(albumIndex).then(() => {
        appState.currentSongIndex = 0;
        playMusic();
    });
}

function nextSong() {
    if (appState.songs.length === 0) return;
    
    if (appState.isShuffle) {
        appState.currentSongIndex = Math.floor(Math.random() * appState.songs.length);
    } else {
        appState.currentSongIndex = (appState.currentSongIndex + 1) % appState.songs.length;
    }
    
    playSong(appState.currentSongIndex);
}

function previousSong() {
    if (appState.songs.length === 0) return;
    
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
    } else {
        appState.currentSongIndex = (appState.currentSongIndex - 1 + appState.songs.length) % appState.songs.length;
        playSong(appState.currentSongIndex);
    }
}

function toggleShuffle() {
    appState.isShuffle = !appState.isShuffle;
    shuffleBtn.classList.toggle('active', appState.isShuffle);
}

function toggleRepeat() {
    appState.repeatMode = (appState.repeatMode + 1) % 3;
    repeatBtn.classList.toggle('active', appState.repeatMode > 0);
    
    if (appState.repeatMode === 2) {
        repeatBtn.style.opacity = '1';
        repeatBtn.textContent = '🔂';
    } else {
        repeatBtn.textContent = '🔁';
    }
}

function updatePlayerDisplay() {
    if (appState.songs.length === 0) return;
    
    const song = appState.songs[appState.currentSongIndex];
    playerCover.src = song.cover;
    playerCover.onerror = () => { playerCover.src = generateDefaultCover(); };
    playerSongName.textContent = song.name;
    playerArtistName.textContent = song.artist;
    
    updateHighlightedSong();
}

function updateHighlightedSong() {
    document.querySelectorAll('.song-item').forEach((item, index) => {
        item.classList.toggle('playing', index === appState.currentSongIndex);
    });
}

function updatePlayer() {
    const duration = audioPlayer.duration || 0;
    const currentTime = audioPlayer.currentTime || 0;
    const progress = (currentTime / duration) * 100 || 0;
    
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function seekTo(e) {
    if (appState.songs.length === 0) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * audioPlayer.duration;
    
    audioPlayer.currentTime = newTime;
}

function changeVolume(value) {
    appState.volume = value;
    audioPlayer.volume = value / 100;
    volumePercent.textContent = value + '%';
    volumeBtn.textContent = value == 0 ? '🔇' : value < 50 ? '🔉' : '🔊';
    saveToLocalStorage();
}

function toggleMute() {
    if (appState.volume > 0) {
        changeVolume(0);
    } else {
        changeVolume(70);
    }
}

function addToLikedSongs(songId) {
    if (!appState.likedSongs.includes(songId)) {
        appState.likedSongs.push(songId);
        saveToLocalStorage();
    }
}

function removeFromLikedSongs(songId) {
    appState.likedSongs = appState.likedSongs.filter(id => id !== songId);
    saveToLocalStorage();
}

function isLiked(songId) {
    return appState.likedSongs.includes(songId);
}

function addToRecentlyPlayed(albumId) {
    if (appState.recentlyPlayed[0] !== albumId) {
        appState.recentlyPlayed.unshift(albumId);
        appState.recentlyPlayed = appState.recentlyPlayed.slice(0, 20);
        saveToLocalStorage();
        displayRecentlyPlayed();
    }
}

// ==================== SEARCH FUNCTIONS ====================
function searchContent(query) {
    if (!query.trim()) {
        searchResults.innerHTML = '<div class="no-results">Start typing to search...</div>';
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const albumMatches = appState.albums.filter(album =>
        album.title.toLowerCase().includes(lowerQuery) ||
        album.artist.toLowerCase().includes(lowerQuery)
    );
    
    let allSongs = [];
    appState.albums.forEach(album => {
        allSongs = allSongs.concat(album.songs);
    });
    
    const songMatches = allSongs.filter(song =>
        song.name.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery)
    );
    
    let html = '';
    
    if (albumMatches.length > 0) {
        html += '<div style="margin-bottom: 30px;"><div class="section-title">Albums</div><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">';
        albumMatches.forEach((album, index) => {
            html += `
                <div class="album-card" onclick="showAlbumDetail(${appState.albums.indexOf(album)})">
                    <div class="album-cover-container">
                        <img src="${album.cover}" alt="${album.title}" class="album-cover" onerror="this.src='${generateDefaultCover()}'">
                        <div class="play-button-overlay">▶</div>
                    </div>
                    <div class="album-info">
                        <div class="album-title">${album.title}</div>
                        <div class="album-artist">${album.artist}</div>
                    </div>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (songMatches.length > 0) {
        html += '<div style="margin-bottom: 30px;"><div class="section-title">Songs</div><div class="songs-list">';
        songMatches.slice(0, 10).forEach((song, index) => {
            const songIndex = appState.songs.indexOf(song);
            html += `
                <div class="song-item" onclick="playSong(${songIndex})">
                    <img src="${song.cover}" alt="${song.name}" class="song-cover" onerror="this.src='${generateDefaultCover()}'">
                    <div class="song-info">
                        <div class="song-name">${song.name}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                    <span class="song-duration">${formatTime(song.duration)}</span>
                    <button class="song-play-btn">▶</button>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    if (albumMatches.length === 0 && songMatches.length === 0) {
        html = '<div class="no-results">No results found</div>';
    }
    
    searchResults.innerHTML = html;
}

function findSongById(songId) {
    for (const album of appState.albums) {
        const song = album.songs.find(s => s.id === songId);
        if (song) return song;
    }
    return null;
}

// ==================== SECTION NAVIGATION ====================
function showSection(sectionId) {
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    navItems.forEach(item => item.classList.remove('active'));
    const navItem = document.querySelector(`[data-section="${sectionId.replace('-section', '')}"]`);
    if (navItem) navItem.classList.add('active');
    
    if (sectionId === 'liked-section') {
        displayLikedSongs();
    } else if (sectionId === 'search-section') {
        searchInput.focus();
    }
}

// ==================== PLAYLIST FUNCTIONS ====================
function createPlaylist() {
    const name = playlistNameInput.value.trim();
    if (!name) {
        alert('Please enter a playlist name');
        return;
    }
    
    const playlist = {
        id: 'playlist-' + Date.now(),
        name: name,
        songs: []
    };
    
    appState.playlists.push(playlist);
    saveToLocalStorage();
    playlistNameInput.value = '';
    closePlaylistModal();
    displayPlaylists();
}

function displayPlaylists() {
    playlistsContainer.innerHTML = '';
    appState.playlists.forEach(playlist => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.textContent = playlist.name;
        item.addEventListener('click', () => showPlaylist(playlist.id));
        playlistsContainer.appendChild(item);
    });
}

function showPlaylist(playlistId) {
    alert('Playlist: ' + appState.playlists.find(p => p.id === playlistId).name);
}

function openPlaylistModal() {
    playlistModal.classList.add('active');
    playlistNameInput.focus();
}

function closePlaylistModal() {
    playlistModal.classList.remove('active');
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Player controls
    playBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', previousSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    // Volume controls
    volumeSlider.addEventListener('input', (e) => changeVolume(e.target.value));
    volumeBtn.addEventListener('click', toggleMute);
    
    // Progress bar
    progressBar.addEventListener('click', seekTo);
    audioPlayer.addEventListener('timeupdate', updatePlayer);
    audioPlayer.addEventListener('ended', autoPlayNext);
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const section = item.dataset.section;
            if (section) {
                showSection(section + '-section');
            }
        });
    });
    
    // Back/Forward buttons
    backBtn.addEventListener('click', () => history.back());
    forwardBtn.addEventListener('click', () => history.forward());
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Search
    searchInput.addEventListener('input', (e) => searchContent(e.target.value));
    topSearch.addEventListener('input', (e) => searchContent(e.target.value));
    
    // Playlist modal
    createPlaylistBtn.addEventListener('click', openPlaylistModal);
    modalClose.addEventListener('click', closePlaylistModal);
    modalCancel.addEventListener('click', closePlaylistModal);
    modalCreate.addEventListener('click', createPlaylist);
    
    playlistNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createPlaylist();
    });
    
    // Back to albums
    document.getElementById('back-to-albums').addEventListener('click', () => {
        showSection('home-section');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Set initial volume
    changeVolume(appState.volume);
    displayPlaylists();
}

function autoPlayNext() {
    if (appState.repeatMode === 2) {
        audioPlayer.currentTime = 0;
        playMusic();
    } else {
        nextSong();
    }
}

function handleKeyboardShortcuts(e) {
    if (e.target === searchInput || e.target === topSearch) return;
    
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSong();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousSong();
            break;
        case 'ArrowUp':
            e.preventDefault();
            changeVolume(Math.min(100, appState.volume + 10));
            break;
        case 'ArrowDown':
            e.preventDefault();
            changeVolume(Math.max(0, appState.volume - 10));
            break;
    }
}

// ==================== UTILITY FUNCTIONS ====================
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function generateDefaultCover() {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23181818' width='200' height='200'/%3E%3Crect fill='%231DB954' x='40' y='60' width='15' height='80'/%3E%3Crect fill='%231DB954' x='70' y='40' width='15' height='100'/%3E%3Crect fill='%231DB954' x='100' y='50' width='15' height='90'/%3E%3Crect fill='%231DB954' x='130' y='30' width='15' height='110'/%3E%3Crect fill='%231DB954' x='160' y='70' width='15' height='70'/%3E%3C/svg%3E";
}

function generateDefaultSongList() {
    return [
        'Midnight Dreams',
        'Neon Lights',
        'Electric Heartbeat',
        'Cosmic Journey',
        'Summer Vibes',
        'Ocean Waves',
        'Mountain Echo',
        'City Lights'
    ];
}

function simulateAudioPlayback() {
    // Simulate playback when audio files aren't available
    const duration = 180; // 3 minutes
    let elapsed = 0;
    
    const interval = setInterval(() => {
        if (!appState.isPlaying) {
            clearInterval(interval);
            return;
        }
        
        elapsed += 0.1;
        audioPlayer.currentTime = elapsed;
        
        if (elapsed >= duration) {
            clearInterval(interval);
            autoPlayNext();
        }
    }, 100);
}

// ==================== LOCAL STORAGE ====================
function saveToLocalStorage() {
    const dataToSave = {
        likedSongs: appState.likedSongs,
        recentlyPlayed: appState.recentlyPlayed,
        playlists: appState.playlists,
        volume: appState.volume,
        theme: appState.theme
    };
    localStorage.setItem('spotifyCloneData', JSON.stringify(dataToSave));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('spotifyCloneData');
    if (saved) {
        const data = JSON.parse(saved);
        appState.likedSongs = data.likedSongs || [];
        appState.recentlyPlayed = data.recentlyPlayed || [];
        appState.playlists = data.playlists || [];
        appState.volume = data.volume || 70;
        appState.theme = data.theme || 'dark';
    }
}

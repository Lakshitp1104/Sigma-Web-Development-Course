# 🎵 Spotify Clone - Complete Music Player

A fully functional Spotify clone built with vanilla HTML, CSS, and JavaScript. No external frameworks or libraries required!

## ✨ Features

### 🎼 Core Music Features
- ✅ Play/Pause/Next/Previous controls
- ✅ Shuffle and Repeat modes
- ✅ Volume control with mute button
- ✅ Progress bar with seeking
- ✅ Time display (current time / total duration)
- ✅ Auto-play next song
- ✅ Highlight currently playing song

### 🎨 UI/UX Features
- ✅ Modern Spotify-inspired dark theme
- ✅ Fully responsive design (Desktop, Tablet, Mobile)
- ✅ Smooth animations and transitions
- ✅ Hover effects on cards
- ✅ Glassmorphism player design
- ✅ Dark scrollbar styling

### 📂 Album Management
- ✅ Dynamic album loading from folders
- ✅ Album covers and metadata
- ✅ Song list display per album
- ✅ Click to play songs instantly

### 🔍 Search Functionality
- ✅ Live search for albums and songs
- ✅ Real-time filtering
- ✅ Search results display

### 📱 Navigation
- ✅ Sidebar with menu items
- ✅ Home, Search, Library, Liked Songs
- ✅ Create Playlist (with modal)
- ✅ Back/Forward navigation buttons
- ✅ Top search bar

### ⌨️ Keyboard Shortcuts
- `Space` - Play/Pause
- `→` (Right Arrow) - Next Song
- `←` (Left Arrow) - Previous Song
- `↑` (Up Arrow) - Volume Up
- `↓` (Down Arrow) - Volume Down

### 💾 Local Storage
- ✅ Remember liked songs
- ✅ Remember volume settings
- ✅ Remember recently played albums
- ✅ Save playlists

## 📁 Folder Structure

```
spotify-clone/
├── index.html              # Main HTML file
├── style.css              # Main styling
├── utility.css            # Utility classes
├── script.js              # All JavaScript logic
│
├── songs/
│   ├── album1/
│   │   ├── cover.jpg      # Album cover image
│   │   ├── info.json      # Album metadata
│   │   └── songs/
│   │       ├── song1.mp3
│   │       ├── song2.mp3
│   │       └── ...
│   ├── album2/
│   │   ├── cover.jpg
│   │   ├── info.json
│   │   └── songs/
│   └── album3/
│       ├── cover.jpg
│       ├── info.json
│       └── songs/
│
├── img/                   # Icons and logos
└── assets/               # Additional assets
```

## 🚀 Getting Started

### 1. Setup
- Clone or download the project
- Ensure the folder structure is correct
- Place audio files in `songs/album*/songs/` folders

### 2. Add Your Music
Create an album by:
1. Create a new folder in `songs/` (e.g., `my-album`)
2. Add `cover.jpg` (album cover image)
3. Create `info.json` with metadata:
```json
{
  "title": "Album Name",
  "artist": "Artist Name",
  "description": "Album description",
  "cover": "cover.jpg"
}
```
4. Create a `songs/` subdirectory
5. Add MP3 files (song1.mp3, song2.mp3, etc.)

### 3. Run
- Open `index.html` with Live Server (VS Code)
- Or simply open `index.html` in your browser

## 🎯 How to Use

### Playing Music
1. Click on an album card to view songs
2. Click a song to play it instantly
3. Use player controls at the bottom

### Controls
- **Play/Pause**: Click the play button or press Space
- **Volume**: Use the volume slider or keyboard arrows
- **Seek**: Click on the progress bar to jump to a time
- **Shuffle**: Click to randomize song order
- **Repeat**: Click to cycle through repeat modes (off → all → one)

### Navigation
- Use sidebar to navigate between sections
- Use top search to find songs/albums
- Create playlists with the "Create Playlist" button

### Features
- **Liked Songs**: Heart your favorite songs (appears in "Liked Songs" section)
- **Recently Played**: Albums you've played appear in "Recently Played"
- **Search**: Search by album name, artist, or song name

## 🎨 Customization

### Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --bg-primary: #121212;
    --bg-secondary: #181818;
    --green: #1DB954;
    --text-primary: #FFFFFF;
    --text-secondary: #B3B3B3;
}
```

### Fonts
Modify font-family in `body` selector

### Layout
Adjust grid sizes and gaps in `.albums-grid` and responsive breakpoints

## 💻 Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- All modern browsers with HTML5 Audio API support

## 🔧 Technical Details

### JavaScript
- No external libraries
- Modular code structure
- Async/await for file loading
- LocalStorage for persistence
- HTML5 Audio API

### CSS
- CSS Grid for layouts
- Flexbox for components
- CSS variables for theming
- Media queries for responsiveness
- Smooth animations and transitions

### HTML5 Features
- Semantic HTML
- Audio element
- Local Storage API
- Fetch API for loading JSON

## ⚠️ Important Notes

1. **Audio Files**: Add your own MP3 files or use royalty-free music from:
   - NCS (No Copyright Sounds)
   - Free Music Archive
   - Incompetech
   - YouTube Audio Library

2. **CORS**: If hosting online, ensure proper CORS headers for audio files

3. **File Structure**: Album folders must follow the exact structure for dynamic loading

4. **Cover Images**: Must be named `cover.jpg` or update paths in `info.json`

## 📝 Code Structure

### Main State Object (`appState`)
```javascript
{
    albums: [],           // Loaded albums
    songs: [],           // Songs of current album
    currentSongIndex: 0, // Currently playing song
    isPlaying: false,
    volume: 70,
    likedSongs: [],      // Liked song IDs
    recentlyPlayed: [],  // Recent album IDs
    playlists: []        // User playlists
}
```

### Key Functions
- `loadAlbums()` - Load all albums from folders
- `loadSongsForAlbum()` - Load songs for selected album
- `playMusic()` / `pauseMusic()` - Control playback
- `nextSong()` / `previousSong()` - Navigation
- `searchContent()` - Search functionality
- `formatTime()` - Convert seconds to MM:SS

## 🎓 Learning Resources

This project demonstrates:
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Asynchronous programming
- ✅ Local Storage
- ✅ CSS Grid & Flexbox
- ✅ HTML5 Audio API
- ✅ Responsive design
- ✅ State management

## 📄 License
Free to use and modify!

## 🤝 Contributing
Feel free to enhance and share improvements!

---

**Enjoy your music! 🎵**

# 🎵 Spotify Clone - Setup Guide

## Quick Start

1. **Open in Browser**
   - Use VS Code Live Server: Right-click `index.html` → "Open with Live Server"
   - Or simply open `index.html` directly in your browser

2. **Add Your Music**
   - Follow the steps below to add songs to albums

## 📝 How to Add Songs

### Step 1: Prepare Your Audio Files
1. Get MP3 files of your choice (royalty-free recommended)
2. Name them: `song1.mp3`, `song2.mp3`, `song3.mp3`, etc.

### Step 2: Create Album Structure

For each album you want to add:

**Example: Adding "My Playlist" Album**

1. Create folder: `songs/my-playlist/`
2. Add these files/folders:
   ```
   songs/
   └── my-playlist/
       ├── cover.jpg (or .png or .svg)
       ├── info.json
       └── songs/
           ├── song1.mp3
           ├── song2.mp3
           ├── song3.mp3
           └── ...
   ```

### Step 3: Create `info.json`

Create `songs/my-playlist/info.json`:

```json
{
  "title": "My Playlist",
  "artist": "Your Name",
  "description": "My favorite songs",
  "cover": "cover.jpg"
}
```

**Fields:**
- `title` - Album/Playlist name (required)
- `artist` - Artist name (required)
- `description` - Short description (optional)
- `cover` - Image filename (jpg, png, or svg)

### Step 4: Update Album References (if not using default folders)

The app currently loads these albums automatically:
- `songs/album1/`
- `songs/album2/`
- `songs/album3/`

To add more albums, you need to:

1. Open `script.js`
2. Find the `loadAlbums()` function (line ~74)
3. Add your album folder to the array:

```javascript
const albumFolders = ['album1', 'album2', 'album3', 'my-playlist'];
```

## 🖼️ Adding Album Covers

### Option 1: Use an Image File
1. Save your image as `cover.jpg` (or .png/.svg)
2. Place it in the album folder
3. Reference in `info.json`:
   ```json
   "cover": "cover.jpg"
   ```

### Option 2: Use an SVG Placeholder
Already provided for each album!

### Option 3: Get Free Album Art
- Google Images
- Unsplash
- Pexels
- Pixabay

Recommended size: 300x300px or larger

## 🎵 Where to Get Music

### Free Music Sources
1. **NCS (No Copyright Sounds)**
   - Website: https://www.youtube.com/c/NoCopyrightSounds
   - License: Free to use with attribution

2. **Free Music Archive**
   - Website: freemusicarchive.org
   - License: Creative Commons

3. **Incompetech**
   - Website: incompetech.com
   - License: Creative Commons

4. **YouTube Audio Library**
   - Inside YouTube Studio
   - License: Free to use

5. **Pixabay Music**
   - Website: pixabay.com/music
   - License: Free to use

## 📂 Complete Example

Here's a complete folder structure with 2 albums:

```
spotify-clone/
├── index.html
├── style.css
├── utility.css
├── script.js
├── README.md
│
└── songs/
    ├── chill-vibes/
    │   ├── cover.jpg
    │   ├── info.json
    │   └── songs/
    │       ├── song1.mp3
    │       ├── song2.mp3
    │       └── song3.mp3
    │
    └── workout-mix/
        ├── cover.png
        ├── info.json
        └── songs/
            ├── song1.mp3
            ├── song2.mp3
            ├── song3.mp3
            └── song4.mp3
```

**chill-vibes/info.json:**
```json
{
  "title": "Chill Vibes",
  "artist": "Relaxation Artists",
  "description": "Perfect for studying and relaxing",
  "cover": "cover.jpg"
}
```

**workout-mix/info.json:**
```json
{
  "title": "Workout Mix",
  "artist": "Energy Beats",
  "description": "High energy tracks for your workout",
  "cover": "cover.png"
}
```

## ⚙️ Customization

### Change Default Albums
Edit `script.js` line ~69:

```javascript
const albumFolders = ['your-album1', 'your-album2', 'your-album3'];
```

### Change Colors
Edit `style.css` lines 9-16:

```css
:root {
    --bg-primary: #121212;      /* Main background */
    --green: #1DB954;            /* Accent color */
    --text-primary: #FFFFFF;     /* Main text */
    /* ... more colors ... */
}
```

### Change Player Position
The player is at the bottom. To change to top, move the player element in HTML to the top.

## 🔧 Troubleshooting

### Songs Not Appearing
1. ✅ Check folder structure is correct
2. ✅ Verify `info.json` exists and is valid JSON
3. ✅ Ensure MP3 files are in `songs/` subfolder
4. ✅ Refresh the browser (Ctrl+Shift+R for hard refresh)

### Cover Images Not Showing
1. ✅ Check image filename matches `info.json`
2. ✅ Supported formats: JPG, PNG, SVG
3. ✅ Image should be in album root folder (not in songs folder)

### Audio Not Playing
1. ✅ Ensure MP3 files are not corrupted
2. ✅ Check browser console for errors (F12)
3. ✅ Try a different audio file
4. ✅ CORS issue if hosting online - needs proper server headers

### App Not Loading
1. ✅ Use Live Server (better than opening file directly)
2. ✅ Check browser console for JavaScript errors (F12)
3. ✅ Ensure all HTML, CSS, JS files are in the same directory

## 📱 Mobile Tips

- Player adapts to mobile screens automatically
- Use keyboard shortcuts on desktop
- Tap songs to play on mobile
- Volume control works on all devices

## 🚀 Deployment

To deploy online:

1. Upload all files to your server
2. Ensure MP3 and image files are accessible
3. Configure CORS headers if needed
4. Open in browser via your domain

## 💡 Tips

1. **Song Order**: Songs play in alphabetical order (song1.mp3 first)
2. **Song Duration**: App estimates duration if not detected
3. **Search**: Works for album names, artists, and song names
4. **Liked Songs**: Saved in browser's LocalStorage
5. **Volume**: Remembered between sessions
6. **Recently Played**: Last 20 albums remembered

## ❓ FAQ

**Q: Can I add more than 3 albums?**
A: Yes! Edit `script.js` line ~69 to add more folder names to the array.

**Q: Do I need a server?**
A: No! Works locally. Use Live Server for local testing.

**Q: What audio formats are supported?**
A: MP3, WAV, OGG, M4A (most common HTML5 formats)

**Q: Can I rename songs?**
A: Yes, update the filenames or modify song data in the code.

**Q: Does it work offline?**
A: Yes! Everything works offline except downloading new songs.

---

**Happy Listening! 🎶**

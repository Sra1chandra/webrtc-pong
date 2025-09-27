# WebRTC Pong
A toy browser game that implements peer-to-peer rollback netcode.

Play it here: https://mitxela.com/pong

Writeup about the development of it: https://mitxela.com/projects/webrtc-pong

## Hosting on GitHub

This repository includes multiple hosting options for the WebRTC Pong game:

### Option 1: GitHub Pages Only (Recommended - No Backend Required!)

**The easiest way to host your game with zero backend setup:**

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch" and choose `main` branch
   - Your game will be available at `https://yourusername.github.io/webrtc-pong`

2. **That's it!** The game uses PeerJS for WebRTC signaling, which requires no backend server.


## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/webrtc-pong.git
   cd webrtc-pong
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch" → `main`
   - Your game will be live at: `https://yourusername.github.io/webrtc-pong`

3. **That's it!** No backend, no database, no configuration needed.

## Testing the Game

**Important:** WebRTC peer-to-peer connections require different devices or browsers. You cannot connect to yourself from the same browser.

### Testing Options:
- **Different browsers**: Chrome + Firefox
- **Incognito windows**: Normal + Incognito mode
- **Different devices**: Computer + Phone/Tablet
- **Different computers**: Any two separate devices

## Files Structure

- `index.html` - **Main game file (No backend required - uses PeerJS)**
- `readme.md` - This documentation file


## Possible further features to add
- Option to horizontally mirror screen when on mobile, in case your finger is in the way
- Sound, bleeps and bloops as it bounces
- End game or score target
- Option to change field size or paddle size
- Powerups


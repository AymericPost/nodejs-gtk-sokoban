# Node.js GTK Sokoban

A Sokoban classic game made with GTK with Node.js.

## Installation & use

### Pre-requisites

- [Node.JS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- Linux system (tested with [Ubuntu](www.ubuntu.com/) 20.04)

### Setup

1. Clone the repository

```git clone https://github.com/AymericPost/nodejs-gtk-sokoban.git```

2. Install dependancies on your Linux system

On Ubuntu:
```
sudo apt-get install \
  build-essential \
  python \
  gobject-introspection \
  libgirepository1.0-dev \
  libcairo2 \
  libcairo2-dev \
  alsa
```

3. Install node dependancies

Go to the project's folder then use NPM to install dependancies.

```
cd nodejs-gtk-sokoban
npm i
```

### Start

Go to the project's folder then use NPM launch the game.

```npm start```

## How to play

Use the arrows button to move the character to push boxes to targets. The caracter can only push boxes to a free cell, or a target.

## Credits

- [Office worker](https://opengameart.org/content/office-worker-sprites) sprites by [Solar Granulation](https://opengameart.org/users/solar-granulation). Licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- [Wooden Box 2D](https://opengameart.org/content/wooden-box-2d) sprites by [Alucard](https://opengameart.org/users/alucard). Licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- [Brick](https://opengameart.org/content/brick-1) sprites by [stereoscopic](https://opengameart.org/users/stereoscopic). Licence [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- [Sound effects](https://opengameart.org/content/512-sound-effects-8-bit-style) by [SubspaceAudio](https://opengameart.org/users/subspaceaudio). Licence [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
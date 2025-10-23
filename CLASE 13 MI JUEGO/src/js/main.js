import { initScene } from './myScene.js';

loadAudio(1);
loadSceen(1);

function loadAudio(valueSong) {
  const audio = document.getElementById('soundScreen');
  switch (valueSong) {
    case 1: audio.src = './src/sounds/01_game_menu.wav'; break;
    case 2: audio.src = './src/sounds/02_game_background.wav'; break;
    case 3: audio.src = './src/sounds/03_game_win.wav'; break;
    case 4: audio.src = './src/sounds/04_game_over.wav'; break;
  }
  audio.play().catch(() => console.log('Interacción requerida para reproducir audio.'));
}

function loadSceen(screen) {
  switch (screen) {
    case 1: // Menú
      changeVisibility('block', 'none', 'none', 'none');
      loadAudio(1);
      break;

    case 2: // Juego   👈 (OJO: ya no hay "case 2" duplicado)
      changeVisibility('none','block','none','none');
      loadAudio(2);
      // Espera un tick para que el div sea visible y tenga tamaño
      setTimeout(() => initScene(), 0);
      break;

    case 3: // Ganó
      changeVisibility('none', 'none', 'block', 'none');
      loadAudio(3);
      break;

    case 4: // Perdió
      changeVisibility('none', 'none', 'none', 'block');
      loadAudio(4);
      break;
  }
}

function changeVisibility(menu, game, win, lose) {
  document.getElementById("MenuScreen").style.display = menu;
  document.getElementById("gameScreen").style.display = game;
  document.getElementById("WinnerScreen").style.display = win;
  document.getElementById("LoserScreen").style.display = lose;
}

// 👇 Como main.js es módulo, expón las funciones usadas por onclick en el HTML:
window.loadSceen = loadSceen;

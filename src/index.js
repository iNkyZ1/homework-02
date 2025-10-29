import './styles.scss';

import rainAudio from './assets/audio/rain.mp3';
import wavesAudio from './assets/audio/waves.mp3';
import forestAudio from './assets/audio/forest.mp3';

import rainBg from './assets/images/rain.jpg';
import wavesBg from './assets/images/waves.jpg';
import forestBg from './assets/images/forest.jpg';

const SOUNDS = [
	{ id: 'rain', title: 'Дождь', src: rainAudio, bg: rainBg },
	{ id: 'waves', title: 'Море', src: wavesAudio, bg: wavesBg },
	{ id: 'forest', title: 'Лес', src: forestAudio, bg: forestBg },
];

const audio = new Audio();
audio.preload = 'auto';
audio.loop = true;
audio.volume = 0.7;

const buttonsRoot = document.getElementById('buttons');
const volumeInput = document.getElementById('volume');

SOUNDS.forEach(({ id, title }) => {
	const btn = document.createElement('button');
	btn.className = 'noise-btn';
	btn.type = 'button';
	btn.textContent = title;
	btn.dataset.soundId = id;
	btn.setAttribute('aria-pressed', 'false');
	buttonsRoot.appendChild(btn);
});

let currentId = null;

function setBackground(url) {
	if (!url) {
		document.body.style.background = '#111';
		return;
	}
	document.body.style.backgroundImage = `url(${url})`;
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundRepeat = 'no-repeat';
}

buttonsRoot.addEventListener('click', (e) => {
	const btn = e.target.closest('button[data-sound-id]');
	if (!btn) return;

	const soundId = btn.dataset.soundId;
	const sound = SOUNDS.find((s) => s.id === soundId);
	if (!sound) return;

	if (currentId === soundId) {
		if (audio.paused) {
			audio.play();
			btn.setAttribute('aria-pressed', 'true');
		} else {
			audio.pause();
			btn.setAttribute('aria-pressed', 'false');
		}
		return;
	}

	audio.pause();
	audio.src = sound.src;
	audio.currentTime = 0;
	audio.play();

	for (const el of buttonsRoot.querySelectorAll('.noise-btn')) {
		el.setAttribute('aria-pressed', el === btn ? 'true' : 'false');
	}

	currentId = soundId;

	setBackground(sound.bg);
});

volumeInput.addEventListener('input', () => {
	const v = Number(volumeInput.value);
	if (!Number.isNaN(v)) audio.volume = v;
});

setBackground(null);
volumeInput.value = String(audio.volume);

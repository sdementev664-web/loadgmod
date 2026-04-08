// ==================== PARTICLES ANIMATION ====================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== MUSIC PLAYER ====================
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const iconPlay = musicToggle.querySelector('.icon-play');
const iconPause = musicToggle.querySelector('.icon-pause');
const volumeSlider = document.getElementById('volume-slider');
const volumePercent = document.getElementById('volume-percent');
const startOverlay = document.getElementById('start-overlay');

let isMusicPlaying = false;

// Set initial volume
bgMusic.volume = 0.5;

// Start overlay click
startOverlay.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    playMusic();
    startLoading();
});

function playMusic() {
    bgMusic.play().catch(err => console.log('Audio play error:', err));
    isMusicPlaying = true;
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
}

function pauseMusic() {
    bgMusic.pause();
    isMusicPlaying = false;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
}

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    bgMusic.volume = volume;
    volumePercent.textContent = `${e.target.value}%`;
});

// ==================== LOADING ANIMATION ====================
const loadingPercent = document.getElementById('loading-percent');
const loadingFile = document.getElementById('loading-file');
const progressBar = document.getElementById('progress-bar');
const filesCount = document.getElementById('files-count');
const downloadSpeed = document.getElementById('download-speed');
const pingValue = document.getElementById('ping-value');
const playersCount = document.getElementById('players-count');

const files = [
    'models/city_buildings.mdl',
    'materials/textures/roads.vtf',
    'sound/ambient/wind.wav',
    'scripts/game_sounds.txt',
    'maps/necrograd_downtown.bsp',
    'models/vehicles/police_car.mdl',
    'materials/textures/graffiti.vtf',
    'sound/weapons/gunshot.wav',
    'scripts/npc_ai.lua',
    'models/props/streetlight.mdl',
    'materials/skybox/night_sky.vtf',
    'sound/music/background_01.mp3',
    'scripts/player_animations.txt',
    'models/characters/citizen_male.mdl',
    'materials/textures/concrete.vtf',
    'sound/ambient/rain.wav',
    'Финализация...'
];

let currentProgress = 0;
let currentFileIndex = 0;
let loadingInterval;

function startLoading() {
    loadingInterval = setInterval(() => {
        if (currentProgress < 100) {
            // Увеличиваем прогресс случайным образом
            const increment = Math.random() * 3 + 1;
            currentProgress = Math.min(currentProgress + increment, 100);
            
            // Обновляем визуальные элементы
            progressBar.style.width = currentProgress + '%';
            loadingPercent.textContent = Math.floor(currentProgress) + '%';
            
            // Обновляем файлы
            if (currentFileIndex < files.length - 1 && currentProgress > (currentFileIndex + 1) * (100 / files.length)) {
                currentFileIndex++;
            }
            loadingFile.textContent = files[currentFileIndex];
            filesCount.textContent = `${Math.floor((currentProgress / 100) * 347)} / 347`;
            
            // Случайная скорость загрузки
            downloadSpeed.textContent = (Math.random() * 8 + 2).toFixed(1) + ' MB/s';
            
            // Случайный пинг
            pingValue.textContent = Math.floor(Math.random() * 30 + 15) + ' ms';
            
            // Имитация изменения количества игроков
            if (Math.random() > 0.95) {
                const currentPlayers = parseInt(playersCount.textContent);
                const change = Math.random() > 0.5 ? 1 : -1;
                playersCount.textContent = Math.max(50, Math.min(70, currentPlayers + change));
            }
            
        } else {
            clearInterval(loadingInterval);
            loadingFile.textContent = 'Загрузка завершена!';
            setTimeout(() => {
                alert('Загрузка завершена! Добро пожаловать в Necrograd!');
                // Здесь можно перенаправить на игру или скрыть экран загрузки
            }, 500);
        }
    }, 100);
}

// ==================== TIPS ROTATION ====================
const tips = [
    'Нажмите F1, чтобы открыть меню помощи на сервере',
    'Используйте /help для списка доступных команд',
    'Взаимодействуйте с другими игроками для лучшего опыта',
    'Следите за своим здоровьем и голодом',
    'Посетите центр города для квестов и заданий',
    'Не забывайте сохранять прогресс регулярно',
    'Исследуйте тёмные переулки для секретных предметов',
    'Присоединяйтесь к фракциям для групповых заданий',
    'Торгуйте с NPC для получения редких предметов'
];

let currentTipIndex = 0;
const tipText = document.getElementById('tip-text');

setInterval(() => {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    tipText.style.opacity = '0';
    setTimeout(() => {
        tipText.textContent = tips[currentTipIndex];
        tipText.style.opacity = '1';
    }, 300);
}, 8000);

// Плавная анимация текста
tipText.style.transition = 'opacity 0.3s ease';

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Space - play/pause music
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
    
    // Arrow Up - increase volume
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        const newVolume = Math.min(100, parseInt(volumeSlider.value) + 5);
        volumeSlider.value = newVolume;
        bgMusic.volume = newVolume / 100;
        volumePercent.textContent = `${newVolume}%`;
    }
    
    // Arrow Down - decrease volume
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        const newVolume = Math.max(0, parseInt(volumeSlider.value) - 5);
        volumeSlider.value = newVolume;
        bgMusic.volume = newVolume / 100;
        volumePercent.textContent = `${newVolume}%`;
    }
});

// ==================== PREVENT CONTEXT MENU ====================
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

console.log('%c🎮 NECROGRAD LOADING SCREEN 🎮', 'color: #ff4655; font-size: 20px; font-weight: bold;');
console.log('%cДобро пожаловать! Наслаждайтесь атмосферой...', 'color: #00d9ff; font-size: 14px;');

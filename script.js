// ==================== GMOD FUNCTIONS ====================
function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    document.getElementById('server-map').textContent = mapname || 'gm_necrograd_downtown';
    document.getElementById('server-gamemode').textContent = gamemode || 'DarkRP';
    document.getElementById('max-players').textContent = maxplayers || '128';
    console.log('🎮 Server:', servername);
    console.log('🗺️ Map:', mapname);
    console.log('🎯 Gamemode:', gamemode);
}

function SetFilesNeeded(needed) {
    totalFiles = needed;
    console.log('📦 Files needed:', needed);
}

function SetFilesTotal(total) {
    totalFiles = total;
    document.getElementById('files-count').textContent = `0 / ${total}`;
    console.log('📦 Total files:', total);
}

function DownloadingFile(fileName) {
    currentFileName = fileName;
    document.getElementById('loading-file').textContent = fileName;
    filesDownloaded++;
    updateProgress();
}

function SetStatusChanged(status) {
    document.getElementById('loading-file').textContent = status;
    console.log('📡 Status:', status);
}

// ==================== PARTICLES ANIMATION ====================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 120;

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.6 + 0.2;
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

// ==================== MUSIC PLAYER (AUTO-REPEAT) ====================
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const iconPlay = musicToggle.querySelector('.icon-play');
const iconPause = musicToggle.querySelector('.icon-pause');
const volumeSlider = document.getElementById('volume-slider');
const volumePercent = document.getElementById('volume-percent');
const gifBg = document.getElementById('gif-bg');

let isMusicPlaying = true;

// Set initial volume
bgMusic.volume = 0.5;

// Автоматический запуск музыки при загрузке
window.addEventListener('load', () => {
    bgMusic.play().catch(err => {
        console.log('⚠️ Автозапуск музыки заблокирован браузером');
        console.log('💡 Кликните в любом месте для запуска музыки');
        isMusicPlaying = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    });
});

// Клик в любом месте для запуска музыки (если автозапуск заблокирован)
document.addEventListener('click', function autoPlayMusic() {
    if (!isMusicPlaying) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            console.log('🎵 Музыка запущена!');
        }).catch(err => console.log('Ошибка воспроизведения:', err));
    }
    document.removeEventListener('click', autoPlayMusic);
}, { once: true });

// Автоматический повтор музыки
bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
    bgMusic.play().then(() => {
        console.log('🔁 Музыка повторяется автоматически');
    }).catch(err => console.log('Ошибка повтора:', err));
});

// Кнопка управления музыкой
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    } else {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        });
    }
});

// Регулировка громкости
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    bgMusic.volume = volume;
    volumePercent.textContent = `${e.target.value}%`;
});

// ==================== LOADING SIMULATION ====================
let currentProgress = 0;
let filesDownloaded = 0;
let totalFiles = 347;
let currentFileName = 'Подключение к серверу...';
let downloadedMB = 0;

const loadingPercent = document.getElementById('loading-percent');
const progressBar = document.getElementById('progress-bar');
const filesCount = document.getElementById('files-count');
const downloadSpeed = document.getElementById('download-speed');
const downloadedSize = document.getElementById('downloaded-size');
const pingValue = document.getElementById('ping-value');
const playersCount = document.getElementById('players-count');

// Симуляция загрузки файлов
const files = [
    'models/city_buildings.mdl',
    'materials/textures/roads.vtf',
    'sound/ambient/wind.wav',
    'scripts/game_sounds.txt',
    'maps/gm_necrograd_downtown.bsp',
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
];

function updateProgress() {
    const progress = (filesDownloaded / totalFiles) * 100;
    currentProgress = Math.min(progress, 100);
    
    progressBar.style.width = currentProgress + '%';
    loadingPercent.textContent = Math.floor(currentProgress) + '%';
    filesCount.textContent = `${filesDownloaded} / ${totalFiles}`;
    
    // Обновление скачанного размера
    downloadedMB += Math.random() * 2 + 0.5;
    downloadedSize.textContent = downloadedMB.toFixed(1) + ' MB';
}

// Симуляция скачивания
setInterval(() => {
    if (filesDownloaded < totalFiles) {
        const randomFile = files[Math.floor(Math.random() * files.length)];
        DownloadingFile(randomFile);
        
        // Случайная скорость
        const speed = (Math.random() * 800 + 200).toFixed(0);
        downloadSpeed.textContent = speed + ' KB/s';
    } else {
        downloadSpeed.textContent = '0 KB/s';
        document.getElementById('loading-file').textContent = '✓ Загрузка завершена!';
    }
}, 150);

// Обновление пинга
setInterval(() => {
    const ping = Math.floor(Math.random() * 40 + 10);
    pingValue.textContent = ping + ' ms';
}, 2000);

// Обновление количества игроков
setInterval(() => {
    if (Math.random() > 0.7) {
        const current = parseInt(playersCount.textContent);
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = Math.max(45, Math.min(75, current + change));
        playersCount.textContent = newCount;
    }
}, 5000);

// Начальное значение игроков
playersCount.textContent = Math.floor(Math.random() * 20 + 50);

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
    'Торгуйте с NPC для получения редких предметов',
    'Будьте осторожны в ночное время - опасность возрастает',
    'Проверяйте карту для поиска интересных локаций',
    'Кастомизируйте своего персонажа в меню F3',
];

let currentTipIndex = 0;
const tipText = document.getElementById('tip-text');
tipText.style.transition = 'opacity 0.3s ease';

setInterval(() => {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    tipText.style.opacity = '0';
    setTimeout(() => {
        tipText.textContent = tips[currentTipIndex];
        tipText.style.opacity = '1';
    }, 300);
}, 7000);

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Space / M - play/pause music
    if ((e.code === 'Space' || e.code === 'KeyM') && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        musicToggle.click();
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

// ==================== CONSOLE STYLING ====================
console.log('%c╔═══════════════════════════════════════════╗', 'color: #ff4655; font-weight: bold;');
console.log('%c║     🎮 NECROGRAD LOADING SCREEN 🎮      ║', 'color: #ff4655; font-size: 18px; font-weight: bold;');
console.log('%c╚═══════════════════════════════════════════╝', 'color: #ff4655; font-weight: bold;');
console.log('%c\n🎵 Музыка: Автоматический повтор включен', 'color: #00ff88; font-weight: bold;');
console.log('%c🎬 GIF: Воспроизводится в фоне', 'color: #00d9ff; font-weight: bold;');
console.log('%c\n⌨️ Горячие клавиши:', 'color: #fff; font-size: 14px; font-weight: bold;');
console.log('%c   SPACE/M - Пауза/Воспроизведение', 'color: #8b92b0;');
console.log('%c   ↑/↓     - Громкость +/-', 'color: #8b92b0;');
console.log('%c\n📡 GMod Functions: Активны', 'color: #00d9ff;');

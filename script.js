// ==================== GMOD FUNCTIONS ====================
function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    console.log('🎮 Server:', servername);
    console.log('🗺️ Map:', mapname);
    console.log('🎯 Gamemode:', gamemode);
    console.log('👥 Max Players:', maxplayers);
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

// ==================== MUSIC AUTO-PLAY ====================
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.5;

// Автоматический запуск музыки
window.addEventListener('load', () => {
    bgMusic.play().catch(err => {
        console.log('⚠️ Автозапуск музыки заблокирован');
        // Попытка запуска при первом клике
        document.addEventListener('click', function startMusic() {
            bgMusic.play().then(() => {
                console.log('🎵 Музыка запущена!');
            });
            document.removeEventListener('click', startMusic);
        }, { once: true });
    });
});

// Автоматический повтор
bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
    bgMusic.play();
});

// Пауза при смене вкладки
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        bgMusic.pause();
    } else {
        bgMusic.play().catch(() => {});
    }
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

// Список файлов для симуляции
const files = [
    'models/city/buildings_01.mdl',
    'models/city/buildings_02.mdl',
    'models/city/buildings_03.mdl',
    'materials/textures/roads.vtf',
    'materials/textures/concrete.vtf',
    'materials/textures/graffiti.vtf',
    'sound/ambient/city_wind.wav',
    'sound/ambient/rain.wav',
    'sound/ambient/thunder.wav',
    'scripts/game_sounds.txt',
    'scripts/weapons_config.lua',
    'scripts/npc_ai.lua',
    'maps/gm_necrograd_downtown.bsp',
    'models/vehicles/police_car.mdl',
    'models/vehicles/taxi.mdl',
    'models/props/streetlight.mdl',
    'models/props/trash_bin.mdl',
    'materials/skybox/night_sky.vtf',
    'sound/music/background_01.mp3',
    'sound/weapons/gunshot.wav',
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

// Симуляция скачивания файлов
setInterval(() => {
    if (filesDownloaded < totalFiles) {
        const randomFile = files[Math.floor(Math.random() * files.length)];
        DownloadingFile(randomFile);
        
        // Случайная скорость загрузки
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
    'Используйте чат для общения с другими игроками',
    'Зарабатывайте деньги выполняя работы и задания',
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
}, 7000);

// ==================== CONSOLE STYLING ====================
console.log('%c╔═══════════════════════════════════════════╗', 'color: #00d9ff; font-weight: bold;');
console.log('%c║     🎮 NECROGRAD LOADING SCREEN 🎮      ║', 'color: #00d9ff; font-size: 18px; font-weight: bold;');
console.log('%c╚═══════════════════════════════════════════╝', 'color: #00d9ff; font-weight: bold;');
console.log('%c\n🎵 Музыка: Автоматический повтор активен', 'color: #00ff88; font-weight: bold;');
console.log('%c🎬 GIF: Воспроизводится в фоне', 'color: #00d9ff; font-weight: bold;');
console.log('%c📡 GMod Functions: Готовы к использованию', 'color: #00d9ff;');
console.log('%c\n✨ Минималистичный дизайн загружен', 'color: #ff4655; font-weight: bold;');

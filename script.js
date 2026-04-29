// ============ PARTICLES SYSTEM ============
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -1000, y: -1000 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.targetOpacity = this.opacity;
        this._currentOpacity = this.opacity;
        this.color = Math.random() > 0.7 ? '#00d9ff' : (Math.random() > 0.5 ? '#ff4655' : '#ffffff');
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
            this.targetOpacity = Math.min(1, this.opacity + 0.3);
        } else {
            this.targetOpacity = this.opacity;
        }

        this._currentOpacity += (this.targetOpacity - this._currentOpacity) * 0.05;

        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
        const pulseOpacity = this._currentOpacity * (0.7 + Math.sin(this.pulse) * 0.3);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = pulseOpacity;
        ctx.fill();

        if (this.size > 1.5) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = pulseOpacity * 0.15;
            ctx.fill();
        }
    }
}

const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
                const opacity = (1 - dist / maxDist) * 0.12;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = '#00d9ff';
                ctx.globalAlpha = opacity;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============ SERVER TIME ============
function updateServerTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour12: false });
    const timeEl = document.getElementById('server-time');
    const consoleTimeEl = document.getElementById('console-time');
    if (timeEl) timeEl.textContent = timeStr;
    if (consoleTimeEl) consoleTimeEl.textContent = timeStr;
}
setInterval(updateServerTime, 1000);
updateServerTime();

// ============ MUSIC CONTROL ============
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isMuted = false;

document.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }
}, { once: true });

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        bgMusic.muted = isMuted;
        musicToggle.classList.toggle('muted', isMuted);
    });
}

// ============ LOADING SIMULATION ============
const loadingPercent = document.getElementById('loading-percent');
const progressBar = document.getElementById('progress-bar');
const progressEdge = document.getElementById('progress-edge');
const loadingFile = document.getElementById('loading-file');
const filesCount = document.getElementById('files-count');
const downloadSpeed = document.getElementById('download-speed');
const downloadedSize = document.getElementById('downloaded-size');
const pingValue = document.getElementById('ping-value');
const tipText = document.getElementById('tip-text');
const tipProgress = document.getElementById('tip-progress');

const files = [
    'maps/rp_necrograd_v4.bsp',
    'materials/necro/buildings/warehouse_01.vtf',
    'materials/necro/buildings/hospital_wall.vmt',
    'models/props/streetlight_broken.mdl',
    'models/vehicles/uaz_469.mdl',
    'models/weapons/w_knife_custom.mdl',
    'sound/ambient/city_night_loop.wav',
    'sound/ambient/wind_howl.wav',
    'sound/music/loading_theme.mp3',
    'materials/necro/skybox/night_sky_rt.vtf',
    'materials/necro/skybox/night_sky_lf.vtf',
    'materials/necro/ground/asphalt_cracked.vtf',
    'materials/necro/ground/dirt_wet.vtf',
    'models/props/dumpster_rust.mdl',
    'models/props/barrel_toxic.mdl',
    'models/props/fence_chain.mdl',
    'lua/autorun/server/sv_necro_core.lua',
    'lua/autorun/server/sv_economy.lua',
    'lua/autorun/server/sv_inventory.lua',
    'lua/autorun/client/cl_hud_main.lua',
    'lua/autorun/client/cl_scoreboard.lua',
    'lua/entities/npc_trader/init.lua',
    'lua/entities/npc_quest/shared.lua',
    'materials/necro/ui/hud_bg.png',
    'materials/necro/ui/inventory_slot.png',
    'materials/necro/vehicles/uaz_skin_01.vtf',
    'materials/necro/vehicles/gaz_66_camo.vtf',
    'models/characters/citizen_male_01.mdl',
    'models/characters/citizen_female_03.mdl',
    'models/characters/police_officer.mdl',
    'sound/weapons/ak47_fire_01.wav',
    'sound/weapons/pistol_reload.wav',
    'sound/ui/menu_click.wav',
    'sound/ui/notification.wav',
    'lua/autorun/server/sv_jobs.lua',
    'lua/autorun/server/sv_housing.lua',
    'lua/autorun/client/cl_chat_custom.lua',
    'materials/necro/effects/blood_splatter.vtf',
    'materials/necro/effects/rain_drop.vtf',
    'models/props/radio_old.mdl',
    'models/props/tv_broken.mdl',
    'lua/autorun/server/sv_anticheat.lua',
    'data/necrograd/config/settings.json',
    'data/necrograd/maps/spawn_points.dat',
    'resource/fonts/necrograd_main.ttf',
    'materials/necro/decals/graffiti_01.vtf',
    'materials/necro/decals/blood_01.vtf',
    'models/props/crate_military.mdl',
    'sound/ambient/rain_heavy.wav',
    'lua/autorun/shared/sh_config.lua'
];

const tips = [
    'Нажмите F1, чтобы открыть меню помощи на сервере',
    'Используйте /report для связи с администрацией',
    'Не забывайте отыгрывать своего персонажа в любой ситуации',
    'Экономьте ресурсы — в Necrograd выживает сильнейший',
    'Присоединяйтесь к фракции для получения бонусов',
    'Нажмите TAB для просмотра списка игроков',
    'Торговля между игроками — основа экономики сервера',
    'Исследуйте заброшенные здания — там можно найти ценный лут',
    'Берегите своё здоровье — аптечки стоят дорого',
    'Уважайте других игроков и правила сервера',
    'Используйте рацию для связи с союзниками',
    'Ночью на улицах опаснее — будьте осторожны',
    'Прокачивайте навыки для открытия новых возможностей',
    'Постройте убежище, чтобы сохранить свои вещи',
    'Следите за событиями сервера в Discord'
];

const consoleMessages = [
    { msg: 'Подключение к серверу Necrograd...', type: 'info' },
    { msg: 'TCP/IP соединение установлено', type: 'success' },
    { msg: 'Аутентификация Steam ID...', type: 'info' },
    { msg: 'Steam ID подтверждён', type: 'success' },
    { msg: 'Загрузка конфигурации сервера...', type: 'info' },
    { msg: 'Получение списка файлов...', type: 'info' },
    { msg: 'Найдено 50 файлов для загрузки', type: 'warning' },
    { msg: 'Начало загрузки ресурсов...', type: 'info' },
    { msg: 'Загрузка карты rp_necrograd_v4...', type: 'info' },
    { msg: 'Инициализация Lua модулей...', type: 'info' },
    { msg: 'Загрузка текстур окружения...', type: 'info' },
    { msg: 'Компиляция шейдеров...', type: 'info' },
    { msg: 'Загрузка моделей объектов...', type: 'info' },
    { msg: 'Загрузка звуковых файлов...', type: 'info' },
    { msg: 'Синхронизация с базой данных...', type: 'info' },
    { msg: 'Загрузка данных персонажа...', type: 'info' },
    { msg: 'Кэширование ресурсов...', type: 'info' },
    { msg: 'Оптимизация текстур...', type: 'info' },
    { msg: 'Все файлы загружены успешно', type: 'success' },
    { msg: 'Подготовка к входу на сервер...', type: 'success' }
];

let currentProgress = 0;
let targetProgress = 0;
let currentFileIndex = 0;
let totalFiles = files.length;
let currentTipIndex = 0;
let tipTimer = 0;
const tipDuration = 8000;
let consoleIndex = 0;
let lastConsoleTime = 0;
let downloadedMB = 0;
let totalMB = 347.2;

function getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', { hour12: false });
}

function addConsoleMessage(msg, type) {
    const container = document.getElementById('console-messages');
    if (!container) return;

    const line = document.createElement('div');
    line.className = 'console-line';
    line.innerHTML = `<span class="console-timestamp">[${getTimestamp()}]</span> <span class="console-msg ${type}">${msg}</span>`;
    container.appendChild(line);

    while (container.children.length > 3) {
        container.removeChild(container.firstChild);
    }
    container.scrollTop = container.scrollHeight;
}

function updateTip() {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    const tipEl = document.getElementById('tip-text');
    if (tipEl) {
        tipEl.style.opacity = '0';
        setTimeout(() => {
            tipEl.textContent = tips[currentTipIndex];
            tipEl.style.opacity = '0.9';
        }, 300);
    }
}

function formatSpeed(kbps) {
    if (kbps > 1024) return (kbps / 1024).toFixed(1) + ' MB/s';
    return Math.round(kbps) + ' KB/s';
}

function simulateLoading() {
    const now = Date.now();

    if (targetProgress < 100) {
        const increment = Math.random() * 2 + 0.3;
        targetProgress = Math.min(100, targetProgress + increment);
    }

    currentProgress += (targetProgress - currentProgress) * 0.08;
    const displayProgress = Math.min(Math.round(currentProgress), 100);

    if (loadingPercent) loadingPercent.textContent = displayProgress + '%';
    if (progressBar) progressBar.style.width = displayProgress + '%';
    if (progressEdge) progressEdge.style.left = `calc(${displayProgress}% - 6px)`;

    const fileIdx = Math.min(Math.floor((displayProgress / 100) * totalFiles), totalFiles - 1);
    if (fileIdx !== currentFileIndex && fileIdx < totalFiles) {
        currentFileIndex = fileIdx;
        if (loadingFile) loadingFile.innerHTML = `<span class="file-icon">📁</span> ${files[currentFileIndex]}`;
    }

    const loadedFiles = Math.min(Math.floor((displayProgress / 100) * totalFiles), totalFiles);
    if (filesCount) filesCount.textContent = `${loadedFiles} / ${totalFiles}`;

    const speed = Math.random() * 800 + 200 + (Math.sin(now * 0.001) * 300);
    if (downloadSpeed) downloadSpeed.textContent = formatSpeed(speed);

    downloadedMB = (displayProgress / 100) * totalMB;
    if (downloadedSize) downloadedSize.textContent = downloadedMB.toFixed(1) + ' MB';

    const ping = Math.floor(Math.random() * 15 + 28 + Math.sin(now * 0.0005) * 8);
    if (pingValue) pingValue.textContent = ping + ' ms';

    const consoleProgress = displayProgress / 100;
    const targetConsoleIdx = Math.floor(consoleProgress * consoleMessages.length);
    if (targetConsoleIdx > consoleIndex && now - lastConsoleTime > 800) {
        consoleIndex = targetConsoleIdx;
        lastConsoleTime = now;
        const msgData = consoleMessages[Math.min(consoleIndex, consoleMessages.length - 1)];
        addConsoleMessage(msgData.msg, msgData.type);
    }

    tipTimer += 50;
    if (tipTimer >= tipDuration) {
        tipTimer = 0;
        updateTip();
    }
    if (tipProgress) {
        tipProgress.style.width = ((tipTimer / tipDuration) * 100) + '%';
    }

    if (displayProgress < 100) {
        setTimeout(simulateLoading, 50);
    } else {
        finishLoading();
    }
}

function finishLoading() {
    if (loadingFile) loadingFile.innerHTML = '<span class="file-icon">✅</span> Загрузка завершена!';
    addConsoleMessage('Добро пожаловать в Necrograd!', 'success');

    const statusDot = document.querySelector('.status-indicator');
    if (statusDot) {
        statusDot.style.animation = 'none';
        statusDot.style.background = '#00ff64';
        statusDot.style.mask = 'none';
        statusDot.style.webkitMask = 'none';
        statusDot.style.borderRadius = '50%';
        statusDot.style.width = '12px';
        statusDot.style.height = '12px';
        statusDot.style.boxShadow = '0 0 15px rgba(0, 255, 100, 0.8)';
    }

    const loadingLabel = document.querySelector('.loading-label');
    if (loadingLabel) loadingLabel.textContent = 'ГОТОВО';

    const percentEl = document.getElementById('loading-percent');
    if (percentEl) {
        percentEl.style.color = '#00ff64';
        percentEl.style.textShadow = '0 0 20px rgba(0, 255, 100, 0.6)';
    }
}

setTimeout(() => { simulateLoading(); }, 1500);

// ============ GLITCH EFFECT ============
function triggerGlitch() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('glitch-active');
        setTimeout(() => logo.classList.remove('glitch-active'), 200);
    }
    setTimeout(triggerGlitch, Math.random() * 8000 + 5000);
}
setTimeout(triggerGlitch, 3000);

// ============ KEYBOARD SHORTCUT ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M' || e.key === 'ь' || e.key === 'Ь') {
        if (musicToggle) musicToggle.click();
    }
});

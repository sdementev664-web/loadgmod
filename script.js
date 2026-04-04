// ==========================================
// NECROGRAD LOADING SCREEN - SCRIPTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initLoadingBar();
    initRulesSlider();
    initMusicPlayer();
    initTips();
    initPlayerCount();
    initFileNames();
});

// ==========================================
// PARTICLES
// ==========================================

function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 15;
    const size = 1 + Math.random() * 2;
    const opacity = 0.2 + Math.random() * 0.5;

    particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --max-opacity: ${opacity};
    `;

    // Синяя цветовая палитра частиц
    const colors = ['#3498db', '#00d4ff', '#2980b9', '#5dade2', '#1a5276'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
}

// ==========================================
// LOADING BAR
// ==========================================

function initLoadingBar() {
    const progressBar = document.getElementById('progress-bar');
    const loadingPercent = document.getElementById('loading-percent');
    const filesCount = document.getElementById('files-count');
    const statusText = document.getElementById('status-text');
    const downloadSpeed = document.getElementById('download-speed');

    let progress = 0;
    const totalFiles = 347;

    const statuses = [
        { at: 0, text: 'Подключение к серверу...' },
        { at: 10, text: 'Получение списка файлов...' },
        { at: 15, text: 'Загрузка материалов...' },
        { at: 40, text: 'Загрузка моделей...' },
        { at: 60, text: 'Загрузка звуков...' },
        { at: 75, text: 'Загрузка скриптов...' },
        { at: 85, text: 'Загрузка карты...' },
        { at: 95, text: 'Инициализация Lua...' },
        { at: 99, text: 'Отправка клиентской информации...' },
    ];

    function updateProgress() {
        const increment = Math.random() * 2 + 0.1;
        progress = Math.min(progress + increment, 100);

        const currentPercent = Math.floor(progress);
        const currentFiles = Math.floor((progress / 100) * totalFiles);

        progressBar.style.width = progress + '%';
        loadingPercent.textContent = currentPercent + '%';
        filesCount.textContent = currentFiles + ' / ' + totalFiles;

        for (let i = statuses.length - 1; i >= 0; i--) {
            if (progress >= statuses[i].at) {
                statusText.textContent = statuses[i].text;
                break;
            }
        }

        const speed = (1.5 + Math.random() * 4).toFixed(1);
        downloadSpeed.textContent = speed + ' MB/s';

        if (progress < 100) {
            const delay = 100 + Math.random() * 300;
            setTimeout(updateProgress, delay);
        } else {
            statusText.textContent = 'Загрузка завершена! Входим на сервер...';
            loadingPercent.textContent = '100%';
            progressBar.style.width = '100%';
            filesCount.textContent = totalFiles + ' / ' + totalFiles;

            setTimeout(() => {
                progress = 0;
                progressBar.style.width = '0%';
                updateProgress();
            }, 3000);
        }
    }

    updateProgress();
}

// ==========================================
// FILE NAMES SIMULATOR
// ==========================================

function initFileNames() {
    const loadingFile = document.getElementById('loading-file');

    const files = [
        'materials/necrograd/world/ground_01.vtf',
        'materials/necrograd/world/concrete_wall.vmt',
        'models/necrograd/props/crate_military.mdl',
        'models/necrograd/vehicles/uaz_469.mdl',
        'materials/necrograd/hud/icons/weapon_ak47.png',
        'sound/necrograd/ambient/city_wind.wav',
        'sound/necrograd/weapons/ak47_fire1.wav',
        'lua/autorun/client/cl_necrograd_hud.lua',
        'lua/autorun/server/sv_necrograd_jobs.lua',
        'models/necrograd/characters/citizen_male_01.mdl',
        'materials/necrograd/skybox/sky_necrograd_up.vtf',
        'sound/necrograd/music/lobby_theme.mp3',
        'models/necrograd/props/barricade_01.mdl',
        'materials/necrograd/effects/blood_splat_01.vtf',
        'lua/entities/necrograd_atm/init.lua',
        'models/necrograd/weapons/w_knife_bayonet.mdl',
        'materials/necrograd/ui/inventory_bg.png',
        'sound/necrograd/ui/click_01.wav',
        'lua/autorun/sh_necrograd_config.lua',
        'models/necrograd/architecture/building_01.mdl',
        'materials/necrograd/world/road_asphalt.vtf',
        'sound/necrograd/vehicles/engine_idle.wav',
        'lua/weapons/necrograd_pistol/shared.lua',
        'models/necrograd/furniture/table_wooden.mdl',
        'materials/necrograd/characters/uniform_police.vtf',
    ];

    let fileIndex = 0;

    function updateFileName() {
        loadingFile.textContent = files[fileIndex];
        fileIndex = (fileIndex + 1) % files.length;
        setTimeout(updateFileName, 200 + Math.random() * 800);
    }

    updateFileName();
}

// ==========================================
// RULES SLIDER
// ==========================================

function initRulesSlider() {
    const rules = document.querySelectorAll('.rule');
    let currentRule = 0;

    function showNextRule() {
        const current = rules[currentRule];
        current.classList.remove('active');
        current.classList.add('exit');

        setTimeout(() => {
            current.classList.remove('exit');
        }, 600);

        currentRule = (currentRule + 1) % rules.length;

        setTimeout(() => {
            rules[currentRule].classList.add('active');
        }, 200);
    }

    setInterval(showNextRule, 5000);
}

// ==========================================
// MUSIC PLAYER
// ==========================================

function initMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    const vinyl = document.getElementById('vinyl');
    const trackName = document.getElementById('track-name');
    const trackArtist = document.getElementById('track-artist');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const tracks = [
        { name: 'Ambient Atmosphere', artist: 'Necrograd OST' },
        { name: 'Night Patrol', artist: 'Necrograd OST' },
        { name: 'Urban Decay', artist: 'Necrograd OST' },
        { name: 'Calm Before Storm', artist: 'Necrograd OST' },
        { name: 'Street Life', artist: 'Necrograd OST' },
    ];

    let currentTrack = 0;
    let isPlaying = false;

    function togglePlay() {
        isPlaying = !isPlaying;
        playBtn.classList.toggle('playing', isPlaying);
        vinyl.classList.toggle('spinning', isPlaying);
    }

    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
        trackName.textContent = tracks[currentTrack].name;
        trackArtist.textContent = tracks[currentTrack].artist;

        trackName.style.opacity = '0';
        trackArtist.style.opacity = '0';
        setTimeout(() => {
            trackName.style.opacity = '1';
            trackArtist.style.opacity = '1';
        }, 200);
    }

    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeTrack(-1));
    nextBtn.addEventListener('click', () => changeTrack(1));

    trackName.style.transition = 'opacity 0.3s ease';
    trackArtist.style.transition = 'opacity 0.3s ease';
}

// ==========================================
// TIPS ROTATION
// ==========================================

function initTips() {
    const tipText = document.getElementById('tip-text');

    const tips = [
        'Нажмите F1, чтобы открыть меню помощи на сервере',
        'Используйте /me для описания ваших действий в RP',
        'Зажмите ALT для голосового чата ближнего действия',
        'Посетите наш Discord для актуальных новостей',
        'Не забудьте прочитать правила перед началом игры',
        'Нажмите F4 для открытия меню работ и профессий',
        'Используйте /report для обращения к администрации',
        'Экономьте деньги - покупайте недвижимость!',
        'Вступите в организацию для группового геймплея',
        'Нажмите TAB для просмотра списка игроков',
    ];

    let currentTip = 0;

    function showNextTip() {
        tipText.style.opacity = '0';
        tipText.style.transform = 'translateY(5px)';

        setTimeout(() => {
            currentTip = (currentTip + 1) % tips.length;
            tipText.textContent = tips[currentTip];
            tipText.style.opacity = '1';
            tipText.style.transform = 'translateY(0)';
        }, 500);
    }

    tipText.style.transition = 'all 0.5s ease';

    setInterval(showNextTip, 8000);
}

// ==========================================
// PLAYER COUNT ANIMATION
// ==========================================

function initPlayerCount() {
    const playersOnline = document.getElementById('players-online');
    const pingValue = document.getElementById('ping-value');

    function updateStats() {
        let current = parseInt(playersOnline.textContent);
        const change = Math.floor(Math.random() * 3) - 1;
        current = Math.max(40, Math.min(128, current + change));
        playersOnline.textContent = current;

        const ping = Math.floor(25 + Math.random() * 30);
        pingValue.textContent = ping + 'ms';
    }

    setInterval(updateStats, 5000);
}

// ==========================================
// GMOD INTEGRATION (GameDetails callback)
// ==========================================

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    const serverName = document.querySelector('.server-name');
    if (servername) {
        serverName.textContent = servername;
    }

    const slotsValue = document.querySelectorAll('.stat-value')[1];
    if (maxplayers && slotsValue) {
        slotsValue.textContent = maxplayers;
    }
}

function SetFilesTotal(total) {
    window.totalFiles = total;
}

function SetFilesNeeded(needed) {
    if (window.totalFiles) {
        const downloaded = window.totalFiles - needed;
        const percent = Math.floor((downloaded / window.totalFiles) * 100);
        
        const progressBar = document.getElementById('progress-bar');
        const loadingPercent = document.getElementById('loading-percent');
        const filesCount = document.getElementById('files-count');

        if (progressBar) progressBar.style.width = percent + '%';
        if (loadingPercent) loadingPercent.textContent = percent + '%';
        if (filesCount) filesCount.textContent = downloaded + ' / ' + window.totalFiles;
    }
}

function DownloadingFile(fileName) {
    const loadingFile = document.getElementById('loading-file');
    if (loadingFile) {
        loadingFile.textContent = fileName;
    }
}

function SetStatusChanged(status) {
    const statusText = document.getElementById('status-text');
    if (statusText) {
        statusText.textContent = status;
    }
}

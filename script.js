// ==========================================
// NECROGRAD LOADING SCREEN - SCRIPTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initSlideshow();
    initLoadingBar();
    initMusicPlayer();
    initTips();
    initStats();
});

// ==========================================
// PARTICLES
// ==========================================

function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 50;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
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
            this.color = Math.random() > 0.5 ? '#0ea5e9' : '#06b6d4';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#0ea5e9';
                    ctx.globalAlpha = 0.1 * (1 - distance / 150);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ==========================================
// BACKGROUND SLIDESHOW
// ==========================================

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 8000;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, slideInterval);
}

// ==========================================
// LOADING BAR
// ==========================================

function initLoadingBar() {
    const progressBar = document.getElementById('progress-bar');
    const loadingPercent = document.getElementById('loading-percent');
    const filesCount = document.getElementById('files-count');
    const loadingFile = document.getElementById('loading-file');
    const downloadSpeed = document.getElementById('download-speed');
    const pingValue = document.getElementById('ping-value');
    
    let progress = 0;
    const totalFiles = 347;
    
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
        'models/necrograd/architecture/building_01.mdl'
    ];
    
    const statuses = [
        { at: 0, text: 'Подключение к серверу...' },
        { at: 5, text: 'Получение информации о сервере...' },
        { at: 10, text: 'Загрузка материалов...' },
        { at: 35, text: 'Загрузка моделей...' },
        { at: 55, text: 'Загрузка звуков...' },
        { at: 70, text: 'Загрузка скриптов Lua...' },
        { at: 85, text: 'Загрузка карты...' },
        { at: 95, text: 'Инициализация...' },
        { at: 99, text: 'Отправка клиентской информации...' }
    ];
    
    let fileIndex = 0;
    
    function updateProgress() {
        const increment = Math.random() * 1.5 + 0.2;
        progress = Math.min(progress + increment, 100);
        
        const currentPercent = Math.floor(progress);
        const currentFiles = Math.floor((progress / 100) * totalFiles);
        
        progressBar.style.width = progress + '%';
        loadingPercent.textContent = currentPercent + '%';
        filesCount.textContent = currentFiles + ' / ' + totalFiles;
        
        // Update status text
        for (let i = statuses.length - 1; i >= 0; i--) {
            if (progress >= statuses[i].at) {
                if (progress > 10) {
                    loadingFile.textContent = files[fileIndex];
                    fileIndex = (fileIndex + 1) % files.length;
                } else {
                    loadingFile.textContent = statuses[i].text;
                }
                break;
            }
        }
        
        // Random speed
        const speed = (1.5 + Math.random() * 3.5).toFixed(1);
        downloadSpeed.textContent = speed + ' MB/s';
        
        // Random ping
        const ping = Math.floor(20 + Math.random() * 40);
        pingValue.textContent = ping + ' ms';
        
        if (progress < 100) {
            const delay = 80 + Math.random() * 200;
            setTimeout(updateProgress, delay);
        } else {
            loadingFile.textContent = 'Загрузка завершена! Входим на сервер...';
            loadingPercent.textContent = '100%';
            filesCount.textContent = totalFiles + ' / ' + totalFiles;
            
            // Restart for demo
            setTimeout(() => {
                progress = 0;
                progressBar.style.width = '0%';
                updateProgress();
            }, 4000);
        }
    }
    
    setTimeout(updateProgress, 1000);
}

// ==========================================
// MUSIC PLAYER
// ==========================================

function initMusicPlayer() {
    const toggleBtn = document.getElementById('music-toggle');
    const prevBtn = document.getElementById('prev-track');
    const nextBtn = document.getElementById('next-track');
    const progressBar = document.getElementById('music-progress');
    const titleEl = document.getElementById('music-title');
    const artistEl = document.getElementById('music-artist');
    const volumeSlider = document.getElementById('volume-slider');
    
    const tracks = [
        { title: 'Ambient Atmosphere', artist: 'Necrograd OST' },
        { title: 'Dark Streets', artist: 'Necrograd OST' },
        { title: 'Night Patrol', artist: 'Necrograd OST' },
        { title: 'Urban Shadows', artist: 'Necrograd OST' },
        { title: 'Cold Wind', artist: 'Necrograd OST' }
    ];
    
    let currentTrack = 0;
    let isPlaying = false;
    let progressValue = 0;
    let progressInterval;
    
    function togglePlay() {
        isPlaying = !isPlaying;
        toggleBtn.classList.toggle('playing', isPlaying);
        
        if (isPlaying) {
            progressInterval = setInterval(() => {
                progressValue += 0.5;
                if (progressValue >= 100) {
                    progressValue = 0;
                    changeTrack(1);
                }
                progressBar.style.width = progressValue + '%';
            }, 100);
        } else {
            clearInterval(progressInterval);
        }
    }
    
    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
        progressValue = 0;
        progressBar.style.width = '0%';
        
        titleEl.style.opacity = '0';
        artistEl.style.opacity = '0';
        
        setTimeout(() => {
            titleEl.textContent = tracks[currentTrack].title;
            artistEl.textContent = tracks[currentTrack].artist;
            titleEl.style.opacity = '1';
            artistEl.style.opacity = '1';
        }, 200);
    }
    
    toggleBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeTrack(-1));
    nextBtn.addEventListener('click', () => changeTrack(1));
    
    titleEl.style.transition = 'opacity 0.3s ease';
    artistEl.style.transition = 'opacity 0.3s ease';
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
        'Экономьте деньги - покупайте недвижимость',
        'Вступите в организацию для группового геймплея',
        'Нажмите TAB для просмотра списка игроков'
    ];
    
    let currentTip = 0;
    
    function showNextTip() {
        tipText.style.opacity = '0';
        
        setTimeout(() => {
            currentTip = (currentTip + 1) % tips.length;
            tipText.textContent = tips[currentTip];
            tipText.style.opacity = '1';
        }, 500);
    }
    
    setInterval(showNextTip, 6000);
}

// ==========================================
// STATS UPDATE
// ==========================================

function initStats() {
    const playersCount = document.getElementById('players-count');
    
    function updateStats() {
        let current = parseInt(playersCount.textContent);
        const change = Math.floor(Math.random() * 3) - 1;
        current = Math.max(40, Math.min(128, current + change));
        playersCount.textContent = current;
    }
    
    setInterval(updateStats, 5000);
}

// ==========================================
// GMOD INTEGRATION
// ==========================================

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    // Can update server name if needed
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
    const loadingFile = document.getElementById('loading-file');
    if (loadingFile) {
        loadingFile.textContent = status;
    }
}    let progress = 0;
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

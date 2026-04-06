// ==========================================
// NECROGRAD LOADING SCREEN - WITH AUDIO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initLoadingBar();
    initTips();
    initStats();
    initVolumeControl();
    initUnmuteOverlay();
});

// ==========================================
// UNMUTE OVERLAY
// ==========================================

function initUnmuteOverlay() {
    const overlay = document.getElementById('unmute-overlay');
    const bgVideo = document.getElementById('bg-video');
    
    function unmuteVideo() {
        overlay.classList.add('hidden');
        
        // Send unmute command to YouTube iframe
        bgVideo.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        bgVideo.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[70]}', '*');
        
        localStorage.setItem('necrograd_audio_enabled', 'true');
    }
    
    overlay.addEventListener('click', unmuteVideo);
    
    // Auto hide if user already enabled audio before
    if (localStorage.getItem('necrograd_audio_enabled') === 'true') {
        setTimeout(() => {
            overlay.classList.add('hidden');
            bgVideo.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            bgVideo.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[70]}', '*');
        }, 1000);
    }
}

// ==========================================
// VOLUME CONTROL
// ==========================================

function initVolumeControl() {
    const volumeToggle = document.getElementById('volume-toggle');
    const volumeRange = document.getElementById('volume-range');
    const volumeValue = document.getElementById('volume-value');
    const bgVideo = document.getElementById('bg-video');
    
    let isMuted = false;
    let lastVolume = 70;
    
    // Toggle mute
    volumeToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        volumeToggle.classList.toggle('muted', isMuted);
        
        if (isMuted) {
            lastVolume = parseInt(volumeRange.value);
            volumeRange.value = 0;
            volumeValue.textContent = '0%';
            bgVideo.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        } else {
            volumeRange.value = lastVolume;
            volumeValue.textContent = lastVolume + '%';
            bgVideo.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            bgVideo.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${lastVolume}]}`, '*');
        }
    });
    
    // Volume slider
    volumeRange.addEventListener('input', (e) => {
        const volume = parseInt(e.target.value);
        volumeValue.textContent = volume + '%';
        
        if (volume === 0) {
            isMuted = true;
            volumeToggle.classList.add('muted');
            bgVideo.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        } else {
            if (isMuted) {
                isMuted = false;
                volumeToggle.classList.remove('muted');
                bgVideo.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }
            bgVideo.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, '*');
        }
    });
}

// ==========================================
// PARTICLES
// ==========================================

function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 60;
    
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
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
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
            
            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            
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
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#0ea5e9';
                    ctx.globalAlpha = 0.15 * (1 - distance / 120);
                    ctx.lineWidth = 1;
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
        'materials/necrograd/world/brick_wall_01.vtf',
        'materials/necrograd/world/metal_floor.vmt',
        'models/necrograd/props/crate_military.mdl',
        'models/necrograd/props/barrel_explosive.mdl',
        'models/necrograd/vehicles/uaz_469.mdl',
        'models/necrograd/vehicles/vaz_2106.mdl',
        'materials/necrograd/hud/icons/weapon_ak47.png',
        'materials/necrograd/hud/icons/weapon_m4a1.png',
        'materials/necrograd/hud/icons/health_icon.png',
        'sound/necrograd/ambient/city_wind.wav',
        'sound/necrograd/ambient/night_crickets.wav',
        'sound/necrograd/weapons/ak47_fire1.wav',
        'sound/necrograd/weapons/ak47_fire2.wav',
        'sound/necrograd/weapons/reload_rifle.wav',
        'lua/autorun/client/cl_necrograd_hud.lua',
        'lua/autorun/client/cl_necrograd_scoreboard.lua',
        'lua/autorun/server/sv_necrograd_jobs.lua',
        'lua/autorun/server/sv_necrograd_economy.lua',
        'lua/autorun/sh_necrograd_config.lua',
        'models/necrograd/characters/citizen_male_01.mdl',
        'models/necrograd/characters/citizen_female_01.mdl',
        'models/necrograd/characters/police_01.mdl',
        'materials/necrograd/skybox/sky_necrograd_up.vtf',
        'materials/necrograd/skybox/sky_necrograd_dn.vtf',
        'materials/necrograd/skybox/sky_necrograd_lf.vtf',
        'materials/necrograd/skybox/sky_necrograd_rt.vtf',
        'sound/necrograd/music/lobby_theme.mp3',
        'sound/necrograd/music/ambient_01.mp3',
        'models/necrograd/props/barricade_01.mdl',
        'models/necrograd/props/sandbags_01.mdl',
        'materials/necrograd/effects/blood_splat_01.vtf',
        'materials/necrograd/effects/muzzle_flash.vtf',
        'lua/entities/necrograd_atm/init.lua',
        'lua/entities/necrograd_atm/cl_init.lua',
        'lua/entities/necrograd_vendor/shared.lua',
        'models/necrograd/weapons/w_knife_bayonet.mdl',
        'models/necrograd/weapons/w_ak47.mdl',
        'models/necrograd/weapons/w_m4a1.mdl',
        'materials/necrograd/ui/inventory_bg.png',
        'materials/necrograd/ui/menu_bg.png',
        'sound/necrograd/ui/click_01.wav',
        'sound/necrograd/ui/hover_01.wav',
        'lua/weapons/necrograd_pistol/shared.lua',
        'lua/weapons/necrograd_rifle/shared.lua',
        'models/necrograd/furniture/table_wooden.mdl',
        'models/necrograd/furniture/chair_metal.mdl',
        'models/necrograd/architecture/building_01.mdl',
        'models/necrograd/architecture/wall_concrete.mdl',
        'materials/necrograd/world/road_asphalt.vtf',
        'materials/necrograd/world/sidewalk_01.vtf',
        'sound/necrograd/vehicles/engine_idle.wav',
        'sound/necrograd/vehicles/engine_start.wav',
        'materials/necrograd/characters/uniform_police.vtf',
        'materials/necrograd/characters/uniform_medic.vtf'
    ];
    
    const statuses = [
        { at: 0, text: 'Подключение к серверу...' },
        { at: 3, text: 'Установка соединения...' },
        { at: 8, text: 'Получение информации о сервере...' },
        { at: 12, text: 'Загрузка материалов...' },
        { at: 30, text: 'Загрузка текстур окружения...' },
        { at: 42, text: 'Загрузка 3D моделей...' },
        { at: 58, text: 'Загрузка звуковых файлов...' },
        { at: 68, text: 'Загрузка скриптов Lua...' },
        { at: 78, text: 'Загрузка карты...' },
        { at: 88, text: 'Инициализация клиента...' },
        { at: 95, text: 'Синхронизация данных...' },
        { at: 99, text: 'Отправка клиентской информации...' }
    ];
    
    let fileIndex = 0;
    
    function updateProgress() {
        const increment = Math.random() * 1.2 + 0.3;
        progress = Math.min(progress + increment, 100);
        
        const currentPercent = Math.floor(progress);
        const currentFiles = Math.floor((progress / 100) * totalFiles);
        
        progressBar.style.width = progress + '%';
        loadingPercent.textContent = currentPercent + '%';
        filesCount.textContent = currentFiles + ' / ' + totalFiles;
        
        // Update status text
        for (let i = statuses.length - 1; i >= 0; i--) {
            if (progress >= statuses[i].at) {
                if (progress > 12) {
                    loadingFile.textContent = files[fileIndex];
                    if (Math.random() > 0.7) {
                        fileIndex = (fileIndex + 1) % files.length;
                    }
                } else {
                    loadingFile.textContent = statuses[i].text;
                }
                break;
            }
        }
        
        // Random speed
        const speed = (1.8 + Math.random() * 3.2).toFixed(1);
        downloadSpeed.textContent = speed + ' MB/s';
        
        // Random ping
        const ping = Math.floor(22 + Math.random() * 35);
        pingValue.textContent = ping + ' ms';
        
        if (progress < 100) {
            const delay = 100 + Math.random() * 250;
            setTimeout(updateProgress, delay);
        } else {
            loadingFile.textContent = 'Загрузка завершена! Входим на сервер...';
            loadingPercent.textContent = '100%';
            filesCount.textContent = totalFiles + ' / ' + totalFiles;
            downloadSpeed.textContent = '0.0 MB/s';
            
            // Restart for demo
            setTimeout(() => {
                progress = 0;
                fileIndex = 0;
                progressBar.style.width = '0%';
                updateProgress();
            }, 5000);
        }
    }
    
    setTimeout(updateProgress, 1500);
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
        'Посетите наш Discord для актуальных новостей и обновлений',
        'Не забудьте прочитать правила сервера перед началом игры',
        'Нажмите F4 для открытия меню работ и профессий',
        'Используйте /report для обращения к администрации сервера',
        'Экономьте деньги и покупайте недвижимость в игре',
        'Вступите в организацию для совместного геймплея',
        'Нажмите TAB для просмотра списка игроков онлайн',
        'Соблюдайте правило новой жизни (NLR) - 3 минуты',
        'Запрещено убийство без RP причины (RDM)',
        'Цените свою жизнь в игре - соблюдайте FearRP',
        'Взаимодействуйте с другими игроками в ролевых ситуациях',
        'Используйте /advert для публичных объявлений'
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
    
    setInterval(showNextTip, 7000);
}

// ==========================================
// STATS UPDATE
// ==========================================

function initStats() {
    const playersCount = document.getElementById('players-count');
    
    function updateStats() {
        let current = parseInt(playersCount.textContent);
        const change = Math.floor(Math.random() * 5) - 2;
        current = Math.max(35, Math.min(128, current + change));
        playersCount.textContent = current;
    }
    
    setInterval(updateStats, 6000);
}

// ==========================================
// GMOD INTEGRATION
// ==========================================

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    console.log('Server:', servername);
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
    if (loadingFile && fileName) {
        loadingFile.textContent = fileName;
    }
}

function SetStatusChanged(status) {
    const loadingFile = document.getElementById('loading-file');
    if (loadingFile && status) {
        loadingFile.textContent = status;
    }
}

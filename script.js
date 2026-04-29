// ============ PARTICLES ============
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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this._currentOpacity = this.opacity;
        this.color = Math.random() > 0.7 ? '#00d9ff' : (Math.random() > 0.5 ? '#ff4655' : '#ffffff');
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
            this._currentOpacity += (0.8 - this._currentOpacity) * 0.1;
        } else {
            this._currentOpacity += (this.opacity - this._currentOpacity) * 0.05;
        }

        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
        const o = this._currentOpacity * (0.7 + Math.sin(this.pulse) * 0.3);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = o;
        ctx.fill();

        if (this.size > 1.5) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.globalAlpha = o * 0.12;
            ctx.fill();
        }
    }
}

const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 14000));
for (let i = 0; i < count; i++) particles.push(new Particle());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = '#00d9ff';
                ctx.globalAlpha = (1 - dist / 100) * 0.1;
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

// ============ AUDIO AUTOPLAY ============
const bgMusic = document.getElementById('bg-music');
document.addEventListener('click', () => {
    if (bgMusic.paused) bgMusic.play().catch(() => {});
}, { once: true });

// ============ BEAT ANIMATION ============
const logoWrapper = document.getElementById('logo-wrapper');
const logo = logoWrapper.querySelector('.logo');

const beatDuration = 300;
const beatPause = 200;  // <-- изменено с 400 на 200

let beatDirection = 0;
let beatActive = false;

function doBeat() {
    if (beatActive) return;
    beatActive = true;

    const dir = beatDirection === 0 ? -1 : 1;
    beatDirection = beatDirection === 0 ? 1 : 0;

    logoWrapper.classList.add('beat-hit');

    const startTime = performance.now();

    function animateBeat(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / beatDuration, 1);

        let ease;
        if (t < 0.5) {
            ease = t * 2;
        } else {
            ease = (1 - t) * 2;
        }

        const rotateY = dir * 14 * ease;
        const rotateZ = dir * 4 * ease;
        const scale = 1 + 0.1 * ease;
        const translateZ = 50 * ease;

        logo.style.transform = `rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale}) translateZ(${translateZ}px)`;

        if (t < 1) {
            requestAnimationFrame(animateBeat);
        } else {
            logo.style.transform = 'rotateY(0deg) rotateZ(0deg) scale(1) translateZ(0px)';
            logoWrapper.classList.remove('beat-hit');
            beatActive = false;
        }
    }

    requestAnimationFrame(animateBeat);
}

function beatLoop() {
    doBeat();
    setTimeout(beatLoop, beatDuration + beatPause);
}

setTimeout(beatLoop, 1000);

// ============ GRID BEAT PULSE ============
const gridBg = document.querySelector('.grid-background');
const glowEl = document.querySelector('.logo-glow');

function pulseOnBeat() {
    if (gridBg) {
        gridBg.style.transition = 'none';
        gridBg.style.backgroundImage = `
            linear-gradient(rgba(0, 217, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.15) 1px, transparent 1px)
        `;
        setTimeout(() => {
            gridBg.style.transition = 'background-image 0.3s ease';
            gridBg.style.backgroundImage = `
                linear-gradient(rgba(0, 217, 255, 0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 217, 255, 0.07) 1px, transparent 1px)
            `;
        }, 50);
    }

    if (glowEl) {
        glowEl.style.transition = 'none';
        glowEl.style.opacity = '0.7';
        setTimeout(() => {
            glowEl.style.transition = 'opacity 0.4s ease';
            glowEl.style.opacity = '0.35';
        }, 50);
    }
}

function beatPulseLoop() {
    pulseOnBeat();
    setTimeout(beatPulseLoop, beatDuration + beatPause);
}
setTimeout(beatPulseLoop, 1000);

// ============ LOADING ============
const loadingPercent = document.getElementById('loading-percent');
const progressBar = document.getElementById('progress-bar');

let currentProgress = 0;
let targetProgress = 0;

function simulateLoading() {
    if (targetProgress < 100) {
        targetProgress = Math.min(100, targetProgress + Math.random() * 1.8 + 0.3);
    }

    currentProgress += (targetProgress - currentProgress) * 0.06;
    const display = Math.min(Math.round(currentProgress), 100);

    if (loadingPercent) loadingPercent.textContent = display + '%';
    if (progressBar) progressBar.style.width = display + '%';

    if (display < 100) {
        setTimeout(simulateLoading, 50);
    } else {
        if (loadingPercent) {
            loadingPercent.textContent = '100%';
            loadingPercent.style.color = '#00ff64';
            loadingPercent.style.textShadow = '0 0 20px rgba(0, 255, 100, 0.6)';
        }
        const label = document.querySelector('.loading-label');
        if (label) label.textContent = 'ГОТОВО';
    }
}

setTimeout(simulateLoading, 1200);

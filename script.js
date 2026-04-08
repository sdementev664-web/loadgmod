/* ==========================================
   VARIABLES
   ========================================== */

:root {
    --bg-dark: #030712;
    --bg-card: rgba(15, 23, 42, 0.7);
    --border: rgba(148, 163, 184, 0.1);
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --primary: #0ea5e9;
    --primary-dark: #0284c7;
    --primary-glow: rgba(14, 165, 233, 0.4);
    --success: #10b981;
    --danger: #ef4444;
}

/* ==========================================
   GLOBAL
   ========================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Montserrat', sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    overflow: hidden;
    height: 100vh;
    position: relative;
}

/* ==========================================
   GIF BACKGROUND
   ========================================== */

.gif-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
}

.gif-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.4) contrast(1.1);
}

.gif-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(3, 7, 18, 0.3) 0%,
        rgba(3, 7, 18, 0.6) 50%,
        rgba(3, 7, 18, 0.85) 100%
    );
    pointer-events: none;
}

/* Дополнительный эффект виньетки */
.gif-background::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        ellipse at center,
        transparent 0%,
        rgba(3, 7, 18, 0.4) 70%,
        rgba(3, 7, 18, 0.8) 100%
    );
    pointer-events: none;
}

/* ==========================================
   PARTICLES
   ========================================== */

#particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

/* ==========================================
   CONTAINER
   ========================================== */

.container {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    padding: 50px;
}

/* ==========================================
   HEADER
   ========================================== */

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: fadeSlideDown 0.8s ease-out;
}

@keyframes fadeSlideDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.server-status {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 50px;
    backdrop-filter: blur(20px);
}

.status-dot {
    width: 10px;
    height: 10px;
    background: var(--success);
    border-radius: 50%;
    box-shadow: 0 0 20px var(--success);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.7;
        transform: scale(1.2);
    }
}

.status-text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--success);
}

.header-stats {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 12px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 50px;
    backdrop-filter: blur(20px);
}

.header-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header-stat-value {
    font-size: 24px;
    font-weight: 800;
    color: var(--primary);
    line-height: 1;
    font-family: 'Roboto Mono', monospace;
}

.header-stat-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 1px;
    margin-top: 4px;
}

.header-divider {
    width: 1px;
    height: 40px;
    background: var(--border);
}

/* ==========================================
   MAIN / LOGO
   ========================================== */

.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.logo-section {
    text-align: center;
    position: relative;
    animation: fadeScale 1s ease-out 0.2s both;
}

@keyframes fadeScale {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
    filter: blur(60px);
    animation: glowPulse 4s ease-in-out infinite;
    pointer-events: none;
}

@keyframes glowPulse {
    0%, 100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

.logo {
    font-size: 90px;
    font-weight: 900;
    letter-spacing: 8px;
    line-height: 1;
    margin-bottom: 20px;
    position: relative;
}

.logo-text {
    display: inline-block;
    background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

.logo-text.accent {
    background: linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 40px var(--primary-glow));
}

.logo-tagline {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 6px;
    color: var(--text-secondary);
    text-transform: uppercase;
}

/* ==========================================
   FOOTER / LOADING
   ========================================== */

.footer {
    animation: fadeSlideUp 0.8s ease-out 0.4s both;
}

@keyframes fadeSlideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.loading-section {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 30px;
    backdrop-filter: blur(20px);
    margin-bottom: 20px;
}

.loading-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.loading-status {
    display: flex;
    align-items: baseline;
    gap: 12px;
}

.loading-label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--text-secondary);
}

.loading-percentage {
    font-size: 28px;
    font-weight: 800;
    color: var(--primary);
    font-family: 'Roboto Mono', monospace;
}

.loading-file {
    font-size: 12px;
    color: var(--text-secondary);
    font-family: 'Roboto Mono', monospace;
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.progress-container {
    height: 8px;
    background: rgba(148, 163, 184, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-dark), var(--primary));
    border-radius: 10px;
    width: 0%;
    transition: width 0.3s ease;
    position: relative;
    box-shadow: 0 0 20px var(--primary-glow);
}

.progress-glow {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.loading-details {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.detail {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.detail-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.detail-value {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    font-family: 'Roboto Mono', monospace;
}

/* ==========================================
   TIP SECTION
   ========================================== */

.tip-section {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 18px 26px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    backdrop-filter: blur(20px);
}

.tip-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border-radius: 50%;
    font-size: 16px;
    font-weight: 800;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 0 20px var(--primary-glow);
}

.tip-text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    transition: opacity 0.5s ease;
}

/* ==========================================
   START OVERLAY
   ========================================== */

.start-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(3, 7, 18, 0.98);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}

.start-overlay.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.start-content {
    text-align: center;
    animation: fadeInScale 0.8s ease-out;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.start-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 40px;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulseStart 2s ease-in-out infinite;
    box-shadow: 0 0 80px var(--primary-glow);
}

@keyframes pulseStart {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 80px var(--primary-glow);
    }
    50% {
        transform: scale(1.08);
        box-shadow: 0 0 100px var(--primary-glow), 0 0 150px rgba(14, 165, 233, 0.3);
    }
}

.start-icon svg {
    width: 60px;
    height: 60px;
    color: white;
}

.start-content h2 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--text-primary);
    letter-spacing: 2px;
}

.start-content p {
    font-size: 18px;
    color: var(--text-secondary);
    animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

/* ==========================================
   MUSIC CONTROL
   ========================================== */

.music-control {
    position: fixed;
    left: 50px;
    bottom: 180px;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 60px;
    backdrop-filter: blur(20px);
    animation: fadeSlideUp 0.8s ease-out 0.6s both;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.music-control.visible {
    opacity: 1;
}

.music-toggle {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px var(--primary-glow);
}

.music-toggle:hover {
    transform: scale(1.08);
    box-shadow: 0 0 30px var(--primary-glow);
}

.music-toggle svg {
    width: 20px;
    height: 20px;
}

.music-toggle.playing .icon-play {
    display: none;
}

.music-toggle.playing .icon-pause {
    display: block !important;
}

.music-info {
    min-width: 140px;
}

.music-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 3px;
}

.music-artist {
    font-size: 11px;
    color: var(--text-secondary);
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
}

.volume-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.volume-btn:hover {
    background: rgba(14, 165, 233, 0.1);
    color: var(--primary);
}

.volume-btn svg {
    width: 20px;
    height: 20px;
}

.volume-slider {
    width: 80px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px var(--primary-glow);
    transition: all 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

.volume-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 10px var(--primary-glow);
}

.volume-percent {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    min-width: 40px;
    font-family: 'Roboto Mono', monospace;
}

/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 1024px) {
    .container {
        padding: 30px;
    }

    .logo {
        font-size: 70px;
    }

    .music-control {
        left: 30px;
        bottom: 160px;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 20px;
    }

    .header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }

    .header-stats {
        justify-content: center;
    }

    .logo {
        font-size: 50px;
        letter-spacing: 4px;
    }

    .logo-tagline {
        font-size: 12px;
        letter-spacing: 3px;
    }

    .loading-section {
        padding: 20px;
    }

    .loading-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .loading-details {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .music-control {
        position: relative;
        left: 0;
        bottom: 0;
        margin-bottom: 15px;
        width: 100%;
        border-radius: 16px;
        justify-content: space-between;
    }

    .music-info {
        flex: 1;
    }
}

@media (max-width: 480px) {
    .logo {
        font-size: 36px;
    }

    .logo-tagline {
        font-size: 10px;
    }

    .loading-percentage {
        font-size: 22px;
    }

    .loading-details {
        grid-template-columns: 1fr;
    }

    .header-stat-value {
        font-size: 20px;
    }

    .music-control {
        flex-wrap: wrap;
        gap: 10px;
    }

    .volume-control {
        width: 100%;
        justify-content: flex-end;
    }

    .start-content h2 {
        font-size: 26px;
    }

    .start-content p {
        font-size: 14px;
    }

    .start-icon {
        width: 90px;
        height: 90px;
        margin-bottom: 25px;
    }

    .start-icon svg {
        width: 45px;
        height: 45px;
    }
}

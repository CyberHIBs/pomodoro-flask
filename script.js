// 🎯 Timer Logic
let timer;
let timeLeft = 25 * 60;
let isRunning = false;

const display = document.getElementById('timer');
const cycleLog = document.getElementById('cycleLog');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const beep = document.getElementById('beep');
const focusMusic = document.getElementById('focusMusic');
const progressCircle = document.getElementById('progress');  // ✅ Targets the right circle
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
}

function updateProgressRing() {
    const percent = timeLeft / (25 * 60);
    const offset = circumference * (1 - percent);
    progressCircle.style.strokeDashoffset = offset;
}


function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    updateProgressRing(); // ✅ This line should already be here
}


function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timer);
                isRunning = false;
                timeLeft = 25 * 60;
                const logList = document.getElementById('logList');

                if (logList) {
  const li = document.createElement("li");
  li.textContent = "✔️ Completed Cycle";
  logList.appendChild(li);
}

                if (beep) beep.play();
                showModal();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}

startBtn?.addEventListener('click', startTimer);
pauseBtn?.addEventListener('click', pauseTimer);
resetBtn?.addEventListener('click', resetTimer);
updateDisplay();

// 🎵 Music Control
const musicToggle = document.getElementById('musicToggle');
if (musicToggle && focusMusic) {
    musicToggle.addEventListener('change', function () {
        if (this.checked) {
            focusMusic.play();
            focusMusic.loop = true;
        } else {
            focusMusic.pause();
            focusMusic.currentTime = 0;
        }
    });
}

// 🌙 Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });
}

// 🧠 Break Suggestion Modal
function showModal() {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    if (modal && modalText) {
        modal.style.display = 'block';
        modalText.textContent = [
            'Stretch your legs 🧘‍♂️',
            'Grab some water 💧',
            'Look out a window 🌄'
        ][Math.floor(Math.random() * 3)];
    }
}

const closeModal = document.getElementById('closeModal');
if (closeModal) {
    closeModal.addEventListener('click', function () {
        const modal = document.getElementById('modal');
        if (modal) modal.style.display = 'none';
    });
}
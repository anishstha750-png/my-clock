// Perfect placement + smooth sweep + numbers + background image support

const clock = document.getElementById('clock');
const ticksContainer = document.getElementById('ticks');
const numbersContainer = document.getElementById('numbers');

const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');

function createTicksAndNumbers() {
  ticksContainer.innerHTML = '';
  numbersContainer.innerHTML = '';

  const rect = clock.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  // radius for ticks and numbers (in px)
  const tickRadius = Math.min(cx, cy) * 0.88;     // ticks placed near edge
  const numberRadius = Math.min(cx, cy) * 0.72;   // numbers slightly inside

  // 60 ticks
  for (let i = 0; i < 60; i++) {
    const angleDeg = i * 6; // 360/60
    const angle = angleDeg * Math.PI / 180;
    // create tick element
    const t = document.createElement('div');
    t.className = 'tick' + (i % 5 === 0 ? '' : ' small');

    // position: we place element at center and then translate outward using transform
    // Use translate(-50%,-100%) then rotate to point outward
    // We'll compute pixel position so it is perfectly circular:
    const tx = cx + Math.sin(angle) * tickRadius;
    const ty = cy - Math.cos(angle) * tickRadius;

    t.style.left = tx + 'px';
    t.style.top = ty + 'px';
    // rotate so tick points outward from center
    t.style.transform = `translate(-50%,-100%) rotate(${angleDeg}deg)`;
    ticksContainer.appendChild(t);
  }

  // 12 numbers (1..12)
  for (let n = 1; n <= 12; n++) {
    const angleDeg = (n % 12) * 30; // 360/12
    const angle = angleDeg * Math.PI / 180;
    const num = document.createElement('div');
    num.className = 'number';
    num.textContent = String(n);

    const nx = cx + Math.sin(angle) * numberRadius;
    const ny = cy - Math.cos(angle) * numberRadius;

    num.style.left = nx + 'px';
    num.style.top = ny + 'px';

    // slightly offset the numbers to center them visually
    num.style.transform = 'translate(-50%,-50%)';

    numbersContainer.appendChild(num);
  }
}

// update hand rotation smoothly using requestAnimationFrame
function updateHands() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const s = now.getSeconds() + ms/1000;
  const m = now.getMinutes() + s/60;
  const h = (now.getHours() % 12) + m/60;

  const hourDeg = h * 30; // 360/12
  const minuteDeg = m * 6; // 360/60
  const secondDeg = s * 6;

  // set transforms (translate first to keep center then rotate)
  hourHand.style.transform = `translate(-50%, -90%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translate(-50%, -90%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translate(-50%, -90%) rotate(${secondDeg}deg)`;

  requestAnimationFrame(updateHands);
}

// redraw ticks/numbers when resized (keeps perfect positions)
window.addEventListener('resize', () => {
  createTicksAndNumbers();
});

// initial setup
createTicksAndNumbers();
requestAnimationFrame(updateHands);

// ---- PLAY MUSIC BUTTON ----
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");

playBtn.addEventListener("click", () => {
    music.play();
    playBtn.style.display = "none";   // click पछि बटन लुकाउँछ
});




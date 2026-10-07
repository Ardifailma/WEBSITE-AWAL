// TAB NAVIGATION & PROGRESS
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeNavBtn = document.getElementById('btn-' + tabId);
    if (activeNavBtn) activeNavBtn.classList.add('active');

    const progressMap = { 'home': 20, 'fungsi': 40, 'senilai': 60, 'berbalik': 80, 'penerapan': 100 };
    const progress = progressMap[tabId] || 20;
    document.getElementById('overall-progress').style.width = progress + '%';
    document.getElementById('progress-text').innerText = progress + '%';

    if (tabId === 'senilai') renderSenilaiChart();
    if (tabId === 'berbalik') renderBerbalikChart();

    if (window.renderMathInElement) {
        renderMathInElement(document.body);
    }
}

// 1. FUNGSI SIMULATION
function processMachine() {
    const inputVal = parseFloat(document.getElementById('func-input').value) || 0;
    const outputVal = inputVal * 3;
    document.getElementById('func-output').innerText = outputVal;
    document.getElementById('tbl-in').innerText = inputVal;
    document.getElementById('tbl-out').innerText = outputVal;
    document.getElementById('tbl-pattern').innerText = `${inputVal} × 3 = ${outputVal}`;
}

function updatePencilSim() {
    const qty = parseInt(document.getElementById('pencil-slider').value);
    document.getElementById('pencil-qty').innerText = `${qty} Pensil`;
    document.getElementById('pencil-cost').innerText = `Rp${(qty * 2000).toLocaleString('id-ID')}`;
    document.getElementById('pencil-icons').innerText = '✏️ '.repeat(qty);
}

function checkQuizFunc(qNum, opt, isCorrect) {
    const fb = document.getElementById(`quiz-func-fb-${qNum}`);
    fb.classList.remove('hidden');
    if (isCorrect) {
        fb.className = "feedback-box success";
        fb.innerText = "🎉 Benar sekali! Kamu berhasil menemukan pola fungsinya!";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "❌ Masih kurang tepat. Coba uji nilainya satu per satu ke dalam rumus!";
    }
}

// 2. SENILAI SIMULATION
function updateSenilaiSim() {
    const glasses = parseInt(document.getElementById('glass-slider').value);
    document.getElementById('glass-count').innerText = `${glasses} Gelas`;
    const oranges = glasses * 2;
    document.getElementById('orange-container').innerHTML = '🍊 '.repeat(oranges);
    document.getElementById('stat-ratio').innerText = `${oranges} / ${glasses} = 2 Jeruk/Gelas`;
    renderSenilaiChart();
}

function updateFuelSim() {
    const fuel = parseInt(document.getElementById('fuel-slider').value);
    document.getElementById('fuel-count').innerText = `${fuel} Liter`;
    document.getElementById('distance-val').innerText = `${fuel * 12} km`;
}

function renderSenilaiChart() {
    const canvas = document.getElementById('senilai-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.moveTo(25, 155); ctx.lineTo(240, 155);
    ctx.moveTo(25, 155); ctx.lineTo(25, 15);
    ctx.stroke();

    const glasses = parseInt(document.getElementById('glass-slider').value) || 2;
    const currentX = 25 + (glasses * 25);
    const currentY = 155 - (glasses * 16);

    ctx.beginPath();
    ctx.strokeStyle = '#10b981'; ctx.lineWidth = 3;
    ctx.moveTo(25, 155); ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = '#047857';
    ctx.beginPath(); ctx.arc(currentX, currentY, 5, 0, Math.PI * 2); ctx.fill();
}

function checkSenilaiMisc(isCorrect) {
    const fb = document.getElementById('senilai-misc-feedback');
    fb.classList.remove('hidden');
    if (isCorrect) {
        fb.className = "feedback-box dark-info";
        fb.innerText = "TEPAT! Selisih usia selalu sama setiap tahun (penjumlahan konstan), bukan kelipatan proporsional!";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "MISKONSEPSI! Ingat, pertumbuhan usia bertambah dengan jumlah tahun yang sama, bukan dikalikan.";
    }
}

function checkSenilaiQuiz1() {
    const val = parseFloat(document.getElementById('quiz-senilai-1').value);
    const fb = document.getElementById('quiz-senilai-fb-1');
    fb.classList.remove('hidden');
    if (val === 40000) {
        fb.className = "feedback-box success";
        fb.innerText = "✅ Benar! Rp15.000 / 3 = Rp5.000 per buku. Jadi 8 × Rp5.000 = Rp40.000.";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "❌ Coba hitung harga 1 buku dulu (Rp15.000 ÷ 3), lalu kalikan 8!";
    }
}

function checkSenilaiQuiz2() {
    const val = parseFloat(document.getElementById('quiz-senilai-2').value);
    const fb = document.getElementById('quiz-senilai-fb-2');
    fb.classList.remove('hidden');
    if (val === 8) {
        fb.className = "feedback-box success";
        fb.innerText = "✅ Tepat Sekali! 4 cm × 200.000 = 800.000 cm = 8 km.";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "❌ Ingat: Kalikan 4 cm dengan 200.000, lalu ubah cm menjadi km (dibagi 100.000)!";
    }
}

// 3. BERBALIK NILAI SIMULATION
function updateBerbalikSim() {
    const workers = parseInt(document.getElementById('worker-slider').value);
    document.getElementById('worker-count').innerText = `${workers} Orang`;
    const time = (40 / workers).toFixed(1);
    document.getElementById('time-output').innerText = `${time} Menit`;
    document.getElementById('constant-output').innerText = `${workers} × ${time} = 40`;
    const avatars = ['👧', '👦', '🧑', '👨', '👩', '🧔', '👵', '👴', '👷', '👩‍🌾'];
    document.getElementById('worker-avatars').innerText = avatars.slice(0, workers).join(' ');
    renderBerbalikChart();
}

function updateSpeedSim() {
    const speed = parseInt(document.getElementById('speed-slider').value);
    document.getElementById('speed-val').innerText = `${speed} km/jam`;
    document.getElementById('travel-time').innerText = `${(120 / speed).toFixed(1)} Jam`;
}

function renderBerbalikChart() {
    const canvas = document.getElementById('berbalik-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.moveTo(25, 155); ctx.lineTo(240, 155);
    ctx.moveTo(25, 155); ctx.lineTo(25, 15);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
    for (let x = 1; x <= 10; x += 0.2) {
        let y = 40 / x;
        let cX = 25 + (x * 20);
        let cY = 155 - (y * 3.2);
        if (x === 1) ctx.moveTo(cX, cY);
        else ctx.lineTo(cX, cY);
    }
    ctx.stroke();

    const workers = parseInt(document.getElementById('worker-slider').value) || 2;
    const curY = 40 / workers;
    const pointX = 25 + (workers * 20);
    const pointY = 155 - (curY * 3.2);
    ctx.fillStyle = '#be123c';
    ctx.beginPath(); ctx.arc(pointX, pointY, 5, 0, Math.PI * 2); ctx.fill();
}

function checkBerbalikMisc(isCorrect) {
    const fb = document.getElementById('berbalik-misc-feedback');
    fb.classList.remove('hidden');
    if (isCorrect) {
        fb.className = "feedback-box dark-info";
        fb.innerText = "HEBAT! Tidak semua yang berlawanan arah adalah perbandingan berbalik nilai. Syarat mutlaknya adalah hasil kali kedua variabel bernilai konstan!";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "PERHATIKAN! Perbandingan Berbalik Nilai hanya berlaku jika x · y = k (hasil kalinya tetap).";
    }
}

function checkBerbalikQuiz1() {
    const val = parseFloat(document.getElementById('quiz-berbalik-1').value);
    const fb = document.getElementById('quiz-berbalik-fb-1');
    fb.classList.remove('hidden');
    if (val === 8) {
        fb.className = "feedback-box success";
        fb.innerText = "✅ Tepat! 6 × 12 = 72. Maka 72 ÷ 9 = 8 hari.";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "❌ Gunakan rumus x1 · y1 = x2 · y2 ⟹ 6 × 12 = 9 × y2.";
    }
}

function checkBerbalikQuiz2() {
    const val = parseFloat(document.getElementById('quiz-berbalik-2').value);
    const fb = document.getElementById('quiz-berbalik-fb-2');
    fb.classList.remove('hidden');
    if (val === 12) {
        fb.className = "feedback-box success";
        fb.innerText = "✅ Hebat! Total sapi jadi 25. Maka (20 × 15) ÷ 25 = 12 hari.";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "❌ Hati-hati! Jumlah sapi menjadi 20 + 5 = 25 ekor sapi!";
    }
}

// 4. TANTANGAN & LAB
function checkMission(mNum, correctType, correctAns) {
    const userType = document.getElementById(`misi-type-${mNum}`).value;
    const userAns = parseFloat(document.getElementById(`misi-ans-${mNum}`).value);
    const fb = document.getElementById(`misi-fb-${mNum}`);
    fb.classList.remove('hidden');

    if (userType === correctType && userAns === correctAns) {
        fb.className = "feedback-box success";
        fb.innerText = "🎉 SEMPURNA! Jenis perbandingan dan hasil perhitunganmu tepat sekali!";
    } else {
        fb.className = "feedback-box error";
        fb.innerText = "❌ Masih ada yang keliru pada pilihan jenis perbandingan atau hasil hitunganmu. Coba lagi!";
    }
}

function runLab() {
    const x = parseFloat(document.getElementById('lab-x').value) || 1;
    const y = parseFloat(document.getElementById('lab-y').value) || 1;
    const type = document.querySelector('input[name="lab-type"]:checked').value;

    const title = document.getElementById('lab-model-title');
    const kElem = document.getElementById('lab-model-k');
    const eqElem = document.getElementById('lab-model-eq');

    if (type === 'senilai') {
        const k = (y / x).toFixed(2);
        title.innerText = "Model: Perbandingan Senilai";
        kElem.innerHTML = `Konstanta $k = \\frac{y}{x} = ${k}$`;
        eqElem.innerHTML = `Persamaan: $y = ${k}x$`;
    } else {
        const k = (x * y).toFixed(2);
        title.innerText = "Model: Perbandingan Berbalik Nilai";
        kElem.innerHTML = `Konstanta $k = x \\cdot y = ${k}$`;
        eqElem.innerHTML = `Persamaan: $x \\cdot y = ${k} \\implies y = \\frac{${k}}{x}$`;
    }

    if (window.renderMathInElement) {
        renderMathInElement(document.getElementById('lab-output-box'));
    }
}

function setEfficacy(btn) {
    const container = btn.parentElement;
    container.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('efficacy-feedback-box').classList.remove('hidden');
}

window.onload = function() {
    renderSenilaiChart();
    renderBerbalikChart();
};
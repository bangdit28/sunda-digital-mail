let email = '';
let token = '';
let password = Math.random().toString(36).substring(2);
let timer = 600;  // 10 menit

// ✅ Fungsi buat generate username acak
function generateRandomUsername(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ✅ Buat akun email sementara
async function createAccount() {
  const username = generateRandomUsername(8); // Ubah panjang kalau mau
  const domain = 'domail1.com'; // Ganti domain sesuai API
  email = `${username}@${domain}`;

  const response = await fetch('https://api.mail.tm/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: email, password: password })
  });

  if (response.ok) {
    document.getElementById('email-address').textContent = email;
    login();
  } else {
    document.getElementById('email-address').textContent = 'Gagal buat email.';
  }
}

// ✅ Login buat dapetin token
async function login() {
  const res = await fetch('https://api.mail.tm/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: email, password: password })
  });
  const data = await res.json();
  token = data.token;
  refreshInbox();
  startTimer();
}

// ✅ Refresh Inbox
async function refreshInbox() {
  if (!token) return;
  const res = await fetch('https://api.mail.tm/messages', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const inbox = document.getElementById('inbox-list');
  inbox.innerHTML = '';

  data['hydra:member'].forEach(msg => {
    const li = document.createElement('li');
    li.innerText = `From: ${msg.from.address} | Subject: ${msg.subject}`;
    inbox.appendChild(li);
  });
}

// ✅ Timer mundur
function updateTimer() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  document.getElementById('timer').innerText = `Expires in: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  if (timer > 0) {
    timer--;
  } else {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = "Expired!";
  }
}

let timerInterval;
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// ✅ Langsung jalankan pas halaman dibuka
createAccount();
let email = '';
let token = '';
let password = Math.random().toString(36).substring(2);
let timer = 600;  // 10 menit

// ✅ Fungsi buat generate username acak
function generateRandomUsername(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ✅ Buat akun email sementara
async function createAccount() {
  const username = generateRandomUsername(8); // Ubah panjang kalau mau
  const domain = 'domail1.com'; // Ganti domain sesuai API
  email = `${username}@${domain}`;

  const response = await fetch('https://api.mail.tm/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: email, password: password })
  });

  if (response.ok) {
    document.getElementById('email-address').textContent = email;
    login();
  } else {
    document.getElementById('email-address').textContent = 'Gagal buat email.';
  }
}

// ✅ Login buat dapetin token
async function login() {
  const res = await fetch('https://api.mail.tm/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: email, password: password })
  });
  const data = await res.json();
  token = data.token;
  refreshInbox();
  startTimer();
}

// ✅ Refresh Inbox
async function refreshInbox() {
  if (!token) return;
  const res = await fetch('https://api.mail.tm/messages', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const inbox = document.getElementById('inbox-list');
  inbox.innerHTML = '';

  data['hydra:member'].forEach(msg => {
    const li = document.createElement('li');
    li.innerText = `From: ${msg.from.address} | Subject: ${msg.subject}`;
    inbox.appendChild(li);
  });
}

// ✅ Timer mundur
function updateTimer() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  document.getElementById('timer').innerText = `Expires in: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  if (timer > 0) {
    timer--;
  } else {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = "Expired!";
  }
}

let timerInterval;
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// ✅ Langsung jalankan pas halaman dibuka
createAccount();

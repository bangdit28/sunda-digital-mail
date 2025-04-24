let email = '';
let token = '';
let password = Math.random().toString(36).substring(2);
let timer = 600; // 10 menit

//
function generateRandomUsername(length = 8) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

//
async function createAccount() {
  const username = generateRandomUsername(); // Misal: a1b2c3d4
  const domain = 'domail1.com'; // Ganti dengan domain temp-mail lo
  email = `${username}@${domain}`;

  const res = await fetch('https://api.mail.tm/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      address: email,
      password: password
    })
  });

  if (res.ok) {
    document.getElementById('email-address').textContent = email;
    document.getElementById('username-only').textContent = username;
    login();
  } else {
    document.getElementById('email-address').textContent = 'Gagal buat email.';
  }
}

//
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

//
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

//
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

//
createAccount();

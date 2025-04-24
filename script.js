let email = '';
let token = '';
let timer = 600;  // 10 minutes in seconds

// Timer countdown function
function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById('timer').innerText = `Expires in: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (timer > 0) {
        timer--;
    } else {
        clearInterval(timerInterval);
        document.getElementById('timer').innerText = "Expired!";
        document.getElementById('generate-btn').disabled = false;
    }
}

// Generate new email and start timer
document.getElementById('generate-btn').addEventListener('click', async function() {
    this.disabled = true;
    email = `tempuser${Date.now()}@domail1.com`;
    token = await createAccount(email);
    document.getElementById('email-address').innerText = email;
    startTimer();
    refreshInbox();
});

// Start the countdown timer
let timerInterval;
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// Create account using Mail.tm API
async function createAccount(email) {
    const response = await fetch('https://api.mail.tm/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: email, password: 'password' })
    });
    const data = await response.json();
    return data.token;
}

// Fetch and display inbox messages
async function refreshInbox() {
    const response = await fetch('https://api.mail.tm/messages', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    const inboxList = document.getElementById('inbox-list');
    inboxList.innerHTML = '';
    
    data['hydra:member'].forEach(msg => {
        const li = document.createElement('li');
        li.innerText = `From: ${msg.from.address} | Subject: ${msg.subject}`;
        inboxList.appendChild(li);
    });
}

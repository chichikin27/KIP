
document.getElementById('themeToggle').addEventListener('click', function() {
    const body = document.body;

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Установка темы при загрузке страницы в зависимости от сохраненного значения
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');


    if (userInput.value.trim() !== '') {
        chatMessages.innerHTML += `<div class="user-message">${userInput.value}</div>`;
        userInput.value = '';


        setTimeout(() => {
            chatMessages.innerHTML += '<div class="bot-message">Привет, я бот. Как я могу помочь?</div>';
        }, 1000);  // задержка в 1 секунду
    }
}

document.getElementById('sendButton').addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
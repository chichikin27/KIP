const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", function() {
    const userMessage = userInput.value;
    addMessage(userMessage, "user");
    userInput.value = "";

    // Код для отправки сообщения на сервер и получения ответа
    
    const botReply = "Келе?????";
    addMessage(botReply, "bot");
});

function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.className = sender;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;  // автоматическая прокрутка к последнему сообщению
}
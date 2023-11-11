document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessageToChat('User', userInput);
        fetch('/getResponse', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: userInput})
        })
            .then(response => response.json())
            .then(data => {
                addMessageToChat('Assistant', data.reply);
            });
        document.getElementById('user-input').value = '';
    }
});

function addMessageToChat(sender, message) {
    let chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

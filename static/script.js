document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const languageSelect = document.getElementById('language-select');  // Added language dropdown

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        // Auto scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDiv.appendChild(dot);
        }

        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Function to send message to backend and get response
    async function sendMessage(message) {
        try {
            showTypingIndicator();  // Show typing indicator
            
            const selectedLanguage = languageSelect.value || "en"; // Get selected language

            // Send request to backend
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ message: message, language: selectedLanguage })  // Send language code
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Server error:', errorData);
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            
            removeTypingIndicator(); // Remove typing indicator

            // Add bot response to chat
            addMessage(data.response, false);
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again later.', false);
        }
    }

    // Function to test API connection
    async function testApiConnection() {
        try {
            const response = await fetch('http://localhost:5000/api/test');
            const data = await response.json();
            console.log('API Test:', data);
            return data.status === 'API is working!';
        } catch (error) {
            console.error('API Test Error:', error);
            return false;
        }
    }

    // Run API test when page loads
    testApiConnection().then(isConnected => {
        if (!isConnected) {
            addMessage('Warning: Could not connect to the chatbot backend. Make sure the server is running on port 5000.', false);
        }
    });

    // Event listener for send button click
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            sendMessage(message);
        }
    });

    // Event listener for Enter key press
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                sendMessage(message);
            }
        }
    });
});

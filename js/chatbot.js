/**
 * Pixel Playgrounds AR Visualizer - Chatbot Functionality
 * Advanced tech assistant with web scraping for deals and tech knowledge
 */

// Chatbot state
let isChatbotVisible = false;
let isVoiceInputActive = false;
let isWaitingForResponse = false;

// Initialize Web Speech API for voice input/output
let recognition;
let speechSynthesis = window.speechSynthesis;

// Tech deals cache with timestamp
let techDealsCache = {
    timestamp: 0,
    deals: []
};

// Initialize chatbot
function initChatbot() {
    // Initialize speech recognition if available
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        // Set up recognition event handlers
        recognition.onresult = handleSpeechResult;
        recognition.onerror = handleSpeechError;
        recognition.onend = handleSpeechEnd;
    } else {
        console.log('Speech recognition not supported in this browser');
        // Hide voice button if not supported
        document.querySelector('.voice-button').style.display = 'none';
    }
    
    // Position the chatbot toggle button to not overlap with virtual assistant
    positionChatbotToggle();
}

// Position chatbot toggle to not overlap with virtual assistant
function positionChatbotToggle() {
    const assistantIcon = document.querySelector('.assistant-icon');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    if (assistantIcon && chatbotToggle) {
        chatbotToggle.style.bottom = '80px';
    }
}

// Toggle chatbot visibility
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    isChatbotVisible = !isChatbotVisible;
    
    if (isChatbotVisible) {
        chatbot.style.display = 'flex';
        document.getElementById('chatbot-input-text').focus();
        playSound('click-sound');
    } else {
        chatbot.style.display = 'none';
        playSound('click-sound');
    }
}

// Handle keypress in chat input (for Enter key)
function handleChatInputKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Send user message to chatbot
function sendChatMessage() {
    const inputElement = document.getElementById('chatbot-input-text');
    const message = inputElement.value.trim();
    
    if (message === '' || isWaitingForResponse) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user-message');
    
    // Clear input
    inputElement.value = '';
    
    // Process message and get response
    processUserMessage(message);
}

// Add message to chat window
function addMessageToChat(message, className) {
    const chatMessages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatbot-messages');
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        indicator.appendChild(dot);
    }
    
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Process user message and generate response
function processUserMessage(message) {
    // Show typing indicator
    showTypingIndicator();
    isWaitingForResponse = true;
    
    // Lowercase message for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Determine the type of query
    if (lowerMessage.includes('deal') || lowerMessage.includes('price') || lowerMessage.includes('discount') || lowerMessage.includes('sale')) {
        // Tech deals query
        fetchTechDeals(lowerMessage);
    } else if (lowerMessage.includes('network') || lowerMessage.includes('wifi') || lowerMessage.includes('internet') || lowerMessage.includes('connection')) {
        // Networking troubleshooting
        provideNetworkingHelp(lowerMessage);
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        // Greeting
        setTimeout(() => {
            hideTypingIndicator();
            const responses = [
                "Hello! I'm your tech assistant. How can I help you today?",
                "Hi there! Need help with tech deals or troubleshooting?",
                "Hey! I'm here to assist with all your tech questions."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat(response, 'bot-message');
            speakResponse(response);
            isWaitingForResponse = false;
        }, 1000);
    } else {
        // General tech knowledge
        provideTechKnowledge(lowerMessage);
    }
}

// Fetch tech deals from the web
function fetchTechDeals(query) {
    // Check if we have cached deals less than 1 hour old
    const now = Date.now();
    if (now - techDealsCache.timestamp < 3600000 && techDealsCache.deals.length > 0) {
        // Use cached deals
        respondWithDeals(query, techDealsCache.deals);
        return;
    }
    
    // In a real implementation, this would use a web scraping service or API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
        const mockDeals = [
            { product: "4K Webcam", price: "$79.99", discount: "20% off", store: "TechMart" },
            { product: "Gaming Mechanical Keyboard", price: "$59.99", discount: "30% off", store: "GameStop" },
            { product: "Wireless Gaming Mouse", price: "$45.99", discount: "15% off", store: "BestBuy" },
            { product: "32-inch Curved Monitor", price: "$249.99", discount: "25% off", store: "Amazon" },
            { product: "Streaming Microphone", price: "$89.99", discount: "10% off", store: "Newegg" },
            { product: "RGB Gaming Headset", price: "$69.99", discount: "20% off", store: "TechMart" },
            { product: "Podcast Condenser Mic", price: "$129.99", discount: "15% off", store: "AudioPro" },
            { product: "Dual Monitor Stand", price: "$49.99", discount: "25% off", store: "OfficeDepot" }
        ];
        
        // Cache the deals
        techDealsCache.timestamp = now;
        techDealsCache.deals = mockDeals;
        
        // Respond with deals
        respondWithDeals(query, mockDeals);
    }, 2000);
}

// Respond with tech deals
function respondWithDeals(query, deals) {
    hideTypingIndicator();
    
    // Filter deals based on query
    let filteredDeals = deals;
    const keywords = query.toLowerCase().split(' ').filter(word => 
        word.length > 3 && 
        !['deal', 'deals', 'price', 'discount', 'sale', 'cheap', 'best', 'find', 'show', 'me', 'get', 'what', 'where', 'how', 'can', 'the'].includes(word)
    );
    
    if (keywords.length > 0) {
        filteredDeals = deals.filter(deal => {
            const dealText = (deal.product + ' ' + deal.store).toLowerCase();
            return keywords.some(keyword => dealText.includes(keyword));
        });
    }
    
    if (filteredDeals.length === 0) {
        const response = "I couldn't find any specific deals matching your query. Here are some general tech deals:";
        addMessageToChat(response, 'bot-message');
        
        // Show a few random deals
        const randomDeals = deals.sort(() => 0.5 - Math.random()).slice(0, 3);
        setTimeout(() => {
            const dealsText = formatDealsResponse(randomDeals);
            addMessageToChat(dealsText, 'bot-message');
            speakResponse(response + " I've found a few deals you might be interested in.");
        }, 500);
    } else {
        const response = `I found ${filteredDeals.length} deals that might interest you:`;
        addMessageToChat(response, 'bot-message');
        
        setTimeout(() => {
            const dealsText = formatDealsResponse(filteredDeals.slice(0, 5));
            addMessageToChat(dealsText, 'bot-message');
            speakResponse(response + " Check out these great offers!");
        }, 500);
    }
    
    isWaitingForResponse = false;
}

// Format deals for display
function formatDealsResponse(deals) {
    let response = '';
    deals.forEach(deal => {
        response += `• ${deal.product}: ${deal.price} (${deal.discount}) at ${deal.store}\n`;
    });
    return response;
}

// Provide networking troubleshooting help
function provideNetworkingHelp(query) {
    setTimeout(() => {
        hideTypingIndicator();
        
        let response = '';
        
        if (query.includes('wifi') || query.includes('wireless')) {
            if (query.includes('slow') || query.includes('speed')) {
                response = "If your WiFi is slow, try these steps:\n\n" +
                    "1. Restart your router and modem\n" +
                    "2. Move closer to your router\n" +
                    "3. Reduce interference by moving away from other electronic devices\n" +
                    "4. Check if other devices are using bandwidth\n" +
                    "5. Update your router's firmware\n" +
                    "6. Consider a WiFi extender or mesh network system";
            } else if (query.includes('connect') || query.includes('connection')) {
                response = "WiFi connection issues? Try these fixes:\n\n" +
                    "1. Make sure WiFi is turned on in your device settings\n" +
                    "2. Forget the network and reconnect\n" +
                    "3. Check if you're entering the correct password\n" +
                    "4. Restart your router and device\n" +
                    "5. Update your network drivers\n" +
                    "6. Check if your router has MAC filtering enabled";
            } else {
                response = "For WiFi optimization, consider:\n\n" +
                    "1. Placing your router in a central location\n" +
                    "2. Using the 5GHz band for faster speeds when close to the router\n" +
                    "3. Updating to a modern WiFi 6 router for better performance\n" +
                    "4. Setting up Quality of Service (QoS) to prioritize important traffic\n" +
                    "5. Securing your network with WPA3 if available";
            }
        } else if (query.includes('ethernet') || query.includes('wired')) {
            response = "For wired network issues:\n\n" +
                "1. Check if the ethernet cable is properly connected\n" +
                "2. Try a different ethernet cable\n" +
                "3. Verify the network port on your device is working\n" +
                "4. Update network drivers\n" +
                "5. Check router settings for port-specific configurations";
        } else if (query.includes('router') || query.includes('modem')) {
            response = "Router troubleshooting steps:\n\n" +
                "1. Power cycle your router (unplug for 30 seconds, then plug back in)\n" +
                "2. Check for firmware updates\n" +
                "3. Reset to factory settings if problems persist\n" +
                "4. Check for overheating issues\n" +
                "5. Consider if it's time for a router upgrade (3-5 years is typical lifespan)";
        } else {
            response = "For general network troubleshooting:\n\n" +
                "1. Restart your networking equipment\n" +
                "2. Check if the problem is with one device or all devices\n" +
                "3. Run a speed test to check your connection\n" +
                "4. Contact your ISP if the issue persists\n" +
                "5. Consider using network diagnostic tools like ping or traceroute\n\n" +
                "Can you tell me more specifically what network issue you're experiencing?";
        }
        
        addMessageToChat(response, 'bot-message');
        speakResponse("I've provided some networking troubleshooting steps. Let me know if you need more specific help.");
        isWaitingForResponse = false;
    }, 2000);
}

// Provide general tech knowledge
function provideTechKnowledge(query) {
    setTimeout(() => {
        hideTypingIndicator();
        
        let response = '';
        
        // Match query to different tech topics
        if (query.includes('gaming') || query.includes('game')) {
            response = "For gaming setups, I recommend:\n\n" +
                "• A PC with at least an i5/Ryzen 5 CPU, 16GB RAM, and RTX 3060 or better\n" +
                "• A 144Hz+ monitor for smooth gameplay\n" +
                "• A mechanical keyboard with low latency\n" +
                "• A gaming mouse with adjustable DPI\n" +
                "• A quality headset with good directional audio\n\n" +
                "For streaming, add a capture card, dedicated mic, and webcam.";
        } else if (query.includes('stream') || query.includes('streaming')) {
            response = "For a streaming setup, you'll need:\n\n" +
                "• A PC with at least 6 cores, 16GB RAM, and a good GPU\n" +
                "• A quality microphone (Blue Yeti, Shure SM7B, etc.)\n" +
                "• A good webcam or DSLR camera\n" +
                "• Lighting (ring light or key lights)\n" +
                "• OBS or Streamlabs for streaming software\n" +
                "• Dual monitors for managing stream and gameplay";
        } else if (query.includes('podcast') || query.includes('audio')) {
            response = "For podcast recording, consider:\n\n" +
                "• A quality XLR microphone (Shure SM7B, Rode PodMic)\n" +
                "• Audio interface (Focusrite Scarlett, GoXLR)\n" +
                "• Acoustic treatment for your recording space\n" +
                "• Headphones for monitoring\n" +
                "• Boom arm to position the microphone\n" +
                "• Recording software like Audacity or Adobe Audition";
        } else if (query.includes('computer') || query.includes('pc') || query.includes('laptop')) {
            response = "When choosing a computer, consider:\n\n" +
                "• Purpose: gaming, work, creative tasks\n" +
                "• CPU: Intel Core i5/i7/i9 or AMD Ryzen 5/7/9\n" +
                "• RAM: 16GB minimum for most tasks, 32GB+ for heavy workloads\n" +
                "• Storage: SSD for OS and programs, HDD for mass storage\n" +
                "• GPU: Integrated for basic tasks, dedicated for gaming/creative work\n" +
                "• Display: Resolution, refresh rate, color accuracy";
        } else if (query.includes('phone') || query.includes('smartphone') || query.includes('mobile')) {
            response = "When choosing a smartphone, consider:\n\n" +
                "• Operating system: iOS or Android\n" +
                "• Performance: Processor and RAM\n" +
                "• Camera quality and features\n" +
                "• Battery life\n" +
                "• Display quality and size\n" +
                "• Storage capacity\n" +
                "• 5G compatibility for future-proofing";
        } else if (query.includes('camera') || query.includes('photography')) {
            response = "For photography equipment:\n\n" +
                "• Camera types: DSLR, Mirrorless, Point-and-shoot\n" +
                "• Important features: Sensor size, megapixels, ISO range\n" +
                "• Lenses: Prime vs. zoom, focal length, aperture\n" +
                "• Accessories: Tripod, external flash, filters\n" +
                "• For beginners: Canon EOS Rebel series or Sony Alpha a6000 series";
        } else if (query.includes('smart home') || query.includes('iot') || query.includes('automation')) {
            response = "For smart home setup:\n\n" +
                "• Hub: Amazon Echo, Google Home, or Apple HomePod\n" +
                "• Lighting: Philips Hue, LIFX, or Wyze\n" +
                "• Security: Ring, Nest, or Arlo cameras\n" +
                "• Climate: Nest or Ecobee thermostats\n" +
                "• Automation: Set up routines based on time, location, or triggers\n" +
                "• Consider compatibility between devices and your preferred ecosystem";
        } else if (query.includes('headphone') || query.includes('earbuds') || query.includes('audio')) {
            response = "When choosing headphones:\n\n" +
                "• Types: Over-ear, on-ear, in-ear, true wireless\n" +
                "• Features: Noise cancellation, wireless, battery life\n" +
                "• Sound profile: Bass-heavy, balanced, or detailed\n" +
                "• Use case: Gaming, music production, casual listening\n" +
                "• Popular brands: Sony, Bose, Sennheiser, Audio-Technica";
        } else {
            response = "I'm your tech assistant and can help with:\n\n" +
                "• Finding the latest tech deals\n" +
                "• Recommending equipment for streaming, gaming, or podcasting\n" +
                "• Troubleshooting network issues\n" +
                "• Providing information about computers, phones, cameras, and more\n" +
                "• Smart home setup and automation\n\n" +
                "What specific tech topic are you interested in?";
        }
        
        addMessageToChat(response, 'bot-message');
        speakResponse("I've provided some information about " + query.split(' ').slice(0, 3).join(' ') + ". Let me know if you need more specific details.");
        isWaitingForResponse = false;
    }, 2000);
}

// Start voice input
function startVoiceInput() {
    if (!recognition) return;
    
    try {
        recognition.start();
        isVoiceInputActive = true;
        
        // Show feedback that voice is active
        const voiceButton = document.querySelector('.voice-button');
        voiceButton.textContent = '🎙️ Listening...';
        voiceButton.style.color = 'var(--neon-cyan)';
        
        // Play sound
        playSound('click-sound');
        
        // Add message to chat
        addMessageToChat("Listening...", 'bot-message');
    } catch (error) {
        console.error('Error starting speech recognition:', error);
    }
}

// Handle speech recognition result
function handleSpeechResult(event) {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
    
    // Add user message to chat
    addMessageToChat(transcript, 'user-message');
    
    // Process message
    processUserMessage(transcript);
    
    // Reset voice button
    const voiceButton = document.querySelector('.voice-button');
    voiceButton.textContent = '🎙️';
    voiceButton.style.color = 'var(--neon-green)';
    
    isVoiceInputActive = false;
}

// Handle speech recognition error
function handleSpeechError(event) {
    console.error('Speech recognition error:', event.error);
    
    // Reset voice button
    const voiceButton = document.querySelector('.voice-button');
    voiceButton.textContent = '🎙️';
    voiceButton.style.color = 'var(--neon-green)';
    
    isVoiceInputActive = false;
    
    // Add error message to chat
    if (event.error === 'no-speech') {
        addMessageToChat("I didn't hear anything. Please try again.", 'bot-message');
    } else {
        addMessageToChat("Voice recognition error. Please try typing instead.", 'bot-message');
    }
}

// Handle speech recognition end
function handleSpeechEnd() {
    // Reset voice button if still in listening mode
    if (isVoiceInputActive) {
        const voiceButton = document.querySelector('.voice-button');
        voiceButton.textContent = '🎙️';
        voiceButton.style.color = 'var(--neon-green)';
        
        isVoiceInputActive = false;
    }
}

// Speak response using speech synthesis
function speakResponse(text) {
    if (!speechSynthesis) return;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = speechSynthesis.getVoices();
    
    // Try to find a good voice
    const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha')
    );
    
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }
    
    // Set properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // Speak
    speechSynthesis.speak(utterance);
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', initChatbot); 
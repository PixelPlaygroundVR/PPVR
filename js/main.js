/**
 * Pixel Playgrounds AR Visualizer - Main
 * Main initialization and global functions
 */

// Initialize EmailJS
function initEmailJS() {
    // In a real app, you would initialize EmailJS with your user ID
    // For this demo, we'll just log a message
    console.log('EmailJS would be initialized here with your user ID');
    
    // Example EmailJS initialization (commented out for demo)
    // emailjs.init("YOUR_USER_ID");
}

// Activate Nexus advanced features
function activateNexus() {
    // Play sound effect
    playSound('click-sound');
    
    // Show loading message
    showAssistantMessage("Activating Pixel Playgrounds Nexus System...");
    
    // Initialize Nexus system
    if (initNexus()) {
        // Show success message after initialization
        setTimeout(() => {
            playSound('success-sound');
            showAssistantMessage("Nexus system activated! You now have access to advanced spatial mapping, AI recommendations, and voice commands.");
            
            // Add active class to control panels
            setTimeout(() => {
                document.querySelector('.nexus-control-panel').classList.add('active');
            }, 500);
            
            setTimeout(() => {
                document.querySelector('.nexus-metrics-display').classList.add('active');
            }, 1000);
            
            setTimeout(() => {
                document.querySelector('.nexus-recommendation-panel').classList.add('active');
            }, 1500);
        }, 2000);
    } else {
        // Show error message if initialization fails
        showAssistantMessage("Failed to activate Nexus system. Please try again.");
    }
    
    // Disable the activate button to prevent multiple activations
    document.getElementById('activate-nexus').disabled = true;
    document.getElementById('activate-nexus').textContent = "Nexus Active";
}

// Setup Nexus control listeners
function setupNexusControlListeners(controlPanel) {
    // Toggle panel visibility
    const toggleButton = controlPanel.querySelector('.nexus-panel-toggle');
    toggleButton.addEventListener('click', () => {
        const content = controlPanel.querySelector('.nexus-panel-content');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggleButton.textContent = '−';
        } else {
            content.style.display = 'none';
            toggleButton.textContent = '+';
        }
    });
    
    // Scan room button
    const scanButton = document.getElementById('nexus-scan-room');
    if (scanButton) {
        scanButton.addEventListener('click', () => {
            playSound('click-sound');
            simulateSpatialMapping();
        });
    }
    
    // Optimize placement button
    const optimizeButton = document.getElementById('nexus-optimize-placement');
    if (optimizeButton) {
        optimizeButton.addEventListener('click', () => {
            playSound('click-sound');
            if (nexusState.spatialMapComplete) {
                analyzeRoomForPlacement();
            } else {
                showAssistantMessage("Please scan the room first before optimizing placement.");
            }
        });
    }
    
    // Toggle measurements button
    const measurementsButton = document.getElementById('nexus-toggle-measurements');
    if (measurementsButton) {
        measurementsButton.addEventListener('click', () => {
            playSound('click-sound');
            toggleMeasurements();
        });
    }
    
    // Simulate lighting button
    const lightingButton = document.getElementById('nexus-toggle-lighting');
    if (lightingButton) {
        lightingButton.addEventListener('click', () => {
            playSound('click-sound');
            toggleLightingSimulation();
        });
    }
    
    // Generate report button
    const reportButton = document.getElementById('nexus-generate-report');
    if (reportButton) {
        reportButton.addEventListener('click', () => {
            playSound('click-sound');
            generateSetupReport();
        });
    }
    
    // Voice commands button
    const voiceButton = document.getElementById('nexus-voice-commands');
    if (voiceButton) {
        voiceButton.addEventListener('click', () => {
            playSound('click-sound');
            toggleVoiceCommands();
        });
    }
}

// Refresh recommendations
function refreshRecommendations() {
    playSound('click-sound');
    
    // Show loading state
    const recommendationsContainer = document.getElementById('nexus-recommendations');
    recommendationsContainer.innerHTML = '<p>Analyzing your preferences and environment...</p>';
    
    // Generate new recommendations after a delay
    setTimeout(() => {
        generateRecommendations();
    }, 1500);
}

// Generate personalized recommendations
function generateRecommendations() {
    const recommendationsContainer = document.getElementById('nexus-recommendations');
    
    // Clear existing recommendations
    recommendationsContainer.innerHTML = '';
    
    // Generate 3-5 recommendations based on user behavior and preferences
    const recommendations = [
        {
            title: "Upgrade Your Lighting",
            description: "Based on your room analysis, adding key lighting would improve your stream quality by 40%.",
            action: "View Lighting Options"
        },
        {
            title: "Audio Enhancement",
            description: "Your current microphone would benefit from acoustic treatment. Consider adding sound panels.",
            action: "View Audio Accessories"
        },
        {
            title: "Ergonomic Optimization",
            description: "Your desk setup could be improved for better ergonomics and reduced strain.",
            action: "View Ergonomic Solutions"
        },
        {
            title: "Subscription Savings",
            description: "Bundle your equipment with our Pro subscription and save 15% on future upgrades.",
            action: "View Subscription Plans"
        }
    ];
    
    // Add recommendations to the container
    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.className = 'nexus-recommendation';
        recElement.innerHTML = `
            <div class="nexus-recommendation-title">${rec.title}</div>
            <div class="nexus-recommendation-description">${rec.description}</div>
            <div class="nexus-recommendation-actions">
                <button class="neon-button">${rec.action}</button>
            </div>
        `;
        recommendationsContainer.appendChild(recElement);
    });
}

// Start metrics updates
function startMetricsUpdates() {
    // Update session time
    const startTime = Date.now();
    setInterval(() => {
        const sessionTime = document.getElementById('nexus-session-time');
        if (sessionTime) {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            sessionTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Update engagement score
        const engagementScore = document.getElementById('nexus-engagement-score');
        if (engagementScore) {
            // In a real app, this would be based on actual user interactions
            const score = Math.min(100, Math.floor(elapsed / 3));
            engagementScore.textContent = score;
        }
        
        // Update completeness bar
        const completenessBar = document.getElementById('nexus-completeness-bar');
        if (completenessBar) {
            // In a real app, this would be based on actual setup progress
            const completeness = Math.min(100, Math.floor(elapsed / 5));
            completenessBar.style.width = `${completeness}%`;
        }
    }, 1000);
}

// Initialize app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Add neon flicker effect to elements
    addNeonFlicker();
    
    // Show loading message
    showAssistantMessage("Loading Pixel Playgrounds AR Visualizer...");
    
    // Log initialization message
    console.log('Pixel Playgrounds AR Visualizer initialized');
    
    // Note: The chatbot is initialized separately in chatbot.js
    console.log('Tech Assistant chatbot ready to help with tech deals and troubleshooting');
    
    // Initialize subscription system
    initSubscription();
    console.log('Subscription system initialized');
    
    // Add cyan button style
    document.documentElement.style.setProperty('--neon-cyan', '#0ff');
    
    // Create Nexus button style
    const style = document.createElement('style');
    style.textContent = `
        .neon-button.cyan {
            color: var(--neon-cyan);
            border-color: var(--neon-cyan);
            box-shadow: 0 0 10px var(--neon-cyan);
        }
        
        .neon-button.cyan:hover {
            background: rgba(0, 255, 255, 0.2);
            box-shadow: 0 0 20px var(--neon-cyan);
        }
    `;
    document.head.appendChild(style);
    
    // Setup Nexus control listeners for each panel
    document.querySelectorAll('.nexus-control-panel, .nexus-metrics-display, .nexus-recommendation-panel').forEach(panel => {
        setupNexusControlListeners(panel);
    });
    
    // Setup subscription button listener
    document.getElementById('subscription-button').addEventListener('click', () => {
        playSound('click-sound');
        showSubscriptionModal();
    });
    
    // Start metrics updates for Nexus
    startMetricsUpdates();
}); 
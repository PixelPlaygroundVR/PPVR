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
}); 
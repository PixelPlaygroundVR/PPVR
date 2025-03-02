/**
 * Pixel Playgrounds AR Visualizer - UI Functionality
 * Handles UI interactions and animations
 */

// Initialize UI
function initUI() {
    // Set up navigation
    setupNavigation();
    
    // Set up virtual assistant
    setupVirtualAssistant();
    
    // Set minimum date for installation date pickers
    setupDatePickers();
}

// Set up navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('#sidebar nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get section ID from href
            const sectionId = link.getAttribute('href').substring(1);
            
            // Activate section
            activateSection(sectionId);
            
            // Play sound effect
            playSound('click-sound');
        });
    });
}

// Activate section
function activateSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('#sidebar nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Set up virtual assistant
function setupVirtualAssistant() {
    // Show initial message after a delay
    setTimeout(() => {
        showAssistantMessage("Welcome to Pixel Playgrounds! I'm your virtual assistant. Need help visualizing your dream setup?");
    }, 2000);
}

// Show assistant message
function showAssistantMessage(message) {
    const assistantMessage = document.getElementById('assistant-message');
    const assistantIcon = document.querySelector('.assistant-icon');
    
    // Set message text
    assistantMessage.textContent = message;
    
    // Show message
    assistantMessage.style.display = 'block';
    
    // Add animation
    assistantMessage.style.animation = 'fadeIn 0.3s ease';
    assistantIcon.style.animation = 'pulse 1s infinite';
    
    // Hide message after 10 seconds
    setTimeout(() => {
        assistantMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            assistantMessage.style.display = 'none';
            assistantIcon.style.animation = 'pulse 2s infinite';
        }, 300);
    }, 10000);
}

// Toggle assistant message
function toggleAssistant() {
    const assistantMessage = document.getElementById('assistant-message');
    
    if (assistantMessage.style.display === 'none' || assistantMessage.style.display === '') {
        assistantMessage.style.display = 'block';
        assistantMessage.style.animation = 'fadeIn 0.3s ease';
        
        // Show a contextual message based on current section
        const activeSection = document.querySelector('section.active');
        if (activeSection) {
            const sectionId = activeSection.id;
            showContextualHelp(sectionId);
        } else {
            showAssistantMessage("How can I help you today?");
        }
    } else {
        assistantMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            assistantMessage.style.display = 'none';
        }, 300);
    }
    
    // Play sound effect
    playSound('click-sound');
}

// Show contextual help based on section
function showContextualHelp(sectionId) {
    switch (sectionId) {
        case 'home':
            showAssistantMessage("Select a category and tier, then click 'Update Equipment' to visualize your setup in AR. Make sure to print the Hiro marker!");
            break;
        case 'streamers':
        case 'gamers':
        case 'podcasters':
            showAssistantMessage(`Browse our ${sectionId} equipment packages. Click 'Visualize' on any tier to see it in AR.`);
            break;
        case 'shop':
            showAssistantMessage("Browse our individual equipment items. Use the filters to find what you need, then add items to your cart.");
            break;
        case 'cart':
            showAssistantMessage("Review your cart items. Click 'Proceed to Checkout' when you're ready to complete your order.");
            break;
        case 'checkout':
            showAssistantMessage("Fill in your details to complete your order. Add installation service if you need help setting up your equipment.");
            break;
        case 'order-package':
            showAssistantMessage("Fill in your details to order this package. Add installation service if you need help setting up your equipment.");
            break;
        default:
            showAssistantMessage("How can I help you today?");
    }
}

// Set up date pickers
function setupDatePickers() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const installationDate = document.getElementById('installation-date');
    if (installationDate) {
        installationDate.setAttribute('min', minDate);
        installationDate.value = minDate;
    }
    
    const packageInstallationDate = document.getElementById('package-installation-date');
    if (packageInstallationDate) {
        packageInstallationDate.setAttribute('min', minDate);
        packageInstallationDate.value = minDate;
    }
}

// Play sound effect
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.log('Sound play prevented:', error);
        });
    }
}

// Add neon flicker effect to elements
function addNeonFlicker() {
    const elements = document.querySelectorAll('.neon-flicker');
    
    elements.forEach(element => {
        // Random delay for each element
        const delay = Math.random() * 5;
        element.style.animationDelay = `${delay}s`;
    });
}

// Initialize UI when the page loads
document.addEventListener('DOMContentLoaded', initUI); 
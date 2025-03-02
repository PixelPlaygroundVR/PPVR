/**
 * Pixel Playgrounds AR Visualizer - Subscription Service
 * Handles premium subscriptions, recurring revenue, and enhanced services
 */

// Subscription plans data
const subscriptionPlans = [
    {
        id: 'basic',
        name: 'Basic',
        price: 9.99,
        billingCycle: 'monthly',
        features: [
            'Equipment visualization in AR',
            'Basic tech support',
            'Standard delivery on purchases',
            'Access to entry-level equipment'
        ],
        recommended: false
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 19.99,
        billingCycle: 'monthly',
        features: [
            'Advanced AR visualization with measurements',
            'Priority tech support',
            'Free expedited shipping',
            'Access to professional equipment',
            'Monthly equipment credit ($10)',
            'Exclusive Pro deals'
        ],
        recommended: true
    },
    {
        id: 'studio',
        name: 'Studio',
        price: 49.99,
        billingCycle: 'monthly',
        features: [
            'Full Nexus system access',
            '24/7 dedicated tech support',
            'Free overnight shipping',
            'Access to all equipment tiers',
            'Monthly equipment credit ($30)',
            'Quarterly equipment refresh program',
            'On-site setup assistance',
            'Custom branding options'
        ],
        recommended: false
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 199.99,
        billingCycle: 'monthly',
        features: [
            'Multi-user license (up to 5 users)',
            'Dedicated account manager',
            'Custom equipment solutions',
            'White-glove delivery and setup',
            'Quarterly technology consultation',
            'Equipment leasing options',
            'Custom integration services',
            'Branded AR experiences'
        ],
        recommended: false
    }
];

// Subscription add-ons
const subscriptionAddons = [
    {
        id: 'tech-support-plus',
        name: 'Tech Support Plus',
        price: 4.99,
        description: 'Extended tech support hours and faster response times'
    },
    {
        id: 'equipment-insurance',
        name: 'Equipment Insurance',
        price: 7.99,
        description: 'Coverage for accidental damage and equipment failures'
    },
    {
        id: 'content-creation',
        name: 'Content Creation Pack',
        price: 9.99,
        description: 'Templates, assets, and tools for creating professional content'
    },
    {
        id: 'analytics-dashboard',
        name: 'Analytics Dashboard',
        price: 12.99,
        description: 'Advanced metrics and insights for your streaming performance'
    }
];

// User subscription state
let userSubscription = {
    active: false,
    plan: null,
    addons: [],
    startDate: null,
    nextBillingDate: null,
    paymentMethod: null,
    autoRenew: true,
    credits: 0
};

// Initialize subscription module
function initSubscription() {
    console.log('Initializing subscription module...');
    
    // Check for existing subscription in localStorage
    loadSubscriptionFromStorage();
    
    // Create subscription UI elements
    createSubscriptionUI();
    
    return true;
}

// Load subscription data from localStorage
function loadSubscriptionFromStorage() {
    const savedSubscription = localStorage.getItem('pixelPlaygroundsSubscription');
    if (savedSubscription) {
        try {
            userSubscription = JSON.parse(savedSubscription);
            console.log('Loaded existing subscription:', userSubscription.plan);
            
            // Update UI based on subscription status
            updateSubscriptionUI();
        } catch (error) {
            console.error('Error loading subscription data:', error);
        }
    }
}

// Save subscription data to localStorage
function saveSubscriptionToStorage() {
    localStorage.setItem('pixelPlaygroundsSubscription', JSON.stringify(userSubscription));
}

// Create subscription UI elements
function createSubscriptionUI() {
    // Create subscription button in sidebar
    const sidebar = document.querySelector('#sidebar');
    if (sidebar) {
        const subscriptionButton = document.createElement('div');
        subscriptionButton.className = 'subscription-button';
        subscriptionButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span class="subscription-label">Upgrade</span>
        `;
        subscriptionButton.addEventListener('click', showSubscriptionModal);
        sidebar.appendChild(subscriptionButton);
    }
    
    // Create subscription modal
    const modal = document.createElement('div');
    modal.className = 'subscription-modal';
    modal.id = 'subscription-modal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="subscription-modal-content">
            <div class="subscription-modal-header">
                <h2>Upgrade Your Experience</h2>
                <button class="subscription-close-button" onclick="hideSubscriptionModal()">×</button>
            </div>
            <div class="subscription-modal-body">
                <div class="subscription-plans">
                    ${generateSubscriptionPlansHTML()}
                </div>
                <div class="subscription-addons">
                    <h3>Enhance Your Subscription</h3>
                    <div class="addon-list">
                        ${generateAddonsHTML()}
                    </div>
                </div>
                <div class="subscription-summary">
                    <h3>Summary</h3>
                    <div class="summary-items" id="subscription-summary-items">
                        <p>Select a plan to continue</p>
                    </div>
                    <div class="summary-total">
                        <span>Monthly Total:</span>
                        <span id="subscription-total-price">$0.00</span>
                    </div>
                </div>
            </div>
            <div class="subscription-modal-footer">
                <button class="neon-button" onclick="hideSubscriptionModal()">Cancel</button>
                <button class="neon-button magenta" id="subscribe-button" onclick="processSubscription()" disabled>Subscribe Now</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for plan selection
    setTimeout(() => {
        document.querySelectorAll('.subscription-plan').forEach(plan => {
            plan.addEventListener('click', () => selectSubscriptionPlan(plan.dataset.planId));
        });
        
        document.querySelectorAll('.addon-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', updateSubscriptionSummary);
        });
    }, 100);
}

// Generate HTML for subscription plans
function generateSubscriptionPlansHTML() {
    return subscriptionPlans.map(plan => `
        <div class="subscription-plan ${plan.recommended ? 'recommended' : ''}" data-plan-id="${plan.id}">
            ${plan.recommended ? '<div class="recommended-badge">RECOMMENDED</div>' : ''}
            <h3 class="plan-name">${plan.name}</h3>
            <div class="plan-price">
                <span class="price-amount">$${plan.price.toFixed(2)}</span>
                <span class="price-cycle">/${plan.billingCycle}</span>
            </div>
            <ul class="plan-features">
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="neon-button ${plan.recommended ? 'magenta' : ''} select-plan-button">Select Plan</button>
        </div>
    `).join('');
}

// Generate HTML for subscription add-ons
function generateAddonsHTML() {
    return subscriptionAddons.map(addon => `
        <div class="subscription-addon">
            <div class="addon-checkbox-container">
                <input type="checkbox" id="addon-${addon.id}" class="addon-checkbox" data-addon-id="${addon.id}" data-addon-price="${addon.price}">
                <label for="addon-${addon.id}" class="addon-name">${addon.name} - $${addon.price.toFixed(2)}/mo</label>
            </div>
            <div class="addon-description">${addon.description}</div>
        </div>
    `).join('');
}

// Show subscription modal
function showSubscriptionModal() {
    playSound('click-sound');
    document.getElementById('subscription-modal').style.display = 'flex';
    
    // If user already has a subscription, pre-select their plan
    if (userSubscription.active && userSubscription.plan) {
        selectSubscriptionPlan(userSubscription.plan);
        
        // Pre-select addons
        userSubscription.addons.forEach(addonId => {
            const checkbox = document.querySelector(`.addon-checkbox[data-addon-id="${addonId}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        updateSubscriptionSummary();
        
        // Change button text to "Update Subscription"
        document.getElementById('subscribe-button').textContent = 'Update Subscription';
    }
}

// Hide subscription modal
function hideSubscriptionModal() {
    playSound('click-sound');
    document.getElementById('subscription-modal').style.display = 'none';
}

// Select a subscription plan
function selectSubscriptionPlan(planId) {
    // Remove selection from all plans
    document.querySelectorAll('.subscription-plan').forEach(plan => {
        plan.classList.remove('selected');
    });
    
    // Add selection to chosen plan
    const selectedPlan = document.querySelector(`.subscription-plan[data-plan-id="${planId}"]`);
    if (selectedPlan) {
        selectedPlan.classList.add('selected');
        playSound('click-sound');
        
        // Enable subscribe button
        document.getElementById('subscribe-button').disabled = false;
        
        // Update summary
        updateSubscriptionSummary();
    }
}

// Update subscription summary
function updateSubscriptionSummary() {
    const selectedPlan = document.querySelector('.subscription-plan.selected');
    const summaryItems = document.getElementById('subscription-summary-items');
    const totalPrice = document.getElementById('subscription-total-price');
    
    if (!selectedPlan) {
        summaryItems.innerHTML = '<p>Select a plan to continue</p>';
        totalPrice.textContent = '$0.00';
        return;
    }
    
    const planId = selectedPlan.dataset.planId;
    const plan = subscriptionPlans.find(p => p.id === planId);
    
    let total = plan.price;
    let summaryHTML = `
        <div class="summary-item">
            <span>${plan.name} Plan</span>
            <span>$${plan.price.toFixed(2)}</span>
        </div>
    `;
    
    // Add selected add-ons
    const selectedAddons = Array.from(document.querySelectorAll('.addon-checkbox:checked'));
    selectedAddons.forEach(checkbox => {
        const addonId = checkbox.dataset.addonId;
        const addonPrice = parseFloat(checkbox.dataset.addonPrice);
        const addon = subscriptionAddons.find(a => a.id === addonId);
        
        total += addonPrice;
        summaryHTML += `
            <div class="summary-item">
                <span>${addon.name}</span>
                <span>$${addonPrice.toFixed(2)}</span>
            </div>
        `;
    });
    
    summaryItems.innerHTML = summaryHTML;
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Process subscription
function processSubscription() {
    playSound('click-sound');
    
    const selectedPlan = document.querySelector('.subscription-plan.selected');
    if (!selectedPlan) return;
    
    const planId = selectedPlan.dataset.planId;
    const selectedAddons = Array.from(document.querySelectorAll('.addon-checkbox:checked'))
        .map(checkbox => checkbox.dataset.addonId);
    
    // In a real app, this would process payment and create a subscription
    // For demo purposes, we'll just update the local state
    
    // Show processing state
    const subscribeButton = document.getElementById('subscribe-button');
    const originalText = subscribeButton.textContent;
    subscribeButton.disabled = true;
    subscribeButton.textContent = 'Processing...';
    
    setTimeout(() => {
        // Update subscription state
        userSubscription.active = true;
        userSubscription.plan = planId;
        userSubscription.addons = selectedAddons;
        userSubscription.startDate = new Date().toISOString();
        
        // Set next billing date to 30 days from now
        const nextBilling = new Date();
        nextBilling.setDate(nextBilling.getDate() + 30);
        userSubscription.nextBillingDate = nextBilling.toISOString();
        
        // Save to localStorage
        saveSubscriptionToStorage();
        
        // Update UI
        updateSubscriptionUI();
        
        // Hide modal
        hideSubscriptionModal();
        
        // Show success message
        showSubscriptionConfirmation();
        
        // Reset button
        subscribeButton.disabled = false;
        subscribeButton.textContent = originalText;
        
        // Play success sound
        playSound('success-sound');
        
        // Unlock premium features based on subscription
        unlockPremiumFeatures();
    }, 2000);
}

// Update UI based on subscription status
function updateSubscriptionUI() {
    const subscriptionLabel = document.querySelector('.subscription-label');
    if (subscriptionLabel) {
        if (userSubscription.active) {
            const plan = subscriptionPlans.find(p => p.id === userSubscription.plan);
            subscriptionLabel.textContent = plan ? plan.name : 'Subscribed';
            subscriptionLabel.classList.add('active');
        } else {
            subscriptionLabel.textContent = 'Upgrade';
            subscriptionLabel.classList.remove('active');
        }
    }
}

// Show subscription confirmation
function showSubscriptionConfirmation() {
    const plan = subscriptionPlans.find(p => p.id === userSubscription.plan);
    
    const modal = document.createElement('div');
    modal.className = 'subscription-confirmation-modal';
    modal.innerHTML = `
        <div class="subscription-confirmation-content">
            <h2>Subscription Confirmed!</h2>
            <div class="confirmation-icon">✓</div>
            <p>You are now subscribed to the <strong>${plan.name}</strong> plan.</p>
            <p>Your subscription includes:</p>
            <ul>
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            ${userSubscription.addons.length > 0 ? `
                <p>With these add-ons:</p>
                <ul>
                    ${userSubscription.addons.map(addonId => {
                        const addon = subscriptionAddons.find(a => a.id === addonId);
                        return `<li>${addon.name}</li>`;
                    }).join('')}
                </ul>
            ` : ''}
            <p>Your next billing date is ${new Date(userSubscription.nextBillingDate).toLocaleDateString()}.</p>
            <button class="neon-button magenta" onclick="closeSubscriptionConfirmation(this.parentNode.parentNode)">Continue</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Close subscription confirmation
function closeSubscriptionConfirmation(modal) {
    playSound('click-sound');
    
    // Animate out
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.remove();
    }, 500);
}

// Unlock premium features based on subscription level
function unlockPremiumFeatures() {
    if (!userSubscription.active) return;
    
    const plan = userSubscription.plan;
    
    // Basic plan features
    if (plan === 'basic' || plan === 'pro' || plan === 'studio' || plan === 'enterprise') {
        // Enable basic features
        console.log('Unlocking basic subscription features');
    }
    
    // Pro plan features
    if (plan === 'pro' || plan === 'studio' || plan === 'enterprise') {
        console.log('Unlocking pro subscription features');
        
        // Enable advanced AR visualization
        document.querySelectorAll('.pro-feature').forEach(el => {
            el.classList.remove('locked');
        });
    }
    
    // Studio plan features
    if (plan === 'studio' || plan === 'enterprise') {
        console.log('Unlocking studio subscription features');
        
        // Enable Nexus system if not already active
        if (!nexusState || !nexusState.initialized) {
            const nexusButton = document.getElementById('activate-nexus');
            if (nexusButton && !nexusButton.disabled) {
                activateNexus();
            }
        }
    }
    
    // Enterprise plan features
    if (plan === 'enterprise') {
        console.log('Unlocking enterprise subscription features');
        
        // Enable multi-user features
        document.querySelectorAll('.enterprise-feature').forEach(el => {
            el.classList.remove('locked');
        });
    }
    
    // Apply add-on features
    userSubscription.addons.forEach(addonId => {
        console.log(`Unlocking ${addonId} features`);
        
        // Enable specific add-on features
        document.querySelectorAll(`.${addonId}-feature`).forEach(el => {
            el.classList.remove('locked');
        });
    });
    
    // Show assistant message
    showAssistantMessage(`Your ${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription features are now active!`);
}

// Check if user has access to a specific feature
function hasFeatureAccess(featureId) {
    if (!userSubscription.active) return false;
    
    const plan = userSubscription.plan;
    
    // Feature access based on plan level
    switch (featureId) {
        case 'ar-visualization':
            return true; // Available to all users
        
        case 'advanced-ar':
            return plan === 'pro' || plan === 'studio' || plan === 'enterprise';
        
        case 'nexus-system':
            return plan === 'studio' || plan === 'enterprise';
        
        case 'multi-user':
            return plan === 'enterprise';
        
        default:
            // Check if it's an add-on feature
            if (featureId.endsWith('-feature')) {
                const addonId = featureId.replace('-feature', '');
                return userSubscription.addons.includes(addonId);
            }
            return false;
    }
}

// Export subscription functions
window.showSubscriptionModal = showSubscriptionModal;
window.hideSubscriptionModal = hideSubscriptionModal;
window.selectSubscriptionPlan = selectSubscriptionPlan;
window.processSubscription = processSubscription;
window.closeSubscriptionConfirmation = closeSubscriptionConfirmation;
window.hasFeatureAccess = hasFeatureAccess; 
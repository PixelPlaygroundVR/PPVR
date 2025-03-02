/**
 * Pixel Playgrounds AR Visualizer - AR Functionality
 * Handles AR visualization of equipment packages
 */

// Current equipment color
let currentEquipmentColor = "#00ffff";

// Current equipment being displayed
let currentEquipment = [];

// Initialize AR scene
function initAR() {
    // Set up event listener for marker found
    const marker = document.querySelector('#equipment-marker');
    
    marker.addEventListener('markerFound', () => {
        playSound('click-sound');
        showAssistantMessage("Marker detected! You can now see your equipment in AR.");
    });
    
    marker.addEventListener('markerLost', () => {
        showAssistantMessage("Marker lost. Please point your camera at the marker again.");
    });
    
    // Set up tap events for equipment details
    setupEquipmentTapEvents();
}

// Update equipment in AR based on selected category and tier
function updateEquipment() {
    const category = document.getElementById('category').value;
    const tier = document.getElementById('tier').value;
    
    // Clear current equipment
    clearEquipment();
    
    // Get equipment for selected package
    const equipmentList = getPackageEquipment(category, tier);
    currentEquipment = equipmentList;
    
    if (equipmentList.length === 0) {
        showAssistantMessage("No equipment found for this package. Please try another selection.");
        return;
    }
    
    // Display equipment in AR
    displayEquipmentInAR(equipmentList);
    
    // Update package info for order form
    updatePackageInfo(category, tier);
    
    // Play sound effect
    playSound('click-sound');
    
    // Show assistant message
    const pkg = getPackage(category, tier);
    showAssistantMessage(`Visualizing the ${pkg.name} package. This ${category.slice(0, -1)} setup includes ${equipmentList.length} pieces of equipment.`);
}

// Display equipment in AR
function displayEquipmentInAR(equipmentList) {
    const marker = document.querySelector('#equipment-marker');
    
    // Calculate layout based on number of items
    const totalItems = equipmentList.length;
    const radius = Math.max(0.3, totalItems * 0.1); // Scale radius based on number of items
    
    equipmentList.forEach((item, index) => {
        // Calculate position in a circle around the marker
        const angle = (index / totalItems) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        
        // Create entity for equipment
        const entity = document.createElement('a-entity');
        entity.setAttribute('id', `equipment-${item.id}`);
        entity.setAttribute('class', 'interactive');
        entity.setAttribute('position', `${x} 0.1 ${z}`);
        entity.setAttribute('rotation', '0 0 0');
        entity.setAttribute('data-info', JSON.stringify({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price
        }));
        
        // Use placeholder geometry for now
        // In a real app, you would use the 3D model: entity.setAttribute('gltf-model', item.modelUrl);
        const placeholder = item.placeholder;
        const primitive = document.createElement(`a-${placeholder.primitive}`);
        
        // Set attributes based on primitive type
        switch (placeholder.primitive) {
            case 'box':
                primitive.setAttribute('width', placeholder.width);
                primitive.setAttribute('height', placeholder.height);
                primitive.setAttribute('depth', placeholder.depth);
                break;
            case 'cylinder':
                primitive.setAttribute('radius', placeholder.radius);
                primitive.setAttribute('height', placeholder.height);
                break;
            case 'sphere':
                primitive.setAttribute('radius', placeholder.radius);
                break;
            case 'torus':
                primitive.setAttribute('radius', placeholder.radius);
                primitive.setAttribute('radius-tubular', placeholder.radiusTubular);
                break;
            case 'plane':
                primitive.setAttribute('width', placeholder.width);
                primitive.setAttribute('height', placeholder.height);
                break;
            case 'circle':
                primitive.setAttribute('radius', placeholder.radius);
                break;
        }
        
        // Set material properties
        primitive.setAttribute('material', `color: ${currentEquipmentColor}; metalness: 0.3; roughness: 0.4`);
        primitive.setAttribute('shadow', 'cast: true; receive: true');
        
        // Add primitive to entity
        entity.appendChild(primitive);
        
        // Add text label
        const text = document.createElement('a-text');
        text.setAttribute('value', item.name);
        text.setAttribute('align', 'center');
        text.setAttribute('position', '0 -0.2 0');
        text.setAttribute('scale', '0.5 0.5 0.5');
        text.setAttribute('color', '#ffffff');
        entity.appendChild(text);
        
        // Add entity to marker
        marker.appendChild(entity);
    });
}

// Clear all equipment from AR scene
function clearEquipment() {
    const marker = document.querySelector('#equipment-marker');
    
    // Remove all equipment entities
    const entities = marker.querySelectorAll('.interactive');
    entities.forEach(entity => {
        marker.removeChild(entity);
    });
    
    // Clear current equipment array
    currentEquipment = [];
}

// Set up tap events for equipment details
function setupEquipmentTapEvents() {
    // Use event delegation for dynamically created entities
    document.querySelector('a-scene').addEventListener('click', function(evt) {
        const el = evt.detail.intersection && evt.detail.intersection.object.el;
        
        if (el && el.classList.contains('interactive')) {
            // Get parent entity if clicked on a child
            const entity = el.classList.contains('interactive') ? el : el.closest('.interactive');
            
            if (entity) {
                // Get equipment info
                const infoStr = entity.getAttribute('data-info');
                if (infoStr) {
                    const info = JSON.parse(infoStr);
                    showEquipmentDetails(info, entity);
                }
            }
        }
    });
}

// Show equipment details panel
function showEquipmentDetails(info, entity) {
    // Create or update info panel
    let panel = document.querySelector('#info-panel');
    
    if (!panel) {
        panel = document.createElement('a-entity');
        panel.setAttribute('id', 'info-panel');
        panel.setAttribute('position', '0 0.5 0');
        document.querySelector('#equipment-marker').appendChild(panel);
    }
    
    // Position panel above the equipment
    const position = entity.getAttribute('position');
    panel.setAttribute('position', `${position.x} ${position.y + 0.3} ${position.z}`);
    
    // Clear existing content
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }
    
    // Create background plane
    const bg = document.createElement('a-plane');
    bg.setAttribute('width', '1');
    bg.setAttribute('height', '0.5');
    bg.setAttribute('color', '#000');
    bg.setAttribute('opacity', '0.8');
    panel.appendChild(bg);
    
    // Add title
    const title = document.createElement('a-text');
    title.setAttribute('value', info.name);
    title.setAttribute('align', 'center');
    title.setAttribute('position', '0 0.15 0.01');
    title.setAttribute('color', '#0f0');
    title.setAttribute('width', '0.9');
    panel.appendChild(title);
    
    // Add description
    const desc = document.createElement('a-text');
    desc.setAttribute('value', info.description);
    desc.setAttribute('align', 'center');
    desc.setAttribute('position', '0 0 0.01');
    desc.setAttribute('color', '#fff');
    desc.setAttribute('width', '0.9');
    desc.setAttribute('baseline', 'center');
    panel.appendChild(desc);
    
    // Add price
    const price = document.createElement('a-text');
    price.setAttribute('value', `Price: ${formatPrice(info.price)}`);
    price.setAttribute('align', 'center');
    price.setAttribute('position', '0 -0.15 0.01');
    price.setAttribute('color', '#0ff');
    price.setAttribute('width', '0.9');
    panel.appendChild(price);
    
    // Play sound effect
    playSound('click-sound');
    
    // Auto-hide panel after 5 seconds
    setTimeout(() => {
        if (panel.parentNode) {
            panel.parentNode.removeChild(panel);
        }
    }, 5000);
}

// Update equipment color
function updateColor(color) {
    currentEquipmentColor = color;
    
    // Update color of all equipment in scene
    const entities = document.querySelectorAll('.interactive');
    entities.forEach(entity => {
        const primitive = entity.querySelector('a-box, a-sphere, a-cylinder, a-torus, a-plane, a-circle');
        if (primitive) {
            const material = primitive.getAttribute('material');
            primitive.setAttribute('material', `color: ${color}; metalness: ${material.metalness}; roughness: ${material.roughness}`);
        }
    });
    
    // Play sound effect
    playSound('click-sound');
    
    // Show assistant message
    showAssistantMessage("Equipment color updated. Customize your setup to match your style!");
}

// Update package info for order form
function updatePackageInfo(category, tier) {
    const pkg = getPackage(category, tier);
    
    if (pkg) {
        // Update package title
        document.getElementById('package-title').textContent = pkg.name;
        
        // Update package details
        const detailsContainer = document.getElementById('package-details');
        detailsContainer.innerHTML = '';
        
        // Add category and tier
        const categoryEl = document.createElement('p');
        categoryEl.innerHTML = `<strong>Category:</strong> ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        detailsContainer.appendChild(categoryEl);
        
        const tierEl = document.createElement('p');
        tierEl.innerHTML = `<strong>Tier:</strong> ${tier} (${pkg.name})`;
        detailsContainer.appendChild(tierEl);
        
        // Add description
        const descEl = document.createElement('p');
        descEl.innerHTML = `<strong>Description:</strong> ${pkg.description}`;
        detailsContainer.appendChild(descEl);
        
        // Add equipment list
        const equipmentEl = document.createElement('div');
        equipmentEl.innerHTML = '<strong>Equipment Included:</strong>';
        const equipmentList = document.createElement('ul');
        
        currentEquipment.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${formatPrice(item.price)}`;
            equipmentList.appendChild(li);
        });
        
        equipmentEl.appendChild(equipmentList);
        detailsContainer.appendChild(equipmentEl);
        
        // Update price
        document.getElementById('package-price').textContent = formatPrice(pkg.price);
        updatePackageTotal();
    }
}

// Initialize AR when the page loads
document.addEventListener('DOMContentLoaded', initAR); 
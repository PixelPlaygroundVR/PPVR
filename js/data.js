/**
 * Pixel Playgrounds AR Visualizer - Data
 * Contains all equipment and package data
 */

// Equipment data with details for each item
const equipment = [
    // Streamer Equipment
    {
        id: 1,
        name: "Basic Webcam",
        description: "720p webcam for entry-level streaming.",
        price: 49.99,
        modelUrl: "assets/models/webcam.gltf",
        placeholder: {
            primitive: "box",
            width: 0.1,
            height: 0.1,
            depth: 0.05,
            color: "#0ff"
        },
        category: "streamers",
        tiers: [1, 2]
    },
    {
        id: 2,
        name: "USB Microphone",
        description: "Simple USB microphone for clear audio.",
        price: 39.99,
        modelUrl: "assets/models/mic.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.03,
            height: 0.15,
            color: "#0f0"
        },
        category: "streamers",
        tiers: [1, 2, 3]
    },
    {
        id: 3,
        name: "HD Webcam",
        description: "1080p webcam with improved low-light performance.",
        price: 89.99,
        modelUrl: "assets/models/hd_webcam.gltf",
        placeholder: {
            primitive: "box",
            width: 0.12,
            height: 0.12,
            depth: 0.06,
            color: "#0ff"
        },
        category: "streamers",
        tiers: [3, 4, 5]
    },
    {
        id: 4,
        name: "Condenser Microphone",
        description: "Studio-quality condenser microphone with stand.",
        price: 129.99,
        modelUrl: "assets/models/condenser_mic.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.05,
            height: 0.25,
            color: "#0f0"
        },
        category: "streamers",
        tiers: [4, 5, 6]
    },
    {
        id: 5,
        name: "Ring Light",
        description: "18-inch LED ring light for professional lighting.",
        price: 79.99,
        modelUrl: "assets/models/ring_light.gltf",
        placeholder: {
            primitive: "torus",
            radius: 0.2,
            radiusTubular: 0.01,
            color: "#fff"
        },
        category: "streamers",
        tiers: [3, 4, 5, 6, 7]
    },
    {
        id: 6,
        name: "Stream Deck",
        description: "15-key programmable control pad for streamers.",
        price: 149.99,
        modelUrl: "assets/models/stream_deck.gltf",
        placeholder: {
            primitive: "box",
            width: 0.15,
            height: 0.1,
            depth: 0.02,
            color: "#f0f"
        },
        category: "streamers",
        tiers: [5, 6, 7, 8]
    },
    {
        id: 7,
        name: "4K Webcam",
        description: "Ultra HD 4K webcam with HDR and autofocus.",
        price: 199.99,
        modelUrl: "assets/models/4k_webcam.gltf",
        placeholder: {
            primitive: "box",
            width: 0.15,
            height: 0.15,
            depth: 0.08,
            color: "#0ff"
        },
        category: "streamers",
        tiers: [6, 7, 8, 9, 10]
    },
    {
        id: 8,
        name: "XLR Microphone Kit",
        description: "Professional XLR microphone with boom arm and shock mount.",
        price: 249.99,
        modelUrl: "assets/models/xlr_mic.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.06,
            height: 0.3,
            color: "#0f0"
        },
        category: "streamers",
        tiers: [7, 8, 9, 10]
    },
    {
        id: 9,
        name: "Key Light Set",
        description: "Professional studio lighting set with adjustable temperature.",
        price: 199.99,
        modelUrl: "assets/models/key_light.gltf",
        placeholder: {
            primitive: "box",
            width: 0.3,
            height: 0.3,
            depth: 0.05,
            color: "#fff"
        },
        category: "streamers",
        tiers: [8, 9, 10]
    },
    {
        id: 10,
        name: "Green Screen",
        description: "Collapsible chroma key background for professional streaming.",
        price: 159.99,
        modelUrl: "assets/models/green_screen.gltf",
        placeholder: {
            primitive: "plane",
            width: 1.5,
            height: 2,
            color: "#0f0"
        },
        category: "streamers",
        tiers: [7, 8, 9, 10]
    },
    {
        id: 11,
        name: "Audio Mixer",
        description: "8-channel audio mixer for professional sound control.",
        price: 299.99,
        modelUrl: "assets/models/audio_mixer.gltf",
        placeholder: {
            primitive: "box",
            width: 0.4,
            height: 0.1,
            depth: 0.3,
            color: "#f0f"
        },
        category: "streamers",
        tiers: [9, 10]
    },
    {
        id: 12,
        name: "Streaming PC",
        description: "High-performance PC optimized for streaming.",
        price: 1499.99,
        modelUrl: "assets/models/pc.gltf",
        placeholder: {
            primitive: "box",
            width: 0.2,
            height: 0.4,
            depth: 0.4,
            color: "#0ff"
        },
        category: "streamers",
        tiers: [10]
    },
    
    // Gamer Equipment
    {
        id: 13,
        name: "Gaming Mouse",
        description: "Ergonomic gaming mouse with programmable buttons.",
        price: 49.99,
        modelUrl: "assets/models/mouse.gltf",
        placeholder: {
            primitive: "box",
            width: 0.07,
            height: 0.03,
            depth: 0.12,
            color: "#f0f"
        },
        category: "gamers",
        tiers: [1, 2, 3]
    },
    {
        id: 14,
        name: "Gaming Keyboard",
        description: "Membrane gaming keyboard with RGB lighting.",
        price: 59.99,
        modelUrl: "assets/models/keyboard.gltf",
        placeholder: {
            primitive: "box",
            width: 0.35,
            height: 0.02,
            depth: 0.15,
            color: "#0ff"
        },
        category: "gamers",
        tiers: [1, 2, 3]
    },
    {
        id: 15,
        name: "Gaming Headset",
        description: "Stereo gaming headset with noise-cancelling microphone.",
        price: 69.99,
        modelUrl: "assets/models/headset.gltf",
        placeholder: {
            primitive: "torus",
            radius: 0.1,
            radiusTubular: 0.02,
            color: "#0f0"
        },
        category: "gamers",
        tiers: [1, 2, 3, 4]
    },
    {
        id: 16,
        name: "Gaming Monitor",
        description: "24-inch 1080p gaming monitor with 75Hz refresh rate.",
        price: 179.99,
        modelUrl: "assets/models/monitor.gltf",
        placeholder: {
            primitive: "box",
            width: 0.5,
            height: 0.3,
            depth: 0.05,
            color: "#0ff"
        },
        category: "gamers",
        tiers: [2, 3, 4]
    },
    {
        id: 17,
        name: "Gaming Chair",
        description: "Ergonomic gaming chair with lumbar support.",
        price: 199.99,
        modelUrl: "assets/models/chair.gltf",
        placeholder: {
            primitive: "box",
            width: 0.5,
            height: 1,
            depth: 0.5,
            color: "#f0f"
        },
        category: "gamers",
        tiers: [3, 4, 5]
    },
    {
        id: 18,
        name: "Mechanical Keyboard",
        description: "Mechanical gaming keyboard with customizable RGB.",
        price: 129.99,
        modelUrl: "assets/models/mech_keyboard.gltf",
        placeholder: {
            primitive: "box",
            width: 0.4,
            height: 0.04,
            depth: 0.15,
            color: "#0ff"
        },
        category: "gamers",
        tiers: [4, 5, 6, 7]
    },
    {
        id: 19,
        name: "Pro Gaming Mouse",
        description: "High-precision gaming mouse with adjustable DPI.",
        price: 89.99,
        modelUrl: "assets/models/pro_mouse.gltf",
        placeholder: {
            primitive: "box",
            width: 0.08,
            height: 0.04,
            depth: 0.12,
            color: "#f0f"
        },
        category: "gamers",
        tiers: [4, 5, 6, 7]
    },
    {
        id: 20,
        name: "144Hz Gaming Monitor",
        description: "27-inch 1440p gaming monitor with 144Hz refresh rate.",
        price: 349.99,
        modelUrl: "assets/models/144hz_monitor.gltf",
        placeholder: {
            primitive: "box",
            width: 0.6,
            height: 0.35,
            depth: 0.05,
            color: "#0ff"
        },
        category: "gamers",
        tiers: [5, 6, 7, 8]
    },
    {
        id: 21,
        name: "Surround Sound Headset",
        description: "7.1 surround sound gaming headset with RGB.",
        price: 149.99,
        modelUrl: "assets/models/surround_headset.gltf",
        placeholder: {
            primitive: "torus",
            radius: 0.12,
            radiusTubular: 0.025,
            color: "#0f0"
        },
        category: "gamers",
        tiers: [5, 6, 7, 8]
    },
    {
        id: 22,
        name: "Gaming Desk",
        description: "Ergonomic gaming desk with cable management.",
        price: 249.99,
        modelUrl: "assets/models/desk.gltf",
        placeholder: {
            primitive: "box",
            width: 1.2,
            height: 0.05,
            depth: 0.6,
            color: "#f0f"
        },
        category: "gamers",
        tiers: [6, 7, 8, 9]
    },
    {
        id: 23,
        name: "Pro Gaming Chair",
        description: "Professional gaming chair with 4D armrests and recline.",
        price: 349.99,
        modelUrl: "assets/models/pro_chair.gltf",
        placeholder: {
            primitive: "box",
            width: 0.6,
            height: 1.2,
            depth: 0.6,
            color: "#f0f"
        },
        category: "gamers",
        tiers: [7, 8, 9, 10]
    },
    {
        id: 24,
        name: "240Hz Gaming Monitor",
        description: "27-inch 1080p gaming monitor with 240Hz refresh rate.",
        price: 499.99,
        modelUrl: "assets/models/240hz_monitor.gltf",
        placeholder: {
            primitive: "box",
            width: 0.6,
            height: 0.35,
            depth: 0.05,
            color: "#0ff"
        },
        category: "gamers",
        tiers: [8, 9, 10]
    },
    {
        id: 25,
        name: "Gaming PC",
        description: "High-performance gaming PC with RGB lighting.",
        price: 1999.99,
        modelUrl: "assets/models/gaming_pc.gltf",
        placeholder: {
            primitive: "box",
            width: 0.25,
            height: 0.5,
            depth: 0.5,
            color: "#0f0"
        },
        category: "gamers",
        tiers: [9, 10]
    },
    {
        id: 26,
        name: "Triple Monitor Setup",
        description: "Triple 27-inch monitor setup with mounting arms.",
        price: 1299.99,
        modelUrl: "assets/models/triple_monitor.gltf",
        placeholder: {
            primitive: "box",
            width: 1.8,
            height: 0.35,
            depth: 0.05,
            color: "#0ff"
        },
        category: "gamers",
        tiers: [10]
    },
    
    // Podcaster Equipment
    {
        id: 27,
        name: "USB Podcast Microphone",
        description: "Entry-level USB microphone for podcasting.",
        price: 59.99,
        modelUrl: "assets/models/podcast_mic.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.04,
            height: 0.2,
            color: "#f0f"
        },
        category: "podcasters",
        tiers: [1, 2]
    },
    {
        id: 28,
        name: "Headphones",
        description: "Closed-back headphones for monitoring audio.",
        price: 49.99,
        modelUrl: "assets/models/headphones.gltf",
        placeholder: {
            primitive: "torus",
            radius: 0.1,
            radiusTubular: 0.02,
            color: "#0ff"
        },
        category: "podcasters",
        tiers: [1, 2, 3]
    },
    {
        id: 29,
        name: "Pop Filter",
        description: "Microphone pop filter for cleaner audio.",
        price: 19.99,
        modelUrl: "assets/models/pop_filter.gltf",
        placeholder: {
            primitive: "circle",
            radius: 0.1,
            color: "#0f0"
        },
        category: "podcasters",
        tiers: [1, 2, 3, 4]
    },
    {
        id: 30,
        name: "Microphone Arm",
        description: "Adjustable boom arm for microphone positioning.",
        price: 39.99,
        modelUrl: "assets/models/mic_arm.gltf",
        placeholder: {
            primitive: "box",
            width: 0.05,
            height: 0.05,
            depth: 0.5,
            color: "#f0f"
        },
        category: "podcasters",
        tiers: [2, 3, 4, 5]
    },
    {
        id: 31,
        name: "Condenser Podcast Microphone",
        description: "Studio-quality condenser microphone for podcasting.",
        price: 149.99,
        modelUrl: "assets/models/podcast_condenser.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.05,
            height: 0.25,
            color: "#0ff"
        },
        category: "podcasters",
        tiers: [3, 4, 5, 6]
    },
    {
        id: 32,
        name: "Audio Interface",
        description: "2-channel USB audio interface for XLR microphones.",
        price: 129.99,
        modelUrl: "assets/models/audio_interface.gltf",
        placeholder: {
            primitive: "box",
            width: 0.2,
            height: 0.05,
            depth: 0.15,
            color: "#0f0"
        },
        category: "podcasters",
        tiers: [4, 5, 6, 7]
    },
    {
        id: 33,
        name: "Studio Headphones",
        description: "Professional studio headphones for audio monitoring.",
        price: 149.99,
        modelUrl: "assets/models/studio_headphones.gltf",
        placeholder: {
            primitive: "torus",
            radius: 0.12,
            radiusTubular: 0.025,
            color: "#f0f"
        },
        category: "podcasters",
        tiers: [4, 5, 6, 7]
    },
    {
        id: 34,
        name: "Acoustic Panels",
        description: "Set of 6 acoustic panels for sound treatment.",
        price: 99.99,
        modelUrl: "assets/models/acoustic_panels.gltf",
        placeholder: {
            primitive: "box",
            width: 0.3,
            height: 0.3,
            depth: 0.05,
            color: "#0ff"
        },
        category: "podcasters",
        tiers: [5, 6, 7, 8]
    },
    {
        id: 35,
        name: "Podcast Mixer",
        description: "4-channel podcast mixer with USB interface.",
        price: 249.99,
        modelUrl: "assets/models/podcast_mixer.gltf",
        placeholder: {
            primitive: "box",
            width: 0.3,
            height: 0.08,
            depth: 0.25,
            color: "#0f0"
        },
        category: "podcasters",
        tiers: [6, 7, 8, 9]
    },
    {
        id: 36,
        name: "Dynamic Broadcast Microphone",
        description: "Professional dynamic microphone for broadcast quality.",
        price: 299.99,
        modelUrl: "assets/models/broadcast_mic.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.06,
            height: 0.3,
            color: "#f0f"
        },
        category: "podcasters",
        tiers: [7, 8, 9, 10]
    },
    {
        id: 37,
        name: "Podcast Recording Software",
        description: "Professional podcast recording and editing software.",
        price: 199.99,
        modelUrl: "assets/models/software.gltf",
        placeholder: {
            primitive: "box",
            width: 0.2,
            height: 0.01,
            depth: 0.2,
            color: "#0ff"
        },
        category: "podcasters",
        tiers: [7, 8, 9, 10]
    },
    {
        id: 38,
        name: "Multi-Microphone Setup",
        description: "4-microphone setup for podcast with multiple hosts.",
        price: 799.99,
        modelUrl: "assets/models/multi_mic.gltf",
        placeholder: {
            primitive: "cylinder",
            radius: 0.05,
            height: 0.25,
            color: "#0f0"
        },
        category: "podcasters",
        tiers: [8, 9, 10]
    },
    {
        id: 39,
        name: "Soundproof Booth",
        description: "Portable soundproof booth for professional recording.",
        price: 1499.99,
        modelUrl: "assets/models/booth.gltf",
        placeholder: {
            primitive: "box",
            width: 1,
            height: 2,
            depth: 1,
            color: "#f0f"
        },
        category: "podcasters",
        tiers: [9, 10]
    },
    {
        id: 40,
        name: "Professional Studio Setup",
        description: "Complete professional podcast studio setup.",
        price: 2999.99,
        modelUrl: "assets/models/studio.gltf",
        placeholder: {
            primitive: "box",
            width: 2,
            height: 2,
            depth: 2,
            color: "#0ff"
        },
        category: "podcasters",
        tiers: [10]
    }
];

// Package definitions for each category and tier
const packages = {
    streamers: [
        {
            tier: 1,
            name: "Noob Streamer",
            description: "Basic setup for beginners just starting out.",
            equipmentIds: [1, 2],
            price: 89.98
        },
        {
            tier: 2,
            name: "Casual Streamer",
            description: "Improved setup for casual streaming sessions.",
            equipmentIds: [1, 2],
            price: 89.98
        },
        {
            tier: 3,
            name: "Regular Streamer",
            description: "Better quality for regular streamers.",
            equipmentIds: [3, 2, 5],
            price: 209.97
        },
        {
            tier: 4,
            name: "Dedicated Streamer",
            description: "Higher quality setup for dedicated content creators.",
            equipmentIds: [3, 4, 5],
            price: 299.97
        },
        {
            tier: 5,
            name: "Serious Streamer",
            description: "Professional-grade equipment for serious streamers.",
            equipmentIds: [3, 4, 5, 6],
            price: 449.96
        },
        {
            tier: 6,
            name: "Semi-Pro Streamer",
            description: "Semi-professional streaming setup.",
            equipmentIds: [7, 4, 5, 6],
            price: 529.96
        },
        {
            tier: 7,
            name: "Pro Streamer",
            description: "Professional streaming setup with high-quality gear.",
            equipmentIds: [7, 8, 5, 6, 10],
            price: 959.95
        },
        {
            tier: 8,
            name: "Elite Streamer",
            description: "Elite streaming setup for professional content creators.",
            equipmentIds: [7, 8, 9, 6, 10],
            price: 959.95
        },
        {
            tier: 9,
            name: "Master Streamer",
            description: "Master-level streaming setup with top-tier equipment.",
            equipmentIds: [7, 8, 9, 10, 11],
            price: 1109.95
        },
        {
            tier: 10,
            name: "Legendary Streamer",
            description: "Legendary streaming setup with the best equipment available.",
            equipmentIds: [7, 8, 9, 10, 11, 12],
            price: 2609.94
        }
    ],
    gamers: [
        {
            tier: 1,
            name: "Noob Gamer",
            description: "Basic setup for casual gaming.",
            equipmentIds: [13, 14, 15],
            price: 179.97
        },
        {
            tier: 2,
            name: "Casual Gamer",
            description: "Improved setup for regular gaming sessions.",
            equipmentIds: [13, 14, 15, 16],
            price: 359.96
        },
        {
            tier: 3,
            name: "Regular Gamer",
            description: "Better quality for dedicated gamers.",
            equipmentIds: [13, 14, 15, 16, 17],
            price: 559.95
        },
        {
            tier: 4,
            name: "Dedicated Gamer",
            description: "Higher quality setup for serious gamers.",
            equipmentIds: [19, 18, 15, 16, 17],
            price: 649.95
        },
        {
            tier: 5,
            name: "Serious Gamer",
            description: "Professional-grade equipment for competitive gamers.",
            equipmentIds: [19, 18, 21, 20, 17],
            price: 939.95
        },
        {
            tier: 6,
            name: "Semi-Pro Gamer",
            description: "Semi-professional gaming setup.",
            equipmentIds: [19, 18, 21, 20, 22],
            price: 989.95
        },
        {
            tier: 7,
            name: "Pro Gamer",
            description: "Professional gaming setup with high-quality gear.",
            equipmentIds: [19, 18, 21, 20, 22, 23],
            price: 1339.94
        },
        {
            tier: 8,
            name: "Elite Gamer",
            description: "Elite gaming setup for professional players.",
            equipmentIds: [19, 18, 21, 24, 22, 23],
            price: 1489.94
        },
        {
            tier: 9,
            name: "Master Gamer",
            description: "Master-level gaming setup with top-tier equipment.",
            equipmentIds: [19, 18, 21, 24, 22, 23, 25],
            price: 3489.93
        },
        {
            tier: 10,
            name: "Legendary Gamer",
            description: "Legendary gaming setup with the best equipment available.",
            equipmentIds: [19, 18, 21, 26, 22, 23, 25],
            price: 4289.93
        }
    ],
    podcasters: [
        {
            tier: 1,
            name: "Noob Podcaster",
            description: "Basic setup for beginners just starting out.",
            equipmentIds: [27, 28, 29],
            price: 129.97
        },
        {
            tier: 2,
            name: "Casual Podcaster",
            description: "Improved setup for casual podcasting.",
            equipmentIds: [27, 28, 29, 30],
            price: 169.96
        },
        {
            tier: 3,
            name: "Regular Podcaster",
            description: "Better quality for regular podcasters.",
            equipmentIds: [31, 28, 29, 30],
            price: 259.96
        },
        {
            tier: 4,
            name: "Dedicated Podcaster",
            description: "Higher quality setup for dedicated podcasters.",
            equipmentIds: [31, 33, 29, 30, 32],
            price: 489.95
        },
        {
            tier: 5,
            name: "Serious Podcaster",
            description: "Professional-grade equipment for serious podcasters.",
            equipmentIds: [31, 33, 29, 30, 32, 34],
            price: 589.94
        },
        {
            tier: 6,
            name: "Semi-Pro Podcaster",
            description: "Semi-professional podcasting setup.",
            equipmentIds: [31, 33, 29, 30, 32, 34, 35],
            price: 839.93
        },
        {
            tier: 7,
            name: "Pro Podcaster",
            description: "Professional podcasting setup with high-quality gear.",
            equipmentIds: [36, 33, 29, 30, 32, 34, 35, 37],
            price: 1159.92
        },
        {
            tier: 8,
            name: "Elite Podcaster",
            description: "Elite podcasting setup for professional content creators.",
            equipmentIds: [36, 33, 29, 30, 32, 34, 35, 37, 38],
            price: 1959.91
        },
        {
            tier: 9,
            name: "Master Podcaster",
            description: "Master-level podcasting setup with top-tier equipment.",
            equipmentIds: [36, 33, 29, 30, 32, 34, 35, 37, 38, 39],
            price: 3459.90
        },
        {
            tier: 10,
            name: "Legendary Podcaster",
            description: "Legendary podcasting setup with the best equipment available.",
            equipmentIds: [36, 33, 29, 30, 32, 34, 35, 37, 38, 39, 40],
            price: 6459.89
        }
    ]
};

// Helper function to get equipment by ID
function getEquipmentById(id) {
    return equipment.find(item => item.id === id);
}

// Helper function to get package by category and tier
function getPackage(category, tier) {
    const tierNum = parseInt(tier);
    return packages[category].find(pkg => pkg.tier === tierNum);
}

// Helper function to get equipment for a package
function getPackageEquipment(category, tier) {
    const pkg = getPackage(category, tier);
    if (!pkg) return [];
    
    return pkg.equipmentIds.map(id => getEquipmentById(id));
}

// Helper function to get all equipment for a category
function getEquipmentByCategory(category) {
    if (category === 'all') {
        return equipment;
    }
    return equipment.filter(item => item.category === category);
}

// Helper function to format price
function formatPrice(price) {
    return '$' + price.toFixed(2);
} 
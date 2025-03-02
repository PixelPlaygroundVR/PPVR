# Pixel Playgrounds AR Visualizer

A web application that allows users to visualize studio equipment packages in augmented reality (AR) using their iPhone's camera. The app includes a functional shop where users can browse gear, add items to a cart, and checkout with an installation option.

## Features

- **AR Visualization**: View equipment packages in augmented reality using a Hiro marker
- **Equipment Packages**: Browse through 10 tiers of equipment for Streamers, Gamers, and Podcasters
- **Shop**: Browse individual equipment items, add to cart, and checkout
- **Cyberpunk Design**: Dark theme with neon colors and futuristic aesthetics
- **Email Confirmation**: Receive order confirmations via email
- **Virtual Assistant**: Get help and guidance from a virtual assistant

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **AR Framework**: A-Frame and AR.js
- **Email Service**: EmailJS (configured for demo purposes)

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser
3. Print the Hiro marker (available in the app)
4. Allow camera access when prompted
5. Point your camera at the Hiro marker to visualize equipment in AR

## AR Visualization

To use the AR visualization feature:

1. Print the Hiro marker from the app
2. Select a category (Streamers, Gamers, or Podcasters)
3. Select a tier (1-10)
4. Click "Update Equipment" to visualize the package in AR
5. Point your camera at the Hiro marker
6. Tap on equipment items to see details

## Shop and Checkout

The shop allows you to:

1. Browse all equipment items
2. Filter by category or search term
3. Add items to your cart
4. Proceed to checkout
5. Add optional installation service
6. Complete your order and receive a confirmation

## Package Orders

You can also order complete equipment packages:

1. Select a category and tier
2. Click "Order Package"
3. Fill in your details
4. Add optional installation service
5. Complete your order and receive a confirmation

## Customization

The app allows you to customize the color of equipment in AR using the color picker on the home page.

## Development

### Project Structure

- `index.html`: Main HTML file
- `css/styles.css`: Cyberpunk-themed styles
- `js/data.js`: Equipment and package data
- `js/ar.js`: AR visualization functionality
- `js/shop.js`: Shop and cart functionality
- `js/ui.js`: UI interactions and animations
- `js/main.js`: Main initialization
- `assets/`: Images, models, and sounds

### EmailJS Configuration

To enable email functionality:

1. Sign up for an EmailJS account
2. Create an email template
3. Update the EmailJS configuration in `js/shop.js`

## Deployment

This app can be deployed on GitHub Pages or any static web hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- A-Frame for the WebVR framework
- AR.js for the augmented reality functionality
- EmailJS for the email service 
# ColorCraft

ColorCraft is a client-side color palette generator built with React and the Canvas API.

Upload an image and extract its dominant colors directly in your browser without using a backend or external color extraction API.

## Features

- Image upload
- Drag and drop support
- Dominant color extraction
- Custom color count from 3 to 10
- HEX color values
- RGB values
- HSL values
- Color coverage percentage
- Copy color to clipboard
- Transparent pixel handling
- Large image optimization
- Responsive design

## Tech Stack

- React
- JavaScript
- Canvas API
- CSS
- Clipboard API

## How It Works

1. User uploads an image.
2. The image is loaded into a Canvas.
3. Canvas reads the image pixel data.
4. Similar colors are grouped using quantization.
5. Colors are ranked according to frequency.
6. The dominant colors are displayed as a palette.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── ImageUploader.jsx
│   ├── PaletteDisplay.jsx
│   ├── ColorSwatch.jsx
│   ├── ColorInfo.jsx
│   ├── ColorCountSlider.jsx
│   └── LoadingState.jsx
│
├── hooks/
│   └── useColorExtractor.js
│
├── utils/
│   ├── colorUtils.js
│   ├── colorQuantization.js
│   └── imageProcessor.js
│
├── App.jsx
├── main.jsx
└── index.css
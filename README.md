# Ghost-Spider | Into the Spider-Verse

A premium, cinematic website dedicated to Ghost-Spider (Gwen Stacy) from *Spider-Man: Into the Spider-Verse*.

![Ghost-Spider](images/spidergirl.png)

## Features

- **Interactive Hero Section** - Hover effect that transforms between civilian and Ghost-Spider identity (inspired by Lando Norris' website)
- **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile
- **Smooth Animations** - Scroll-reveal animations, parallax effects, and smooth transitions
- **Spider-Verse Theme** - Pink, cyan, white, and black color palette matching the Spider-Verse aesthetic
- **Multiple Sections**:
  - Hero with image transformation
  - About/Bio section with stats
  - Powers & Abilities
  - Suits & Technology showcase
  - Mission History timeline
  - Photo Gallery
  - Contact form

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - Vanilla JS for interactions
- **Google Fonts** - Bebas Neue & Inter

## Project Structure

```
spidey/
├── index.html          # Main HTML file
├── style.css           # All styles
├── script.js           # JavaScript interactions
├── README.md           # This file
└── images/
    ├── anji.png              # Main portrait (civilian)
    ├── spidergirl.png        # Ghost-Spider image
    ├── ghostspidersuit.jpg   # Suit showcase
    ├── acrosstheverse.jpg    # ATSV suit
    ├── hooded.jpg            # Hooded variant
    ├── webwarrior.jpg        # Web-Warriors suit
    ├── combattraining.jpg    # Gallery image
    ├── dimensionjump.jpg     # Gallery image
    ├── maryjanes.jpg         # Gallery image
    └── webslinging.jpg       # Gallery image
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser
3. Or use a local server like Live Server in VS Code

```bash
# If you have Python installed
python -m http.server 5500

# Or with Node.js
npx serve
```

## Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --red: #FF65A3;        /* Primary pink */
    --red-dark: #E91E8C;   /* Dark pink */
    --cyan: #00D4FF;       /* Accent cyan */
    --black: #0a0a0a;      /* Background */
}
```

### Images
Replace images in the `images/` folder with your own. Supported formats: PNG, JPG, JPEG.

### Content
Edit text content directly in `index.html`.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Credits

- Design inspired by [Lando Norris' official website](https://landonorris.com)
- Spider-Gwen/Ghost-Spider character © Marvel/Sony
- *Spider-Man: Into the Spider-Verse* © Sony Pictures Animation

## License

This project is for educational/personal use only. All Spider-Man related characters and imagery are property of Marvel and Sony.

---

*"I have a drummer. Her name is Gwen Stacy. I call her Spider-Woman."*

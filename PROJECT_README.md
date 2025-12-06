# PG Finder - PG Accommodation Website

A modern, accessible PG accommodation website built with React + Vite, inspired by Lovable.dev's clean design aesthetic. Optimized for students and professionals in India.

## 🎨 Design Features

- **Clean, Modern UI**: Lovable.dev-inspired layout with generous whitespace, rounded cards, and soft shadows
- **Bold Color Scheme**: Red primary (#ff0000) and orange accent (#ff6a00) colors
- **Typography**: Poppins for headings, Nunito Sans for body text
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessible**: ARIA labels, semantic HTML, keyboard navigation support

## ✨ Key Features

### For PG Seekers
- **Advanced Search & Filters**: Search by name, location, price range, room type, occupancy, and amenities
- **Verified Listings**: All PGs are verified for safety and authenticity
- **Detailed Listings**: View images, amenities, location, and contact details
- **Direct Contact**: WhatsApp integration, phone, and email options
- **Inquiry Forms**: Send inquiries directly to PG owners

### For PG Owners
- **Easy Listing**: Comprehensive form to list your PG
- **Multiple Fields**: Add photos, amenities, pricing, and detailed descriptions
- **Verification System**: All listings go through verification process

## 📦 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **Forms**: React Hook Form (ready to integrate)
- **Notifications**: Sonner toasts

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable components
│   ├── ui/          # shadcn UI components
│   ├── Navbar.tsx   # Navigation header
│   ├── Footer.tsx   # Footer with links
│   ├── ListingCard.tsx      # PG listing card
│   └── SearchFilters.tsx    # Filter sidebar
├── data/            # JSON seed data
│   └── listings.json        # 6 sample PG listings
├── pages/           # Page components
│   ├── Home.tsx     # Landing page with hero
│   ├── Listings.tsx # Browse and search PGs
│   ├── ListingDetail.tsx    # Individual PG details
│   ├── ListYourPG.tsx       # Owner listing form
│   └── About.tsx    # About and services page
├── App.tsx          # Main app with routing
└── index.css        # Design system and styles
```

## 🎨 Design System

The design system is defined in `src/index.css` and `tailwind.config.ts`:

### Colors (HSL)
- **Primary**: Red (#ff0000 / 0 100% 50%)
- **Accent**: Orange-red (#ff6a00 / 25 100% 50%)
- **Background**: Off-white (0 0% 99%)
- **Foreground**: Dark gray (0 0% 15%)

### Typography
- **Headings**: Poppins (400, 500, 600, 700)
- **Body**: Nunito Sans (300, 400, 600, 700)

### Shadows
- `--shadow-sm`: Subtle card shadows
- `--shadow-md`: Medium depth
- `--shadow-lg`: Prominent shadows

## 🔧 Customization

### Adding Backend (Optional)

The project uses JSON for seed data. To connect a real backend:

1. **Replace JSON with API calls** in components
2. **Add environment variables** for API endpoints
3. **Implement form submission** to your backend
4. **Add authentication** if needed

### Serverless Form Submission Example (Netlify)

Create `netlify/functions/register.js`:

```javascript
exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  
  // Process form data (send email, save to DB, etc.)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: "Listing submitted!" })
  };
};
```

Update form submission in `ListYourPG.tsx` to POST to `/.netlify/functions/register`

## 🌐 Deployment

### Deploy to Netlify
```bash
npm run build
# Connect to Netlify and deploy the 'dist' folder
```

### Deploy to Vercel
```bash
npm run build
# Connect to Vercel and deploy
```

### Deploy to GitHub Pages
```bash
npm run build
# Push the dist folder to gh-pages branch
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Alt text on all images
- Proper heading hierarchy

## 🔐 Security Best Practices

- Input validation on all forms
- Phone number validation
- Email validation
- Sanitized user inputs
- No inline JavaScript

## 📄 License

This project is open source and available for educational and commercial use.

## 🙏 Credits

- Design inspired by Lovable.dev
- UI components from shadcn/ui
- Icons from Lucide React

## 📞 Support

For questions or issues, contact: info@pgfinder.com

---

Built with ❤️ for students and professionals across India

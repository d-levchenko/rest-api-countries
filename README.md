# 🌍 REST Countries API Explorer

A modern, responsive React application that provides comprehensive information
about countries worldwide using the REST Countries API. Built with TypeScript,
Vite, and featuring a sleek dark/light mode toggle.

## 🚀 Live Demo

[View Live Application](https://rest-api-countries-kohl.vercel.app/)

## ✨ Features

### Core Functionality

- **Global Country Database**: Access information for all countries worldwide
- **Real-time Search**: Debounced search functionality to find countries by name
- **Regional Filtering**: Filter countries by continent/region using a dropdown
  selector
- **Pagination**: Navigate through results with 12 countries per page
- **Detailed Country Cards**: View essential information at a glance (flag,
  name, population, region, capital)

### Advanced Features

- **Interactive Country Details**: Click any country card to open a detailed
  modal with comprehensive information including:
  - Official and common names
  - Population (formatted with locale-specific separators)
  - Region and subregion
  - Capital city
  - Top-level domain
  - Official currency
  - Spoken languages
- **Dark/Light Mode Toggle**: Seamless theme switching with persistent UI state
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading indicators during data fetching
- **Error Handling**: Graceful error messages for failed API requests

### Technical Features

- **API Caching**: Intelligent caching with React Query to minimize API calls
  and improve performance
- **Debounced Search**: Optimized search with 500ms debounce to reduce
  unnecessary requests
- **Keyboard Navigation**: ESC key support for closing modals
- **Accessibility**: Proper ARIA labels and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: CSS Modules with modern-normalize
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Utilities**: use-debounce for search optimization
- **Typography**: Nunito Sans font family

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/d-levchenko/rest-api-countries.git
   cd rest-api-countries
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── components/
│   ├── App/           # Main application component
│   ├── Countries/     # Country cards grid component
│   ├── SearchBar/     # Search input component
│   ├── DropdownSelect/# Region filter dropdown
│   ├── Pagination/    # Pagination controls
│   ├── ModalWindow/   # Country details modal
│   ├── Navbar/        # Navigation with theme toggle
│   ├── Loader/        # Loading spinner component
│   └── ErrorMessage/  # Error display component
├── services/
│   └── countryService.ts # API service layer
└── types/
    └── country.ts    # TypeScript type definitions
```

## 🔧 Configuration

The application uses the [REST Countries API](https://restcountries.com/) (v3.1)
for data. No additional configuration is required as the API is free and doesn't
require authentication.

## 🎨 Design System

- **Color Scheme**: Clean, accessible color palette with support for both light
  and dark themes
- **Typography**: Nunito Sans for optimal readability
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Components**: Modular CSS Modules for scoped styling

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing the country
  data
- [React](https://reactjs.org/) for the amazing frontend framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [React Query](https://tanstack.com/query) for powerful data fetching and
  caching

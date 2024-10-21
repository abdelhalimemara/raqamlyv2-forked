# Raqamly.ai - Next Gen Marketing Platform

Raqamly.ai is a cutting-edge marketing platform that leverages AI to help businesses create, manage, and optimize their marketing campaigns. This web application is built using React, TypeScript, and Vite, with Supabase as the backend service.

## Features

- User Authentication: Secure login and signup functionality.
- Dashboard: Overview of key marketing metrics and recent activities.
- Products Management: Add, view, and manage products with support for multiple images.
- AI Library: (Coming Soon) Access to AI-powered marketing tools.
- Campaigns: (Coming Soon) Create and manage marketing campaigns.
- Profile Management: Update user profile information and avatar.
- Responsive Design: Works seamlessly on desktop and mobile devices.

## Technologies Used

- React 18
- TypeScript
- Vite
- Supabase (Authentication and Database)
- TailwindCSS
- React Router
- React Dropzone

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/raqamly-ai.git
   cd raqamly-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the application running.

## Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `dist` folder with the compiled assets.

## Deployment

This project is set up for easy deployment to Netlify. The `netlify.toml` file in the root directory configures the build settings.

To deploy:

1. Push your changes to a GitHub repository.
2. Connect your GitHub repository to Netlify.
3. Netlify will automatically deploy your site and provide you with a URL.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Happy marketing with Raqamly.ai! 🚀
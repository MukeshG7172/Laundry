
# Laundry Management Application 🧺

A comprehensive, user-friendly Laundry Management application built with Next.js, React, and Tailwind CSS. The project leverages modern web development practices to provide a seamless experience for managing laundry tasks, groups, and statuses.

## Features 🚀

- **User Authentication**: Secure user login/logout functionality.
- **Dynamic Laundry List**: Add, update, and delete items in the laundry list.
- **Group Management**: Organize laundry items into groups, including creating new groups.
- **Status Tracking**: Toggle item statuses between "At Laundry" and "With You."
- **Real-time Feedback**: Loader animations for seamless transitions.
- **Error Handling**: User-friendly error messages for a smooth experience.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## Technologies Used 🛠️

- **Framework**: [Next.js](https://nextjs.org/) for server-side rendering and routing.
- **UI Library**: [React](https://reactjs.org/) for building interactive interfaces.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern and responsive design.
- **State Management**: React hooks for efficient state management.
- **Authentication**: Custom authentication setup for user sessions.
- **Backend**: Next.js API routes for server-side operations.

## Installation & Setup 📦

Follow these steps to get the project up and running:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/laundry-management.git
   cd laundry-management
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the necessary environment variables:
   ```
   NEXT_PUBLIC_API_URL=<your-api-url>
   NEXT_PUBLIC_AUTH_SECRET=<your-auth-secret>
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Folder Structure 📂

```
.
├── components
│   ├── ListClientPage.tsx  // Handles laundry list rendering and operations
│   └── ...
├── pages
│   ├── index.tsx           // Home page
│   ├── login.tsx           // Login page
│   └── list.tsx            // List page
├── styles
│   └── globals.css         // Global styles
├── public                  // Static assets
├── utils                   // Helper functions
└── ...
```

## Usage Instructions ✨

1. **Login**: Authenticate using your credentials.
2. **Manage Lists**: Add new items, assign them to groups, and toggle statuses.
3. **Group Selection**: Filter items based on existing or newly created groups.
4. **Status Updates**: Track the status of each item in real-time.
5. **Error Handling**: Encountered issues will be gracefully handled with alerts.

## Screenshots 📸

### 1. Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)

### 2. Add Item
![Add Item](https://via.placeholder.com/800x400?text=Add+Item)

### 3. Group Filter
![Group Filter](https://via.placeholder.com/800x400?text=Group+Filter)

## Contributing 🤝

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License 📜

This project is licensed under the [MIT License](LICENSE).

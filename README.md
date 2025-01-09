# Responsive Navbar Component

This is a responsive React `Navbar` component built with TailwindCSS. It includes a toggle button for mobile screens, navigation links, and user authentication/logout functionality.

## Features

- **Responsive Design**: Adjusts seamlessly for desktop and mobile devices.
- **Mobile Navigation**: Includes a toggleable hamburger menu for smaller screens.
- **User Navigation**:
  - **My Profile**: Navigates to the user's profile page.
  - **Notes**: Navigates to the notes page.
  - **Logout**: Logs out the user and redirects to the login page.
- **Accessible**: Implements ARIA-friendly toggle buttons for better accessibility.

## Technology Stack

- **React**: Frontend library for building UI components.
- **React Router**: For navigation and routing between pages.
- **TailwindCSS**: For styling and responsive design.
- **React Context**: Used for user authentication (`useAuth`).

## Code Overview

The component includes:

1. **State Management**: Uses React's `useState` to manage the mobile menu's open/close state.
2. **Responsive Styling**: Utilizes TailwindCSS utility classes to adapt the layout for mobile and desktop devices.
3. **Authentication**: Integrates with `useAuth` to handle user logout functionality.

## How to Use

### Prerequisites
- Ensure you have **Node.js** and **npm** (or **yarn**) installed.
- TailwindCSS must be configured in your project. If not, follow the [TailwindCSS installation guide](https://tailwindcss.com/docs/installation).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shakthi2230/notesapp-frontent.git
   cd your-repo

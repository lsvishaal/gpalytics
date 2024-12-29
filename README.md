
---

# **GPAlytics **

**GPAlytics** is a  application designed to simplify academic analysis. It allows users to calculate GPAs, track academic performance, and gain insights through dynamic data visualization and easy-to-use interfaces. Built using **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, it offers a modern and responsive experience.

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Environment Variables](#environment-variables)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Features**

- **Dynamic GPA Analysis**: Upload result files to process and calculate GPAs.
- **Authentication**: Secure login and registration with session-based authentication.
- **Protected Routes**: Certain pages are accessible only to logged-in users.
- **Responsive UI**: Fully optimized for desktop and mobile devices.
- **Interactive Animations**: Smooth transitions and interactions using Framer Motion.
- **File Upload Integration**: Support for uploading academic data for processing.
- **Dark Mode Support**: Offers a seamless dark mode experience.

---

## **Tech Stack**

### **Frontend**
- **React** (with Vite for fast bundling)
- **React Router** (for navigation and routing)
- **Tailwind CSS** (for styling)
- **Framer Motion** (for animations)

### **Backend Integration**
- Integrated with a FastAPI backend for authentication, GPA calculation, and data processing.

---

## **Project Structure**

```
src/
├── components/
│   ├── hooks/               # Custom hooks for state and logic
│   ├── ui/                  # Reusable UI components (e.g., buttons, forms)
│   ├── Navbar.jsx           # Top navigation bar
├── lib/
│   ├── axiosInstance.js     # Axios configuration for API requests
│   ├── utils.js             # Utility functions
├── pages/
│   ├── AuthPage.jsx         # Authentication (login/register)
│   ├── Landing.jsx          # Landing page
│   ├── ProtectedPage.jsx    # Protected routes
│   ├── Fallback.jsx         # 404 or fallback page
├── styles/
│   ├── index.css            # Global styles
├── App.jsx                  # Main application entry
├── main.jsx                 # React root render
.env                         # Environment variables
```

---

## **Installation**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Steps**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/gpalytics-frontend.git
   cd gpalytics-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     VITE_API_BASE_URL=http://localhost:8000
     ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## **Usage**

### **Landing Page**
- **Route**: `/`
- Displays the app overview and allows users to navigate to authentication or other features.

### **Authentication**
- **Route**: `/register`
- Register or log in securely to access the app's features.

### **Protected Page**
- **Route**: `/protected`
- Accessible only after logging in. It displays user-specific academic insights and GPA analysis.

---

## **Environment Variables**

Add a `.env` file to configure API and environment settings:

| Variable             | Description                                |
|----------------------|--------------------------------------------|
| `VITE_API_BASE_URL`  | Backend API base URL                      |

Example:
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## **Contributing**

Contributions are welcome! Here's how you can get involved:
1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add your commit message"
   git push origin feature/your-feature-name
   ```
4. Open a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

For questions or support, feel free to reach out:
- **Email**: your.email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

---


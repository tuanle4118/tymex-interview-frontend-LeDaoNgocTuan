# 📦 Marketplace App

A modern Marketplace web application built with Next.js, Ant Design, and SWR. It features advanced filtering, search functionality, and a fully responsive UI for mobile, tablet, and desktop users.

⚠️ **Best Viewed on 1920x1080 Resolution**  
For the best experience, use a screen resolution of **1920x1080**. The design is optimized for this resolution but remains responsive across different devices.

## 🚀 Features

- 🔍 **Product List View** – Display products with multiple filtering and search criteria.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop screens.
- ⚡ **Fast & Efficient** – Uses SWR for data fetching and caching.
- ✅ **Well-Structured Codebase** – Organized folder structure for scalability.
- 🛠 **Tested with Jest** – Covered >90% Unit Test coverage.

## 🏗️ Tech Stack

- **Next.js** – Server-side rendering and performance optimizations.
- **Ant Design (antd)** – UI components for a polished design.
- **SWR** – Data fetching and caching for better performance.
- **Jest** – Unit and integration testing.
- **JSON-Server** – Mock API for backend data.

## 🌐 Deployment

- **Frontend:** Deployed using **Vercel** – the best deployment tool for Next.js projects -> [https://tymex-interview-frontend-le-dao-ngoc-tuan.vercel.app/](https://tymex-interview-frontend-le-dao-ngoc-tuan.vercel.app/)
- **Backend:** JSON-server mock API deployed on **Render**:  
  [https://tymex-mock-server.onrender.com/](https://tymex-mock-server.onrender.com/)

## 📥 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/tuanle4118/tymex-interview-frontend-LeDaoNgocTuan.git
   cd tymex-interview-frontend-LeDaoNgocTuan
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Running Tests

Run Jest tests:

```sh
npm test
# or
yarn test
```

## 📂 Folder Structure

```
/app
  ├── (home)/          # Main page
  ├── components/      # Reusable UI components
      ├── __test__/    # Test cases for components
  ├── contexts/        # Global state management using Context API
  ├── definitions/     # Common definitions like interfaces, constant,...
  ├── hooks/           # Custom React hooks
      ├── __test__/    # Test cases for hooks
  ├── lib/             # Utility functions and third-party integrations
  ├── styles/          # Component module styles
  ├── ui/              # Main UI components
      ├── __test__/    # Test cases for main UI
  ├── utils/           # Utility functions
      ├── __test__/    # Test cases for util functions
```

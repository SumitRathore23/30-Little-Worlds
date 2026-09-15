import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import GrainOverlay from "./components/GrainOverlay/GrainOverlay";

import Home from "./pages/Home/Home";
import Stories from "./pages/Stories/Stories";
import StoryDetail from "./pages/StoryDetail/StoryDetail";
import About from "./pages/About/About";
import Book from "./pages/Book/Book";

import AdminLogin from "./admin/Pages/AdminLogin/AdminLogin";
import AdminDashboard from "./admin/Pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute/ProtectedRoute";

import StoryEditor from "./admin/Pages/StoryEditor/StoryEditor";

function AnimatedRoutes() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          {/* PUBLIC */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/stories"
            element={<Stories />}
          />

          <Route
            path="/stories/:slug"
            element={<StoryDetail />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/book"
            element={<Book />}
          />

          {/* ADMIN LOGIN */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* PROTECTED ADMIN */}

          <Route element={<ProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/stories/new"
            element={<StoryEditor />}
          />

  <Route
    path="/admin/stories/edit/:id"
    element={<StoryEditor />}
  />
</Route>

        </Routes>
      </AnimatePresence>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <GrainOverlay />

      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { adminLogin } from "../../Utils/adminApi";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await adminLogin(email, password);

      if (!data.success || !data.token) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login failed:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <motion.div
        className="admin-login-container"
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >

        <div className="admin-login-heading">
          <p>30 LITTLE WORLDS</p>

          <h1>
            Welcome
            <br />
            back.
          </h1>

          <span>
            Author's private space
          </span>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Author email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <motion.p
              className="admin-login-error"
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            {loading
              ? "ENTERING..."
              : "ENTER THE STUDIO →"}
          </motion.button>

        </form>

        <p className="admin-login-note">
          This area is restricted to the author.
        </p>

      </motion.div>

    </main>
  );
}

export default AdminLogin;
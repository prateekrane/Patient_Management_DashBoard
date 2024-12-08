import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, AlertCircle, HeartPulse } from "lucide-react";

const VALID_CREDENTIALS = {
  username: "doctor123",
  password: "MedicalPro2024!",
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  //   const navigate = useNavigate(); // Hook from React Router to handle navigation

  const handleClick = () => {
    window.location.href = "/dashboard"; // Navigates to the '/dashboard' route
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === VALID_CREDENTIALS.username &&
      password === VALID_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (isAuthenticated) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, #008080, #ADD8E6, #D3D3D3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <HeartPulse
            style={{
              color: "#008080",
              margin: "0 auto",
              width: "64px",
              height: "64px",
            }}
          />
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#008080",
              margin: "16px 0",
            }}
          >
            Welcome, Dr. {username}
          </h2>
          <p style={{ color: "#4A5568", marginBottom: "24px" }}>
            You are now logged in to the medical dashboard
          </p>
          <motion.button
            onClick={handleClick} // Trigger navigation on click
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "linear-gradient(to right, #008080, #87CEEB)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
          >
            Enter Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(to right, #008080, #ADD8E6, #D3D3D3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <motion.div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          padding: "32px",
          borderRadius: "20px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <HeartPulse
            style={{
              color: "#008080",
              margin: "0 auto",
              width: "48px",
              height: "48px",
            }}
          />
          <h2
            style={{ fontSize: "32px", fontWeight: "bold", color: "#008080" }}
          >
            Medical Portal
          </h2>
          <p style={{ color: "#4A5568", marginTop: "8px", fontWeight: "300" }}>
            Secure Professional Login
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ position: "relative" }}>
            <User
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#008080",
              }}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "80%",
                padding: "12px 40px",
                borderRadius: "50px",
                backgroundColor: "rgba(240, 248, 255, 0.8)",
                border: "1px solid #D3D3D3",
                color: "#2D3748",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#008080",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "80%",
                padding: "12px 40px",
                borderRadius: "50px",
                backgroundColor: "rgba(240, 248, 255, 0.8)",
                border: "1px solid #D3D3D3",
                color: "#2D3748",
                fontSize: "16px",
              }}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#E53E3E",
                  backgroundColor: "#FED7D7",
                  padding: "12px",
                  borderRadius: "50px",
                  gap: "8px",
                }}
              >
                <AlertCircle style={{ width: "20px", height: "20px" }} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(to right, #008080, #87CEEB)",
              color: "white",
              padding: "12px",
              borderRadius: "50px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </motion.button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={() => console.log("Forgot Password clicked")}
            style={{
              color: "#4A5568",
              textDecoration: "underline",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

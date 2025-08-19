import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext.jsx";
import { PageHeader, Box, Button } from "@primer/react";
import "./auth.css";
import logo from "../../assets/gitub-mark-white.svg";

const Login = () => {
  const { currentUser, setcurrentUser } = useAuth(); // Access authentication context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setcurrentUser(null); // Reset state
  }, [setcurrentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      setcurrentUser(response.data.userId);

      setLoading(false);
      window.location.href = "/dashboard"; // redirect
    } catch (err) {
      setLoading(false);
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="GitHub Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <div className="login-box">
          <form onSubmit={handleLogin}>
            <div>
              <label className="label">Email address</label>
              <input
                autoComplete="off"
                name="Email"
                id="Email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="div">
              <label className="label">Password</label>
              <input
                autoComplete="off"
                name="Password"
                id="Password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ✅ Login Button */}
            <Button
              type="submit"
              variant="primary"
              sx={{ mt: 3, width: "100%" }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

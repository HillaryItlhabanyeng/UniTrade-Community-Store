import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./LoginPage.css";

import {
  FaEnvelope,
  FaLock,
  FaRegEye,
  FaRegEyeSlash,
  FaShieldAlt,
  FaUsers,
  FaLeaf,
  FaCommentDots,
  FaUserGraduate,
  FaStore,
  FaHome,
  FaBuilding,
} from "react-icons/fa";

type Role = "Student" | "Vendor" | "Resident" | "Faculty";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * ---------------------------------------------------------
   * LOAD REMEMBERED EMAIL
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("unitrade_remember_email");

    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * EMAIL VALIDATION
   * ---------------------------------------------------------
   */

  const isValidEmail = (value: string) => {
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(value);
  };

  /*
   * ---------------------------------------------------------
   * ROLE SELECTION
   * ---------------------------------------------------------
   */

  const handleRoleSelect = (role: Role) => {
    setSelectedRole((previousRole) =>
      previousRole === role ? null : role
    );
  };

  /*
   * ---------------------------------------------------------
   * LOGIN
   * ---------------------------------------------------------
   */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    /*
     * Validate email
     */
    if (!cleanEmail) {
      alert("Please enter your email address.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    /*
     * Validate password
     */
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    /*
     * If a role was selected, require it to be checked
     * against the user's actual profile.
     */
    if (!selectedRole) {
      alert("Please select how you want to login.");
      return;
    }

    try {
      setLoading(true);

      /*
       * -----------------------------------------------------
       * STEP 1: SIGN IN WITH SUPABASE AUTH
       * -----------------------------------------------------
       */

      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) {
        console.error("Login error:", loginError);

        const errorMessage = loginError.message.toLowerCase();

        if (
          errorMessage.includes("email not confirmed") ||
          errorMessage.includes("email_not_confirmed")
        ) {
          alert(
            "Please confirm your email address first. Check your inbox for the confirmation link."
          );
        } else if (
          errorMessage.includes("invalid login credentials") ||
          errorMessage.includes("invalid login")
        ) {
          alert("Incorrect email or password.");
        } else {
          alert(`Login failed: ${loginError.message}`);
        }

        return;
      }

      /*
       * Make sure Supabase actually returned a user.
       */
      const user = authData.user;

      if (!user) {
        alert("Unable to retrieve your account. Please try again.");
        return;
      }

      /*
       * -----------------------------------------------------
       * STEP 2: GET THE REAL PROFILE
       * -----------------------------------------------------
       */

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select(
          `
            id,
            full_name,
            email,
            phone,
            role,
            location,
            bio,
            avatar_url,
            favorite_brands,
            created_at,
            updated_at
          `
        )
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile loading error:", profileError);

        /*
         * If authentication succeeded but the profile doesn't exist,
         * sign the user out so they don't enter the application
         * with an incomplete account.
         */
        await supabase.auth.signOut();

        alert(
          "Your account was found, but your UniTrade profile could not be loaded. Please contact support."
        );

        return;
      }

      if (!profile) {
        await supabase.auth.signOut();

        alert(
          "Your UniTrade profile could not be found. Please contact support."
        );

        return;
      }

      /*
       * -----------------------------------------------------
       * STEP 3: CHECK THE USER'S ROLE
       * -----------------------------------------------------
       */

      if (profile.role !== selectedRole) {
        await supabase.auth.signOut();

        alert(
          `This account is registered as ${profile.role || "Community Member"}, not ${selectedRole}.`
        );

        return;
      }

      /*
       * -----------------------------------------------------
       * STEP 4: REMEMBER ME
       * -----------------------------------------------------
       */

      if (rememberMe) {
        localStorage.setItem(
          "unitrade_remember_email",
          cleanEmail
        );
      } else {
        localStorage.removeItem("unitrade_remember_email");
      }

      /*
       * -----------------------------------------------------
       * STEP 5: STORE PROFILE INFORMATION LOCALLY
       * -----------------------------------------------------
       *
       * This is NOT the database.
       * The database remains Supabase.
       *
       * This simply makes the profile information available
       * to other parts of your frontend if needed.
       */

      localStorage.setItem(
        "unitrade_user",
        JSON.stringify({
          id: profile.id,
          full_name: profile.full_name,
          email: profile.email,
          phone: profile.phone,
          role: profile.role,
          location: profile.location,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          favorite_brands: profile.favorite_brands,
        })
      );

      /*
       * -----------------------------------------------------
       * LOGIN SUCCESS
       * -----------------------------------------------------
       */

      navigate("/home");
    } catch (error) {
      console.error("Unexpected login error:", error);

      alert("Something went wrong while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * LOGOUT HELPER
   * ---------------------------------------------------------
   *
   * You can also use this later on your sidebar.
   */

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  return (
    <main className="login-page">

      {/* =====================================================
          LEFT PANEL
      ====================================================== */}

      <section className="login-left-panel">

        <img
          src="/image.png"
          alt="UniTrade Campus Marketplace"
          className="login-logo"
        />

        <h1>
          Welcome <span>Back</span>!
        </h1>

        <p className="welcome-text">
          Login to continue to
          <br />
          UniTrade Campus Marketplace.
        </p>

        <img
          src="/LoginPage.png"
          alt="Students using the UniTrade marketplace"
          className="login-illustration"
        />

        {/* FEATURES */}

        <div className="login-features">

          <div className="login-feature">
            <div className="login-feature-icon">
              <FaShieldAlt />
            </div>

            <span>
              Secure
              <br />
              Transactions
            </span>
          </div>

          <div className="login-feature">
            <div className="login-feature-icon">
              <FaUsers />
            </div>

            <span>
              Trusted
              <br />
              Community
            </span>
          </div>

          <div className="login-feature">
            <div className="login-feature-icon">
              <FaLeaf />
            </div>

            <span>
              Sustainable
              <br />
              Marketplace
            </span>
          </div>

          <div className="login-feature">
            <div className="login-feature-icon">
              <FaCommentDots />
            </div>

            <span>
              Community
              <br />
              Engagement
            </span>
          </div>

        </div>
      </section>

      {/* =====================================================
          RIGHT PANEL
      ====================================================== */}

      <section className="login-right-panel">

        <div className="login-form-container">

          <h2>Login</h2>

          <p className="login-subtitle">
            Access your account
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* =================================================
                EMAIL
            ================================================== */}

            <div className="login-input-group">

              <FaEnvelope />

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                aria-label="Email Address"
                autoComplete="email"
                disabled={loading}
              />

            </div>

            {/* =================================================
                PASSWORD
            ================================================== */}

            <div className="login-input-group">

              <FaLock />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                disabled={loading}
              >
                {showPassword ? (
                  <FaRegEyeSlash />
                ) : (
                  <FaRegEye />
                )}
              </button>

            </div>

            {/* =================================================
                FORGOT PASSWORD
            ================================================== */}

            <div className="forgot-password-row">

              <Link to="/reset-password">
                Forgot Password?
              </Link>

            </div>

            {/* =================================================
                REMEMBER ME
            ================================================== */}

            <div className="remember-me">

              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                disabled={loading}
              />

              <label htmlFor="rememberMe">
                Remember Me
              </label>

            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================== */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div className="or-divider">

            <span />

            <p>OR</p>

            <span />

          </div>

          {/* =================================================
              ROLE LOGIN
          ================================================== */}

          <p className="login-as-text">
            Login as:
          </p>

          <div className="role-options">

            {/* STUDENT */}

            <button
              type="button"
              className={`role-option ${
                selectedRole === "Student"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleRoleSelect("Student")
              }
              disabled={loading}
              aria-label="Login as student"
              aria-pressed={
                selectedRole === "Student"
              }
            >

              <FaUserGraduate />

              <span>
                Student
              </span>

            </button>

            {/* VENDOR */}

            <button
              type="button"
              className={`role-option ${
                selectedRole === "Vendor"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleRoleSelect("Vendor")
              }
              disabled={loading}
              aria-label="Login as vendor"
              aria-pressed={
                selectedRole === "Vendor"
              }
            >

              <FaStore />

              <span>
                Vendor
              </span>

            </button>

            {/* RESIDENT */}

            <button
              type="button"
              className={`role-option ${
                selectedRole === "Resident"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleRoleSelect("Resident")
              }
              disabled={loading}
              aria-label="Login as resident"
              aria-pressed={
                selectedRole === "Resident"
              }
            >

              <FaHome />

              <span>
                Resident
              </span>

            </button>

            {/* FACULTY */}

            <button
              type="button"
              className={`role-option ${
                selectedRole === "Faculty"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleRoleSelect("Faculty")
              }
              disabled={loading}
              aria-label="Login as faculty"
              aria-pressed={
                selectedRole === "Faculty"
              }
            >

              <FaBuilding />

              <span>
                Faculty
              </span>

            </button>

          </div>

          {/* =================================================
              SELECTED ROLE MESSAGE
          ================================================== */}

          {selectedRole && (
            <p className="selected-role-message">
              Selected role: <strong>{selectedRole}</strong>
            </p>
          )}

          {/* =================================================
              REGISTER
          ================================================== */}

          <p className="register-link">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </section>

    </main>
  );
};

export default LoginPage;
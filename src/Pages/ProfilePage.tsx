import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import SideNav from "../Components/SideNav";

import {
  FaArrowLeft,
  FaBell,
  FaCog,
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaTrash,
  FaCamera,
} from "react-icons/fa";

import { supabase } from "../lib/supabaseClient";

import "./ProfilePage.css";

/* ========================= TYPES ========================= */

type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatar_url: string;
};

/* ==================== FAVOURITE BRANDS ====================
   Files must be located at:
   public/assets/adidas.png
   public/assets/puma.png
   public/assets/nike.png
============================================================ */

const FAVOURITE_BRANDS = [
  { name: "adidas", image: "/assets/adidas.png" },
  { name: "PUMA", image: "/assets/puma.png" },
  { name: "NIKE", image: "/assets/nike.png" },
];

/* ===================== EMPTY PROFILE ===================== */

const EMPTY_PROFILE: Profile = {
  id: "",
  full_name: "Community User",
  email: "",
  phone: "Not provided",
  location: "Not provided",
  role: "Community Member",
  avatar_url: "",
};

/* ====================== PROFILE PAGE ===================== */

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [rating] = useState(3);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  /* ======================= LOAD PROFILE ======================= */

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Get logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Authentication error:", userError);
        setMessage("Unable to load your account.");
        return;
      }

      if (!user) {
        navigate("/login");
        return;
      }

      // Get profile
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, location, role, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Profile loading error:", error);
        setMessage("Unable to load your profile.");
        return;
      }

      // Create profile if it doesn't exist
      if (!data) {
        const metadata = user.user_metadata ?? {};

        const fullName =
          typeof metadata.full_name === "string" && metadata.full_name.trim()
            ? metadata.full_name.trim()
            : "Community User";

        const phone =
          typeof metadata.phone === "string" && metadata.phone.trim()
            ? metadata.phone
            : "Not provided";

        const role =
          typeof metadata.role === "string" && metadata.role.trim()
            ? metadata.role
            : "Community Member";

        const newProfile: Profile = {
          id: user.id,
          full_name: fullName,
          email: user.email ?? "",
          phone,
          location: "Not provided",
          role,
          avatar_url: "",
        };

        const { error: createError } = await supabase
          .from("profiles")
          .insert(newProfile);

        if (createError) {
          console.error("Profile creation error:", createError);
          setMessage("Your profile could not be created.");
          return;
        }

        setProfile(newProfile);
        return;
      }

      // Profile exists
      setProfile({
        id: data.id,
        full_name: data.full_name || "Community User",
        email: data.email || user.email || "",
        phone: data.phone || "Not provided",
        location: data.location || "Not provided",
        role: data.role || "Community Member",
        avatar_url: data.avatar_url || "",
      });
    } catch (error) {
      console.error("Unexpected profile error:", error);
      setMessage("Something went wrong loading your profile.");
    } finally {
      setLoading(false);
    }
  };

  /* ===================== OPEN FILE PICKER ===================== */

  const handleChooseProfilePicture = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  /* ================= UPLOAD PROFILE PICTURE ================= */

  const handleProfilePictureChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      event.target.value = "";
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage("Please choose an image smaller than 5MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to change your profile picture.");
        return;
      }

      // ONE fixed file path so old images don't accumulate
      const filePath = `${user.id}/profile`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        setMessage(`Image upload failed: ${uploadError.message}`);
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(filePath);

      const avatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

      // Save URL in profiles table
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id);

      if (updateError) {
        console.error("Profile update error:", updateError);
        setMessage(`Could not save profile picture: ${updateError.message}`);
        return;
      }

      // Update screen immediately
      setProfile((previous) => ({ ...previous, avatar_url: avatarUrl }));
      setMessage("Profile picture updated successfully.");
    } catch (error) {
      console.error("Profile picture error:", error);
      setMessage("Something went wrong uploading the image.");
    } finally {
      setUploading(false);

      // Allow user to select the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  /* ================= REMOVE PROFILE PICTURE ================= */

  const handleRemoveProfilePicture = async () => {
    try {
      setUploading(true);
      setMessage("");

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      // Remove file from Storage
      const { error: removeError } = await supabase.storage
        .from("profile-images")
        .remove([`${user.id}/profile`]);

      if (removeError) {
        console.error("Storage remove error:", removeError);
        // Continue: the database should still be cleared.
      }

      // Clear database URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: "" })
        .eq("id", user.id);

      if (updateError) {
        console.error("Profile remove error:", updateError);
        setMessage(`Could not remove profile picture: ${updateError.message}`);
        return;
      }

      // Update screen
      setProfile((previous) => ({ ...previous, avatar_url: "" }));
      setMessage("Profile picture removed.");
    } catch (error) {
      console.error("Remove profile picture error:", error);
      setMessage("Something went wrong removing the picture.");
    } finally {
      setUploading(false);
    }
  };

  /* ====================== OTHER HANDLERS ====================== */

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    alert("Edit Profile coming soon.");
  };

  const handleMyProducts = () => {
    navigate("/my-listings");
  };

  const handleSettings = () => {
    alert("Settings coming soon.");
  };

  const handleNotifications = () => {
    alert("Notifications coming soon.");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmed) {
      alert("Account deletion would be processed here.");
    }
  };

  /* ====================== PROFILE IMAGE ====================== */

  const renderProfileImage = (className: string, fallbackClassName: string) => {
    if (profile.avatar_url) {
      return (
        <img
          src={profile.avatar_url}
          alt={`${profile.full_name} profile`}
          className={className}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return (
      <span className={fallbackClassName}>
        {profile.full_name.charAt(0).toUpperCase()}
      </span>
    );
  };

  /* ========================= LOADING ========================= */

  if (loading) {
    return (
      <div className="profile-page">
        <SideNav />

        <div className="profile-page-content">
          <main className="profile-main">
            <div className="profile-loading">Loading profile...</div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================== PAGE =========================== */

  return (
    <div className="profile-page">
      {/* SIDE NAVIGATION */}
      <SideNav />

      {/* CONTENT */}
      <div className="profile-page-content">
        <main className="profile-main">
          {/* TOP BAR */}
          <header className="profile-topbar">
            <button
              type="button"
              className="profile-back-button"
              onClick={handleBack}
            >
              <FaArrowLeft />
              <span>Profile</span>
            </button>

            <div className="profile-top-actions">
              {/* NOTIFICATIONS */}
              <button
                type="button"
                aria-label="Notifications"
                onClick={handleNotifications}
                className="profile-action-button"
              >
                <FaBell />
                <span className="notification-dot" />
              </button>

              {/* SETTINGS */}
              <button
                type="button"
                aria-label="Settings"
                onClick={handleSettings}
                className="profile-action-button"
              >
                <FaCog />
              </button>

              {/* PROFILE AVATAR */}
              <button
                type="button"
                className="top-avatar"
                onClick={() => navigate("/profile")}
                aria-label="Open profile"
              >
                {renderProfileImage("top-avatar-image", "profile-image-fallback")}
              </button>
            </div>
          </header>

          {/* BANNER */}
          <section className="profile-banner">
            <button
              type="button"
              className="edit-profile-button"
              onClick={handleEditProfile}
            >
              <FaEdit />
              <span>Edit Profile</span>
            </button>
          </section>

          {/* PROFILE CONTENT */}
          <div className="profile-content">
            {/* LEFT PROFILE CARD */}
            <section className="profile-card">
              {/* PROFILE PHOTO */}
              <div className="profile-photo-wrapper">
                {renderProfileImage("profile-photo", "profile-photo-fallback")}

                {/* CAMERA BUTTON */}
                <button
                  type="button"
                  className="profile-camera-button"
                  onClick={handleChooseProfilePicture}
                  disabled={uploading}
                  aria-label="Change profile picture"
                  title="Change profile picture"
                >
                  <FaCamera />
                </button>
              </div>

              {/* HIDDEN FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleProfilePictureChange}
                className="profile-file-input"
              />

              {/* NAME */}
              <h1 className="profile-user-name">{profile.full_name}</h1>

              {/* ROLE */}
              <p className="profile-role">{profile.role}</p>

              {/* BIO */}
              <p className="profile-bio">
                Welcome to UniTrade. Buy and sell goods and services within your
                community.
              </p>

              {/* IMAGE CONTROLS */}
              <div className="profile-image-controls">
                <button
                  type="button"
                  className="profile-image-button"
                  onClick={handleChooseProfilePicture}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Change Photo"}
                </button>

                {profile.avatar_url && (
                  <button
                    type="button"
                    className="profile-image-remove-button"
                    onClick={handleRemoveProfilePicture}
                    disabled={uploading}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* MESSAGE */}
              {message && <p className="profile-message">{message}</p>}

              {/* RATING */}
              <div className="product-ranking">
                <h2>Your Product Rankings</h2>

                <div
                  className="ranking-stars"
                  aria-label={`${rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < rating
                          ? "ranking-star ranking-star-filled"
                          : "ranking-star"
                      }
                    />
                  ))}
                </div>

                <span className="rating-text">{rating}.0 / 5.0</span>
              </div>

              {/* MY PRODUCTS */}
              <button
                type="button"
                className="my-products-button"
                onClick={handleMyProducts}
              >
                My Products
              </button>

              {/* DELETE ACCOUNT */}
              <button
                type="button"
                className="delete-account-button"
                onClick={handleDeleteAccount}
              >
                <FaTrash />
                <span>Delete Account</span>
              </button>
            </section>

            {/* RIGHT COLUMN */}
            <div className="profile-right">
              {/* DETAILS CARD */}
              <section className="details-card">
                <div className="profile-section-heading">
                  <h2>My Details</h2>

                  <button
                    type="button"
                    className="settings-button"
                    aria-label="Profile settings"
                    onClick={handleSettings}
                  >
                    <FaCog />
                  </button>
                </div>

                <div className="details-list">
                  {/* PHONE */}
                  <div className="detail-row">
                    <FaPhone className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{profile.phone}</span>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="detail-row">
                    <FaMapMarkerAlt className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">{profile.location}</span>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="detail-row">
                    <FaEnvelope className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{profile.email}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAVOURITE BRANDS */}
              <section className="brands-card">
                <div className="brands-heading">
                  <h2>Favourite Brands</h2>
                </div>

                <div className="brands-row">
                  {FAVOURITE_BRANDS.map((brand) => (
                    <div className="brand-logo" key={brand.name}>
                      <img
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* PROFILE INFORMATION */}
              <section className="profile-info-card">
                <div className="info-item">
                  <strong>Member since</strong>
                  <span>{new Date().getFullYear()}</span>
                </div>

                <div className="info-divider" />

                <div className="info-item">
                  <strong>Products listed</strong>
                  <span>0</span>
                </div>

                <div className="info-divider" />

                <div className="info-item">
                  <strong>Reviews received</strong>
                  <span>0</span>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
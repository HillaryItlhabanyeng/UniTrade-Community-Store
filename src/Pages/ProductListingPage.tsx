// ProductListingPage.js
import "./ProductListingPage.css";
import Navbar from "../Components/Navbar";
import {useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaTimes, } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ImageUploader from "../Components/ImageUploader";

function ProductListingPage() {

  const [productsOpen, setProductsOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const listingData = location.state || {};

  const [formData, setFormData] = useState({
    id: listingData.id || 1,
    name: listingData.name || "",
    vehicle: listingData.vehicle || "",
    price: listingData.price || "",
    image: listingData.image || "",
    views: listingData.views || 0,
    likes: listingData.likes || 0,
    description: listingData.description || "",
    category: listingData.category || "",
    condition: listingData.condition || "",
    year: listingData.year || "",
    location: listingData.location || "",
    gender: listingData.gender || "",
    quantity: listingData.quantity || "",
    isActive: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   // Here you would typically make an API call to save the changes
  //   console.log("Saving changes:", formData);
  //   setIsEditing(false);
  //   // Show success message or navigate back
  //   alert("Listing updated successfully!");
  //   navigate("/my-listing");
  // };

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/my-listing");
      }
    } else {
      navigate("/my-listing");
    }
  };

  return (
    <div className="productListingContainer">
      <Navbar />

      {/* Main Content */}
      <section className="mainContent">

        {/* ======================================================== picture form3======================================== */}

        <div className="editForm3">
          <div>
            <h3 className="create-listing">Upload Images</h3>

            <ImageUploader />

          </div>
        </div>

        {/* =========================================================Edit Form================================================ */}
        <div className="editForm">

          {/* Image Upload Section */}
          <div className="imageSection">
          </div>

          {/* Form Fields */}
          <div className="formFields">
            <h2 className="General-information">General Information</h2>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Books & Media">Books & Media</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture </option>
                  <option value="Garden">Garden</option>
                  <option value="Home Essentials">Home Essentials</option>
                  <option value="Jewelry & Watches">Jewelry & Watches</option>
                  <option value="Musical Instruments">Musical Instruments</option>
                  <option value="Office Supplies">Office Supplies </option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                  <option value="Tools & Equipment">Tools & Equipment</option>
                  <option value="Toys & Games">Toys & Games</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Other">Other</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </div>
            </div>

            <div className="formRow">

              
            </div>

            <div className="formGroup fullWidth">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the product in detail..."
                rows={5}
              />
            </div>

            {/* Action Buttons */}
            <div className="actionButtons">
              <div className="rightActions">
              </div>
            </div>

          </div>
        </div>

        {/* ==============================form2======================================== */}
        <div className="editForm2">

          {/* Image Upload Section */}
          <div className="imageSection">
          </div>

          {/* Form Fields */}
          <div className="formFields">
            <h2 className="price-stock">Pricing & Stock</h2>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="price">Price (R) *</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., R850"
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 20"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="actionButtons">
              <div className="rightActions">
                <button className="btnCancel" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <button
                  className={`btnSave ${!isEditing ? 'disabled' : ''}`}
                  // onClick={handleSave}
                  disabled={!isEditing}
                >
                  List Product
                </button>
              </div>
            </div>

      </section>
    </div>
  );
}

export default ProductListingPage;
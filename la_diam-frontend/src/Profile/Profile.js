import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../BackendCalls/getters";
import { updateProfile } from "../BackendCalls/posters";
import { UserContext } from "../UserContext";
import { FormGroup } from "reactstrap";
//import "./ProfileForm.css";
import Exemplo from "./Exemplo";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    old_password: "",
  });
  const [originalAccountDetails, setOriginalAccountDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { user, editUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    } 
    if (user) {
      fetchProfile().then((data) => {
        setProfile(data);
      });

      const details = {
        username: user.username || "",
        email: user.email || "",
        password: "",
        confirm_password: "",
        old_password: "",
      };

      setAccountDetails(details);
      setOriginalAccountDetails(details);
    }
  }, [user]);


  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    // If the password field is filled, make sure confirm password is provided
    if (
      accountDetails.password &&
      accountDetails.password !== accountDetails.confirm_password
    ) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const { success } = await editUser(accountDetails);
      if (success) {
        alert("Account updated");
        setOriginalAccountDetails(accountDetails); // Save updated values
        setIsEditing(false);
      } else {
        alert("Account update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Account update failed");
    }
  };

  const handleCancelEdit = () => {
    setAccountDetails(originalAccountDetails);
    setIsEditing(false);
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleAccountSubmit}>
        <h4>Account Information</h4>
        <Exemplo
          label="username"
          value={accountDetails.username}
          onChange={handleAccountChange}
          isDisabled={!isEditing}
        />
        <Exemplo
          label="email"
          value={accountDetails.email}
          onChange={handleAccountChange}
          isDisabled={!isEditing}
        />

        {isEditing && (
          <>
            <FormGroup>
              <label>New Password:</label>
              <input
                type="password"
                name="password"
                value={accountDetails.password}
                onChange={handleAccountChange}
              />
            </FormGroup>

            {accountDetails.password && (
              <FormGroup>
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={accountDetails.confirm_password}
                  onChange={handleAccountChange}
                  required
                />
              </FormGroup>
            )}

            <FormGroup>
              <label>Old Password:</label>
              <input
                type="password"
                name="old_password"
                value={accountDetails.old_password}
                onChange={handleAccountChange}
                required
              />
            </FormGroup>
          </>
        )}

        <FormGroup>
          {isEditing ? (
            <>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit Account Info
            </button>
          )}
        </FormGroup>
      </form>

      <form onSubmit={handleProfileSubmit}>
        <h4>Profile Information</h4>

        <FormGroup>
          <label>Full Name:</label>
          <input
            name="full_name"
            value={profile.full_name || ""}
            onChange={handleProfileChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Phone Number:</label>
          <input
            name="phone_number"
            value={profile.phone_number || ""}
            onChange={handleProfileChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Address:</label>
          <textarea
            name="address"
            value={profile.address || ""}
            onChange={handleProfileChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Gender:</label>
          <select
            name="gender"
            value={profile.gender || ""}
            onChange={handleProfileChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth || ""}
            onChange={handleProfileChange}
          />
        </FormGroup>

        <FormGroup className="switch-group">
          <label htmlFor="subscribed_to_newsletter">
            Subscribed to Newsletter:
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="subscribed_to_newsletter"
              name="subscribed_to_newsletter"
              checked={profile.subscribed_to_newsletter || false}
              onChange={handleProfileChange}
            />
            <span className="slider round"></span>
          </label>
        </FormGroup>

        <FormGroup>
          <button type="submit">Update Profile Info</button>
        </FormGroup>
      </form>
    </div>
  );
};

export default ProfileForm;

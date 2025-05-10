import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../BackendCalls/getters";
import { updateProfile } from "../BackendCalls/posters";
import { UserContext } from "../UserContext";
import { FormGroup } from "reactstrap";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
    password: "",
    old_password: "",
  });
  const { user, editUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);
  
  // Load profile and account details once user is available
  useEffect(() => {
    if (user) {
      fetchProfile().then((data) => {
        setProfile(data);
      });
  
      setAccountDetails((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
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
    try {
      const { success } = await editUser(accountDetails);
      if (success) {
        alert("Account updated");
      } else {
        alert("Account update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Account update failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleAccountSubmit}>
        <h4>Account Information</h4>
        <FormGroup>
          <label>Username:</label>
          <input
            name="username"
            value={accountDetails.username}
            onChange={handleAccountChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={accountDetails.email}
            onChange={handleAccountChange}
          />
        </FormGroup>
        <FormGroup>
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={accountDetails.password}
            onChange={handleAccountChange}
          />
        </FormGroup>
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
        <FormGroup>
          <button type="submit">Update Account Info</button>
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
        <FormGroup>
          <label>Subscribed to Newsletter:</label>
          <input
            type="checkbox"
            name="subscribed_to_newsletter"
            checked={profile.subscribed_to_newsletter || false}
            onChange={handleProfileChange}
          />
        </FormGroup>
        <FormGroup>
          <button type="submit">Update Profile Info</button>
        </FormGroup>
      </form>
    </div>
  );
};

export default ProfileForm;

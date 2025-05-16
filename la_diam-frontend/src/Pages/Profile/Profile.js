import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../BackendCalls/getters";
import { updateProfile } from "../../BackendCalls/putters";
import { UserContext } from "../../UserContext";
import "./Profile.css";
import ProfileFieldsForm from "./ProfileForm";
import UserForm from "./UserForm";

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
      alert("You need to be logged in to access the profile page.");
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

  const handleAccountSubmit = async (formData) => {
  if (
    formData.password &&
    formData.password !== formData.confirm_password
  ) {
    alert("New passwords do not match.");
    return;
  }

  try {
    const { success } = await editUser(formData);
    if (success) {
      alert("Account updated");
      setOriginalAccountDetails(formData);
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
      <UserForm
        initialData={accountDetails}
        onSubmit={handleAccountSubmit}
        editMode={isEditing}
        setEditMode={setIsEditing}
        onCancel={handleCancelEdit}
      />
      <form onSubmit={handleProfileSubmit}>
        <ProfileFieldsForm
          profile={profile}
          onChange={handleProfileChange}
        />
        <button type="submit">Update Profile Info</button>
      </form>
    </div>
  );
};

export default ProfileForm;

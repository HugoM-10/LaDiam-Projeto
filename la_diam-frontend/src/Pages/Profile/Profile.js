import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../BackendCalls/getters";
import { updateProfile } from "../../BackendCalls/putters";
import { UserContext } from "../../UserContext";
import "./Profile.css";
import ProfileFieldsForm from "./ProfileForm";
import UserForm from "./UserForm";
import { Modal, Button } from "react-bootstrap";

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

  // Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Aviso");

  useEffect(() => {
    if (user === null) {
      setModalTitle("Atenção");
      setModalMsg("You need to be logged in to access the profile page.");
      setModalShow(true);
      setTimeout(() => {
        setModalShow(false);
        navigate("/");
      }, 1800);
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
  }, [user, navigate]);

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
      setModalTitle("Sucesso");
      setModalMsg("Profile updated");
      setModalShow(true);
    } catch (err) {
      console.error(err);
      setModalTitle("Erro");
      setModalMsg("Profile update failed");
      setModalShow(true);
    }
  };

  const handleAccountSubmit = async (formData) => {
    if (
      formData.password &&
      formData.password !== formData.confirm_password
    ) {
      setModalTitle("Erro");
      setModalMsg("New passwords do not match.");
      setModalShow(true);
      return;
    }

    try {
      const { success } = await editUser(formData);
      if (success) {
        setModalTitle("Sucesso");
        setModalMsg("Account updated");
        setModalShow(true);
        setOriginalAccountDetails(formData);
        setIsEditing(false);
      } else {
        setModalTitle("Erro");
        setModalMsg("Account update failed");
        setModalShow(true);
      }
    } catch (err) {
      console.error(err);
      setModalTitle("Erro");
      setModalMsg("Account update failed");
      setModalShow(true);
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
      {/* Modal para mensagens */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileForm;

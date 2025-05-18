import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../BackendCalls/getters";
import { updateProfile } from "../../BackendCalls/putters";
import { UserContext } from "../../UserContext";
import ProfileFieldsForm from "./ProfileForm";
import UserForm from "./UserForm";
import CustomModal from "../../Components/Modal";
import { Container, Card, Button, Form } from "react-bootstrap";

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
  const getProfileData = async () => {
    if (user === null) {
      setModalTitle("Atenção");
      setModalMsg("You need to be logged in to access the profile page.");
      setModalShow(true);
      setTimeout(() => {
        setModalShow(false);
        navigate("/");
      }, 1800);
      return; // early return
    }

    if (user) {
      try {
        const data = await fetchProfile();
        setProfile(data);

        const details = {
          username: user.username || "",
          email: user.email || "",
          password: "",
          confirm_password: "",
          old_password: "",
        };

        setAccountDetails(details);
        setOriginalAccountDetails(details);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setModalTitle("Erro");
        setModalMsg("Failed to fetch profile data.");
        setModalShow(true);
        setTimeout(() => {
          setModalShow(false);
          navigate("/");
        }, 1800);
      }
    }
  };

  getProfileData();
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
    if (formData.password && formData.password !== formData.confirm_password) {
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
    <Container className="my-4 d-flex justify-content-center">
      <Card
        style={{ width: "100%", maxWidth: "800px" }}
        className="p-4 shadow-sm"
      >
        <Card.Body>
          <UserForm
            initialData={accountDetails}
            onSubmit={handleAccountSubmit}
            editMode={isEditing}
            setEditMode={setIsEditing}
            onCancel={handleCancelEdit}
          />

          <Form onSubmit={handleProfileSubmit} className="mt-4">
            <ProfileFieldsForm
              profile={profile}
              onChange={handleProfileChange}
            />
            <div className="mt-3">
              <Button variant="primary" type="submit">
                Atualizar Informações do Perfil
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalTitle={modalTitle}
        modalMsg={modalMsg}
      />
    </Container>
  );
};

export default ProfileForm;

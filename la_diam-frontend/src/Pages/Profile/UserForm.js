import React, { useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import CustomModal from "../../Components/Modal";
import PropTypes from "prop-types";

const UserForm = ({
  initialData,
  onSubmit,
  editMode,
  setEditMode,
  onCancel,
}) => {
  const [data, setData] = useState(initialData);

  // Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Aviso");

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (data.password && data.password !== data.confirm_password) {
      setModalTitle("Erro");
      setModalMsg("New passwords do not match.");
      setModalShow(true);
      return;
    }

    onSubmit(data);
  };

  const handleCancelClick = () => {
    setData(initialData);
    onCancel?.();
  };

  return (
<>
  <Form onSubmit={handleFormSubmit}>
    <h4 className="mb-3">Account Information</h4>

    <FormGroup className="mb-3">
      <FormLabel>Username:</FormLabel>
      <FormControl
        type="text"
        name="username"
        value={data.username}
        onChange={handleChange}
        disabled={!editMode}
      />
    </FormGroup>

    <FormGroup className="mb-3">
      <FormLabel>Email:</FormLabel>
      <FormControl
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        disabled={!editMode}
      />
    </FormGroup>

    {editMode && (
      <>
        <FormGroup className="mb-3">
          <FormLabel>New Password:</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={data.password || ""}
            onChange={handleChange}
          />
        </FormGroup>

        {data.password && (
          <FormGroup className="mb-3">
            <FormLabel>Confirm New Password:</FormLabel>
            <FormControl
              type="password"
              name="confirm_password"
              value={data.confirm_password || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>
        )}

        <FormGroup className="mb-3">
          <FormLabel>Old Password:</FormLabel>
          <FormControl
            type="password"
            name="old_password"
            value={data.old_password || ""}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </>
    )}

    <FormGroup className="mt-4 d-flex gap-2">
      {editMode ? (
        <>
          <Button variant="success" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="button" onClick={handleCancelClick}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="primary" type="button" onClick={() => setEditMode(true)}>
          Edit Account Info
        </Button>
      )}
    </FormGroup>
  </Form>

  <CustomModal
    show={modalShow}
    onHide={() => setModalShow(false)}
    modalTitle={modalTitle}
    modalMsg={modalMsg}
  />
</>
  );
};
UserForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default UserForm;

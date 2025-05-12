import React from "react";
import { FormGroup } from "reactstrap";

const UserForm = ({
  initialData,
  onSubmit,
  editMode,
  setEditMode,
  onCancel,
}) => {
  const [data, setData] = React.useState(initialData);

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
      alert("New passwords do not match.");
      return;
    }

    onSubmit(data);
  };

  const handleCancelClick = () => {
    setData(initialData);
    onCancel?.();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Account Information</h4>

      <FormGroup>
        <label>username:</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          disabled={!editMode}
        />
      </FormGroup>

      <FormGroup>
        <label>email:</label>
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
          disabled={!editMode}
        />
      </FormGroup>

      {editMode && (
        <>
          <FormGroup>
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={data.password || ""}
              onChange={handleChange}
            />
          </FormGroup>

          {data.password && (
            <FormGroup>
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirm_password"
                value={data.confirm_password || ""}
                onChange={handleChange}
                required
              />
            </FormGroup>
          )}

          <FormGroup>
            <label>Old Password:</label>
            <input
              type="password"
              name="old_password"
              value={data.old_password || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </>
      )}

      <FormGroup>
        {editMode ? (
          <>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setEditMode(true)}>
            Edit Account Info
          </button>
        )}
      </FormGroup>
    </form>
  );
};

export default UserForm;

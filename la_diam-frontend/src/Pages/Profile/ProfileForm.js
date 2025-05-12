import { FormGroup } from "reactstrap";

const ProfileFieldsForm = ({ profile, onChange }) => {
  return (
    < div className="profile-fields-form">
      <h4>Profile Information</h4>

      <FormGroup>
        <label>Full Name:</label>
        <input
          name="full_name"
          value={profile.full_name || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Phone Number:</label>
        <input
          name="phone_number"
          value={profile.phone_number || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Address:</label>
        <textarea
          name="address"
          value={profile.address || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Gender:</label>
        <select
          name="gender"
          value={profile.gender || ""}
          onChange={onChange}
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
          onChange={onChange}
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
            onChange={onChange}
          />
          <span className="slider round"></span>
        </label>
      </FormGroup>
    </ div>
  );
};


export default ProfileFieldsForm;

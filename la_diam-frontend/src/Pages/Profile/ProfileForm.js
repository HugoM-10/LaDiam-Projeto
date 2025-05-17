import { Form, FormGroup, FormLabel, FormControl, FormSelect, FormCheck } from 'react-bootstrap';

const ProfileFieldsForm = ({ profile, onChange }) => {
return (
  <div className="profile-fields-form">
    <h4>Informação do Perfil</h4>

    <Form>
      <FormGroup className="mb-3">
        <FormLabel>Nome completo:</FormLabel>
        <FormControl
          type="text"
          name="full_name"
          value={profile.full_name || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Numero de telefone:</FormLabel>
        <FormControl
          type="text"
          name="phone_number"
          value={profile.phone_number || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Morada:</FormLabel>
        <FormControl
          as="textarea"
          name="address"
          value={profile.address || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Género:</FormLabel>
        <FormSelect
          name="gender"
          value={profile.gender || ""}
          onChange={onChange}
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </FormSelect>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Data de nascimento:</FormLabel>
        <FormControl
          type="date"
          name="dateOfBirth"
          value={profile.dateOfBirth || ""}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormCheck
          type="switch"
          id="subscribed_to_newsletter"
          name="subscribed_to_newsletter"
          label="Subscrição da Newsletter"
          checked={profile.subscribed_to_newsletter || false}
          onChange={onChange}
        />
      </FormGroup>
    </Form>
  </div>
);
};


export default ProfileFieldsForm;

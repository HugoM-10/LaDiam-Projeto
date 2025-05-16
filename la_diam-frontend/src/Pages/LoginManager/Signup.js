import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../BackendCalls/putters";
import { FormGroup } from "reactstrap";
import ProfileFieldsForm from "../Profile/ProfileForm";
import { UserContext } from "../../UserContext";

const SignupForm = () => {
  const {user, signup}= useContext(UserContext);
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [profile, setProfile] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    gender: "",
    dateOfBirth: null,
    subscribed_to_newsletter: false,
  });

  const [error, setError] = useState("");

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(user){
      setError("You are already logged in.");
      return;
    }
    if (accountDetails.password !== accountDetails.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    if (!accountDetails.username || !accountDetails.email || !accountDetails.password) {
      setError("Password, email, and username are required.");
      return;
    }

    try {
      const result = await signup(
        accountDetails.username,
        accountDetails.email,
        accountDetails.password,
        
      );

      if (result.success) {
        await updateProfile(profile);
        navigate("/");
      } else {
        setError("Signup failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during signup.");
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit}>
        <h4>Create Account</h4>

        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}

        <FormGroup>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={accountDetails.username}
            onChange={handleAccountChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={accountDetails.email}
            onChange={handleAccountChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={accountDetails.password}
            onChange={handleAccountChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            value={accountDetails.confirm_password}
            onChange={handleAccountChange}
          />
        </FormGroup>

        <ProfileFieldsForm
          profile={profile}
          onChange={handleProfileChange}
        />

        <FormGroup>
          <button type="submit">Signup</button>
        </FormGroup>
      </form>
    </div>
  );
};

export default SignupForm;

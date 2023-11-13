import React, {useState} from "react";
import {Navigate} from "react-router-dom"; // Import Navigate
import "./Signup.css";

function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        password: "",
        cpassword: "",
        email: "",
        dateOfBirth: "",
        profileImage: null
    });

    const [redirectToHome, setRedirectToHome] = useState(false); // State to manage redirection

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({...prevData, profileImage: file}));
    };

    const handleSubmit = () => {
        console.log("Form data submitted:", formData);
        setRedirectToHome(true); // Set redirection to true after your logic
    };

    if (redirectToHome) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <div className="image-upload">
                <label htmlFor="profileImage">
                    <div className="placeholder-image"></div>
                </label>
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleImageChange}
                    hidden
                />
                <span>Upload Picture</span>
            </div>
            <input
                className="input-container"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
            />
            <input
                className="input-container"
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                className="input-container"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                className="input-container"
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
            />
            <input
                className="input-container"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                className="input-container"
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
            />
            <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
        </div>
    );
}

export default SignUp;

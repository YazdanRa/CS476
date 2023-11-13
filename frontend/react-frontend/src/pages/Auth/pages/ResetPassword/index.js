import React, { useState } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';

import './styles.css';


function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState(undefined);
    const [auth_code, setAuthCode] = useState(undefined);
    const [new_password, setNewPassword] = useState(undefined);

    const formik = useFormik({
        initialValues: {
            email: email,
            auth_code: auth_code,
            new_password: new_password
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address'),
            auth_code: Yup.string().length(8),
            new_password: Yup.string()

        }),
        onSubmit: values => {
            // TODO: send reset code to email
        }
    });



    const handleSendCode = () => {
        console.log('Sending reset code to:', email);
    };

    return (
        <div className="reset-container">
            <h1>Reset Password</h1>
            <p>Please enter your email and a new password will be sent to your email.</p>
            <div className="email-wrapper">
                <input
                    className="email-container"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <button className="send-code-button" onClick={handleSendCode}>Send Code</button>
        </div>
    );
}

export default ResetPassword;

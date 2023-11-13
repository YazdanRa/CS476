import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Input, notification, Typography} from "antd";
import {useFormik} from "formik";
import * as Yup from 'yup';

import {ResetPasswordRequest, ResetPasswordVerify} from "../../../../services/auth";

import './styles.css';

const FormSchema = Yup.object({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('This field is required'),
    auth_code: Yup.string()
        .length(6, 'Code must be exactly 6 characters'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
        .equals([Yup.ref('password')], 'Passwords must match')
})

const initialValues = {
    email: undefined,
    auth_code: undefined,
    new_password: undefined,
    confirm_new_password: undefined
}

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const [auth_requested, setAuthRequested] = useState(false);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: FormSchema,
        onSubmit: values => {
            if (!auth_requested) {
                _handleSendCode(values);
                setAuthRequested(true);
            } else {
                _handleChangePassword(values);
            }
        }
    });


    const _handleSendCode = (values) => {
        ResetPasswordRequest({email: values.email})
            .then(
                (result) => {
                    const {message} = result;
                    notification.success({message: message});
                })
            .catch((err) => {
                notification.error({message: 'Something went wrong!'});
            })
    };

    const _handleChangePassword = (values) => {
        ResetPasswordVerify(values)
            .then((result) => {
                const {message} = result;
                console.log(result);
                notification.success({message: "Password changed successfully"});
                navigate("/auth/login");
            })
            .catch((err) => {
                notification.error({message: 'Something went wrong!'});
            })

    };

    return (
        <div className="reset-container">
            <h1>Reset Password</h1>
            <p>Please enter your email to reset the password.</p>

            <div className="email-wrapper">
                <Input
                    className="email-container"
                    type="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={e => formik.setFieldValue("email", e.target.value)}
                    onBlur={() => formik.setFieldTouched("email", true)}
                    status={formik.errors.email && formik.touched.email ? "error" : undefined}
                    disabled={auth_requested}
                />
                {formik.errors.email && formik.touched.email && (
                    <Typography.Text type="danger">
                        {formik.errors.email}
                    </Typography.Text>
                )}
            </div>

            {auth_requested && (

                <>
                    <p>
                        An authentication code has been sent to your email. Please enter the code below.
                    </p>
                    <div className="email-wrapper">
                        <Input
                            type="text"
                            placeholder="Auth Code"
                            value={formik.values.auth_code}
                            onChange={e => formik.setFieldValue("auth_code", e.target.value)}
                            onBlur={() => formik.setFieldTouched("auth_code", true)}
                        />
                        {formik.errors.auth_code && formik.touched.auth_code && (
                            <Typography.Text type="danger">
                                {formik.errors.auth_code}
                            </Typography.Text>
                        )}
                    </div>

                    <div className="email-wrapper">
                        <Input.Password
                            type="pass"
                            placeholder="New Password"
                            value={formik.values.new_password}
                            onChange={e => formik.setFieldValue("new_password", e.target.value)}
                            onBlur={() => formik.setFieldTouched("new_password", true)}
                        />
                        {formik.errors.new_password && formik.touched.new_password && (
                            <Typography.Text type="danger">
                                {formik.errors.new_password}
                            </Typography.Text>
                        )}
                    </div>

                    <div className="email-wrapper">
                        <Input.Password
                            className="email-container"
                            type="text"
                            placeholder="Confirm New Password"
                            onChange={e => formik.setFieldValue("confirm_new_password", e.target.value)}
                            onBlur={() => formik.setFieldTouched("confirm_new_password", true)}
                        />
                        {formik.errors.confirm_new_password && formik.touched.confirm_new_password && (
                            <Typography.Text type="danger">
                                {formik.errors.confirm_new_password}
                            </Typography.Text>
                        )}
                    </div>
                </>
            )}

            <button className="send-code-button" onClick={() => formik.submitForm()}>
                {!auth_requested && (<>Send Code</>)} {auth_requested && (<>Reset Password</>)}
            </button>
        </div>
    );
}

export default ResetPassword;

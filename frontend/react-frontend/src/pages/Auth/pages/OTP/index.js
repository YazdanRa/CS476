import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {Input, notification, Typography} from "antd"
import {useFormik} from "formik"
import * as Yup from "yup"

import {OTPRequest, OTPVerify} from "../../../../services/auth"
import {actions as authActions} from "../../../../store/authRedux/actions"

import "./styles.css"

const initialValues = {
    email: undefined,
    code: undefined,
}

const FormSchema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
    code: Yup.string()
        .length(6, "Code must be exactly 6 characters")
})

const OTPForm = () => {
    const [sentCode, setSentCode] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            if (!sentCode) {
                _otpRequest({...values})
            } else {
                _otpVerify({...values})
            }
        },
    })

    const _otpRequest = (values) => {
        OTPRequest(values)
            .then((result) => {
                const {message} = result;
                setSentCode(true);
                notification.success({message: message});
            })
            .catch((err) => {
                notification.error({message: "Something went wrong!"});
            })
    }

    const _otpVerify = (values) => {
        OTPVerify(values)
            .then((result) => {
                const {message, token, user} = result
                dispatch(authActions.login(token, user))
                notification.success({message: message})
                navigate("/dashboard")
            })
            .catch((err) => {
                notification.error({message: "Something went wrong!"});
            })
    }

    return (
        <div className="login-container">
            <h1 className="website-title">WebsiteTitle</h1>

            <Input
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                onBlur={() => formik.setFieldTouched("email", true)}
                type="email"
                placeholder="Email"
                className="input-field"/>
            {formik.errors.email && formik.touched.email && (
                <Typography.Text type="danger">
                    {formik.errors.email}
                </Typography.Text>
            )}

            {sentCode && (
                <Input
                    value={formik.values.code}
                    onChange={(e) => formik.setFieldValue("code", e.target.value)}
                    onBlur={() => formik.setFieldTouched("code", true)}
                    placeholder="code"
                    className="input-field"/>
            )}
            {formik.errors.code && formik.touched.code && (
                <Typography.Text type="danger">
                    {formik.errors.code}
                </Typography.Text>
            )}


            <button
                onClick={() => formik.submitForm()}
                className="login-button"
            >
                {!sentCode ? "Send Code" : "Verify Code"}
            </button>

            <Link to="/login">
                <button className="signup-button_home">Login With Password</button>
            </Link>

        </div>
    )
}

export default OTPForm;

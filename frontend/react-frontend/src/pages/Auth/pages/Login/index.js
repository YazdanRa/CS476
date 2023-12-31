import React from "react"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {Input, notification, Typography} from "antd"
import {useFormik} from "formik"
import * as Yup from "yup"

import {BasicLogin} from "../../../../services/auth"
import {actions as authActions} from "../../../../store/authRedux/actions"

import "./styles.css"

const initialValues = {
    email: undefined,
    password: undefined,
}

const FormSchema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("This field is required"),
})

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            _loginUser({...values})
        },
    })

    const _loginUser = (values) => {
        BasicLogin(values)
            .then((result) => {
                const {message, token, user} = result
                dispatch(authActions.login(token, user))
                notification.success({message: message})
                navigate("/dashboard")
            })
            .catch((err) => {
                notification.error({message: "Email or password is wrong"})
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

            <Input.Password
                value={formik.values.password}
                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                onBlur={() => formik.setFieldTouched("password", true)}
                placeholder="Password"
                className="input-field"/>
            {formik.errors.password && formik.touched.password && (
                <Typography.Text type="danger">
                    {formik.errors.password}
                </Typography.Text>
            )}


            <button
                onClick={() => formik.submitForm()}
                className="login-button"
            >Login
            </button>

            <Link to="/resetPassword" className="forgot-password">Forgot Password?</Link>

            <Link to="/otp">
                <button className="signup-button_home">Login with One Time Password (OTP)</button>
            </Link>

            <br/>

            <Link to="/signup">
                <button className="signup-button_home">Sign Up</button>
            </Link>

        </div>
    )
}

export default LoginForm;
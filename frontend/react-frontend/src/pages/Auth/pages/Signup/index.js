import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Signup.css';
import {useDispatch} from 'react-redux'
import {Input, notification, Typography} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {RegisterUser} from '../../../../services/auth'
import {actions as authActions} from '../../../../store/authRedux/actions'

const initialValues = {
  fullname: undefined,
  username: undefined,
  password: undefined,
  cpassword: undefined,
  email: undefined,
  date: undefined,
  profilepicture: undefined,
}

const FormSchema = Yup.object({
  fullname: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('This field is required'),

  username: Yup.string()
    .min(8, 'Username must be at least 8 characters')
    .required('This field is required'),    

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('This field is required'),

  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('This field is required'),

  date: Yup.string()
    .max(new Date(), 'Date cannot be in the future')
    .required('Date is required'),

  profilePicture: Yup.mixed()
    .required('A file is required')
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= 2000000 // Constraints file size to 2MB
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
    )
  
})

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
      initialValues,
      validationSchema: FormSchema,
      onSubmit: (values) => {
          _signupUser({...values})
      },
  })

  const _signupUser = (values) => {
      BasicSignup(values)
          .then((result) => {
              const {message, token, user} = result
              dispatch(authActions.signup(token, user))
              notification.success({message: message})
              navigate("/login")
          })
          .catch((err) => {
              notification.error({message: 'Signup Form Was Invalid'})
          })
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <div className="image-upload">
        <label htmlFor="profileImage">
          <div className="placeholder-image"></div>
        </label>
            <Input
                value={formik.values.profilePicture}
                onChange={(e) => formik.setFieldValue('profilePicture', e.target.value)}
                onBlur={() => formik.setFieldTouched('profilePicture', true)}
                type="file"
                placeholder="Profile Picture"
                className="input-field"/>
            {formik.errors.profilePicture && formik.touched.profilePicture && (
                <Typography.Text type="danger">
                    {formik.errors.profilePicture}
                </Typography.Text>
            )}
        <span>Upload Picture</span>
      </div>

            <Input.Fullname
                value={formik.values.fullname}
                onChange={(e) => formik.setFieldValue('fullname', e.target.value)}
                onBlur={() => formik.setFieldTouched('fullname', true)}
                type="text"
                placeholder="Username"
                className="input-field"/>
            {formik.errors.username && formik.touched.username && (
                <Typography.Text type="danger">
                    {formik.errors.username}
                </Typography.Text>
            )}

            <Input.Username
                value={formik.values.username}
                onChange={(e) => formik.setFieldValue('username', e.target.value)}
                onBlur={() => formik.setFieldTouched('username', true)}
                type="text"
                placeholder="Username"
                className="input-field"/>
            {formik.errors.username && formik.touched.username && (
                <Typography.Text type="danger">
                    {formik.errors.username}
                </Typography.Text>
            )}

            <Input.Password
                value={formik.values.password}
                onChange={(e) => formik.setFieldValue('password', e.target.value)}
                onBlur={() => formik.setFieldTouched('password', true)}
                placeholder="Password"
                className="input-field"/>
            {formik.errors.password && formik.touched.password && (
                <Typography.Text type="danger">
                    {formik.errors.password}
                </Typography.Text>
            )}

            <Input.CPassword
                value={formik.values.cpassword}
                onChange={(e) => formik.setFieldValue('cpassword', e.target.value)}
                onBlur={() => formik.setFieldTouched('cpassword', true)}
                placeholder="Password"
                className="input-field"/>
            {formik.errors.cpassword && formik.touched.cpassword && (
                <Typography.Text type="danger">
                    {formik.errors.cpassword}
                </Typography.Text>
            )}
            <Input.email
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                onBlur={() => formik.setFieldTouched('email', true)}
                type="email"
                placeholder="Email"
                className="input-field"/>
            {formik.errors.email && formik.touched.email && (
                <Typography.Text type="danger">
                    {formik.errors.email}
                </Typography.Text>
            )}

            <Input.Date
                value={formik.values.date}
                onChange={(e) => formik.setFieldValue('date', e.target.value)}
                onBlur={() => formik.setFieldTouched('date', true)}
                type="date"
                placeholder="Date of Birth"
                className="input-field"/>
            {formik.errors.date && formik.touched.date && (
                <Typography.Text type="danger">
                    {formik.errors.date}
                </Typography.Text>
            )}
        <button
                onClick={() => formik.submitForm()}
                className="signup-button"
            >Signup
        </button>

        <Link to="/login">
            <button className="login-button_home">Already have an Account</button>
        </Link>

    </div>
  );

  }
  export default SignupForm;
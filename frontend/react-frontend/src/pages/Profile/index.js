import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useFormik} from "formik";
import {Button, DatePicker, Input, notification, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons"
import * as Yup from "yup";

import {GetUser} from "../../services/auth";
import {actions as authActions} from "../../store/authRedux/actions";
import Menu from "../../components/Menu";

import "./Profile.css";


const FormSchema = Yup.object({
    full_name: Yup.string()
        .required("This field is required"),
    email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
    password: Yup.string().notRequired()
        .min(8, "Password must be at least 8 characters"),
    confirmation_password: Yup.string()
        .notRequired()
        .equals([Yup.ref("password"), null], "Passwords must match"),
    date_of_birth: Yup.date().nullable().notRequired(),
    profile_picture: Yup.mixed()
})

const Profile = () => {
    const user = useSelector(({auth}) => auth.user)

    const initialValues = {
        full_name: user.full_name,
        email: user.email,
        password: undefined,
        confirmation_password: undefined,
        date_of_birth: user.date_of_birth,
        profile_picture: user.profile_picture
    }

    const dispatch = useDispatch()
    const location = useLocation()

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            _updateProfile(values)
        },
    })

    const _getData = () => {
        GetUser()
            .then((result) => {
                const {user} = result
                dispatch(authActions.getUser(user))
            })
            .catch((err) => {
                notification.error({message: "Error in fetching data"})
            })
    }

    const _updateProfile = (values) => {
        // TODO: Update profile
    }

    useEffect(() => {
        _getData()
    }, []);

    return (
        <div className="signup-container">

            <Menu current_path={location.pathname}/>

            <h1>User Profile</h1>
            <div className="image-upload">
                <label htmlFor="profile_picture">
                    <img src={`https://api.cs476.yazdanra.com${user.profile_picture}`}
                         alt={user.full_name}
                         className="placeholder-image">
                    </img>
                </label>
                <Upload
                    onChange={(e) => {
                        formik.setFieldValue(
                            "profile_picture",
                            Array.from(e.fileList).map((item) => ({
                                ...item,
                                status: "done",
                            })),
                        )
                    }}
                    // fileList={formik.values.profile_picture}
                    multiple={false}
                    listType="picture"
                    className="upload-list-inline"
                >
                    <Button style={{marginTop: 8}} icon={<UploadOutlined/>}>
                        Update Profile Picture
                    </Button>
                </Upload>

            </div>

            <Input
                type="text"
                className="input"
                placeholder="Full Name"
                name="full_name"
                value={formik.values.full_name}
                onChange={(e) => formik.setFieldValue("full_name", e.target.value)}
                onBlur={() => formik.setFieldTouched("full_name", true)}
            />
            {formik.errors.full_name && formik.touched.full_name && (
                <Typography.Text type="danger">
                    {formik.errors.full_name}
                </Typography.Text>
            )}


            <Input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                onBlur={() => formik.setFieldTouched("email", true)}
            />
            {formik.errors.email && formik.touched.email && (
                <Typography.Text type="danger">
                    {formik.errors.email}
                </Typography.Text>
            )}

            <Input.Password
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                onBlur={() => formik.setFieldTouched("password", true)}
            />
            {formik.errors.password && formik.touched.password && (
                <Typography.Text type="danger">
                    {formik.errors.password}
                </Typography.Text>
            )}

            <Input.Password
                type="password"
                className="input"
                placeholder="Confirmation Password"
                name="confirmation_password"
                value={formik.values.confirmation_password}
                onChange={(e) => formik.setFieldValue("confirmation_password", e.target.value)}
                onBlur={() => formik.setFieldTouched("confirmation_password", true)}
            />
            {formik.errors.confirmation_password && formik.touched.confirmation_password && (
                <Typography.Text type="danger">
                    {formik.errors.confirmation_password}
                </Typography.Text>
            )}

            <DatePicker
                className="input"
                placeholder="Date of Birth"
                value={formik.values.date_of_birth}
                onChange={(date) => formik.setFieldValue("date_of_birth", date)}
                onBlur={() => formik.setFieldTouched("date_of_birth", true)}
            />
            {formik.errors.date_of_birth && formik.touched.date_of_birth && (
                <Typography.Text type="danger">
                    {formik.errors.date_of_birth}
                </Typography.Text>
            )}

            <button onClick={() => formik.submitForm()}>Save Changes</button>
        </div>
    );
}

export default Profile;

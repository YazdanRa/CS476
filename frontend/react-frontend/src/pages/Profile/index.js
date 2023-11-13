import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useFormik} from "formik";
import {Button, DatePicker, Input, notification, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons"
import * as Yup from "yup";

import {GetUser, UpdateUser} from "../../services/auth";
import {actions as authActions} from "../../store/authRedux/actions";
import Menu from "../../components/Menu";

import "./styles.css";
import dayjs from "dayjs";


const initialValues = {
    full_name: undefined,
    email: undefined,
    password: undefined,
    confirmation_password: undefined,
    date_of_birth: undefined,
    profile_picture: undefined
}

const FormSchema = Yup.object({
    full_name: Yup.string()
        .required("This field is required"),
    email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters"),
    confirmation_password: Yup.string()
        .equals([Yup.ref("password"), null], "Passwords must match"),
    date_of_birth: Yup.date(),
})

const Profile = () => {
    const token = useSelector(({auth}) => auth.token)
    const dispatch = useDispatch()
    const location = useLocation()

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            _updateProfile(values);
        },
    })

    const _updateProfile = (values) => {
        const serializedValues = {
            full_name: values.full_name,
            email: values.email,
            date_of_birth: dayjs(values.date_of_birth).format("YYYY/MM/DD"),
        }
        UpdateUser(serializedValues)
            .then((result) => {
                notification.success({message: "Profile updated successfully!"})
            })
            .catch((err) => {
                notification.error({message: "Error in updating profile"})
            })
    }

    const _getData = () => {
        GetUser()
            .then((result) => {
                formik.setValues({
                    full_name: result.full_name,
                    email: result.email,
                    date_of_birth: result.date_of_birth,
                    profile_picture: result.profile_picture
                })
                const {user} = result
                dispatch(authActions.getUser(user))
            })
            .catch((err) => {
                notification.error({message: "Error in fetching data"})
            })
    }

    useEffect(() => {
        _getData();
    }, []);


    return (
        <div className="signup-container">

            <Menu current_path={location.pathname}/>

            <h1>User Profile</h1>
            <div className="image-upload">

                <label htmlFor="profile_picture">
                    <img src={formik.values.profile_picture}
                         alt={formik.values.full_name}
                         className="placeholder-image">
                    </img>
                </label>

                <Upload
                    multiple={false}
                    listType="picture"
                    name="profile_picture"
                    className="upload-list-inline"
                    headers={{Authorization: token}}
                    action="https://api.cs476.yazdanra.com/user/uploadProfilePicture"
                    showUploadList={false}
                    accept={"image/*"}
                >
                    <Button style={{marginTop: 8}} icon={<UploadOutlined/>}>
                        Upload
                    </Button>
                </Upload>
                {formik.errors.profile_picture && formik.touched.profile_picture && (
                    <Typography.Text type="danger">
                        {formik.errors.profile_picture}
                    </Typography.Text>
                )}


            </div>

            <Input
                className="input"
                placeholder="Full Name"
                value={formik.values.full_name}
                status={formik.errors.full_name && formik.touched.full_name ? "error" : undefined}
                onChange={(e) => formik.setFieldValue("full_name", e.target.value)}
                onBlur={() => formik.setFieldTouched("full_name", true)}
            />
            {formik.errors.full_name && formik.touched.full_name && (
                <Typography.Text type="danger">
                    {formik.errors.full_name}
                </Typography.Text>
            )}


            <Input
                className="input"
                placeholder="Email"
                value={formik.values.email}
                status={formik.errors.email && formik.touched.email ? "error" : undefined}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                onBlur={() => formik.setFieldTouched("email", true)}
            />
            {formik.errors.email && formik.touched.email && (
                <Typography.Text type="danger">
                    {formik.errors.email}
                </Typography.Text>
            )}

            <DatePicker
                className="input"
                placeholder="Date of Birth"
                format="YYYY-MM-DD"
                value={formik.values.date_of_birth ? dayjs(formik.values.date_of_birth) : undefined}
                status={formik.errors.date_of_birth && formik.touched.date_of_birth ? "error" : undefined}
                onChange={(date) => formik.setFieldValue("date_of_birth", date)}
                onBlur={() => formik.setFieldTouched("date_of_birth", true)}
            />
            {formik.errors.date_of_birth && formik.touched.date_of_birth && (
                <Typography.Text type="danger">
                    {formik.errors.date_of_birth}
                </Typography.Text>
            )}

            <Button onClick={() => formik.submitForm()}>Save Changes</Button>

            <br/>
            <hr/>
            <br/>

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

            <Button onClick={() => formik.submitForm()}>Change Password</Button>

        </div>
    );
}

export default Profile;

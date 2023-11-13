import React, {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, DatePicker, Input, notification, Switch, Typography} from "antd"
import {useFormik} from "formik"
import * as Yup from "yup"
import dayjs from "dayjs";

import {createElection, getElectionById, modifyElection} from "../../services/election";

import "./styles.css";

const {RangePicker} = DatePicker;

const initialValues = {
    id: undefined,
    access_code: undefined,
    title: undefined,
    from_date: undefined,
    to_date: undefined,
    show_results_after_election: false,
    vote_options: [undefined, undefined],
}

const FormSchema = Yup.object({
    title: Yup.string()
        .required("This field is required"),
    from_date: Yup.date()
        .required("This field is required")
        .min(dayjs(), "Start date must be after today"),
    to_date: Yup.date()
        .required("This field is required")
        .min(Yup.ref("from_date"), "End date must be after start date"),
    show_results_after_election: Yup.boolean()
        .required("This field is required"),
    vote_options: Yup.array().of(
        Yup.string()
            .required("This field is required")
            .nonNullable()
    ).min(2, "At least 2 options are required")
})

const ElectionForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            if (is_create_election_page) {
                _createElection(values);
            } else {
                _updateElection(values);
            }
        },
    });

    const is_create_election_page = location.pathname === "/elections/createElection";

    const _createElection = (values) => {
        const serialized_data = {
            title: values.title,
            from_date: values.from_date,
            to_date: values.to_date,
            associated_groups: [],
            show_results_after_election: values.show_results_after_election,
            options: values.vote_options.map(option => ({title: option})),
        }
        createElection(serialized_data)
            .then((result) => {
                const newElectionId = result.id;
                notification.success({message: "Election created successfully!"});
                navigate(`/elections/myElections/${newElectionId}`);
            })
            .catch((err) => {
                notification.error({message: "Sorry, something went wrong"});
            })
    }

    const _updateElection = (values) => {
        const serialized_data = {
            title: values.title,
            from_date: values.from_date,
            to_date: values.to_date,
            associated_groups: [],
            show_results_after_election: values.show_results_after_election,
            options: values.vote_options.map(option => ({title: option})),
        }
        modifyElection(values.id, serialized_data)
            .then((result) => {
                notification.success({message: "Election successfully updated!"});
            })
            .catch((err) => {
                notification.error({message: "Sorry, something went wrong"});
            })
    }

    const _getElection = () => {
        const electionId = params.id;
        getElectionById(electionId)
            .then((result) => {
                const serialized_data = {
                    id: result.id,
                    access_code: result.access_code,
                    title: result.title,
                    from_date: dayjs(result.from_date),
                    to_date: dayjs(result.to_date),
                    show_results_after_election: result.show_results_after_election,
                    vote_options: result.vote_options.map(option => option.title),
                }
                formik.setValues(serialized_data);
            })
            .catch((err) => {
                if (err.response.status / 10 === 40) {
                    notification.error({message: "Sorry, this election does not exist or you do not have access to it"});
                    navigate("/elections/myElections");
                }
            })
    }

    useEffect(() => {
        if (!is_create_election_page) {
            _getElection();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="settings-container">

            {!is_create_election_page && (
                <label>
                    Survey code:
                    <Input type="text" value={formik.values.access_code} readOnly={true}/>
                </label>
            )}

            <label>
                Title:
                <Input
                    type="text"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={(event) => formik.setFieldValue("title", event.target.value)}
                    onBlur={() => formik.setFieldTouched("title", true)}
                />
                {formik.errors.title && formik.touched.title && (
                    <Typography.Text type="danger">
                        {formik.errors.title}
                    </Typography.Text>
                )}
            </label>

            <label>
                Election Period:<br/>
                <RangePicker
                    showTime={{format: "HH:mm"}}
                    value={[formik.values.from_date, formik.values.to_date]}
                    onChange={(dates) => {
                        formik.setFieldValue("from_date", dates[0]);
                        formik.setFieldValue("to_date", dates[1]);
                    }}
                    onOK={(dates) => {
                        formik.setFieldValue("from_date", dates[0]);
                        formik.setFieldValue("to_date", dates[1]);
                    }}
                />
                {formik.errors.from_date && formik.touched.from_date && (
                    <Typography.Text type="danger">
                        {formik.errors.from_date}
                    </Typography.Text>
                )}
                {formik.errors.to_date && formik.touched.to_date && (
                    <Typography.Text type="danger">
                        {formik.errors.to_date}
                    </Typography.Text>
                )}
            </label>

            <label>
                Show result to participants after the end date:
                <Switch
                    checked={formik.values.show_results_after_election}
                    onChange={(checked) => formik.setFieldValue("show_results_after_election", checked)}
                />
                {formik.errors.show_results_after_election && formik.touched.show_results_after_election && (
                    <Typography.Text type="danger">
                        {formik.errors.show_results_after_election}
                    </Typography.Text>
                )}
            </label>

            <label className="candidate-input">
                Voting Options:
                {formik.values.vote_options.map((vote_option_title, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            placeholder="option title"
                            value={vote_option_title}
                            // status={formik.errors.vote_options && formik.touched.vote_options ? "error" : undefined}
                            onChange={(event) => formik.setFieldValue(`vote_options[${index}]`, event.target.value)}
                            onBlur={(event) => {
                                const duplicate_list = formik.values.vote_options.filter((value, index) => value === event.target.value);
                                if (duplicate_list.length > 1) {
                                    formik.setFieldError(`vote_options`, "Duplicate options are not allowed");
                                }
                                formik.setFieldTouched(`vote_options[${index}]`, true);
                            }}
                        />
                        {formik.values.vote_options.length > 2 && (
                            <button
                                className="remove-button"
                                onClick={() => {
                                    const new_vote_options = [...formik.values.vote_options];
                                    new_vote_options.splice(index, 1);
                                    formik.setFieldValue("vote_options", new_vote_options);
                                }}
                            > - </button>
                        )}
                    </div>
                ))}
                <button
                    className="add-button"
                    onClick={() => formik.setFieldValue("vote_options", [...formik.values.vote_options, undefined])}
                > +
                </button>
                {/*{formik.errors.vote_options && formik.touched.vote_options && (*/}
                {/*    <Typography.Text type="danger">*/}
                {/*        {formik.errors.vote_options}*/}
                {/*    </Typography.Text>*/}
                {/*)}*/}
            </label>

            <Button onClick={() => formik.submitForm()}>
                {is_create_election_page && (
                    <>Create Survey</>
                )}
                {!is_create_election_page && (
                    <>Save Changes</>
                )}
            </Button>
        </div>
    );
};

export default ElectionForm;

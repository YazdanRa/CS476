import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {DatePicker, Input, notification, Radio, Switch} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs';

import {getElectionById} from "../../services/election";

import './styles.css';

const { RangePicker } = DatePicker;

const initialValues = {
    id: undefined,
    access_code: undefined,
    title: undefined,
    from_date: undefined,
    to_date: undefined,
    can_choose_multiple_options: undefined,
    show_results_after_election: undefined,
    vote_options: [undefined, undefined],
}

const FormSchema = Yup.object({
    title: Yup.string()
        .required('This field is required'),
    from_date: Yup.date().required('This field is required'),
    to_date: Yup.date()
        .required('This field is required')
        .min(Yup.ref('from_date'), 'End date must be after start date'),
    can_choose_multiple_options: Yup.boolean()
        .required('This field is required'),
    show_results_after_election: Yup.boolean()
        .required('This field is required'),
    vote_options: Yup.array().of(
        Yup.string()
            .required('This field is required')
            .nonNullable()
    ).min(2, 'At least 2 options are required')
})

const ElectionForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            if(is_create_election_page) {
                _createElection(values);
            } else {
                _updateElection(values);
            }
        },
    });

    const is_create_election_page = location.pathname === '/elections/createElection';

    const [_, set_vote_options] = useState(formik.values.vote_options)
    const removeVoteOption = (index) => {
        formik.values.vote_options.splice(index, 1);
        set_vote_options([...formik.values.vote_options]);
    }
    const addVoteOption = () => {
        formik.values.vote_options.push(undefined);
        set_vote_options([...formik.values.vote_options]);
    }

    const _createElection = (values) => {
        console.log("create election");
        console.log(values);
    }

    const _updateElection = (values) => {
        console.log("update election");
        console.log(values);

    }

    const _getElection = () => {
        const electionId = location.pathname.split('/').pop();
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
                    navigate('/elections/myElections');
                }
            })
    }

    useEffect(() => {
        if (!is_create_election_page) {
            _getElection();
        }
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
                <Input type="text" placeholder="Title" value={formik.values.title}/>
            </label>

            <label>
                Election Period:<br/>
                <RangePicker
                    value={[formik.values.from_date, formik.values.to_date]}
                    onChange={(dates) => {
                        formik.values.from_date = dates[0];
                        formik.values.to_date = dates[1];
                    }}
                />
            </label>

            <label>
                Show result to participants after the end date:
                <Switch
                    value={formik.values.show_results_after_election}
                    onChange={(checked) => formik.values.show_results_after_election = checked}
                />
            </label>

            <label className="candidate-input">
                Voting Options:
                {formik.values.vote_options.map((vote_option_title, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            placeholder="option title"
                            value={vote_option_title}
                            onChange={(event) => {
                                formik.values.vote_options[index] = event.target.value
                            }}
                            onBlur={(event) => set_vote_options([...formik.values.vote_options])}
                        />
                        {formik.values.vote_options.length > 2 && (
                            <button
                                className="remove-button"
                                onClick={() => removeVoteOption(index)}
                            > - </button>
                        )}
                    </div>
                ))}
                <button className="add-button" onClick={() => addVoteOption()}> +</button>
            </label>

            <button className="submit-button" onClick={() => formik.submitForm()}>
                {is_create_election_page && (
                    <p>Create Survey</p>
                )}
                {!is_create_election_page && (
                    <p>Save Changes</p>
                )}
            </button>
        </div>
    );
};

export default ElectionForm;

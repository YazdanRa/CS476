import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DatePicker, Input} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {useLocation} from "react-router-dom";
import {getElectionById} from "../../services/election";

import './styles.css';

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
    const [data, setData] = useState();

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            //     TODO: Create/modify election
        },
    });

    const is_create_election_page = location.pathname === '/elections/createElection';

    const [vote_options_helper, set_vote_options_helper] = useState(formik.values.vote_options)
    const removeVoteOption = (index) => {
        formik.values.vote_options.splice(index, 1);
        set_vote_options_helper([...formik.values.vote_options]);
    }
    const addVoteOption = () => {
        formik.values.vote_options.push(undefined);
        set_vote_options_helper([...formik.values.vote_options]);
    }
    const updateVoteOption = (index, event) => {
        formik.values.vote_options[index] = event.target.value;
        set_vote_options_helper([...formik.values.vote_options]);
    }

    const _getElection = () => {
        const electionId = location.pathname.split('/').pop();
        getElectionById(electionId).then((result) => {
            const serialized_data = {
                id: result.id,
                access_code: result.access_code,
                title: result.title,
                from_date: result.from_date,
                to_date: result.to_date,
                show_results_after_election: result.show_results_after_election,
                vote_options: result.vote_options.map(option => option.title),
            }
            console.log(serialized_data)
            setData(serialized_data);
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

            <label className="candidate-input">
                From:
                <DatePicker type="date" value={formik.values.from_date}/>
            </label>

            <label className="candidate-input">
                To:
                <DatePicker type="date" values={formik.values.to_date}/>
            </label>

            <div className="radio-options">
                <label>
                    Show result to participants after the end date:
                    <input
                        type="radio"
                        name="showResults"
                        checked={formik.values.show_results_after_election}
                        onChange={() => {
                            formik.values.show_results_after_election = true
                        }}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="showResults"
                        checked={formik.values.show_results_after_election}
                        onChange={() => {
                            formik.values.show_results_after_election = false
                        }}
                    />
                    No
                </label>
            </div>

            <label className="candidate-input">
                Voting Options:
                {vote_options_helper.map((vote_option_title, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            placeholder="option title"
                            value={vote_option_title}
                            onBlur={(event) => updateVoteOption(index, event)}
                        />
                        {vote_options_helper.length > 2 && (
                            <button
                                className="remove-button"
                                onClick={() => removeVoteOption(index)}
                            > - </button>
                        )}
                    </div>
                ))}
                <button className="add-button" onClick={() => addVoteOption()}> +</button>
            </label>

            <button className="create-button">Create Survey</button>
        </div>
    );
};

export default ElectionForm;

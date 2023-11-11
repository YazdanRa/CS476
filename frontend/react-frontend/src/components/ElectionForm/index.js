import React, {useState} from 'react';
import {DatePicker, Input} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import './styles.css';

const initialValues = {
    id: undefined,
    access_code: undefined,
    title: undefined,
    vote_options: [undefined, undefined],
}

const FormSchema = Yup.object({
    title: Yup.string()
        .required('This field is required'),
})

function ElectionForm() {
    const [showResults, setShowResults] = useState(true);

    const [vote_options, setVoteOptions] = useState(['']);
    const addVoteOptions = () => setVoteOptions(prev => [...prev, '']);

    const [questions, setQuestions] = useState(['']);
    const addQuestion = () => setQuestions(prev => [...prev, '']);

    const formik = useFormik({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => {
        //     TODO: Create/modify election
        },
    })

    return (
        <div className="settings-container">

            {/* TODO: Check if election created. only show if created */}
            <label>
                Survey code:
                <Input type="text" value={formik.values.access_code} readOnly={true}/>
            </label>

            <label>
                Title:
                <Input type="text" placeholder="Title"/>
            </label>


            <label className="candidate-input">
                Candidates:
                {vote_options.map((_, index) => (
                    <Input key={index} type="text" placeholder="Enter candidate name"/>
                ))}
            </label>
            <button onClick={addVoteOptions} className="add-button">+</button>


            <label>
                From:
                <DatePicker type="date"/>
            </label>

            <label>
                To:
                <DatePicker type="date"/>
            </label>

            <div className="radio-options">
                <span>Show result to participants after the end date:</span>
                <label>
                    <input
                        type="radio"
                        name="showResults"
                        checked={showResults}
                        onChange={() => setShowResults(true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="showResults"
                        checked={!showResults}
                        onChange={() => setShowResults(false)}
                    />
                    No
                </label>

                <div className="question-input">
                    {questions.map((_, index) => (
                        <div key={index}>
                            <label>Question {index + 1}:</label>
                            <input type="text" placeholder="Enter your question"/>
                        </div>
                    ))}
                </div>
                <button onClick={addQuestion} className="add-button">+</button>

                <button className="create-button">Create Survey</button>
            </div>
        </div>
    );
}

export default ElectionForm;

import React, { Component } from 'react';
import './QuizCreator.css'

import Button from '../../components/UI/Button/Button';
import { createControl } from '../../form/formFramework';
import Input from '../../components/UI/input/Input';
import { Auxiliary } from '../../hoc/Auxiliary/Auxiliary';



function createFormControls() {
    return {
        question: createControl({
            label: 'Input question',
            errorMessage: 'Please input question'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),

    }
}

function createOptionControl(number) {
    return createControl(
        {
            id: number,
            label: 'Option ' + number,
            errorMessage: 'Please input text'
        }, { required: true }
    )
}
class QuizCreator extends Component {
    state = {
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = (event) => {
        event.preventDefault()
    }
    addQuestionHandler = () => {

    }
    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

    }
    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.shouldValidate}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    render() {
        return (
            <div className="QuizCreator">
                <div>
                    <h1>Create Quiz</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}


                        <select></select>
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}>Add question</Button>
                        <Button
                            type="primary"
                            onClick={this.createQuizHandler}>Create quiz</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;
import React, { Component } from 'react';
import './Auth.css'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input';
import is from 'is_js';
import axios from 'axios'

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Please input correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Please input correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true

        }
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHmmgt05rUEVRYbMig491-0Zu0ByUFz20', authData)
            console.log(res.data)

        } catch (error) {
            console.log(error)

        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true

        }
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHmmgt05rUEVRYbMig491-0Zu0ByUFz20', authData)
            console.log(res)

        } catch (error) {
            console.log(error)

        }
    }
    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value)
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid
        })
    }
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Autontication</h1>
                    <form className='Authform' onSubmit={this.submitHandler}>

                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}>
                            LogIn
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
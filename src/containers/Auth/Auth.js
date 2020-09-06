import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.module.css';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import * as actions from './../../store/actions/index';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    onCheckValidity = (value, rules) => {
        let isValid = true;

        if( rules.required ){
            isValid = value.trim() !== '' && isValid
        }

        if( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, inputName) => {
        const updatedState = {
            ...this.state.controls,
            [inputName]: {
                ...this.state.controls[inputName],
                value: event.target.value,
                valid: this.onCheckValidity(event.target.value, this.state.controls[inputName].validation ),
                touched: true 
            }
        }

        this.setState({
            controls: updatedState
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(preveState => {
            return {
                isSignUp: !preveState.isSignUp
            }
        })
    }

    render(){

        const formElementArr = [];
        for( let key in this.state.controls ) {
            formElementArr.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            )
        };

        let form = formElementArr.map(formElement => {
            return (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.onChangeHandler(event, formElement.id)} 
                />
            )
        });

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.onSubmit}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthHandler}
                    btnType="Danger"> {this.state.isSignUp ? 'Switch To Login' : 'Switch To SignUp' } </Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignUp ) => dispatch( actions.auth( email, password, isSignUp ) )
    }
}

export default connect(null, mapDispatchToProps)(Auth);
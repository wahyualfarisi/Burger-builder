import React , { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import axios from './../../../axios-orders';
import Input from './../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as OrderBurgerActions from './../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
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

    onChangeHandler = (event, inputIdentifier) => {

        //Copy from state
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        //Grab object base on input name 
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value; //mutate a value 
        updatedFormElement.valid = this.onCheckValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement //update form order 

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })

    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        for( let formInputValue in this.state.orderForm ){
            formData[formInputValue] = this.state.orderForm[formInputValue].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId        
        }

        this.props.onPurchaseBurger(order, this.props.token)
         
    }
    render(){
        const formElementArr = [];
        for( let key in this.state.orderForm ) {
            formElementArr.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            )
        };



        let form = (
            <form onSubmit={this.orderHandler}>
                { formElementArr.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.onChangeHandler(event, formElement.id)} />
                )) }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch( OrderBurgerActions.purchaseBurger(orderData, token ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(ContactData, axios) ) ;
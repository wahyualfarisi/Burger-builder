import React , { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import axios from './../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Wahyu Alfarisi',
                address: {
                    street: 'Jakarta',
                    zipCode: 14450
                },
                email: 'wahyualfarisi30@gmail.com'
            }
        }
         axios.post('/order.json', order)
              .then(res => {
                  console.log(res)
                  this.setState({
                      loading: false
                  });

                  this.props.history.push('/')
              })
              .catch(res => {
                    this.setState({
                        loading: false
                    })
              });
    }
    render(){
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Enter Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postalCode" placeholder="Enter Postal Code" />

                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;
import React from 'react';
import classes from './Order.module.css';
import Burger from '../Burger/Burger';

const Order = ( props ) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
                style={{
                    display: 'inline-block',
                    padding: '5px',
                    margin: '5px',
                    border: '1px solid #ccc',
                    borderBottom: '2px solid #91ce50',
                    color: 'white',
                    background: '#703B09',
                    textTransform: 'capitalize'
                }}
                key={ig.name}>
                    {ig.name} ({ig.amount})
                </span>
    })

    return (
        <div className={classes.Orders}>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <p>Ingredients: {ingredientOutput} </p>
            <p style={{
                padding: '5px',
                border: '1px solid #703B09',
                width: '150px'
            }}>Price <strong>RP. {props.price}</strong> </p>
        </div>
    )
}

export default Order

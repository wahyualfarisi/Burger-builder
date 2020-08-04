import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' }
]


const BuildControls = ( props ) => {
    
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong> {props.price.toFixed(2)}  </strong></p>
            {
                controls.map((item, i) => {
                    return (
                        <BuildControl 
                            add={ () => props.addIngredient(item.type)} 
                            remove={ () => props.removeIngredient(item.type) }
                            disabled={ props.ingredients[item.type] === 0 ? 'disabled' : '' }
                            key={item.label} label={item.label} 
                        />
                    )
                } )
            }
            <button disabled={!props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
        </div>
    )
}

export default BuildControls

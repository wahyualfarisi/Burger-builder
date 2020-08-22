import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    const InputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        InputClasses.push(classes.Invalid)
    }
     

    switch(props.elementType)
    {
        case ('input'):
            inputElement = <input 
                {...props.elementConfig}
                value={props.value}  
                className={InputClasses.join(' ')} 
                onChange={props.changed}/>;
        break;

        case ('textarea'):
            inputElement = <textarea 
                {...props.elementConfig}
                value={props.value}  
                className={InputClasses.join(' ')} 
                onChange={props.changed}/>
        break;

        case ('select'):
            inputElement = (
                <select 
                value={props.value}
                className={InputClasses.join(' ')} 
                onChange={props.changed}>
                    {props.elementConfig.options.map(opt => <option key={opt.value} value={opt.value}>{opt.displayValue}</option> )}
                </select>
            )
        break;

        default:
            inputElement = <input 
                {...props.elementConfig}
                value={props.value}  
                className={InputClasses.join(' ')} 
                onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input

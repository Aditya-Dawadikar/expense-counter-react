import React from 'react'
import './ExpenseList.css';
import {Button} from 'react-bootstrap'

function ExpenseList(props) {
    var catalogue = props.list;
    var lists=["expense","income"]

    const handleDataRemove=(data)=>{
        let newObject ={
            expense:data.expense,
            amount:data.amount,
            type:""
        }
        if(props.isExpense===true){
            newObject.type=lists[0]
        }else{
            newObject.type=lists[1]
        }

        props.removeData(newObject);
    }

    return (
        <ul className="list">
            {catalogue.map(function(item) {
                return <li className={props.isExpense?'list-element red':'list-element blue'} key={item} >
                <div className="flex">
                    <div className="key">{item.expense+" : "}</div><div className="value">{item.amount}</div>
                </div>
                    <Button onClick={()=>handleDataRemove(item)}  className="delete-btn" variant="danger">X</Button>
                </li>;
            })}
        </ul>
    )
}
export default ExpenseList

import React from 'react'
import {Form,Row,Col,Button} from 'react-bootstrap'
import './Form.css'
import {useState} from 'react'

const Form1 = (props) => {
    const [inputField , setInputField] = useState({
        expense: '',
        amount: 0,
        type:props.type,
    })

    const submitButton = (e) =>{
        e.preventDefault()
        closeForm();
        props.pushData(inputField);
    }

    const inputHandler =(e)=>{
        setInputField((preValues)=>{
            return {
                ...preValues,
                [e.target.name]:e.target.value
            }
        })
    }

    const closeForm = ()=>{
      props.modalChild(false);
    }

    return (
        <div>
            <Form onSubmit={submitButton} className ="form-container">
                <Button className="close-btn" onClick={()=>closeForm()}>X</Button>
                <Row>
                    <Col>
                        <Form.Label className="label">Entry</Form.Label>
                        <Form.Control className="input" placeholder="Enter title" name="expense"
                            onChange={inputHandler}
                        />
                    </Col>
                    <Col>
                        <Form.Label className="label">Amount</Form.Label>
                        <Form.Control className="input" type="number" placeholder="Enter amount" name="amount"
                            onChange={inputHandler}
                        />
                    </Col>
                </Row>
                <Button className="input-btn" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Form1

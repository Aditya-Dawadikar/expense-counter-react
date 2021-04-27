import React , {useState,useEffect} from 'react';
import './App.css';
import Display from './display/Display';
import Expenses from './expenses/ExpenseList';
import {Button} from 'react-bootstrap'
import Form1 from './form/Form';

function App() {
  var lists=["expense","income"]
  const defaultExpenseList=[{expense:"sample",amount:"0"}];
  const defaultIncomeList=[{expense:"sample",amount:"0"}];
  const [total,setTotal]= useState(0);
  const [state, setstate] = useState({
      expense : false,
      income : false,
    });
  const [expenseList,setExpenseList] = useState(defaultExpenseList)
  const [incomeList, setIncomeList] = useState(defaultIncomeList)

  const calculateTotal=()=>{
    let totalExpense = 0;
    let totalIncome = 0;

    for(let element in expenseList){
      totalExpense+=parseInt(expenseList[element].amount);
    }
    for(let element in incomeList){
      totalIncome+=parseInt(incomeList[element].amount);
    }
    let diff=parseInt(totalIncome - totalExpense)
    setTotal(diff);
  }

  useEffect(()=>{
    calculateTotal();
  })

  const addListElement = (data) =>{
    var newChildElement = {
      expense:data.expense,
      amount:data.amount
    }
    if(data.type===lists[0]){
      setExpenseList(expenseList.concat(newChildElement))
    }else if(data.type === lists[1]){
      setIncomeList(incomeList.concat(newChildElement))
    }
    calculateTotal();
    //setTotal(total + +data.amount)
  }

  const removeListElement = (data)=>{
    let index;
    console.log(data);
    if(data.type===lists[0]){
      for(let i=0;i<expenseList.length;i++){
        if(expenseList[i].expense===data.expense){
          index=i;
          setExpenseList(expenseList.filter(element=>{
            return element.expense!==data.expense
          }));
          break;
        }
      }
    }else if(data.type===lists[1]){
      for(let i=0;i<incomeList.length;i++){
        if(incomeList[i].expense===data.expense){
          index=i;
          // setIncomeList(incomeList.splice(index,1))
          setIncomeList(incomeList.filter(element=>{
            return element.expense!==data.expense
          }));
          break;
        }
      }
    }
    //setTotal(total - +data.amount)
    calculateTotal();
  }

  const modalAction = (data)=>{
    setstate(data);
  }

  return (
    <div className="App">
      { state.expense ? <Form1 type={lists[0]} modalChild = {modalAction} pushData={addListElement} /> :null }
      { state.income ? <Form1 type={lists[1]} modalChild = {modalAction} pushData={addListElement} /> :null }
      <Display total={total} />
      <div className="line"></div>
      <div className="flex-view">
        <div className="title">Expenses
          <Button onClick={()=>setstate({ ...state, expense: true, income:false })} variant="success" className="btn">+</Button>{' '}
        </div>
        <div className="title">Income
          <Button onClick={()=>setstate({ ...state, income: true,expense:false })} variant="success" className="btn">+</Button>{' '}
        </div>
      </div>
      <div className="flex-view">
        <Expenses list={expenseList} removeData={removeListElement}  background={"rgb(255, 109, 109)"} isExpense={true}/>
        <Expenses list={incomeList} removeData={removeListElement} />
      </div>
    </div>
    
  );
}

export default App;

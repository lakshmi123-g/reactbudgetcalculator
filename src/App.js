import React, { useState, useEffect } from 'react'
//import "./App.css";
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from './components/Alert'
import { v4 as uuidv4 } from 'uuid'
import Dummy from './components/dummy'
const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : []
function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState('')
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)
  useEffect(() => {
    console.log('called')

    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    let amount = e.target.value
    if (amount === '') {
      setAmount(amount)
    } else {
      setAmount(parseInt(amount))
    }
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(tempExpenses)
        setEdit(false)
      } else {
        const singleExpense = { id: uuidv4(), charge, amount }
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: 'success', text: 'item added' })
      }
      setCharge('')
      setAmount('')
    } else {
      handleAlert({
        type: 'danger',
        text: `charge can't be empty value and amount value has to be bigger than zero`,
      })
    }
  }
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id)
    setExpenses(tempExpenses)
    handleAlert({ type: 'danger', text: 'item deleted' })
  }
  const clearItems = () => {
    setExpenses([])
  }
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id)
    let { charge, amount } = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          handleSubmit={handleSubmit}
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount)
          }, 0)}
        </span>
      </h1>
      <Dummy />
    </>
  )
}

export default App

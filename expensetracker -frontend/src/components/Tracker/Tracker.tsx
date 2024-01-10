import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Input, MantineProvider, Button } from '@mantine/core';
import classes from './Tracker.module.css'
import { useStore } from '../../store/store';
import ExpenseTable from '../ExpenseTable/Expensetable';
import { addExpenses, getExpense } from '../../services/api.services'
import { Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export type InputType = {
    name: string,
    date: Date,
    description: String,
    Amount: number
}

function Tracker() {
    const navigate = useNavigate()
    const { totalExpenses, setExpenses, expenses, setTotalExpense } = useStore()
    const [buttonDisabled, setbuttonDisabled] = useState(true)
    const queryClient = useQueryClient();
    const initialData: InputType = {
        name: '',
        date: new Date(),
        description: '',
        Amount: 0
    };
    const [Inputs, setInputs] = useState<InputType>(initialData)

    const inputHandler = (key: string, value: any) => {
        setInputs((prev: InputType) => ({
            ...prev,
            [key]: value
        }))
    }
    const calculateTotalData = () => {
        let total_exp = 0
        expenses.filter((data) => total_exp += data.Amount)
        setTotalExpense(total_exp)
        console.log(total_exp)
    }
    const { isFetched } = useQuery({
        queryKey: ['expense-data'],
        queryFn: async () => await getExpense().then((res) => {
            setExpenses([...res]);
            localStorage.setItem('expenses', JSON.stringify(res)); // Convert to JSON string
        })
    });


    const addExpensesTanstack = useMutation({
        mutationFn: (inputs: InputType) =>
            axios.post(BASE_URL || '', inputs),
        onSuccess: () => {
            calculateTotalData()
            queryClient.invalidateQueries({ queryKey: ['expense-data'] });
            setInputs((prev) => ({
                name: '',
                date: new Date(),
                description: '',
                Amount: 0
            }))
            navigate('/chart')
        }
    })
    useEffect(() => {
        calculateTotalData()
    }, [expenses])
    const inputs: any = [
        {
            key: 'date',
            type: 'date',
            value: Inputs.date
        },
        {
            key: 'description',
            type: 'text',
            value: Inputs.description,
            placeholder: 'Description'
        },
        {
            key: 'Amount',
            type: 'number',
            value: Inputs.Amount,
            placeholder: 'Amount'
        },
    ];
    useEffect(() => {
        if (Inputs.name != '' && Inputs.date != null && Inputs.description != '' && Inputs.Amount != 0) {
            setbuttonDisabled(false)
        }
        else {
            setbuttonDisabled(true)
        }
    }, [Inputs])
    return (
        <MantineProvider>
            <Navbar></Navbar>
            <div style={{ height: 'auto', width: '100vw', padding: '2%',gap:'10px', display: 'flex', flexDirection: 'column' }}>
                <div className={classes.expense_input} >
                    <div className={classes.input_fields}>
                        <div className={classes.input_segment}>
                    <Select
                        style={{ display: 'flex', marginLeft: '0px' }}
                        placeholder="Pick value"
                        value={Inputs.name}
                        onChange={(name) => inputHandler('name', name)}
                        data={['Medical', 'Travel', 'Household', 'education', 'Shopping', 'Food']}
                        defaultValue="React"
                        clearable
                    />
                    {inputs.map((data: any) => (
                        <Input
                            variant="filled"
                            key={data.key}
                            type={data.type}
                            value={data.value}
                            placeholder={data.placeholder}
                            onChange={(e) => inputHandler(data.key, e.target.value)}
                        />
                    ))}
                    </div>
                    </div>
                    <Button variant="filled" disabled={buttonDisabled} onClick={() => addExpensesTanstack.mutate(Inputs)}>submit</Button>
                    <Button color='green' onClick={() => { console.log(expenses) }} >Total_Expense: ₹{totalExpenses}</Button>
    
                </div>
                <ExpenseTable />
            </div>
        </MantineProvider>
    );
}

export default Tracker;

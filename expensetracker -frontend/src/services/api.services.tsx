import axios from 'axios';
import { InputType } from '../components/Tracker/Tracker';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const addExpenses = async (data: any) => {
  try {
    const addedResponse = await axios.post(BASE_URL || '', data);
    return addedResponse.data;
  } catch (error) {
    console.error('Error adding expenses:', error);
    throw error;
  }
};
const getExpense = async () => {
  try {
    const expense = await axios.get(BASE_URL || '')
    return expense.data
  }
  catch (error) {
    console.error('Error adding expenses:', error);
    throw error;
  }
}
const deleteExpense = async (index: any) => {
  try {
    const deletedResponse = await axios.delete(BASE_URL + index);
    return deletedResponse.data;
  } catch (error) {
    console.log('Error deleting expense');
    throw error;
  }
}

const editExpense = async (index: any, data: any) => {
  try {
    const editExpense = await axios.put(BASE_URL + index, data)
    return editExpense.data
  }
  catch (error) {
    console.log('Error deleting expense');
    throw error;
  }
}

export { addExpenses, deleteExpense, getExpense ,editExpense}; // Explicitly export the functions

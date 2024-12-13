import { axiosInstance } from '../axiosInstance';
import { Transfer } from '../types';

export async function makeTransfer(transferData: Transfer) {
  try {
    const response = await axiosInstance.post('transfers/create', transferData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}


export async function getTransfer(transferData: Transfer) {
  try {
    const response = await axiosInstance.post('transfers/create', transferData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

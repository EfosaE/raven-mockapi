
import { axiosInstance } from '../axiosInstance';
import { User } from '../types';

export default async function (userDetails: User) {
  console.log(userDetails)
  try {
    const response = await axiosInstance.post(
      'pwbt/generate_account',
      userDetails
    );
    const data = response.data;
    console.log(data)
    return data;
  } catch (error) {
    console.error('Account generation Failed:', error);
    return error;
  }
}

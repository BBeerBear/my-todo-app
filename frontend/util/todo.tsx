import axios from 'axios';
import { ActionFunction, json, redirect } from 'react-router-dom';
import { getAuthToken } from './auth';

export const todoDeleteAction: ActionFunction = async ({ params }) => {
  const token = getAuthToken();
  //delete todo by id
  try {
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todos/${params.todoId}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return redirect('/');
  } catch (err: any) {
    throw json(
      { message: err.response.data.detail },
      { status: err.response.status }
    );
  }
};

export const todoCompleteAction: ActionFunction = async ({ params }) => {
  const token = getAuthToken();
  try {
    await axios.patch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todos/${params.todoId}`,
      { complete: true },
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return redirect('/');
  } catch (err: any) {
    throw json(
      { message: err.response.data.detail },
      { status: err.response.status }
    );
  }
};

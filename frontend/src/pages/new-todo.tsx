import axios from 'axios';
import { ActionFunction, json, redirect } from 'react-router-dom';
import TodoForm from '../components/todos/todo-form';
import { getAuthToken } from '../../util/auth';

export default function NewTodoPage() {
  return <TodoForm method='post' />;
}

export const action: ActionFunction = async ({ request }) => {
  const token = getAuthToken();
  const formData = await request.formData();
  const newTodo = {
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    complete: false,
    // owner_id
  };
  // save newtodo data
  try {
    await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todos/`,
      newTodo,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );
    return redirect('/');
  } catch (err: any) {
    throw json(
      { message: err.resposne.data.detail },
      { status: err.response.status }
    );
  }
};

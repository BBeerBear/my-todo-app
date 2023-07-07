import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import TodoForm from '../components/todos/todo-form';
import axios from 'axios';
import { getAuthToken } from '../../util/auth';
export default function EditTodoPage() {
  const todoData: any = useLoaderData();
  return <TodoForm method='patch' todoData={todoData} />;
}

export const loader: LoaderFunction = async ({ params }) => {
  const token = getAuthToken();
  // get todo by id
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todos/${params.todoId}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return data;
  } catch (error: any) {
    throw json(
      { message: error.response.data.detail },
      { status: error.response.status }
    );
  }
};

export const action: ActionFunction = async ({ params, request }) => {
  const token = getAuthToken();
  const formData = await request.formData();
  const updatedTodo = {
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
  };
  // update todo by id
  try {
    await axios.patch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todos/${params.todoId}/`,
      updatedTodo,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return redirect('/');
  } catch (error: any) {
    throw json(
      { message: 'Invalid request' },
      { status: error.response.status }
    );
  }
};

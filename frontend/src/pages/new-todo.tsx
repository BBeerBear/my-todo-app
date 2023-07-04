import { ActionFunction, redirect } from 'react-router-dom';
import TodoForm from '../components/todos/todo-form';

export default function NewTodoPage() {
  return <TodoForm method='post' />;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newTodo = {
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    complete: false,
    // owner_id
  };
  // save newtodo data
  return redirect('/');
};

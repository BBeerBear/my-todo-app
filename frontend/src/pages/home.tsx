import { Link, json } from 'react-router-dom';
import TodoList from '../components/todos/todo-list';
import axios from 'axios';
import { getAuthToken } from '../../util/auth';
import { useLoaderData } from 'react-router-dom';

export default function HomePage() {
  const todos: any = useLoaderData();

  return (
    <div>
      <TodoList todos={todos} />
      <Link
        to='todos/new'
        className='circle_icon fixed right-10 bottom-10 bg-gradient-to-br from-violet-600 to-sky-300 p-4 cursor-pointer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2.5}
          stroke='currentColor'
          className='w-7 h-7'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </Link>
    </div>
  );
}

export async function loader() {
  const token = getAuthToken();
  // get todo list
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todos/`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return data;
  } catch (err: any) {
    throw json(
      { message: err.response.data.detail },
      { status: err.response.status }
    );
  }
}

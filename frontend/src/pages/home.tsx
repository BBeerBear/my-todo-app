import { Link } from 'react-router-dom';
import TodoList from '../components/todos/todo-list';
import { useState, useRef } from 'react';
import TodoDetail from '../components/todos/todo-detail';
import useclickOutside from '../helpers/click-outside';

export default function HomePage() {
  const [openTodo, setOpenTodo] = useState(true);
  const todoDetailPopup = useRef<HTMLDivElement>(null);

  useclickOutside(todoDetailPopup, () => {
    setOpenTodo(false);
  });

  return (
    <div>
      {openTodo && (
        <div ref={todoDetailPopup}>
          <TodoDetail />
        </div>
      )}
      <TodoList />
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
  // get todo list
  return null;
}

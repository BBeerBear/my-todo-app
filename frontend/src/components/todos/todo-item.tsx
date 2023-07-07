import { useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import useclickOutside from '../..//helpers/click-outside';
import TodoDetail from './todo-detail';

type Props = {
  todo: {
    title: string;
    description: string;
    priority: number;
    complete: boolean;
    id: number;
    // owner_id: number;
  };
};

export default function TodoItem({ todo }: Props) {
  const [openTodo, setOpenTodo] = useState(false);
  const todoDetailPopup = useRef<HTMLDivElement>(null);

  useclickOutside(todoDetailPopup, () => {
    setOpenTodo(false);
  });

  const prior_color = [
    'text-green-500',
    'text-blue-500',
    'text-orange-500',
    'text-red-500',
    'text-red-700',
  ];
  return !todo.complete ? (
    <>
      {openTodo && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg- bg-slate-900/75 z-[99]'>
          <div ref={todoDetailPopup}>
            <TodoDetail title={todo.title} description={todo.description} />
          </div>
        </div>
      )}
      <div className='bg-slate-600 rounded-md p-4 flex justify-between items-center'>
        {/* header */}
        <div className='flex flex-col gap-2'>
          <div
            className={`text-sm ${
              prior_color[todo.priority - 1]
            } font-extrabold`}
          >
            Priority: {todo.priority}
          </div>
          <div className='text-xl'>{todo.title}</div>
        </div>
        <div className='flex items-center justify-center gap-3'>
          {/* edit todo */}
          <Link
            to={`todos/${todo.id}/edit`}
            className='circle_icon bg-gradient-to-br from-violet-400 to-sky-400 p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
          </Link>
          {/* complete todo */}
          <Form
            method='post'
            action={`todos/${todo.id}/complete`}
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to complete this todo.')) {
                event.preventDefault();
              }
            }}
          >
            <button
              type='submit'
              className='circle_icon border-none bg-green-400 p-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 12.75l6 6 9-13.5'
                />
              </svg>
            </button>
          </Form>
          {/* delete */}
          <Form
            method='post'
            action={`todos/${todo.id}/delete`}
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this todo.')) {
                event.preventDefault();
              }
            }}
          >
            <button
              type='submit'
              className='circle_icon border-none bg-red-400 p-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </button>
          </Form>
          {/* more */}
          <div
            className='circle_icon bg-slate-500 p-2 cursor-pointer'
            onClick={() => {
              setOpenTodo(true);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

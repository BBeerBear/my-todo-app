import { Link, NavLink, Form } from 'react-router-dom';

export default function Header() {
  return (
    <div className='fixed top-0 h-16 bg-slate-900 w-screen z-50 flex items-center justify-between p-2 text-xl'>
      <Link
        className='rounded-md flex justify-center items-center cursor-pointer px-5 font-mono text-2xl font-extrabold'
        to='/'
      >
        Todoarc
      </Link>
      <NavLink to='/' className='flex gap-2 w-2/5 justify-center'>
        <div className='rounded-md flex justify-center items-center hover:bg-slate-700 cursor-pointer p-2 px-8'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
        </div>
        <div className='rounded-md flex justify-center items-center hover:bg-slate-700 cursor-pointer p-2 px-8'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
        </div>
      </NavLink>
      <Form
        method='post'
        action='/logout'
        onSubmit={(event) => {
          if (!confirm('Please confirm you want to log out.')) {
            event.preventDefault();
          }
        }}
      >
        <button className='bg-gradient-to-br from-blue-800'>Log Out</button>
      </Form>
    </div>
  );
}

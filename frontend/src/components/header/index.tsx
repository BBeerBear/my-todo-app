import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='fixed top-0 h-16 bg-slate-900 w-screen z-50 flex justify-between p-2 text-xl'>
      <Link
        className='rounded-md flex justify-center items-center cursor-pointer px-5'
        to='/'
      >
        Todo App
      </Link>
      <NavLink to='/' className='flex w-2/5 justify-center'>
        <div className='rounded-md flex justify-center items-center hover:bg-slate-700 cursor-pointer px-5'>
          Home
        </div>
        <div className='rounded-md flex justify-center items-center hover:bg-slate-700 cursor-pointer px-5'>
          Portforlio
        </div>
      </NavLink>
      <Link
        to='/auth'
        className='rounded-md flex justify-center items-center hover:bg-slate-700 cursor-pointer px-5'
      >
        Log Out
      </Link>
    </div>
  );
}

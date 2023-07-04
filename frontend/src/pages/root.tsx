import { Outlet } from 'react-router-dom';
import Header from '../components/header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className='pt-16 h-screen overflow-y-auto'>
        <Outlet />
      </main>
    </>
  );
}

import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import Header from '../components/header';
import { useEffect } from 'react';
import { getTokenDuration } from '../../util/auth';

export default function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'EXPIRIED') {
      // remove token from local storage
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuraion = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuraion);
  }, [token, submit]);

  return (
    <>
      <Header />
      <main className='pt-16 h-screen overflow-y-auto'>
        <Outlet />
      </main>
    </>
  );
}

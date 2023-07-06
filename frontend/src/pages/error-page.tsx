import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  return (
    <div className='p-4 flex flex-col gap-2 text-center'>
      <p className='text-2xl'>{error.status}</p>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.data?.message}</i>
      </p>
    </div>
  );
}

export async function loader() {}

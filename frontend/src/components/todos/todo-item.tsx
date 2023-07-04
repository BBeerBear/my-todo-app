import { Form, Link } from 'react-router-dom';

export default function TodoItem() {
  return (
    <div className='bg-slate-600 rounded-md p-4 flex flex-col'>
      {/* header */}
      <div className='flex justify-between p-1'>
        <div className='text-xl'>Title</div>
        <div>Priority: 1</div>
      </div>
      <div className='splitter'></div>
      <div className='flex items-end justify-between'>
        {/* Details */}
        <div className='w-4/5 h-24 p-2 flex items-center'>
          <span className='text-lg'>Take out the trash</span>
        </div>
        {/* button */}
        <div className='flex justify-center gap-2'>
          <Link to='todos/1/edit'>Edit</Link>
          <Form
            method='post'
            action={`1/cmplete`}
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this todo.')) {
                event.preventDefault();
              }
            }}
          >
            <button type='submit' className='bg-green-800'>
              Complete
            </button>
          </Form>
          <Form
            method='post'
            action={`todos/1/delete`}
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this todo.')) {
                event.preventDefault();
              }
            }}
          >
            <button type='submit' className='bg-red-800'>
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

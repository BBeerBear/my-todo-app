import { Form, useNavigate } from 'react-router-dom';

type FormMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type Props = {
  method: FormMethod;
  todoData?: { title: string; description: string; priority: number };
};

export default function TodoForm({ method, todoData }: Props) {
  const priorityArray = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  function cancleHandler() {
    navigate(-1);
  }
  return (
    <Form
      method={method}
      className='w-[500px] m-auto mt-5 bg-slate-600 rounded-md flex flex-col gap-2 p-5'
    >
      {/* header */}
      <div className='text-lg text-center'>
        {method === 'post' ? 'Make a new Todo' : 'Edit Todo'}
      </div>
      <div className='splitter'></div>
      <label htmlFor='title'>
        Title
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={todoData?.title}
        />
      </label>
      <label htmlFor='description'>
        Description
        <textarea
          id='description'
          name='description'
          rows={5}
          required
          className='text-slate-700 font-normal'
          defaultValue={todoData?.description}
        />
      </label>
      <label htmlFor='priority'>
        Priority
        <select name='priority' id='priority' value={todoData?.priority}>
          {priorityArray.map((priority) => (
            <option value='1' key={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>
      <div className='flex justify-between gap-3'>
        <button
          type='submit'
          className='flex-1 mt-3 bg-gradient-to-r from-orange-500 to-red-500 p-3'
        >
          Save
        </button>
        <button
          type='button'
          className=' flex-1 mt-3 bg-gray-700 p-3'
          onClick={cancleHandler}
        >
          Cancle
        </button>
      </div>
    </Form>
  );
}

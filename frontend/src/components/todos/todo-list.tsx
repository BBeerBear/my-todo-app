import TodoItem from './todo-item';

export default function TodoList() {
  return (
    <div className='w-3/5 relative top-5 mx-auto rounded-md flex flex-col gap-3'>
      <div className='text-center bg-slate-700 p-4 rounded-md text-xl'>
        Your Todos
      </div>
      <TodoItem />
    </div>
  );
}

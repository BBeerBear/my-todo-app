import TodoItem from './todo-item';

type Props = {
  setOpenTodo: React.Dispatch<React.SetStateAction<boolean>>;
  todos: [];
};

export default function TodoList({ setOpenTodo, todos }: Props) {
  return (
    <div className='w-3/5 relative top-5 mx-auto rounded-md flex flex-col gap-3'>
      <div className='text-center bg-slate-700 p-4 rounded-md text-xl'>
        Your Todos
      </div>
      {todos.map((todo, index) => (
        <TodoItem setOpenTodo={setOpenTodo} todo={todo} key={index} />
      ))}
    </div>
  );
}

import TodoList from '../components/todos/todo-list';

function HomePage() {
  return (
    <div className='pt-16 h-screen overflow-y-auto'>
      <TodoList />
    </div>
  );
}

export default HomePage;

import { redirect, ActionFunction } from 'react-router-dom';
export const action: ActionFunction = async ({ params }) => {
  console.log(params.todoId);
  //delete code
  return redirect('/');
};

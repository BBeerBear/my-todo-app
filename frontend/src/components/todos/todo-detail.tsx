import useclickOutside from '../../helpers/click-outside';
import { useRef } from 'react';

export default function TodoDetail() {
  const todoDetailPopup = useRef();
  // useClickOutside(todoDetailPopup, () => {
  //   setShowSearchMenu(false);
  // });
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-slate-900/75 z-[99]'>
      <div className='w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-md flex flex-col gap-2'>
        <div className='text-xl'>Title</div>
        <div className='splitter'></div>
        <div className='text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
          quisquam?
        </div>
      </div>
    </div>
  );
}

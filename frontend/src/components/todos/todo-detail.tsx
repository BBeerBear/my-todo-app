type Props = {
  title: String;
  description: String;
};

export default function TodoDetail({ title, description }: Props) {
  return (
    <div className='w-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-6 rounded-md flex flex-col gap-2'>
      <div className='text-xl'>{title}</div>
      <div className='splitter'></div>
      <div className='text-lg'>{description}</div>
    </div>
  );
}

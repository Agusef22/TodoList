import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'

export default function TaskCard({ task }) {
  const { deleteTask, updateTask } = useContext(UserContext)

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done })
  }

  return (
    <div className='card h-full w-full snap-center  bg-base-200 shadow-md mt-3'>
      <div className='card-body'>
        <p className='break-words text-justify overflow-y-scroll h-20'>
          {task.name}
        </p>
        <p>{task.done ? '✔️' : '❌'}</p>
        <div className='flex items-center justify-center gap-3'>
          <button
            onClick={handleDelete}
            type='button'
            className='btn btn-square btn-outline'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <button onClick={handleToggleDone} type='button' className='btn'>
            {task.done ? 'Pending' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  )
}

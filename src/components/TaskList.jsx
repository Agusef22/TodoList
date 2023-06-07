import { UserContext } from '@/context/UserContext'
import { useContext, useEffect } from 'react'
import TaskCard from './TaskCard'

export default function TaskList({ done = false }) {
  const { tasks, getTasks, loadingList } = useContext(UserContext)

  useEffect(() => {
    getTasks(done)
  }, [done])

  return (
    <div>
      {loadingList ? (
        <span className='loading loading-spinner loading-md'></span>
      ) : tasks.length === 0 ? (
        <p>Not found tasks</p>
      ) : (
        <>
          <h1>TaskList</h1>
          <div className='h-72 overflow-scroll snap-y snap-mandatory p-5'>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

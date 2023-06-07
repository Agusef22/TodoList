import { UserContext } from '@/context/UserContext'
import { useContext, useState } from 'react'
import TaskList from './TaskList'

export default function TaskForm() {
  const [taskName, setTaskName] = useState('')
  const { createTask, adding } = useContext(UserContext)
  const [showToast, setShowToast] = useState(false)
  const [showTaskDone, setShowTaskDone] = useState(false)

  const showMessage = () => {
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (taskName.length < 5) return alert('Ingrese mas de 5 letras')

    createTask(taskName)
    setTaskName('')
  }

  return (
    <form onSubmit={handleSubmit} className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>TodoList</h1>
        </div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Task Name</span>
              </label>
              <input
                type='text'
                name='taskname'
                value={taskName}
                required
                placeholder='Write a task name (more 5 leters)'
                className='input input-bordered'
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className='form-control mt-6'>
              {taskName.length < 5 ? (
                <button className='btn' disabled='disabled'>
                  Add
                </button>
              ) : (
                <button onClick={showMessage} className='btn btn-primary'>
                  {adding ? 'Adding...' : 'Add'}
                </button>
              )}
            </div>
            <div className='divider'>---</div>

            {showTaskDone ? (
              <button
                onClick={() => setShowTaskDone(!showTaskDone)}
                type='button'
                className='btn btn-primary'
              >
                Show tasks pending
              </button>
            ) : (
              <button
                onClick={() => setShowTaskDone(!showTaskDone)}
                type='button'
                className='btn btn-success'
              >
                Show tasks done
              </button>
            )}

            {showToast ? (
              <div className='toast'>
                <div className='alert alert-info'>
                  <span>Task saved successfully</span>
                </div>
              </div>
            ) : (
              ''
            )}

            <TaskList done={showTaskDone} />
          </div>
        </div>
      </div>
    </form>
  )
}

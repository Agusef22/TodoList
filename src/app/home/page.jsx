'use client'
import { client } from '../supabase/client'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import TaskForm from '@/components/TaskForm'

export default function HomeTodo() {
  const router = useRouter()
  const { isUser, loading, setLoading } = useContext(UserContext)

  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push('/login')
      } else {
        setLoading(false)
        router.push('/home')
      }
    })
  }, [isUser])

  return (
    <>
      {!loading && (
        <>
          <TaskForm />
          <button
            className='btn btn-primary absolute top-0 right-0 mt-1 mr-1 z-10'
            onClick={() => client.auth.signOut()}
          >
            Logout
          </button>
        </>
      )}
    </>
  )
}

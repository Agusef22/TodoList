'use client'
import { UserContext } from '@/context/UserContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { client } from './supabase/client'

export default function Home() {
  const { isUser, loading, setLoading } = useContext(UserContext)

  const router = useRouter()
  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setLoading(false)
        router.replace('/')
      } else {
        router.replace('/home')
      }
    })
  }, [isUser])

  return (
    <>
      {!loading && (
        <div>
          <div className='hero min-h-screen bg-base-200'>
            <div className='hero-content text-center'>
              <div className='max-w-md'>
                <h1 className='text-5xl font-bold'>Todo List</h1>
                <p className='py-6'>
                  Welcome to your Task List! Organize and manage your tasks
                  efficiently. Start being more productive today!
                </p>

                <Link className='btn btn-primary' href='/login'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

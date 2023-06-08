'use client'

import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { client } from '../supabase/client'

export default function Login() {
  const [email, setEmail] = useState('')

  const { isUser, setLoading, loading } = useContext(UserContext)

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await client.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: 'https://todo-list-845ks3kgt-agusef22.vercel.app/'
        }
      })
    } catch (error) {
      console.error(error)
    }
    setEmail('')
  }

  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setLoading(false)
        router.replace('/login')
      } else {
        router.replace('/home')
      }
    })
  }, [isUser])

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit} className='hero min-h-screen bg-base-200'>
          <div className='hero-content flex-col lg:flex-row-reverse'>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl font-bold'>Login now!</h1>
              <p className='py-6'>
                Login to access your Task List. Stay organized and keep track of
                your tasks effortlessly
              </p>
            </div>
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <div className='card-body'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='YourEmail@site.com'
                    className='input input-bordered'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-control mt-6'>
                  <button className='btn btn-primary'>Send</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

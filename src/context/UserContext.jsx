'use client'

import { client } from '@/app/supabase/client'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export default function UserProvider({ children }) {
  const [isUser, setIsUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingList, setLoadingList] = useState(false)
  const [tasks, setTasks] = useState([])
  const [adding, setAdding] = useState(false)

  const getTasks = async (done = false) => {
    setLoadingList(true)
    const { data: user } = await client.auth.getUser()
    const { error, data } = await client
      .from('tasks')
      .select()
      .eq('userId', user.user.id)
      .eq('done', done)
      .order('id', { ascending: true })

    if (error) throw error

    setTasks(data)
    setLoadingList(false)
  }

  const createTask = async (taskName) => {
    setAdding(true)
    try {
      const { data: user } = await client.auth.getUser()

      const { error, data } = await client
        .from('tasks')
        .insert({
          name: taskName,
          userId: user.user.id
        })
        .select()

      if (error) throw error

      setTasks([...tasks, ...data])
    } catch (error) {
      console.error(error)
    } finally {
      setAdding(false)
    }
  }

  const deleteTask = async (id) => {
    const { error } = await client.from('tasks').delete().eq('id', id)
    if (error) throw error

    setTasks(tasks.filter((task) => task.id != id))
  }

  const updateTask = async (id, updateFields) => {
    const { error } = await client
      .from('tasks')
      .update(updateFields)
      .eq('id', id)

    if (error) throw error

    setTasks(tasks.filter((task) => task.id != id))
  }

  const getUserr = async () => {
    const {
      data: { user }
    } = await client.auth.getUser()
    setIsUser(user)
  }

  useEffect(() => {
    getUserr()
  }, [])

  return (
    <UserContext.Provider
      value={{
        isUser,
        setIsUser,
        loading,
        setLoading,
        tasks,
        getTasks,
        createTask,
        adding,
        loadingList,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

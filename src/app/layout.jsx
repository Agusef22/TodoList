import UserProvider from '@/context/UserContext'
import './globals.css'

export const metadata = {
  title: 'TodoList',
  description: 'Lista tus ideas'
}

export default function RootLayout({ children }) {
  return (
    <html data-theme='retro' lang='en'>
      <body className='font-sans'>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}

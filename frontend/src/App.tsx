import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import Workspace from './components/Workspace'
import Navbar from './components/Navbar'

function App() {

  const queryClient = new QueryClient()


  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Workspace />
      </QueryClientProvider>
    </>
  )
}

export default App

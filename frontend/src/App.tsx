import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import Workspace from './components/Workspace'
import Navbar from './components/Navbar'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>

        <SignedOut>
          {/* make a landing page component */}
        </SignedOut>

        <SignedIn>
          {/* make a home route where the user can choose workspace */}
          {/* make a workspace route to house this: */} 
          <Workspace />
        </SignedIn>
      </QueryClientProvider>
    </>
  )
}

export default App

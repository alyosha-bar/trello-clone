import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import Workspace from './components/Workspace'
import Navbar from './components/Navbar'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        
          <SignedOut>
            {/* make a landing page component */}
            <Routes>
              <Route path='/' element={<Landing />}/>
            </Routes>
          </SignedOut>

          <SignedIn>
            {/* make a home route where the user can choose workspace */}
            {/* make a workspace route to house this: */} 
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/workspace/:workspace_id' element={<Workspace />}/>
            </Routes>
          </SignedIn>
        
      </QueryClientProvider>
    </>
  )
}

export default App

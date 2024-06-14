import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes.tsx'
import { AppProvider, AuthProvider, ModalProvider } from '@/providers'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
            <ModalProvider />
          </AuthProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

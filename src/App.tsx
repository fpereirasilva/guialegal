import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CityProvider, useCity } from './hooks/useCity'
import { AdminProvider } from './hooks/useAdmin'
import Layout from './components/Layout'
import CitySelector from './components/CitySelector'
import Home from './pages/Home'
import Tourism from './pages/Tourism'
import Commerce from './pages/Commerce'
import Events from './pages/Events'
import Utilities from './pages/Utilities'
import PlaceDetail from './pages/PlaceDetail'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPlaceForm from './pages/admin/AdminPlaceForm'
import AdminEventForm from './pages/admin/AdminEventForm'

function RequireCity({ children }: { children: React.ReactNode }) {
  const { city } = useCity()
  if (!city) return <Navigate to="/cidade" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/cidade" element={<Layout />}>
        <Route index element={<CitySelector />} />
      </Route>
      <Route path="/" element={<RequireCity><Layout /></RequireCity>}>
        <Route index element={<Home />} />
        <Route path="turismo" element={<Tourism />} />
        <Route path="comercio" element={<Commerce />} />
        <Route path="eventos" element={<Events />} />
        <Route path="utilidades" element={<Utilities />} />
        <Route path="lugar/:id" element={<PlaceDetail />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/lugar/:id" element={<AdminPlaceForm />} />
        <Route path="admin/evento/:id" element={<AdminEventForm />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CityProvider>
        <AdminProvider>
          <AppRoutes />
        </AdminProvider>
      </CityProvider>
    </BrowserRouter>
  )
}

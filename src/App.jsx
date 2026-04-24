import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/loginPage'
import SignupPage from './pages/signinPage'

import SidebarLayout from './componenet/sideBar/SideBar'
import MainLayout from './Homepage/MainLayout'
import Dashbored from './pages/student/dashbored'
import Lab from './pages/student/lab'
import PracticeHub from './pages/student/practiceHub'
import TextBook from './pages/student/textbook'
import Settings from './pages/setting'
import Chat from './pages/student/chat'

function App() {
  return (
    <div className="w-full h-screen">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
         {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        {/* Protected / App layout routes */}
        <Route
          path="/chat"
          element={
            <SidebarLayout>
              <Chat />
            </SidebarLayout>
          }
        />
        <Route
          path="/dashbored"
          element={
            <SidebarLayout>
              <Dashbored/>
            </SidebarLayout>
          }
        />

        <Route
          path="/lab"
          element={
            <SidebarLayout>
              <Lab />
            </SidebarLayout>
          }
        />

        <Route
          path="/practice-hub"
          element={
            <SidebarLayout>
              <PracticeHub />
            </SidebarLayout>
          }
        />

        <Route
          path="/text-book"
          element={
            <SidebarLayout>
              <TextBook />
            </SidebarLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <SidebarLayout>
              <Settings />
            </SidebarLayout>
          }
        />

      </Routes>
    </div>
  )
}

export default App
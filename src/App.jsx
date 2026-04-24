import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/loginPage'
import SignupPage from './pages/signinPage'

import SidebarLayout from './componenet/sideBar/SideBar'
import MainLayout from './Homepage/MainLayout'

import Lab from './pages/student/lab'
import PracticeHub from './pages/student/practiceHub'
import TextBook from './pages/student/textbook'
import TextbookGallery from './pages/student/textBookGallary'
import Settings from './pages/setting'
import Chat from './pages/student/chat'
import Dashbored from "./pages/student/dashbored"
import ProfilePage from './pages/profile'
import Practice from './pages/student/practice'
import LabAccessDrive from './pages/student/canvasPage'

function App() {
  return (
    <div className="w-full h-screen">
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

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
          path="/lab-access-drive/:canvasId"
          element={
            <SidebarLayout>
              <LabAccessDrive/>
            </SidebarLayout>
          }
        />
        <Route
          path="/text-books"
          element={
            <SidebarLayout>
              <TextbookGallery/>
            </SidebarLayout>
          }
        />
        <Route
          path="/dashbored"
          element={
            <SidebarLayout>
              <Dashbored />
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
          path="/practicehub"
          element={
            <SidebarLayout>
              <PracticeHub />
            </SidebarLayout>
          }
        />

        <Route
          path="/text-book/:textbookId"
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
        <Route
          path="/profile"
          element={
            <SidebarLayout>
              <ProfilePage />
            </SidebarLayout>
          }
        /> 
          <Route
          path="/practice"
          element={
            <SidebarLayout>
              <Practice/>
            </SidebarLayout>
          }
        />

      </Routes>
    </div>
  )
}

export default App
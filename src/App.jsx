import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signinPage'
import SidebarLayout from './componenet/sideBar/SideBar'
import Lab from './pages/student/lab'
import PracticeHub from './pages/student/practiceHub'
import TextBook from './pages/student/textbook'
import Settings from './pages/setting'
import Chat from './pages/student/chat'

function App() {

  return (
    <div className="w-full h-screen ">
      <Routes>
        <Route path="/" element={<SidebarLayout><h1 className="text-3xl font-bold">Home Page</h1></SidebarLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />


        <Route path="/chat" element={<SidebarLayout><Chat /></SidebarLayout>} />
        <Route path="/lab" element={<SidebarLayout><Lab /></SidebarLayout>} />
        <Route path="/practice-hub" element={<SidebarLayout><PracticeHub /></SidebarLayout>} />
        <Route path="/text-book" element={<SidebarLayout><TextBook /></SidebarLayout>} />
        <Route path="/settings" element={<SidebarLayout><Settings /></SidebarLayout>} />


      </Routes>
    </div>
  )
}

export default App;
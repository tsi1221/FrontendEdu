// App.jsx
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/loginPage';
import SignupPage from './pages/signinPage';

import SidebarLayout from './componenet/sideBar/SideBar';
import MainLayout from './Homepage/MainLayout';

import Lab from './pages/student/lab';
import PracticeHub from './pages/student/practiceHub';
import TextBook from './pages/student/textbook';
import TextbookGallery from './pages/student/textBookGallary';
import Settings from './pages/setting';
import Chat from './pages/student/chat';
import Dashbored from './pages/student/dashbored';
import ProfilePage from './pages/profile';
import Practice from './pages/student/practice';
import TeacherDashboard from './pages/teacher/dashbored';
import Quiz from './pages/teacher/quiz';
import GeneratedQuizzes from './pages/teacher/generatedQueze'; // adjust path as needed

import { QuizProvider } from './pages/teacher/QuizContext'; // import the context provider
import SubscriptionStats from './pages/admin/subscription';
import SchoolStats from './pages/admin/schoolStats';
import SystemHealth from './pages/admin/systemHealth';
import AdminGeneratedQuizzes from './pages/admin/generatedQuizzes';

function App() {
  return (
    <div className="w-full h-screen">
      <QuizProvider>
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
            path="/text-books"
            element={
              <SidebarLayout>
                <TextbookGallery />
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
                <Practice />
              </SidebarLayout>
            }
          />

          {/* Teacher routes */}
          <Route
            path="/teacher-dashbored"
            element={
              <SidebarLayout>
                <TeacherDashboard />
              </SidebarLayout>
            }
          />
          <Route
            path="/quizes-geerate"
            element={
              <SidebarLayout>
                <Quiz />
              </SidebarLayout>
            }
          />
          <Route
            path="/generated-quizzes"
            element={
              <SidebarLayout>
                <GeneratedQuizzes />
              </SidebarLayout>
            }
          />
          <Route
            path="/subscription-stats"
            element={
              <SidebarLayout>
                <SubscriptionStats />
              </SidebarLayout>
            }
          />
          <Route
            path="/admin-generated-quizzes"
            element={
              <SidebarLayout>
                <AdminGeneratedQuizzes />
              </SidebarLayout>
            }
          />
          <Route
            path="/add-school"
            element={
              <SidebarLayout>
                <SchoolStats/>
              </SidebarLayout>
            }
          />
          <Route
            path="/system-health"
            element={
              <SidebarLayout>
                <SystemHealth/>
              </SidebarLayout>
            }
          />
        </Routes>
      </QuizProvider>
    </div>
  );
}

export default App;
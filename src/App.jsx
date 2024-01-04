import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { UserProvider } from './context/User';
import Layout from './components/shared/Layout';
// Remove 'Register' import if not used
// import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/Students';
import SignUpPage from './pages/RegisterPage';
import Proposal from './pages/Proposal';
import Notificaction from './components/Notification';
import CommentsPage from './pages/Comments';
import ViewComments from './pages/ViewComments';
import ApplicationForm from './pages/ApplicationForm';
import TemplatePage from './pages/ApplicationTemplate';
import Settings from './pages/Settings';
import StudentRegistration from './Page/StudentRegistration';
import AdminDashboard from './Page/AdminDashboard';
import SendDocuments from './Page/SendDocuments';
import StudentRegisterData from './Page/StudentRegisterData';
import SendEmail from "./Page/SendEmail";
import SecondEmail from "./Page/SendEmail1"; // Rename to PascalCase
import TeacherRegistration from "./Page/TeacherRegistration";
import TeachersRegisterData from './Page/TeachersRegisterData';
import StudentUpdate from "./Page/StudentUpdate";
import TeacherUpdate from "./Page/TeacherUpdate";
import SideBar from './components/Sidebar/SideBar';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="proposal" element={<Proposal />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="comments" element={<CommentsPage />} />
                        <Route path="view-comments" element={<ViewComments />} />
                        <Route path="application-form" element={<ApplicationForm />} />
                        <Route path="templates" element={<TemplatePage />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="students" element={<StudentsPage />} />
                    </Route>
                    <Route path="/register" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/studentRegistration" element={<StudentRegistration />} />
                    <Route path="/teacherRegistration" element={<TeacherRegistration />} />
                    <Route
                        path="admin/*"
                        element={
                            <SideBar>
                                <Outlet />
                            </SideBar>
                        }
                    >
                        <Route path="admin/dashboard" element={<AdminDashboard />} />
                        <Route path="admin/sendEmail/:id" element={<SendEmail />} />
                        <Route path="admin/second_Email/:id" element={<SecondEmail />} />
                        <Route path="admin/send-documents" element={<SendDocuments />} />
                        <Route path="admin/studentRegisterData" element={<StudentRegisterData />} />
                        <Route path="admin/teacherRegisterData" element={<TeachersRegisterData />} />
                        <Route path="admin/update_Student/:id" element={<StudentUpdate/>} />
                        <Route path="admin/update_Teacher/:id" element={<TeacherUpdate/>} />
                    </Route>
                </Routes>
                <Notificaction />
            </UserProvider>
        </Router>
    );
}

export default App;

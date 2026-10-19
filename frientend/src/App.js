import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Auth */
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import ForgotPassword from "./Pages/auth/ForgotPassword";

/* Admin */
import AdminLayout from "./Pages/adminDashboard/AdminLayout";
import AdminDashboard from "./Pages/adminDashboard/AdminDashboard";
import AdminLogin from "./Pages/adminDashboard/AdminLogin";
import Users from "./Pages/adminDashboard/Users";
import Courses from "./Pages/adminDashboard/Courses";
import Doubts from "./Pages/adminDashboard/Doubts";
import AddCourse from "./Pages/InputForms/AddCourse";
import EditMainPage from "./Pages/adminDashboard/EditMainPage";

/* Student */
import StudentLayout from "./Pages/studentDashbord/StudentLayout";
import MyCourses from "./Pages/studentDashbord/MyCourses";
import StudentCertificate from "./Pages/studentDashbord/StudentCertificate";
import StudentProfile from "./Pages/studentDashbord/StudentProfile";
import StudentSettings from "./Pages/studentDashbord/StudentSettings";
import StudentVideoPlayer from "./Pages/studentDashbord/StudentVideoPlayer";

/* Common */
import Layout from "./Pages/Componunt/Layout";
import BuyCourse from "./Pages/Componunt/BayCourse";
import BayCourse from "./Pages/Componunt/BayCourse";
import PaymentPage from "./Pages/Componunt/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Public Pages */}
        <Route path="/" element={<Layout />} />
        <Route path="/buycourse" element={<BuyCourse />} />
        <Route path="/baycourse/:id" element={<BayCourse />} />
        <Route path="/paymentpage" element={<PaymentPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />

        {/* Admin Login (Standalone) */}
        <Route path="/adminLogin" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="courses" element={<Courses />} />
          <Route path="doubts" element={<Doubts />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="editmainpage" element={<EditMainPage />} />
        </Route>

        {/* Student Dashboard */}
        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<MyCourses />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="studentcertificate" element={<StudentCertificate />} />
          <Route path="studentprofile" element={<StudentProfile />} />
          <Route path="studentsettings" element={<StudentSettings />} />
          <Route path="videoplayer" element={<StudentVideoPlayer />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

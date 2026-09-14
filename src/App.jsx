import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import "./App.css";


// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";


// Student
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Lessons from "./pages/Lessons";
import Files from "./pages/Files";
import Exams from "./pages/Exams";

import SubjectDetails from "./pages/SubjectDetails";
import SubjectLessons from "./pages/SubjectLessons";
import SubjectFiles from "./pages/SubjectFiles";
import SubjectExams from "./pages/SubjectExams";
import Exam from "./pages/Exam";


// AI Assistant
import AI from "./pages/AI";


// Teacher
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherLessons from "./pages/TeacherLessons";
import TeacherFiles from "./pages/TeacherFiles";
import TeacherExams from "./pages/TeacherExams";


// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminSubjects from "./pages/AdminSubjects";


// General
import Users from "./pages/Users";
import Profile from "./pages/Profile";


// Layout
import PlatformLayout from "./components/PlatformLayout";





function ProtectedRoute({
  user,
  allowedRoles,
  children
}) {


  if (!user) {

    return <Navigate to="/login" replace />;

  }



  const role =
    user.role?.toLowerCase();



  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {

    return (
      <Navigate
        to={getHomeRoute(user)}
        replace
      />
    );

  }


  return children;

}







function getHomeRoute(user) {


  if (!user)

    return "/login";



  const role =
    user.role?.toLowerCase();



  if (role === "admin")

    return "/admin/dashboard";



  if (role === "teacher")

    return "/teacher/dashboard";



  return "/dashboard";

}









function App() {


  const navigate = useNavigate();



  function getCurrentUser() {


    const savedUser =
      localStorage.getItem("user");



    if (!savedUser)

      return null;



    try {

      return JSON.parse(savedUser);

    }

    catch {

      return null;

    }

  }







  function handleLogin(user) {


    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    localStorage.setItem(
      "token",
      "token"
    );


    navigate(
      getHomeRoute(user)
    );

  }







  function handleRegister(user) {


    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    localStorage.setItem(
      "token",
      "token"
    );


    navigate(
      getHomeRoute(user)
    );

  }







  function logout() {


    localStorage.removeItem(
      "user"
    );


    localStorage.removeItem(
      "token"
    );


    navigate("/login");

  }







  const currentUser =
    getCurrentUser();




  return (

    <Routes>



      <Route
        path="/"
        element={
          <Navigate
            to={
              getHomeRoute(currentUser)
            }
            replace
          />
        }
      />





      <Route
        path="/login"
        element={

          currentUser

          ?

          <Navigate
            to={
              getHomeRoute(currentUser)
            }
          />

          :

          <Login
            onLogin={handleLogin}
            goToRegister={
              () => navigate("/register")
            }
          />

        }
      />





      <Route
        path="/register"
        element={

          currentUser

          ?

          <Navigate
            to={
              getHomeRoute(currentUser)
            }
          />

          :

          <Register
            onRegister={handleRegister}
            goToLogin={
              () => navigate("/login")
            }
          />

        }
      />






      <Route
        element={
          <PlatformLayout
            logout={logout}
          />
        }
      >



        {/* AI Assistant */}

        <Route
          path="/ai"
          element={
            <ProtectedRoute
              user={currentUser}
            >
              <AI />
            </ProtectedRoute>
          }
        />





        {/* Student */}


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/subjects"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <Subjects />
            </ProtectedRoute>
          }
        />



        <Route
          path="/lessons"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <Lessons />
            </ProtectedRoute>
          }
        />



        <Route
          path="/files"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <Files />
            </ProtectedRoute>
          }
        />



        <Route
          path="/exams"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <Exams />
            </ProtectedRoute>
          }
        />




        <Route
          path="/subject/:id"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <SubjectDetails />
            </ProtectedRoute>
          }
        />



        <Route
          path="/subject/:id/lessons"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <SubjectLessons />
            </ProtectedRoute>
          }
        />



        <Route
          path="/subject/:id/files"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <SubjectFiles />
            </ProtectedRoute>
          }
        />



        <Route
          path="/subject/:id/exams"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <SubjectExams />
            </ProtectedRoute>
          }
        />



        <Route
          path="/exam/:id"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "student"
              ]}
            >
              <Exam />
            </ProtectedRoute>
          }
        />





        {/* Teacher */}


        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "teacher"
              ]}
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/teacher/lessons"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "teacher"
              ]}
            >
              <TeacherLessons />
            </ProtectedRoute>
          }
        />



        <Route
          path="/teacher/files"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "teacher"
              ]}
            >
              <TeacherFiles />
            </ProtectedRoute>
          }
        />



        <Route
          path="/teacher/exams"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "teacher"
              ]}
            >
              <TeacherExams />
            </ProtectedRoute>
          }
        />





        {/* Admin */}


        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "admin"
              ]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "admin"
              ]}
            >
              <AdminUsers />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRoles={[
                "admin"
              ]}
            >
              <AdminSubjects />
            </ProtectedRoute>
          }
        />





        {/* General */}


        <Route
          path="/users"
          element={
            <ProtectedRoute
              user={currentUser}
            >
              <Users />
            </ProtectedRoute>
          }
        />



        <Route
          path="/profile"
          element={
            <ProtectedRoute
              user={currentUser}
            >
              <Profile />
            </ProtectedRoute>
          }
        />



      </Route>





      <Route
        path="*"
        element={
          <Navigate
            to={
              getHomeRoute(currentUser)
            }
          />
        }
      />



    </Routes>

  );

}


export default App;
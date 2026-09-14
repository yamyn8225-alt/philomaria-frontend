import {
  Outlet,
  Link,
  useLocation
} from "react-router-dom";





function PlatformLayout({logout}) {



  const location = useLocation();




  const user =

    JSON.parse(

      localStorage.getItem("user")

    );







  function active(path){

    return location.pathname === path

    ? "active-menu"

    : "";

  }









  return (



    <div

      className="platform"

      dir="rtl"

    >





      <aside className="sidebar">






        <div className="sidebar-logo">


          <h2>

            منجلية فيلو ماريا

          </h2>


        </div>









        <nav className="sidebar-menu">







          {

          user?.role === "student" &&

          <>



          <Link

            className={active("/dashboard")}

            to="/dashboard"

          >

            🏠 الرئيسية

          </Link>







          <Link

            className={active("/subjects")}

            to="/subjects"

          >

            📚 موادي

          </Link>







          <Link

            className={active("/lessons")}

            to="/lessons"

          >

            📖 الدروس

          </Link>







          <Link

            className={active("/files")}

            to="/files"

          >

            📁 الملفات

          </Link>







          <Link

            className={active("/exams")}

            to="/exams"

          >

            📝 الاختبارات

          </Link>



          </>

          }









          {

          user?.role === "teacher" &&

          <>



          <Link

            className={active("/teacher/dashboard")}

            to="/teacher/dashboard"

          >

            🏠 لوحة المدرس

          </Link>







          <Link

            className={active("/teacher/lessons")}

            to="/teacher/lessons"

          >

            📖 إدارة الدروس

          </Link>







          <Link

            className={active("/teacher/files")}

            to="/teacher/files"

          >

            📁 إدارة الملفات

          </Link>







          <Link

            className={active("/teacher/exams")}

            to="/teacher/exams"

          >

            📝 إدارة الاختبارات

          </Link>



          </>

          }









          {

          user?.role === "admin" &&

          <>



          <Link

            className={active("/admin/dashboard")}

            to="/admin/dashboard"

          >

            🛡️ لوحة الإدارة

          </Link>







          <Link

            className={active("/admin/users")}

            to="/admin/users"

          >

            👥 إدارة المستخدمين

          </Link>







          <Link

            className={active("/admin/subjects")}

            to="/admin/subjects"

          >

            📚 إدارة المواد

          </Link>



          </>

          }









          <Link

            className={active("/users")}

            to="/users"

          >

            👨‍🏫 المعلمين

          </Link>









          <Link

            className={active("/profile")}

            to="/profile"

          >

            👤 الملف الشخصي

          </Link>







        </nav>









        <button

          className="logout-button"

          onClick={logout}

        >

          🚪 تسجيل الخروج

        </button>







      </aside>








      <main className="main-content">


        <Outlet />


      </main>







    </div>


  );


}





export default PlatformLayout;
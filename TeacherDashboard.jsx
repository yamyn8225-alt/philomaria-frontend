import {
  Link
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function TeacherDashboard(){


  const [teacher,setTeacher] = useState(null);

  const [students,setStudents] = useState([]);






  useEffect(()=>{



    const currentUser =

      JSON.parse(

        localStorage.getItem("user")

      );





    const users =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];






    if(!currentUser)

      return;







    const teacherData =

      users.find(

        user =>

        user.id === currentUser.id

      );






    setTeacher(teacherData);









    const teacherStudents =

      users.filter(

        user =>

        user.role === "student"

        &&

        teacherData?.years?.includes(

          user.year

        )

      );






    setStudents(teacherStudents);







  },[]);









  if(!teacher){



    return (

      <div

        className="page-content"

        dir="rtl"

      >

        <h2>

          لا توجد بيانات معلم

        </h2>


      </div>

    );


  }









  return (



    <div

      className="page-content"

      dir="rtl"

    >




      <h1 className="page-title">

        👨‍🏫 لوحة المعلم

      </h1>







      <p className="page-subtitle">

        مرحباً {teacher.name}

      </p>









      <div className="stats-grid">





        <div className="stat-card">

          <h3>

            📚 المادة

          </h3>


          <strong>

            {

            teacher.subjects

            ?

            teacher.subjects.join(" - ")

            :

            "غير محددة"

            }


          </strong>


        </div>







        <div className="stat-card">


          <h3>

            🎓 السنة

          </h3>


          <strong>

            {

            teacher.years

            ?

            teacher.years.join(" - ")

            :

            "غير محددة"

            }


          </strong>


        </div>







        <div className="stat-card">


          <h3>

            👨‍🎓 الطلاب

          </h3>


          <strong>

            {students.length}

          </strong>


        </div>





      </div>









      <div className="card">



        <h2>

          إدارة المادة

        </h2>






        <div className="subjects-grid">






          <Link

            to="/teacher/lessons"

            className="subject-menu-card"

          >

            <div>

              📖

            </div>


            <h2>

              الدروس

            </h2>


            <p>

              إضافة وإدارة الدروس

            </p>


          </Link>









          <Link

            to="/teacher/files"

            className="subject-menu-card"

          >

            <div>

              📁

            </div>


            <h2>

              الملفات

            </h2>


            <p>

              رفع ملفات المادة

            </p>


          </Link>









          <Link

            to="/teacher/exams"

            className="subject-menu-card"

          >

            <div>

              📝

            </div>


            <h2>

              الاختبارات

            </h2>


            <p>

              إنشاء الاختبارات

            </p>


          </Link>







        </div>


      </div>







    </div>


  );

}



export default TeacherDashboard;
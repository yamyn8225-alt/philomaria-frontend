import {
  Link
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function AdminDashboard(){



  const [users,setUsers] = useState([]);

  const [subjects,setSubjects] = useState([]);

  const [lessons,setLessons] = useState([]);

  const [files,setFiles] = useState([]);

  const [exams,setExams] = useState([]);







  useEffect(()=>{


    setUsers(

      JSON.parse(

        localStorage.getItem("users")

      ) || []

    );



    setSubjects(

      JSON.parse(

        localStorage.getItem("subjects")

      ) || []

    );



    setLessons(

      JSON.parse(

        localStorage.getItem("lessons")

      ) || []

    );



    setFiles(

      JSON.parse(

        localStorage.getItem("files")

      ) || []

    );



    setExams(

      JSON.parse(

        localStorage.getItem("exams")

      ) || []

    );



  },[]);









  const statistics = [



    {

      title:"الطلاب",

      value:

      users.filter(

        user=>user.role==="student"

      ).length,

      icon:"👨‍🎓"

    },





    {

      title:"المعلمين",

      value:

      users.filter(

        user=>user.role==="teacher"

      ).length,

      icon:"👨‍🏫"

    },





    {

      title:"الإداريين",

      value:

      users.filter(

        user=>user.role==="admin"

      ).length,

      icon:"🛡️"

    },





    {

      title:"المواد",

      value:subjects.length,

      icon:"📚"

    },





    {

      title:"الدروس",

      value:lessons.length,

      icon:"📖"

    },





    {

      title:"الملفات",

      value:files.length,

      icon:"📁"

    },





    {

      title:"الاختبارات",

      value:exams.length,

      icon:"📝"

    }



  ];











  return (



    <div

      className="page-content"

      dir="rtl"

    >




      <h1 className="page-title">

        🛡️ لوحة تحكم المدير

      </h1>






      <p className="page-subtitle">

        إدارة منصة منجلية فيلو ماريا

      </p>









      <div className="stats-grid">



      {

      statistics.map(item=>(



        <div

          className="stat-card"

          key={item.title}

        >



          <h3>

            {item.icon}

            {" "}

            {item.title}

          </h3>



          <strong>

            {item.value}

          </strong>



        </div>



      ))

      }



      </div>









      <div className="card">



        <h2>

          ⚙️ إدارة المنصة

        </h2>






        <div className="subjects-grid">






          <Link

            to="/admin/users"

            className="subject-menu-card"

          >

            <div>

              👥

            </div>


            <h2>

              المستخدمين

            </h2>


            <p>

              إدارة الطلاب والمعلمين

            </p>


          </Link>








          <Link

            to="/admin/subjects"

            className="subject-menu-card"

          >

            <div>

              📚

            </div>


            <h2>

              المواد

            </h2>


            <p>

              إدارة المواد الدراسية

            </p>


          </Link>








          <Link

            to="/admin/exams"

            className="subject-menu-card"

          >

            <div>

              📝

            </div>


            <h2>

              الاختبارات

            </h2>


            <p>

              إدارة الاختبارات والنتائج

            </p>


          </Link>






        </div>




      </div>






    </div>


  );


}



export default AdminDashboard;
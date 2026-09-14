import {
  Link,
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function SubjectDetails(){


  const { id } = useParams();



  const [teacher,setTeacher] = useState(null);



  const [counts,setCounts] = useState({

    lessons:0,

    files:0,

    exams:0

  });






  const subjects = {


    1:{
      name:"العقيدة",
      icon:"✝️"
    },


    2:{
      name:"الكتاب المقدس",
      icon:"📖"
    },


    3:{
      name:"الطقوس",
      icon:"⛪"
    }


  };








  const subject = subjects[id];







  useEffect(()=>{


    if(!subject)

      return;





    const users =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];





    const teacherData =

      users.find(

        user =>

        user.role === "teacher" &&

        user.subjects?.includes(

          subject.name

        )

      );




    setTeacher(teacherData);







    const lessons =

      JSON.parse(

        localStorage.getItem("lessons")

      ) || [];





    const files =

      JSON.parse(

        localStorage.getItem("files")

      ) || [];





    const exams =

      JSON.parse(

        localStorage.getItem("exams")

      ) || [];







    setCounts({



      lessons:

      lessons.filter(

        item =>

        item.subject === subject.name

      ).length,





      files:

      files.filter(

        item =>

        item.subject === subject.name

      ).length,





      exams:

      exams.filter(

        item =>

        item.subject === subject.name

      ).length



    });





  },[id]);









  if(!subject){


    return (

      <div

        className="page-content"

        dir="rtl"

      >

        <h2>

          المادة غير موجودة

        </h2>

      </div>

    );

  }









  return (



    <div

      className="page-content"

      dir="rtl"

    >




      <div className="subject-details-header">





        <div className="subject-icon">

          {subject.icon}

        </div>





        <h1 className="page-title">

          {subject.name}

        </h1>






        <p className="page-subtitle">


          {

          teacher

          ?

          `👨‍🏫 ${teacher.name}`

          :

          "لا يوجد معلم معين"

          }


        </p>



      </div>









      <div className="stats-grid">





        <div className="stat-card">

          <h3>

            📖 الدروس

          </h3>


          <strong>

            {counts.lessons}

          </strong>


        </div>






        <div className="stat-card">

          <h3>

            📁 الملفات

          </h3>


          <strong>

            {counts.files}

          </strong>


        </div>






        <div className="stat-card">

          <h3>

            📝 الاختبارات

          </h3>


          <strong>

            {counts.exams}

          </strong>


        </div>



      </div>









      <div className="subject-content-grid">





        <Link

          to={`/subject/${id}/lessons`}

          className="subject-menu-card"

        >

          <div>

            📖

          </div>


          <h2>

            الدروس

          </h2>


          <p>

            مشاهدة دروس المادة

          </p>


        </Link>








        <Link

          to={`/subject/${id}/files`}

          className="subject-menu-card"

        >

          <div>

            📁

          </div>


          <h2>

            الملفات

          </h2>


          <p>

            تحميل ملفات المادة

          </p>


        </Link>








        <Link

          to={`/subject/${id}/exams`}

          className="subject-menu-card"

        >

          <div>

            📝

          </div>


          <h2>

            الاختبارات

          </h2>


          <p>

            دخول الاختبارات

          </p>


        </Link>






      </div>





    </div>


  );

}



export default SubjectDetails;
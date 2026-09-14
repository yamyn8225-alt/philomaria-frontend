import {
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function SubjectLessons(){



  const { id } = useParams();



  const [lessons,setLessons] = useState([]);




  const subjects = {


    1:"العقيدة",

    2:"الكتاب المقدس",

    3:"الطقوس"


  };








  useEffect(()=>{



    const savedLessons =

      JSON.parse(

        localStorage.getItem("lessons")

      ) || [];





    const currentSubject =

      subjects[id];







    const filteredLessons =

      savedLessons.filter(

        lesson =>

        lesson.subject === currentSubject

      );







    setLessons(filteredLessons);





  },[id]);












  return (



    <div

      className="page-content"

      dir="rtl"

    >






      <h1 className="page-title">

        📖 دروس {subjects[id]}

      </h1>







      <p className="page-subtitle">

        جميع دروس المادة

      </p>









      {

      lessons.length === 0 ?



      (

        <div className="empty-state">


          <h2>

            لا توجد دروس حالياً

          </h2>



          <p>

            سيتم إضافة الدروس من المعلم

          </p>



        </div>

      )



      :



      (



        <div className="subjects-grid">





          {

          lessons.map(lesson=>(



            <div

              className="subject-card"

              key={lesson.id}

            >





              <div className="subject-icon">

                📖

              </div>







              <h2>

                {lesson.title}

              </h2>







              <p>

                {lesson.description}

              </p>







              <p>

                👨‍🏫 {lesson.teacherName}

              </p>







              {

              lesson.year &&

              <p>

                🎓 {lesson.year}

              </p>

              }







              <button

                className="btn btn-gold"

              >

                مشاهدة الدرس

              </button>







            </div>



          ))

          }







        </div>



      )

      }







    </div>



  );

}





export default SubjectLessons;
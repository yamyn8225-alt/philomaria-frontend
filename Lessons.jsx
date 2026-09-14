import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";





function Lessons(){


  const [lessons,setLessons] = useState([]);




  useEffect(()=>{


    const savedLessons =

      JSON.parse(

        localStorage.getItem("lessons")

      ) || [];



    setLessons(savedLessons);



  },[]);









  return (

    <div

      className="page-content"

      dir="rtl"

    >



      <h1 className="page-title">

        📚 الدروس

      </h1>






      {

      lessons.length === 0 ?



      (

        <div className="empty-page">

          لا توجد دروس متاحة حالياً

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

              📚 {lesson.subject}

            </p>





            {

              lesson.teacherName &&

              <p>

                👨‍🏫 {lesson.teacherName}

              </p>

            }





            <Link

              to={`/subject/${lesson.subjectId}/lessons`}

              className="btn btn-gold"

            >

              مشاهدة المادة

            </Link>





          </div>



        ))

        }



        </div>

      )

      }





    </div>


  );


}



export default Lessons;
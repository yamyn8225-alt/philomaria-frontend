import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function SubjectExams(){


  const { id } = useParams();

  const navigate = useNavigate();


  const [exams,setExams] = useState([]);




  const subjects = {


    1:"العقيدة",

    2:"الكتاب المقدس",

    3:"الطقوس"


  };







  useEffect(()=>{


    const savedExams =

      JSON.parse(

        localStorage.getItem("exams")

      ) || [];




    const currentSubject =

      subjects[id];




    const filteredExams =

      savedExams.filter(

        exam =>

        exam.subject === currentSubject

      );




    setExams(filteredExams);



  },[id]);









  function startExam(examId){


    navigate(

      `/exam/${examId}`

    );


  }









  return (


    <div

      className="page-content"

      dir="rtl"

    >




      <h1 className="page-title">

        📝 اختبارات {subjects[id]}

      </h1>





      <p className="page-subtitle">

        الاختبارات الخاصة بالمادة

      </p>









      {

        exams.length === 0 ?



        (

          <div className="empty-state">


            <h2>

              لا توجد اختبارات

            </h2>



            <p>

              سيتم إضافة الاختبارات من المعلم

            </p>


          </div>

        )



        :



        (

          <div className="subjects-grid">



          {

            exams.map(exam=>(



              <div

                className="exam-card"

                key={exam.id}

              >




                <div className="subject-icon">

                  📝

                </div>








                <h2>

                  {exam.title}

                </h2>








                <p>

                  ❓ عدد الأسئلة:

                  {" "}

                  {exam.questions || 0}

                </p>








                <p>

                  🎯 الدرجة:

                  {" "}

                  {exam.degree || 0}

                </p>








                {

                  exam.teacherName &&

                  <p>

                    👨‍🏫 {exam.teacherName}

                  </p>

                }









                {

                  exam.duration &&

                  <p>

                    ⏱ مدة الاختبار:

                    {" "}

                    {exam.duration}

                    دقيقة

                  </p>

                }









                <button

                  className="btn btn-gold"

                  onClick={()=>startExam(exam.id)}

                >

                  ▶ بدء الاختبار

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



export default SubjectExams;
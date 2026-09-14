import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function Exam(){


  const { id } = useParams();

  const navigate = useNavigate();



  const [exam,setExam] = useState(null);

  const [answers,setAnswers] = useState({});






  useEffect(()=>{


    const exams =

      JSON.parse(

        localStorage.getItem("exams")

      ) || [];





    const currentExam =

      exams.find(

        item =>

        item.id == id

      );





    setExam(currentExam);



  },[id]);









  function selectAnswer(questionId,answer){


    setAnswers({

      ...answers,

      [questionId]:answer

    });


  }











  function submitExam(){



    if(!exam)

      return;







    const user =

      JSON.parse(

        localStorage.getItem("user")

      );








    let score = 0;







    exam.questions?.forEach(

      question => {


        if(

          question.correctAnswer &&

          answers[question.id] ===

          question.correctAnswer

        ){

          score++;

        }


      }

    );









    const results =

      JSON.parse(

        localStorage.getItem("results")

      ) || [];









    const newResult = {


      id:Date.now(),


      examId:exam.id,


      examTitle:exam.title,


      studentId:user?.id,


      studentName:user?.name,



      answers,



      score,



      totalQuestions:

        exam.questions?.length || 0,



      date:

      new Date().toLocaleDateString("ar-EG")


    };









    localStorage.setItem(

      "results",

      JSON.stringify([

        ...results,

        newResult

      ])

    );









    alert(

      `تم إرسال الاختبار\nالنتيجة: ${score}/${exam.questions.length}`

    );







    navigate(-1);



  }












  if(!exam){



    return (

      <div

        className="page-content"

        dir="rtl"

      >

        <h2>

          الاختبار غير موجود

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

        📝 {exam.title}

      </h1>






      <p className="page-subtitle">


        عدد الأسئلة:

        {" "}

        {exam.questions?.length || 0}


      </p>









      {

      exam.questions?.map(

        (question,index)=>(



          <div

            className="card"

            key={question.id}

          >






            <h3>


              {index + 1}

              -

              {question.text}


            </h3>








            {

            question.options?.map(

              option=>(



                <label

                  key={option}

                  className="exam-option"

                >



                  <input

                    type="radio"

                    name={question.id}

                    checked={

                      answers[question.id] === option

                    }

                    onChange={()=>


                      selectAnswer(

                        question.id,

                        option

                      )


                    }

                  />





                  {" "}

                  {option}



                </label>



              )

            )

            }







          </div>



        )

      )

      }









      <button

        className="btn btn-gold"

        onClick={submitExam}

      >

        إرسال الإجابات

      </button>








    </div>


  );


}





export default Exam;
import {
  useEffect,
  useState
} from "react";





function TeacherExams(){


  const [teacher,setTeacher] = useState(null);

  const [exams,setExams] = useState([]);



  const [form,setForm] = useState({

    title:"",

    subject:"",

    degree:"",

    duration:""


  });






  useEffect(()=>{


    const currentUser =

      JSON.parse(

        localStorage.getItem("user")

      );





    const users =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];






    const teacherData =

      users.find(

        user =>

        user.id === currentUser?.id

      );






    setTeacher(teacherData);






    const savedExams =

      JSON.parse(

        localStorage.getItem("exams")

      ) || [];





    setExams(

      savedExams.filter(

        exam =>

        exam.teacherId === currentUser?.id

      )

    );





  },[]);









  function handleChange(e){


    setForm({

      ...form,

      [e.target.name]:

      e.target.value

    });


  }









  function addExam(){



    if(

      !form.title ||

      !form.subject ||

      !form.degree

    ){


      alert(

        "أكمل بيانات الاختبار"

      );


      return;

    }









    const newExam = {


      id:Date.now(),


      title:form.title,


      subject:form.subject,


      degree:form.degree,


      duration:form.duration,



      questions:[],


      teacherId:teacher.id,


      teacherName:teacher.name


    };







    const oldExams =

      JSON.parse(

        localStorage.getItem("exams")

      ) || [];








    const updated = [

      ...oldExams,

      newExam

    ];








    localStorage.setItem(

      "exams",

      JSON.stringify(updated)

    );








    setExams([

      ...exams,

      newExam

    ]);








    setForm({

      title:"",

      subject:"",

      degree:"",

      duration:""

    });



  }









  function deleteExam(id){



    const oldExams =

      JSON.parse(

        localStorage.getItem("exams")

      ) || [];





    const updated =

      oldExams.filter(

        exam =>

        exam.id !== id

      );







    localStorage.setItem(

      "exams",

      JSON.stringify(updated)

    );







    setExams(

      exams.filter(

        exam =>

        exam.id !== id

      )

    );



  }











  return (


    <div

      className="page-content"

      dir="rtl"

    >





      <h1 className="page-title">

        📝 إدارة الاختبارات

      </h1>







      <p className="page-subtitle">

        إنشاء اختبارات المادة

      </p>









      <div className="card">


        <h2>

          ➕ إنشاء اختبار جديد

        </h2>








        <div className="form-group">


          <label>

            اسم الاختبار

          </label>


          <input

            className="form-input"

            name="title"

            value={form.title}

            onChange={handleChange}

            placeholder="اختبار العقيدة الأول"

          />

        </div>









        <div className="form-group">


          <label>

            المادة

          </label>


          <input

            className="form-input"

            name="subject"

            value={form.subject}

            onChange={handleChange}

            placeholder="العقيدة"

          />

        </div>









        <div className="form-group">


          <label>

            الدرجة

          </label>


          <input

            className="form-input"

            name="degree"

            value={form.degree}

            onChange={handleChange}

            type="number"

          />

        </div>









        <div className="form-group">


          <label>

            مدة الاختبار بالدقائق

          </label>


          <input

            className="form-input"

            name="duration"

            value={form.duration}

            onChange={handleChange}

            type="number"

          />

        </div>









        <button

          className="btn btn-gold"

          onClick={addExam}

        >

          إنشاء الاختبار

        </button>





      </div>









      <div className="card">


        <h2>

          📝 الاختبارات المضافة

        </h2>







        {

        exams.length === 0 ?



        (

          <div className="empty-state">

            لا توجد اختبارات

          </div>


        )



        :



        exams.map(exam=>(



          <div

            className="exam-card"

            key={exam.id}

          >



            <h2>

              📝 {exam.title}

            </h2>






            <p>

              📚 {exam.subject}

            </p>






            <p>

              🎯 الدرجة:

              {" "}

              {exam.degree}

            </p>






            <button

              className="btn btn-danger"

              onClick={()=>deleteExam(exam.id)}

            >

              حذف

            </button>



          </div>



        ))

        }






      </div>








    </div>


  );


}



export default TeacherExams;
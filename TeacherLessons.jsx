import {
  useEffect,
  useState
} from "react";





function TeacherLessons(){


  const [teacher,setTeacher] = useState(null);

  const [lessons,setLessons] = useState([]);


  const [form,setForm] = useState({

    title:"",

    description:"",

    subject:""

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






    const savedLessons =

      JSON.parse(

        localStorage.getItem("lessons")

      ) || [];






    const teacherLessons =

      savedLessons.filter(

        lesson =>

        lesson.teacherId === currentUser?.id

      );





    setLessons(teacherLessons);






  },[]);









  function handleChange(e){


    setForm({

      ...form,

      [e.target.name]:

      e.target.value

    });


  }











  function addLesson(e){


    e.preventDefault();





    if(

      !form.title ||

      !form.description ||

      !form.subject

    ){

      alert(

        "من فضلك أكمل البيانات"

      );

      return;

    }







    const currentUser =

      JSON.parse(

        localStorage.getItem("user")

      );








    const newLesson = {


      id:Date.now(),


      title:form.title,


      description:form.description,


      subject:form.subject,


      teacherId:

        currentUser.id,


      teacherName:

        teacher.name,


      createdAt:

        new Date().toLocaleDateString("ar-EG")


    };









    const savedLessons =

      JSON.parse(

        localStorage.getItem("lessons")

      ) || [];






    const updated = [

      ...savedLessons,

      newLesson

    ];








    localStorage.setItem(

      "lessons",

      JSON.stringify(updated)

    );








    setLessons([

      ...lessons,

      newLesson

    ]);








    setForm({

      title:"",

      description:"",

      subject:""

    });


  }












  function deleteLesson(id){



    const savedLessons =

      JSON.parse(

        localStorage.getItem("lessons")

      ) || [];





    const updated =

      savedLessons.filter(

        lesson =>

        lesson.id !== id

      );





    localStorage.setItem(

      "lessons",

      JSON.stringify(updated)

    );





    setLessons(

      lessons.filter(

        lesson =>

        lesson.id !== id

      )

    );


  }











  return (



    <div

      className="page-content"

      dir="rtl"

    >






      <h1 className="page-title">

        📖 إدارة الدروس

      </h1>





      <p className="page-subtitle">

        إضافة وإدارة دروس المادة

      </p>









      <div className="card">



        <h2>

          إضافة درس جديد

        </h2>







        <form

          onSubmit={addLesson}

        >






          <div className="form-group">

            <label>

              المادة

            </label>



            <input

              className="form-input"

              name="subject"

              value={form.subject}

              onChange={handleChange}

              placeholder="مثال: العقيدة"

            />

          </div>







          <div className="form-group">


            <label>

              عنوان الدرس

            </label>


            <input

              className="form-input"

              name="title"

              value={form.title}

              onChange={handleChange}

              placeholder="عنوان الدرس"

            />

          </div>








          <div className="form-group">


            <label>

              وصف الدرس

            </label>



            <textarea

              className="form-input"

              name="description"

              value={form.description}

              onChange={handleChange}

              placeholder="وصف مختصر"

            />

          </div>







          <button

            className="btn btn-gold"

            type="submit"

          >

            إضافة الدرس

          </button>







        </form>



      </div>












      <div className="card">


        <h2>

          الدروس المضافة

        </h2>







        {

        lessons.length === 0

        ?

        (

          <div className="empty-state">


            <h3>

              لا توجد دروس

            </h3>


            <p>

              قم بإضافة أول درس

            </p>


          </div>

        )



        :



        (

          <div className="subjects-grid">


          {

          lessons.map(

            lesson => (


              <div

                key={lesson.id}

                className="subject-card"

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





                <button

                  className="btn btn-danger"

                  onClick={()=>deleteLesson(lesson.id)}

                >

                  حذف

                </button>



              </div>


            )

          )

          }


          </div>

        )

        }





      </div>








    </div>


  );


}





export default TeacherLessons;
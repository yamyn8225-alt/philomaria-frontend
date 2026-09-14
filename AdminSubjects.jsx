import {
  useEffect,
  useState
} from "react";





function AdminSubjects(){



  const [subjects,setSubjects] = useState([]);


  const [name,setName] = useState("");

  const [description,setDescription] = useState("");









  useEffect(()=>{


    const savedSubjects =

      JSON.parse(

        localStorage.getItem("subjects")

      ) || [];



    setSubjects(savedSubjects);



  },[]);









  function saveSubjects(data){



    setSubjects(data);



    localStorage.setItem(

      "subjects",

      JSON.stringify(data)

    );



  }









  function addSubject(){



    if(!name){


      alert(

        "اكتب اسم المادة"

      );


      return;

    }







    const newSubject = {


      id:Date.now(),


      name,


      description,


      createdAt:

      new Date().toLocaleDateString("ar-EG")


    };








    saveSubjects([

      ...subjects,

      newSubject

    ]);






    setName("");

    setDescription("");



  }









  function deleteSubject(id){



    const updated =

      subjects.filter(

        subject =>

        subject.id !== id

      );




    saveSubjects(updated);



  }









  return (



    <div

      className="page-content"

      dir="rtl"

    >





      <h1 className="page-title">

        📚 إدارة المواد

      </h1>







      <p className="page-subtitle">

        إضافة وتعديل المواد الدراسية

      </p>









      <div className="card">



        <h2>

          ➕ إضافة مادة جديدة

        </h2>








        <div className="form-group">


          <label>

            اسم المادة

          </label>



          <input

            className="form-input"

            value={name}

            onChange={(e)=>

              setName(e.target.value)

            }

            placeholder="مثال: العقيدة"

          />



        </div>









        <div className="form-group">


          <label>

            وصف المادة

          </label>



          <textarea

            className="form-input"

            rows="4"

            value={description}

            onChange={(e)=>

              setDescription(e.target.value)

            }

            placeholder="وصف المادة"

          />



        </div>







        <button

          className="btn btn-gold"

          onClick={addSubject}

        >

          إضافة المادة

        </button>





      </div>









      <div className="card">



        <h2>

          📚 المواد الحالية

        </h2>







        {

        subjects.length === 0 ?



        (

          <div className="empty-state">

            لا توجد مواد

          </div>

        )



        :



        (

          <div className="subjects-grid">



          {

          subjects.map(subject=>(



            <div

              className="subject-card"

              key={subject.id}

            >



              <div className="subject-icon">

                📚

              </div>






              <h2>

                {subject.name}

              </h2>






              <p>

                {subject.description}

              </p>







              <button

                className="btn btn-danger"

                onClick={()=>deleteSubject(subject.id)}

              >

                حذف

              </button>





            </div>



          ))

          }



          </div>

        )

        }





      </div>








    </div>


  );

}



export default AdminSubjects;
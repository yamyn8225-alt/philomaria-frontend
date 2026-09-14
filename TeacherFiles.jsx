import {
  useEffect,
  useState
} from "react";





function TeacherFiles(){


  const [teacher,setTeacher] = useState(null);

  const [files,setFiles] = useState([]);


  const [title,setTitle] = useState("");

  const [description,setDescription] = useState("");







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







    const savedFiles =

      JSON.parse(

        localStorage.getItem("files")

      ) || [];






    setFiles(

      savedFiles.filter(

        file =>

        file.teacherId === currentUser?.id

      )

    );





  },[]);









  function addFile(){



    if(!title || !description){


      alert(

        "اكتب اسم الملف والوصف"

      );


      return;


    }







    if(!teacher)

      return;









    const newFile = {


      id:Date.now(),


      title,


      description,



      teacherId:teacher.id,


      teacherName:teacher.name,



      subject:

      teacher.subjects?.[0] || "غير محدد",



      year:

      teacher.years?.[0] || "غير محدد",



      createdAt:

      new Date().toLocaleDateString("ar-EG")



    };









    const oldFiles =


      JSON.parse(

        localStorage.getItem("files")

      ) || [];








    const updatedFiles = [


      ...oldFiles,


      newFile


    ];







    localStorage.setItem(

      "files",

      JSON.stringify(updatedFiles)

    );







    setFiles([

      ...files,

      newFile

    ]);







    setTitle("");

    setDescription("");



  }











  function deleteFile(id){



    const oldFiles =


      JSON.parse(

        localStorage.getItem("files")

      ) || [];







    const updatedFiles =


      oldFiles.filter(

        file =>

        file.id !== id

      );







    localStorage.setItem(

      "files",

      JSON.stringify(updatedFiles)

    );







    setFiles(

      files.filter(

        file =>

        file.id !== id

      )

    );



  }












  return (


    <div

      className="page-content"

      dir="rtl"

    >





      <h1 className="page-title">

        📁 إدارة الملفات

      </h1>









      <div className="card">


        <h2>

          ➕ إضافة ملف جديد

        </h2>






        <div className="form-group">


          <label>

            اسم الملف

          </label>



          <input

            className="form-input"

            value={title}

            onChange={(e)=>

              setTitle(e.target.value)

            }

            placeholder="مثال: ملخص العقيدة"

          />



        </div>







        <div className="form-group">


          <label>

            وصف الملف

          </label>



          <textarea

            className="form-input"

            rows="4"

            value={description}

            onChange={(e)=>

              setDescription(e.target.value)

            }

            placeholder="وصف الملف"

          />



        </div>







        <button

          className="btn btn-gold"

          onClick={addFile}

        >

          حفظ الملف

        </button>



      </div>









      <div className="card">


        <h2>

          📁 الملفات المضافة

        </h2>






        {

        files.length === 0 ?



        (

          <div className="empty-state">


            لا توجد ملفات


          </div>

        )



        :



        files.map(file=>(



          <div

            className="file-card"

            key={file.id}

          >




            <h2>

              📁 {file.title}

            </h2>





            <p>

              {file.description}

            </p>





            <small>

              {file.subject}

              -

              {file.year}

            </small>





            <br/>





            <button

              className="btn btn-danger"

              onClick={()=>deleteFile(file.id)}

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



export default TeacherFiles;
import {
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";





function SubjectFiles(){


  const { id } = useParams();


  const [files,setFiles] = useState([]);




  const subjects = {


    1:"العقيدة",

    2:"الكتاب المقدس",

    3:"الطقوس"


  };







  useEffect(()=>{


    const savedFiles =

      JSON.parse(

        localStorage.getItem("files")

      ) || [];




    const currentSubject =

      subjects[id];




    const filteredFiles =

      savedFiles.filter(

        file =>

        file.subject === currentSubject

      );




    setFiles(filteredFiles);



  },[id]);









  function downloadFile(file){



    if(!file.fileUrl){


      alert(

        "الملف غير متوفر حالياً"

      );


      return;

    }



    const link = document.createElement("a");


    link.href = file.fileUrl;


    link.download = file.title;


    link.click();



  }









  return (


    <div

      className="page-content"

      dir="rtl"

    >





      <h1 className="page-title">


        📁 ملفات {subjects[id]}


      </h1>






      <p className="page-subtitle">


        جميع ملفات المادة


      </p>









      {

        files.length === 0 ?



        (

          <div className="empty-state">


            <h2>

              لا توجد ملفات

            </h2>



            <p>

              سيتم إضافة الملفات من المعلم

            </p>


          </div>


        )



        :



        (

          <div className="subjects-grid">



          {


            files.map(file=>(



              <div

                className="file-card"

                key={file.id}

              >




                <div className="subject-icon">

                  📁

                </div>







                <h2>

                  {file.title}

                </h2>








                <p>

                  {file.description}

                </p>








                {

                  file.teacherName &&

                  (

                    <p>

                      👨‍🏫 {file.teacherName}

                    </p>

                  )

                }








                {

                  file.type &&

                  (

                    <p>

                      📄 النوع:

                      {" "}

                      {file.type}

                    </p>

                  )

                }








                {

                  file.date &&

                  (

                    <p>

                      📅 {file.date}

                    </p>

                  )

                }









                <button

                  className="btn btn-gold"

                  onClick={()=>downloadFile(file)}

                >

                  ⬇ تحميل الملف

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



export default SubjectFiles;
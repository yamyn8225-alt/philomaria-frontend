import {
  useEffect,
  useState
} from "react";





function Files(){


  const [files,setFiles] = useState([]);





  useEffect(()=>{


    const savedFiles =

      JSON.parse(

        localStorage.getItem("files")

      ) || [];



    setFiles(savedFiles);



  },[]);









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

        📁 الملفات

      </h1>









      {

      files.length === 0 ?



      (

        <div className="empty-page">

          لا توجد ملفات مرفوعة حالياً.

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

              file.subject &&

              <p>

                📚 {file.subject}

              </p>

            }







            {

              file.teacherName &&

              <p>

                👨‍🏫 {file.teacherName}

              </p>

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



export default Files;
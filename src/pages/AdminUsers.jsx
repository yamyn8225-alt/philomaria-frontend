import {
  useEffect,
  useState
} from "react";




const subjects = [

  "العقيدة",

  "الكتاب المقدس",

  "الطقوس"

];



const years = [

  "السنة الأولى",

  "السنة الثانية",

  "السنة الثالثة"

];







function AdminUsers(){


  const [users,setUsers] = useState([]);

  const [search,setSearch] = useState("");

  const [selectedSubjects,setSelectedSubjects] = useState({});

  const [selectedYears,setSelectedYears] = useState({});







  useEffect(()=>{


    const savedUsers =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];



    setUsers(savedUsers);



  },[]);









  function saveUsers(data){


    setUsers(data);


    localStorage.setItem(

      "users",

      JSON.stringify(data)

    );


  }









  function convertToTeacher(id){



    const subject =

      selectedSubjects[id];



    const year =

      selectedYears[id];







    if(!subject || !year){


      alert(

        "اختر المادة والسنة"

      );


      return;

    }








    const updatedUsers =


      users.map(user=>{


        if(user.id === id){


          return {


            ...user,


            role:"teacher",


            subjects:[subject],


            years:[year]


          };


        }


        return user;


      });







    saveUsers(updatedUsers);



    alert(

      "تم تحويل المستخدم إلى معلم"

    );


  }









  function deleteUser(id){



    const updated =

      users.filter(

        user =>

        user.id !== id

      );




    saveUsers(updated);



  }









  const filteredUsers =


    users.filter(user=>



      user.name

      ?.toLowerCase()

      .includes(

        search.toLowerCase()

      )


    );









  return (



    <div

      className="page-content"

      dir="rtl"

    >




      <h1 className="page-title">

        👥 إدارة المستخدمين

      </h1>







      <p className="page-subtitle">

        إدارة الطلاب والمعلمين

      </p>








      <input

        className="student-search-input"

        placeholder="ابحث عن مستخدم..."

        value={search}

        onChange={(e)=>

          setSearch(e.target.value)

        }

      />









      {

      filteredUsers.map(user=>(



        <div

          className="student-card"

          key={user.id}

        >






          <div className="student-avatar">

            {

            user.name

            ?

            user.name.charAt(0)

            :

            "U"

            }

          </div>








          <div

            style={{

              flex:1

            }}

          >



            <h2>

              {user.name}

            </h2>





            <p>

              البريد:

              {" "}

              {user.email}

            </p>






            <p>

              الدور:

              {" "}

              {

              user.role==="teacher"

              ?

              "معلم"

              :

              user.role==="admin"

              ?

              "مدير"

              :

              "طالب"

              }

            </p>








            {

            user.year &&

            <p>

              🎓 {user.year}

            </p>

            }








            {

            user.subjects &&

            <p>

              📚

              {" "}

              {user.subjects.join(" - ")}

            </p>

            }



          </div>









          {

          user.role==="student" &&



          <div>



            <select

              className="form-input"

              value={

                selectedSubjects[user.id] || ""

              }

              onChange={(e)=>

                setSelectedSubjects({

                  ...selectedSubjects,

                  [user.id]:

                  e.target.value

                })

              }

            >

              <option value="">

                اختر المادة

              </option>



              {

              subjects.map(item=>(

                <option

                  key={item}

                >

                  {item}

                </option>

              ))

              }


            </select>








            <select

              className="form-input"

              value={

                selectedYears[user.id] || ""

              }

              onChange={(e)=>

                setSelectedYears({

                  ...selectedYears,

                  [user.id]:

                  e.target.value

                })

              }

            >

              <option value="">

                اختر السنة

              </option>



              {

              years.map(item=>(

                <option

                  key={item}

                >

                  {item}

                </option>

              ))

              }



            </select>







            <button

              className="btn btn-gold"

              onClick={()=>convertToTeacher(user.id)}

            >

              تحويل إلى معلم

            </button>


          </div>


          }







          {

          user.role!=="admin" &&

          <button

            className="btn btn-danger"

            onClick={()=>deleteUser(user.id)}

          >

            حذف

          </button>

          }



        </div>



      ))

      }







    </div>


  );


}



export default AdminUsers;
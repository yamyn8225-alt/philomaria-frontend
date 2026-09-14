import {
  useEffect,
  useState
} from "react";





function Users(){


  const currentUser =

    JSON.parse(

      localStorage.getItem("user")

    );





  const [users,setUsers] = useState([]);

  const [search,setSearch] = useState("");







  useEffect(()=>{


    const savedUsers =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];



    setUsers(savedUsers);



  },[]);









  const teachers =

    users.filter(

      user =>

      user.role === "teacher"

    );







  const students =

    users.filter(

      user =>

      user.role === "student"

    );







  const admins =

    users.filter(

      user =>

      user.role === "admin"

    );









  function filterUsers(list){


    return list.filter(user=>


      user.name

      ?.toLowerCase()

      .includes(

        search.toLowerCase()

      )


    );


  }









  function UserCard({user}){


    return (



      <div

        className="student-card"

      >






        {

        user.profileImage ?



        (

          <img

            src={user.profileImage}

            alt={user.name}

            className="student-avatar-image"

          />

        )



        :



        (

          <div className="student-avatar">

            {user.name?.charAt(0)}

          </div>

        )



        }








        <div className="student-info">


          <h3>

            {user.name}

          </h3>





          <p>

            👨‍🏫 معلم

          </p>








          {

          user.subjects &&

          <p>

            📚

            {" "}

            {user.subjects.join(" - ")}

          </p>

          }








          {

          user.years &&

          <p>

            🎓

            {" "}

            {user.years.join(" - ")}

          </p>

          }



        </div>





      </div>


    );


  }









  return (



    <div

      className="page-content"

      dir="rtl"

    >



      <h1 className="page-title">

        👨‍🏫 المعلمين

      </h1>







      <p className="page-subtitle">

        قائمة المستخدمين في المنصة

      </p>







      <div className="card">





        <input

          className="student-search-input"

          placeholder="ابحث..."

          value={search}

          onChange={(e)=>

            setSearch(e.target.value)

          }

        />









        {

        currentUser?.role === "student" ||

        currentUser?.role === "teacher" ?



        (

          <section>


            <h2>

              👨‍🏫 المعلمين

            </h2>




            {

            filterUsers(teachers)

            .map(teacher=>(


              <UserCard

                key={teacher.id}

                user={teacher}

              />


            ))

            }



          </section>


        )



        :



        (

          <>



          <section>


            <h2>

              👨‍🏫 المعلمين

            </h2>


            {

            filterUsers(teachers)

            .map(teacher=>(


              <UserCard

                key={teacher.id}

                user={teacher}

              />


            ))

            }



          </section>









          <section>


            <h2>

              👨‍🎓 الطلاب

            </h2>





            {

            filterUsers(students)

            .map(student=>(


              <div

                className="student-card"

                key={student.id}

              >


                <div className="student-avatar">

                  {student.name?.charAt(0)}

                </div>



                <div className="student-info">


                  <h3>

                    {student.name}

                  </h3>


                  <p>

                    👨‍🎓 طالب

                  </p>


                  <p>

                    🎓 {student.year || "غير محدد"}

                  </p>


                </div>



              </div>


            ))

            }



          </section>









          <section>


            <h2>

              🛡️ الإدارة

            </h2>



            {

            filterUsers(admins)

            .map(admin=>(


              <div

                className="student-card"

                key={admin.id}

              >


                <div className="student-avatar">

                  {admin.name?.charAt(0)}

                </div>


                <div className="student-info">


                  <h3>

                    {admin.name}

                  </h3>



                  <p>

                    🛡️ مدير

                  </p>


                </div>



              </div>


            ))

            }



          </section>




          </>


        )

        }





      </div>




    </div>


  );


}



export default Users;
import {
  useNavigate
} from "react-router-dom";





function Profile(){


  const navigate = useNavigate();




  const user =

    JSON.parse(

      localStorage.getItem("user")

    );








  if(!user){


    navigate("/login");


    return null;


  }









  function deleteAccount(){



    const confirmDelete =

      window.confirm(

        "هل أنت متأكد من حذف الحساب؟ لا يمكن استرجاع البيانات."

      );





    if(!confirmDelete)

      return;







    const users =

      JSON.parse(

        localStorage.getItem("users")

      ) || [];







    const updatedUsers =

      users.filter(

        item =>

        item.id !== user.id

      );







    localStorage.setItem(

      "users",

      JSON.stringify(updatedUsers)

    );







    localStorage.removeItem("user");

    localStorage.removeItem("token");







    navigate("/login");



  }









  return (



    <div

      className="page-content"

      dir="rtl"

    >





      <h1 className="page-title">

        👤 الملف الشخصي

      </h1>









      <div className="card profile-card">






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









        <h2>

          {user.name}

        </h2>








        <p>

          📱 {user.phone || "غير مسجل"}

        </p>








        <p>

          🎓 {user.year || "غير محدد"}

        </p>








        <p>

          نوع الحساب:

          {" "}

          {

          user.role === "student"

          ?

          "👨‍🎓 طالب"

          :

          user.role === "teacher"

          ?

          "👨‍🏫 معلم"

          :

          "🛡️ مدير"

          }


        </p>









        <button

          className="delete-account-btn"

          onClick={deleteAccount}

        >

          🗑️ حذف الحساب

        </button>







      </div>







    </div>


  );


}



export default Profile;
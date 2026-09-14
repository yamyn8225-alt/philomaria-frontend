import { useState } from "react";
import logo from "../assets/logo.png";

function Login({ onLogin, goToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  function handleSubmit(e) {

    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {

      setError("من فضلك أدخل البريد الإلكتروني وكلمة المرور");
      return;

    }



    // ==========================
    // ADMIN LOGIN
    // ==========================

    if (
      email.trim() === "admin@test.com" &&
      password === "123456"
    ) {

      const admin = {

        id: 1,
        name: "مدير المنصة",
        email: "admin@test.com",
        role: "admin"

      };


      localStorage.removeItem("user");


      localStorage.setItem(
        "user",
        JSON.stringify(admin)
      );


      localStorage.setItem(
        "token",
        "token"
      );


      onLogin(admin);

      return;

    }




    // ==========================
    // NORMAL USERS LOGIN
    // ==========================


    const users =
      JSON.parse(localStorage.getItem("users")) || [];



    const user = users.find(

      item =>

      item.email.toLowerCase() === email.toLowerCase()

      &&

      item.password === password

    );



    if (!user) {

      setError(
        "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      );

      return;

    }



    const loginUser = {

      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileImage: user.profileImage,
      role: user.role,
      subjects: user.subjects || [],
      years: user.years || []

    };



    localStorage.setItem(
      "user",
      JSON.stringify(loginUser)
    );


    localStorage.setItem(
      "token",
      "token"
    );


    onLogin(loginUser);

  }



  return (

    <div
      className="login-page"
      dir="rtl"
    >


      <div className="login-wrapper">



        {/* الجانب التعريفي */}

        <div className="login-info">

          <div className="login-overlay">


            <h1>
              منجلية فيلو ماريا
            </h1>


            <h2>
              منصة التعليم الأرثوذكسي
            </h2>


            <p>
              تعلم الدروس الروحية،
              تابع الدروس والاختبارات،
              وكن جزءاً من مجتمع تعليمي متكامل.
            </p>


          </div>


        </div>





        {/* نموذج تسجيل الدخول */}

        <div className="login-form-section">


          <div className="login-box">



            <div className="login-logo">

             <img
                src="/logo.png"
                alt="منجلية فيلو ماريا"
                className="logo-image"
/>

            </div>




            <h1>
              أهلاً بعودتك
            </h1>




            <p className="login-description">

              سجل دخولك للوصول إلى المنصة

            </p>





            <form onSubmit={handleSubmit}>


              <div className="input-box">


                <label>
                  البريد الإلكتروني
                </label>


                <input

                  type="email"

                  placeholder="example@email.com"

                  value={email}

                  onChange={(e)=>
                    setEmail(e.target.value)
                  }

                />


              </div>





              <div className="input-box">


                <label>
                  كلمة المرور
                </label>


                <input

                  type="password"

                  placeholder="كلمة المرور"

                  value={password}

                  onChange={(e)=>
                    setPassword(e.target.value)
                  }

                />


              </div>





              {
                error &&

                <div className="login-error">

                  {error}

                </div>
              }





              <button

                type="submit"

                className="login-btn"

              >

                تسجيل الدخول

              </button>




            </form>





            <div className="register-link">


              ليس لديك حساب؟


              <button

                type="button"

                onClick={goToRegister}

              >

                إنشاء حساب جديد

              </button>


            </div>





          </div>



        </div>





      </div>



    </div>

  );

}


export default Login;
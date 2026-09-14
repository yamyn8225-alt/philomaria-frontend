import { useState } from "react";


function Register({ onRegister, goToLogin }) {


  const [formData,setFormData] = useState({

    name:"",

    phone:"",

    email:"",

    password:"",

    year:"",

    parentName:"",

    parentPhone:"",

    profileImage:""

  });



  const [error,setError] = useState("");







  function handleChange(e){


    const {name,value} = e.target;


    setFormData(prev=>({

      ...prev,

      [name]:value

    }));

  }







  function handleImageChange(e){


    const file = e.target.files[0];


    if(!file)

      return;



    if(!file.type.startsWith("image/")){


      setError(
        "من فضلك اختر صورة فقط"
      );


      return;

    }





    const reader = new FileReader();



    reader.onload = ()=>{


      setFormData(prev=>({

        ...prev,

        profileImage:reader.result

      }));


    };



    reader.readAsDataURL(file);


  }









  function handleSubmit(e){


    e.preventDefault();


    setError("");





    const {

      name,

      phone,

      email,

      password,

      year


    } = formData;







    if(

      !name ||

      !phone ||

      !email ||

      !password ||

      !year

    ){


      setError(

        "من فضلك أكمل البيانات المطلوبة"

      );


      return;

    }








    const users =


      JSON.parse(

        localStorage.getItem("users")

      ) || [];







    const exists =


      users.find(

        user =>

        user.email.toLowerCase()

        ===

        email.toLowerCase()

      );







    if(exists){


      setError(

        "هذا البريد الإلكتروني مستخدم بالفعل"

      );


      return;


    }









    const newUser = {


      id:Date.now(),


      name,


      phone,


      email,


      password,



      profileImage:

      formData.profileImage,



      year,



      parentName:

      formData.parentName,



      parentPhone:

      formData.parentPhone,



      role:"student",



      subjects:[],


      years:[year],



      createdAt:

      new Date().toLocaleDateString("ar-EG")


    };









    const updatedUsers = [


      ...users,


      newUser


    ];






    localStorage.setItem(

      "users",

      JSON.stringify(updatedUsers)

    );









    onRegister({


      id:newUser.id,


      name:newUser.name,


      email:newUser.email,


      profileImage:

      newUser.profileImage,


      role:newUser.role,


      subjects:newUser.subjects,


      years:newUser.years


    });




  }









  return (


    <div

      className="auth-page"

      dir="rtl"

    >


      <div className="auth-container">



        <div className="auth-logo">


          <div className="cross">

            ✝

          </div>



          <h1>

            منجلية فيلو ماريا

          </h1>



          <p>

            إنشاء حساب جديد

          </p>


        </div>









        <form onSubmit={handleSubmit}>


          <div className="form-group">


            <label>

              الصورة الشخصية

            </label>


            <input

              type="file"

              accept="image/*"

              className="form-input"

              onChange={handleImageChange}

            />


          </div>








          <div className="form-group">

            <label>

              الاسم بالكامل

            </label>


            <input

              className="form-input"

              name="name"

              value={formData.name}

              onChange={handleChange}

            />

          </div>








          <div className="form-group">


            <label>

              رقم الهاتف

            </label>



            <input

              className="form-input"

              name="phone"

              value={formData.phone}

              onChange={handleChange}

            />


          </div>








          <div className="form-group">


            <label>

              البريد الإلكتروني

            </label>



            <input

              type="email"

              className="form-input"

              name="email"

              value={formData.email}

              onChange={handleChange}

            />


          </div>








          <div className="form-group">


            <label>

              السنة الدراسية

            </label>



            <select

              className="form-input"

              name="year"

              value={formData.year}

              onChange={handleChange}

            >


              <option value="">

                اختر السنة

              </option>


              <option value="السنة الأولى">

                السنة الأولى

              </option>


              <option value="السنة الثانية">

                السنة الثانية

              </option>


              <option value="السنة الثالثة">

                السنة الثالثة

              </option>


            </select>


          </div>








          <div className="form-group">


            <label>

              اسم ولي الأمر

            </label>



            <input

              className="form-input"

              name="parentName"

              value={formData.parentName}

              onChange={handleChange}

            />


          </div>








          <div className="form-group">


            <label>

              رقم ولي الأمر

            </label>



            <input

              className="form-input"

              name="parentPhone"

              value={formData.parentPhone}

              onChange={handleChange}

            />


          </div>








          <div className="form-group">


            <label>

              كلمة المرور

            </label>



            <input

              type="password"

              className="form-input"

              name="password"

              value={formData.password}

              onChange={handleChange}

            />


          </div>








          {

            error &&

            <div className="form-error">

              {error}

            </div>


          }







          <button

            type="submit"

            className="btn btn-gold btn-full"

          >

            إنشاء الحساب

          </button>





        </form>








        <p className="auth-footer">


          لديك حساب بالفعل؟


          <button

            type="button"

            className="auth-link"

            onClick={goToLogin}

          >

            تسجيل الدخول

          </button>


        </p>





      </div>


    </div>


  );

}



export default Register;
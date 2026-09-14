import { useState, useRef, useEffect } from "react";


function AI() {


const [input,setInput]=useState("");

const [loading,setLoading]=useState(false);


const chatEndRef = useRef(null);



const [messages,setMessages]=useState([

{
role:"assistant",
content:
"سلام ومحبة الرب معك ✝️\nأنا المساعد الأرثوذكسي الذكي.\nيمكنك سؤالي عن الكتاب المقدس، أقوال الآباء، العقيدة، والطقوس الكنسية."
}

]);





useEffect(()=>{

chatEndRef.current?.scrollIntoView({
behavior:"smooth"
});

},[messages,loading]);







async function sendMessage(){


if(!input.trim() || loading)
return;



const question=input;



const userMessage={

role:"user",

content:question

};



setMessages(prev=>[

...prev,

userMessage

]);



setInput("");

setLoading(true);



try{



const response = await fetch(

"http://localhost:5000/api/ai/chat",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:question,

history:messages

})

}

);




if(!response.ok){

throw new Error("Server Error");

}



const data=await response.json();




setMessages(prev=>[

...prev,

{

role:"assistant",

content:data.answer || 
"لم أستطع الحصول على إجابة."

}

]);



}

catch(error){


setMessages(prev=>[

...prev,

{

role:"assistant",

content:
"حدث خطأ في الاتصال بالمساعد الذكي. تأكد من تشغيل الخادم."

}

]);


}



setLoading(false);


}







return (


<div className="page-content" dir="rtl">


<h1 className="page-title">

🤖 المساعد الأرثوذكسي الذكي

</h1>



<p className="page-subtitle">

اسأل عن الكتاب المقدس وأقوال الآباء والتعليم الأرثوذكسي

</p>





<div className="ai-chat">



<div className="ai-body">


{

messages.map((msg,index)=>(


<div

key={index}

className={`ai-message ${msg.role}`}

>


{

msg.role==="assistant" &&

<div className="ai-avatar">

✝️

</div>

}



<div className="ai-bubble">

{msg.content}

</div>



</div>


))

}





{

loading &&

<div className="ai-message assistant">


<div className="ai-avatar">

✝️

</div>


<div className="ai-bubble">

جاري البحث في المصادر الأرثوذكسية...

</div>


</div>

}



<div ref={chatEndRef}/>


</div>







<div className="chat-input-area">



<input


value={input}


placeholder="اكتب سؤالك هنا..."


onChange={(e)=>

setInput(e.target.value)

}


onKeyDown={(e)=>{

if(e.key==="Enter")

sendMessage();

}}


/>



<button

onClick={sendMessage}

disabled={loading}

>

{

loading ?

"..."

:

"➤"

}

</button>




</div>




</div>



</div>


);


}


export default AI;
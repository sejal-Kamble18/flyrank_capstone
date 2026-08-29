const messages=document.querySelector("#messages"), empty=document.querySelector("#empty"), form=document.querySelector("#chat-form"), prompt=document.querySelector("#prompt"), loading=document.querySelector("#loading"), errorCard=document.querySelector("#error-card"), errorTitle=document.querySelector("#error-title"), errorText=document.querySelector("#error-text"), retry=document.querySelector("#retry"), send=document.querySelector("#send");
let lastMessage="", lastMode="success", busy=false;
function addMessage(text,role){const item=document.createElement("article");item.className="message "+role;item.textContent=text;messages.append(item);messages.scrollTop=messages.scrollHeight;return item}
function setBusy(value){busy=value;send.disabled=value;loading.hidden=!value}
function showError(title,text){errorTitle.textContent=title;errorText.textContent=text;errorCard.hidden=false;messages.scrollTop=messages.scrollHeight}
async function sendMessage(text,mode="success"){
 if(busy||!text.trim()) return; lastMessage=text;lastMode=mode;empty.hidden=true;errorCard.hidden=true;addMessage(text,"user");setBusy(true);
 try{
   if(mode==="midstream"){const partial=addMessage("I started preparing a response…","assistant");await new Promise(r=>setTimeout(r,500));partial.remove();throw new Error("The connection closed while the assistant was responding.");}
   const response=await fetch("/api/fe08-chat?mode="+encodeURIComponent(mode),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:text})});
   const data=await response.json();if(!response.ok){const error=new Error(data.error||"Request failed");error.status=response.status;throw error;}
   const bubble=addMessage("","assistant");for(const word of data.reply.split(" ")){bubble.textContent+=(bubble.textContent?" ":"")+word;await new Promise(r=>setTimeout(r,20));messages.scrollTop=messages.scrollHeight;}
 }catch(error){const isRate=error.status===429;showError(isRate?"Rate limit reached":"Response interrupted",isRate?"Too many requests were simulated. Wait a moment, then retry your last message.":error.message+" Your last message is kept and only that message will be retried.");}
 finally{setBusy(false);prompt.focus();}
}
form.addEventListener("submit",event=>{event.preventDefault();const text=prompt.value;prompt.value="";sendMessage(text)});
document.querySelector(".example").addEventListener("click",()=>sendMessage("Help me explain my project in a portfolio"));
document.querySelectorAll("[data-mode]").forEach(button=>button.addEventListener("click",()=>sendMessage("Show me how this failure is handled.",button.dataset.mode)));
retry.addEventListener("click",()=>sendMessage(lastMessage,lastMode==="success"?"success":"success"));
let buttons = document.querySelectorAll(".btn");
let display = document.querySelector(".displaySave");

/* event Lisetener*/ 
document.addEventListener("DOMContentLoaded", showNote);
document.getElementById("save").addEventListener("click",saveNotes);

/* date and time method*/
let i;
let date =new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let fullDate = day + "/" + (month +1) + "/" + year;

let hour = date.getHours();
let mins = date.getMinutes();
let sec = date.getSeconds();
let time = hour + " : " + mins + " : " + sec;
 console.log(time);


 /* word counter*/
let counter = document.getElementById("counter");
document.getElementById("content").addEventListener("input",function(){
    let wordCount = this.textContent,
    counter = wordCount.trim().replace(/\s+/g,' ').split(' ').length;
 document.querySelector("#counter").textContent = counter;
});



/* execcommand for text editor*/
for(let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    
    button.addEventListener('click', function(e) {
      let command = this.dataset.command;
      
        switch(command){
            case "createLink":
                let linkValue = prompt('Link ');
                document.execCommand('createLink', false, linkValue);
            
            default :
            document.execCommand(command, false);
        }
        
      
      
    });
  }

  
  function font(){
    let size= document.getElementById("size");
    let value= size.value;
    document.execCommand("fontSize", false, value);
  }
  function fontFamily(){
      let fam = document.getElementById("fam");
      let font = fam.value;
      document.execCommand("fontName", false, font);
  }



/* array for local storage*/
function note(id,title,content,saveDate,time,counter){
    this.id = id;
    this.title = title;
    this.content = content;
    this.saveDate = saveDate;
    this.time = time;
    this.counter = counter;
}
let noteID =1 ;


/*get value from local storage*/
function getData(){
    return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}


/* saving new value to local storage*/
function saveNotes(){
    let title = document.getElementById("title");
    let content = document.getElementById("content");
  
    /* validation for empty value*/
  if(title.value !=="" && content.innerText !=="")
  {
      let notes = getData();
      let noteList = new note(noteID,title.value,content.innerHTML,fullDate,time,counter.innerHTML);

      noteID++;

      notes.push(noteList);
      createDiv(noteList);
      
      localStorage.setItem("notes", JSON.stringify(notes));

      title.value="";
      content.innerText = "";
      counter.innerHTML = "";
      location.reload();
      return true;
      
  }
  else
  {
      if(title.value ==="")
      alert("title empty");
      if(content.innerText ==="")
      alert("content empty")
  }
   
    
}

/*creating new element to display new notes*/
function createDiv(noteList){

        let div = document.createElement("div");
        div.classList.add("col-sm-5");
        div.classList.add("w-100")
        div.classList.add("m-2")
      div.classList.add("noteList");
 
        
        div.setAttribute("data-id", noteList.id);
        div.innerHTML = `
            <h5>Title:</h5>
              <p class="p">${noteList.title}</p>
              <h5>Content:</h5>
              <p class="p">${noteList.content}</p>
             <button type="button" class="btn btnView" data-toggle="collapse" data-target="#coll">Saved Details</button>
             <div class="collapse" id="coll">
             <div class="d-flex justify-content-between">
                 <p class="h">Date Saved:</p>
                <p class="p">${noteList.saveDate}</p>
                 <p class="h">Time Saved;</p>
                 <p class="p">${noteList.time}</p>
                 <p class="h">Word Count:</p>
                 <p class="p">${noteList.counter}</p>
              </div>
             </div>
              
             
              
              
 
        `;
        display.appendChild(div);
 
}

/*function to show notes*/
function showNote()
{
    let notes = getData();
   
    if(notes.length > 0)
    {
        noteID = notes[notes.length -1].id;
        noteID++;
    }
    else
    {
        noteID =1;
    }
    
    

    notes.forEach(e =>{
    
       createDiv(e);
      
    });

}


/*delete all notes*/
document.getElementById("deleteAll").addEventListener("click", deleteAll);
function deleteAll(){
    localStorage.removeItem("notes");
    let noteList = document.querySelectorAll(".noteList");
    if(noteList.length > 0){
      noteList.forEach(item => {
        display.removeChild(item);
      });
    }
    noteID = 1;
  }




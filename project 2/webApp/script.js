let pannel = document.querySelector(".taskwindow");
let addbtn = document.querySelector(".fa.fa-plus");
let entries = pannel.querySelectorAll(".entry"); 
let isVisible = false;
let deletebtn = document.querySelector(".fa-trash");
let isRed = false;
let submitbtn=document.querySelector(".submit")
let sortbtn = document.querySelector(".fa-sort")
let Allproperty = document.querySelector(".register_cont")
let propertyArr = [];
let isascending =true;
var uid = new ShortUniqueId();

if(localStorage.getItem("property")){
  let strArr = localStorage.getItem("property");
  let arr = JSON.parse(strArr);
  propertyArr= arr;
  for(let i=0 ;i<arr.length ;i++){
    generate_property(arr[i].name_property,arr[i].property_size,arr[i].property_view,arr[i].serial_number);
  }

}

sortbtn.addEventListener("click",function(){
  let propertyPannel = document.querySelectorAll(".property_log");
  for(let k=0 ;k<propertyPannel.length ;k++){
     propertyPannel[k].remove();
  }
  if(isascending){
  for(let i=0 ;i<propertyArr.length-1 ;i++ ){
    let minSize= getPropertySize(propertyArr[i]);
    let min_pos =i;
    for(let j = i+1 ; j<propertyArr.length;j++){
      let len = getPropertySize(propertyArr[j]);
      if(minSize>len) {
        minSize =len;
        min_pos=j; 
    } 
  }
 
  let temp={};
  temp =  propertyArr[i];
  propertyArr[i]=propertyArr[min_pos];
  propertyArr[min_pos]=temp;
}
isascending=false;
  }
  else{
    for(let i=0 ;i<propertyArr.length-1 ;i++ ){
      let maxSize= getPropertySize(propertyArr[i]);
      let max_pos =i;
      for(let j = i+1 ; j<propertyArr.length;j++){
        let len = getPropertySize(propertyArr[j]);
        if(maxSize<len) {
          maxSize =len;
          max_pos=j; 
      } 
    }
   
    let temp={};
    temp =  propertyArr[i];
    propertyArr[i]=propertyArr[max_pos];
    propertyArr[max_pos]=temp;
  }
  isascending=true;
  }
  createLocalStorage();
for(let i=0 ;i<propertyArr.length ;i++){
  let tokenX = propertyArr[i].serial_number;
  let Name_entry = propertyArr[i].name_property;
let size_entry =propertyArr[i].property_size;
let task_entry = propertyArr[i].property_view;
  generate_property(Name_entry,size_entry,task_entry,tokenX);
}
console.log(propertyArr);

})

addbtn.addEventListener("click",function(){
    //console.log("clicked");
    if(isVisible)pannel.style.display="none";
    else pannel.style.display="flex";
    
    isVisible=!isVisible;
})

submitbtn.addEventListener("click",function(){
  let Name_entry = entries[0].value;
let size_entry =entries[1].value;
let task_entry = entries[2].value;

  generate_property(Name_entry,size_entry,task_entry);
  pannel.style.display="none";
  for(let i=0 ;i<entries.length ;i++){
    entries[i].value="";
  }
  isVisible=false;

})

deletebtn.addEventListener("click",function(){
  if(isRed) deletebtn.style.color="black";
  else deletebtn.style.color="red";
  isRed=!isRed;
})

function generate_property(Name_entry,size_entry,task_entry,tokenX){
    let id ;
    if(tokenX == undefined){
    id =uid();
    }
    else{
      id=tokenX;
    }
     let parentTag = document.querySelector(".register_cont");
     let divTag = document.createElement("div");
      divTag.setAttribute("class" ,"property_log");
     divTag.innerHTML=`<div class="property attribute">
     <div class="serial label">Serial No. :</div>
     <div class="Name label">Name:</div>
     <div class="Size label">Size:</div>
     <div class="description label">Description:</div>
   </div>
   <div class="property detail">
        <div class="serial record">#${id}</div>
       <div class="property_name record">${Name_entry}</div>
       <div class="property_size record">${size_entry}</div>
       <div class="property_description record">${task_entry}</div>
   </div>`
   parentTag.appendChild(divTag);

     //insert property to array
   if(tokenX==undefined){
     propertyArr.push({ serial_number:id,
    name_property: Name_entry,
    property_size: size_entry,
    property_view: task_entry});

    createLocalStorage();
  }
 
   

    // delete handle
    divTag.addEventListener("click",function(){
        if(isRed) {
         
          // let codeword = divTag.querySelector(".serial.record");
          let pos=-1;
          for(let i=0 ;i<propertyArr.length;i++){
            let propertyID = propertyArr[i].serial_number;
            if(id==propertyID){
             pos=i;
             break;
            }
          }
          propertyArr.splice(pos,1);
          createLocalStorage();
          divTag.remove();
        }

    }) 

  }

function getPropertySize(property_data){
  let size= parseInt(property_data.property_size)
    return size;
}

function createLocalStorage(){
   let strPropertyArr = JSON.stringify(propertyArr); 
   localStorage.setItem("property" , strPropertyArr );
}
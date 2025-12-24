var selectedRow=null;


//Storig data in LOCALSTORAGE 

function saveToLocalStoage(){
  var table = document.getElementById("employeeList").getElementsByTagName("tbody")[0];
var employees=[];

for (var i=0; i<table.rows.length;i++){
  var row=table.rows[i];


  var employee ={
    fullName:row.cells[0].innerHTML,
      empCode:row.cells[1].innerHTML,
        salary:row.cells[2].innerHTML,
          city:row.cells[3].innerHTML,
  };
  employees.push(employee);
}


localStorage.setItem("employees", JSON.stringify(employees));

console.log('Data Saved to localStorage:', employees);

}


function loadFromLocalStorage(){

  var savedData = localStorage.getItem("employees");

  if(savedData){

    var employees=JSON.parse(savedData)

    console.log ("Loading Data from localStorage:", employees);

employees.forEach(function(employee){

  insertNewRecord(employee);
});

  }
  else{
    console.log("No saved Data Found")
  }
}



function onFormsubmit(){
  var formData=readFormData();

  if(!formValidate(formData)){
  return;
}

  if (selectedRow === null){
    insertNewRecord(formData);
  
  }
  else{
    updateRecord(formData);
  }

saveToLocalStoage();

  resetForm();
  }
  


function readFormData(){
    var formData={};
    formData["fullName"]=document.getElementById("fullName").value;
    formData["empCode"]=document.getElementById("empCode").value;
    formData["salary"]=document.getElementById("salary").value;
    formData["city"]=document.getElementById("city").value;

    return formData;
}
function insertNewRecord (data){
    var table= document.getElementById("employeeList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
      cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
      cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
      cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
      cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                      <a onClick="onDelete(this)"> Delete</a>`;
}

function resetForm(){
  document.getElementById("fullName").value="";
  document.getElementById("empCode").value="";
  document.getElementById("salary").value="";
  document.getElementById("city").value="";
}

function onDelete(td){
  if(confirm("Are you sure?")){
    row=td.parentElement.parentElement;
    document.getElementById('employeeList').deleteRow(row.rowIndex);
    resetForm();
  }

}
function onEdit(td){
  selectedRow=td.parentElement.parentElement;
  document.getElementById("fullName").value=selectedRow.cells[0].innerHTML
  document.getElementById("empCode").value=selectedRow.cells[1].innerHTML
  document.getElementById("salary").value=selectedRow.cells[2].innerHTML
  document.getElementById("city").value=selectedRow.cells[3].innerHTML
}
function updateRecord(formData){
  selectedRow.cells[0].innerHTML=formData.fullName;
    selectedRow.cells[1].innerHTML=formData.empCode;
      selectedRow.cells[2].innerHTML=formData.salary;
        selectedRow.cells[3].innerHTML=formData.city;

}

//validating form

function formValidate(formData){
  if(formData.fullName === ""){
    alert('Please enter Full Name');
    return false;
  }

if(formData.empCode === ""){
  alert("Employee code Cannot be Empty");
  return false;
}
if(formData.salary === ""){
  alert("Salary Cannot be Empty");
  return false;
}

  if(isNaN(formData.salary) || formData.salary <= 0){
    alert("Salary must be a valid number and greater than zero");
    return false;
  }

if(formData.city === ""){
  alert("Name Cannot be Empty");
  return false;
}
return true;
}


// NEW: SEARCH AND FILTER FUNCTION
function searchTable() {

var input=document.getElementById("searchBox");
var filter=input.value.toLowerCase();

var table=document.getElementById("employeeList");
var tr=table.getElementsByTagName("tr");
 for (var i = 1; i < tr.length; i++) {
var tdName= tr[i].getElementsByTagName("td")[0];
var tdCode= tr[i].getElementsByTagName("td")[1];
var tdSalary= tr[i].getElementsByTagName("td")[2];
var tdCity= tr[i].getElementsByTagName("td")[3];


if (tdName || tdCode || tdSalary || tdCity) {
  var nameValue = tdName.textContent || tdName.innerText;
  var codeValue = tdCode.textContent || tdCode.innerText;
  var salaryValue = tdSalary.textContent || tdSalary.innerText;
  var cityValue = tdCity.textContent || tdCity.innerText;

  nameValue = nameValue.toLowerCase();
  codeValue = codeValue.toLowerCase();
  salaryValue = salaryValue.toLowerCase();
  cityValue = cityValue.toLowerCase();

  if(nameValue.includes(filter) || 
  codeValue.includes(filter) ||
   salaryValue.includes(filter) || 
   cityValue.includes(filter)) 
{
    tr[i].style.display = "";
}
else{
    tr[i].style.display = "none";
}
}
}
}




window.onload = function() {
  loadFromLocalStorage();
  console.log("🚀 Page loaded, checking for saved data...");
};
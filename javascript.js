var selectedRow=null;
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

if(formData.salary <=0){
  alert("Salary must be greater than zero");
  return false;
}

if(formData.city === ""){
  alert("Name Cannot be Empty");
  return false;
}
return true;
}

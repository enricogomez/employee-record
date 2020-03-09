document.addEventListener('DOMContentLoaded', function() {
  let app = firebase.app();
  db = app.firestore();

  let name = document.getElementById('name');
  let age = document.getElementById('age');
  let birthdate = document.getElementById('birthdate');
  let address = document.getElementById('address');
  let contactNumber = document.getElementById('contact-number');
  let dateStarted = document.getElementById('date-started');
  let sss = document.getElementById('sss');
  let pagibig = document.getElementById('pagibig');
  let tin = document.getElementById('tin');
  let philhealth = document.getElementById('philhealth');
  let addBtn = document.getElementById('add-btn');
  let saveBtn = document.getElementById('save-btn');
  let employeeTable =document.getElementById('employee-table');
  let inputFields = document.getElementsByTagName('input');

  // let employee = {
  //   name: name.value,
  //   age: age.value,
  //   birthdate: birthdate.value,
  //   address: address.value,
  //   contactNumber: contactNumber.value,
  //   dateStarted: dateStarted.value,
  //   sss: sss.value,
  //   pagibig: pagibig.value,
  //   tin: tin.value,
  //   philhealth: philhealth.value,
  // }

  addBtn.onclick = () =>{
    addBtn.disabled = true;
    addBtn.innerHTML = "Adding";
    db.collection('employee')
    .add({
      name: name.value,
      age: age.value,
      birthdate: birthdate.value,
      address: address.value,
      contactNumber: contactNumber.value,
      dateStarted: dateStarted.value,
      sss: sss.value,
      pagibig: pagibig.value,
      tin: tin.value,
      philhealth: philhealth.value,
    }) 
    .then( ()=> {
      addBtn.disabled = false;
      addBtn.innerHTML = "ADD";
      name.value = "";
      age.value = "";
      birthdate.value = "";
      address.value = "";
      contactNumber.value = "";
      dateStarted.value = "";
      sss.value = "";
      pagibig.value = "";
      tin.value = "";
      philhealth.value = "";
      loadEmployee();
    })
  }
  const loadEmployee = () =>{ 
    employeeTable.innerHTML="";
    addBtn.disabled = true;
    db.collection("employee")
    .get()
    .then(snapshot=>{
      addBtn.disabled = false;
      addBtn.innerHTML = "ADD";
      snapshot.forEach(doc => {
        renderEmployee(doc.id, doc.data());
      });
    })
  }
  const renderEmployee = (id, info) => {
    let rowNode = document.createElement('tr');
    
    let dataNode = document.createElement('td');
    dataNode.innerHTML = info.name;
    rowNode.appendChild(dataNode);
    employeeTable.appendChild(rowNode);

    
    let dataAge = document.createElement('td');
    dataAge.innerHTML = info.age;
    rowNode.appendChild(dataAge);
    employeeTable.appendChild(rowNode);

    
    let dataBirthdate = document.createElement('td');
    dataBirthdate.innerHTML = info.birthdate;
    rowNode.appendChild(dataBirthdate);
    employeeTable.appendChild(rowNode);
    
    let dataAddress = document.createElement('td');
    dataAddress.innerHTML = info.address;
    rowNode.appendChild(dataAddress);
    employeeTable.appendChild(rowNode);

    let dataContactNum = document.createElement('td');
    dataContactNum.innerHTML = info.contactNumber;
    rowNode.appendChild(dataContactNum);
    employeeTable.appendChild(rowNode);

    let dataDateStarted = document.createElement('td');
    dataDateStarted.innerHTML = info.dateStarted;
    rowNode.appendChild(dataDateStarted);
    employeeTable.appendChild(rowNode);

    let datasss = document.createElement('td');
    datasss.innerHTML = info.sss;
    rowNode.appendChild(datasss);
    employeeTable.appendChild(rowNode);

    let dataPagibig = document.createElement('td');
    dataPagibig.innerHTML = info.pagibig;
    rowNode.appendChild(dataPagibig);
    employeeTable.appendChild(rowNode);

    let dataTin = document.createElement('td');
    dataTin.innerHTML = info.tin;
    rowNode.appendChild(dataTin);
    employeeTable.appendChild(rowNode);

    let dataPhilhealth = document.createElement('td');
    dataPhilhealth.innerHTML = info.philhealth;
    rowNode.appendChild(dataPhilhealth);
    employeeTable.appendChild(rowNode);
    
    //creates action td
    let actionNode = document.createElement('td');
    
    editBtn = document.createElement('button');
    editBtn.innerHTML = "Edit";
    actionNode.appendChild(editBtn);
    rowNode.appendChild(actionNode); 

    deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    actionNode.appendChild(deleteBtn);
    rowNode.appendChild(actionNode);
    
    editBtn.onclick = () =>{
      editEmployee(id);
    }    

    deleteBtn.onclick = () =>{
      deleteEmployee(id);
    }

  }

  const editEmployee = (id) =>{
    db.collection('employee')
      .doc(id)
      .get()
      .then((info) => {
        name.value = info.data().name;
        age.value = info.data().age;
        address.value = info.data().address;
        contactNumber.value = info.data().contactNumber;
        dateStarted.value = info.data().dateStarted;
        sss.value = info.data().sss;
        pagibig.value = info.data().pagibig;
        tin.value = info.data().tin;
        philhealth.value = info.data().philhealth;
        addBtn.style.display="none";
        saveBtn.style.display="block";

        saveBtn.onclick = () =>{
          saveBtn.disabled = true;
          saveBtn.innerHTML = "Saving..";
          db.collection('employee')
          .doc(id)
          .update({
          name: name.value,
          age: age.value,
          birthdate: birthdate.value,
          address: address.value,
          contactNumber: contactNumber.value,
          dateStarted: dateStarted.value,
          sss: sss.value,
          pagibig: pagibig.value,
          tin: tin.value,
          philhealth: philhealth.value,
          })
          .then(()=>{
            saveBtn.disabled = false;
            saveBtn.style.display = "none";
            addBtn.style.display = "block";
            name.value = "";
            age.value = "";
            birthdate.value = "";
            address.value = "";
            contactNumber.value = "";
            dateStarted.value = "";
            sss.value = "";
            pagibig.value = "";
            tin.value = "";
            philhealth.value = "";
          loadEmployee();
          })
        }
      });
      
      

      
      
  }

  const deleteEmployee = (id) =>{
    db.collection('employee')
    .doc(id)
    .delete();
    loadEmployee();


  }
  loadEmployee();
});

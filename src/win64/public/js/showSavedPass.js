// include node fs module
const fs = require("fs");

let showData = ()=>{
fs.readFile("savedPass.json", "utf8", (err, jsonString) => {
  //check if any error occured
  const msg = document.getElementById('noDispMsg');
  const dbData = document.getElementById('dbTable');
  if (err) {
    msg.innerHTML = `Oops! An unknown error occured.${err}`
    return;
  }
  //check if it exists in the DB
  if (jsonString.length == 0) {
    msg.innerHTML = `No passwords to show`;
    dbData.style.display = 'none';
    return;
  } else {
    const bodyData = document.getElementById("bodyData");
    console.log(jsonString)
    const passData = JSON.parse(jsonString);
    let count = 0;
    html = ``;
    passData.forEach((element, id) => {
      html += `
                <tr id = "row${id}">
                    <th scope="row" id = "sl${id}" style = "text-align:center;">${id+1}</th>
                    <td style = "text-align:center;">${element.tag}</td>
                    <td style = "text-align:center;">${element.date}</td>
                    <td style = "text-align:center;"><textarea class="form-control" id = "pwd${id}" rows="1" text-align:center;" readonly>${element.pwd}</textarea></td>
                    <td style = "text-align:center;">
                        <a id = "${id}" onclick = "copyClip(this.id)" href = "#">
                        <i class="fa fa-clipboard fa-2x"
                            style="color: white;">
                        </i>
                        </a>
                    </td>
                    <td style = "text-align:center;">
                        <button id = "${id}" onclick = "DeleteFunc(this.id)" class = "btn btn-danger">Delete</button>
                    </td
                </tr>
            `;
    });

    bodyData.innerHTML += html;
    msg.innerHTML = ``;
  }
});
}

showData();

//copy to clipBoard
const copyClip = (id) => {
  let copyPwd = document.getElementById(`pwd` + id);
  copyPwd.select();
  copyPwd.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

//Delete btn event
const DeleteFunc = (id) => {
  const pwd = document.getElementById(`pwd` + id).value;
  const rowRemove = document.getElementById(`row` + id);
  const msg = document.getElementById('noDispMsg');
  const dbData = document.getElementById('dbTable');
  const bodyData = document.getElementById("bodyData");

  //read savdJSON file
  fs.readFile("savedPass.json", "utf8", (err, jsonString) => {
    jsonString = JSON.parse(jsonString);

    // checkIndex match // if found then splice it else error not found)

    const checkIdMatch = (value) => {
      if (pwd === value.pwd) {
        return value
      }
    }
    const objId = jsonString.findIndex(checkIdMatch)

    if (objId == -1) {
      msg.innerHTML = `Oops! An uknown error occured`
      return;
    }
    else {
      jsonString.splice(objId, 1);
    }

    //till now a JS array of objects
    if (jsonString.length === 0) {
      jsonString = '';
    }
    else {
      //JSON object
      bodyData.innerHTML = '';
      jsonString = JSON.stringify(jsonString, null, 2);
    }

    fs.writeFile("savedPass.json", jsonString, (err) => {
      if (err) {
        msg.innerHTML = `An unfortunate error occured while deleting`;
        setTimeout(function ()  //displays msg for sometime
        {
          msg.innerHTML = '';
        }, 3000);
        return;
      }
      else{
        showData();
      }
    })
    
  })
}

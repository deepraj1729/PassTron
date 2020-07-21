// include node fs module
const fs = require("fs");

const addPass = document.getElementById("addPass");
addPass.addEventListener("click", (e) => {
  const tagName = document.getElementById("tagName").value;
  const password = document.getElementById("pwd").value;
  const msg = document.getElementById('msg');
  if (tagName.length < 3 || password.length < 8) {
    document.getElementById("msg").innerHTML =
    `<div style = "color: aquamarine;padding-top:10px;">Tag Name must contain atleast 3 characters and password must be >= 8 characters</div>`;
      setTimeout( function()  //displays msg for sometime
        {
          msg.innerHTML = '';
        }, 3000);
      e.preventDefault();
    return;
  } else {

    //date today
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    //first read
    fs.readFile("savedPass.json", "utf8", (err, jsonString) => {
      if (err) {
        msg.innerHTML =
        `<div style = "color: aquamarine;padding-top:10px;">Error while adding the password. Try Again</div>`
          setTimeout( function()  //displays msg for sometime
          {
            msg.innerHTML = '';
          }, 3000);
        e.preventDefault();
        return;
      }
      //check if it exists in the DB
      let lstId;
      //if not then submit it
      if(jsonString.length==0)
      {
          jsonString = []
          lstId = 0;

      }
      else{
        jsonString = JSON.parse(jsonString);
        lstId = jsonString[0].id +1
      }

      const createPwd = {
        id : lstId,
        tag: tagName,
        pwd: password,
        date: today
      };

      const  match = dataCheckTagname(createPwd,jsonString);
      if(match == undefined)
      {
        jsonString.unshift(createPwd);

      //then write to the DB
      jsonString = JSON.stringify(jsonString, null, 2);
      fs.writeFile("savedPass.json", jsonString, (err) => {
        if (err) {
          msg.innerHTML =
          `<div style = "color: aquamarine;padding-top:10px;">Error while saving the password. Try Again</div>`;
            setTimeout( function()  //displays msg for sometime
        {
          msg.innerHTML = '';
        }, 3000);
      e.preventDefault();
          return;
        }
          msg.innerHTML =
          `<div style = "color: aquamarine;padding-top:10px;">Created password successfully. Check your logs</div>`;
          document.getElementById("passLogs").innerHTML = `${today} Password Created successfully for tagname: ${createPwd.tag}`
          setTimeout( function()  //displays msg for sometime
        {
            msg.innerHTML = '';
            document.getElementById("passLogs").innerHTML = '';
        }, 3000);
      });
      document.getElementById("tagName").value = '';
      document.getElementById("pwd").value = '';
      }
    else{
      msg.innerHTML = `<div style = "color: aquamarine;padding-top:10px;">${tagName} already exists in the database.Try with another tag name.</div>`;
      setTimeout( function()  //displays msg for sometime
        {
          msg.innerHTML = '';
        }, 3000);
      }
    });
  }
  e.preventDefault();
});

///Important logic
//Check if tagname exists earlier in DB
const dataCheckTagname = (inpdata,data) =>{
  const matched = data.find(inp => inp.tag === inpdata.tag)
  return matched
}


//Advanced settings


//1. Random 8 character password

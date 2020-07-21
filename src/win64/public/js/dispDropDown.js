const dispDrop = document.querySelector(".dropbtn");

dispDrop.addEventListener("click",(e)=>{
    const linkPresent = document.querySelector('.dropdown-content');
    if(linkPresent.children.length == 0)
    {
        const html = 
        `
        <div class="custom-control custom-switch">
            <input type="checkbox" name = 'check' class="custom-control-input" id="c1" onclick="selectOnlyThis(this.id)">
            <label class="custom-control-label" for="c1">Auto Generate Secured Password (8 characters)</label>
        </div>

        <div class="custom-control custom-switch">
            <input type="checkbox" name = 'check' class="custom-control-input" id="c2" onclick="selectOnlyThis(this.id)">
            <label class="custom-control-label" for="c2">Auto Generate Secured Password (Variable characters)</label>
        </div>

        <div class="custom-control custom-switch">
            <input type="checkbox" name = 'check' class="custom-control-input" id="c3" onclick="selectOnlyThis(this.id)">
            <label class="custom-control-label" for="c3">Special Password</label>
        </div>
    `;
    linkPresent.innerHTML = html;
    linkPresent.style.padding = "10px;"
    }
    else{
        linkPresent.innerHTML = '';
        linkPresent.style.padding = "0;"
    }
    e.preventDefault();
});

//to allow only 1 checkbox to be selected
function selectOnlyThis(id) {
    for (var i = 1;i <= 3; i++)
    {
        document.getElementById(`c`+i).checked = false;
    }
    document.getElementById(id).checked = true;
}
    
  


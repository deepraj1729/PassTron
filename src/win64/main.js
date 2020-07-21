const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require("fs");
// SET ENV
process.env.NODE_ENV = 'production';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;


app.on('ready', function(){
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'home.html'),
    protocol: 'file:',
    slashes:true
  }));

  mainWindow.on('closed', function(){
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});


const check = ()=>{
  let blank = []
  fs.readFile("savedPass.json", "utf8", (err, jsonString) => {
    if(err){
      fs.writeFile("savedPass.json", blank, (err) => {
      })
    }
  })
}
check();


const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Options',
    submenu:[
      {
        role: 'reload'
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
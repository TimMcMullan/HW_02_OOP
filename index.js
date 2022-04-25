// Needed packages
const inquirer = require("inquirer");
const fs = require("fs");

// The interview: Gathering information for the README.md

const promptuser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'First Name: ',
                name: 'fname',
            },
            {
                type: 'input',
                message: 'Last Name: ',
                name: 'lname',
            },
            {
                type: 'list',
                message: 'Role',
                choices: ['Engineer', 'Manager', 'Intern'],
                name: 'role',    
            },
            {
                type: 'input',
                message: 'Email Address: ',
                name: 'email',
            },
            {
                type: 'input',
                message: 'github URL: ',
                name: 'github',
            },
            {
                type: 'input',
                message: 'Workplace ID: ',
                name: 'workplaceID',
            },
            {
                type: 'input',
                message: 'School',
                name: 'school',
            },
        ])
};

const generateHTML = ({ fname, lname, role, email, github, workplaceID, school }) =>

        `testies`;

const init = () => {
    promptuser()
        .then((data) => fs.writeFileSync('index.html', generateHTML(data)))
        .then(() => console.log('Successfully wrote Portfolio'))
        .catch((err) => console.error(err));
};


init();

// allows user to view html on local port 8080 
var http = require('http');
const { inherits } = require("util");

http.createServer(function (req, res) {
  var html = buildHtml(req);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(8080);

function buildHtml(req) {
  var header = '';
 try {
    var body = fs.readFileSync('index.html', 'utf8')
  } catch (err) {
    var body = err;
  }

  
  // concatenate header string
  // concatenate body string

  return '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};


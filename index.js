// Needed packages
const inquirer = require("inquirer");
const fs = require("fs");
const employees = [];

// The interview: Gathering information for the portfolio
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
                type: 'input',
                message: 'Email Address: ',
                name: 'email',
            },
            {
                type: 'list',
                message: 'Role',
                choices: ['Engineer', 'Manager', 'Intern'],
                name: 'role',
            },
            {
                type: 'input',
                message: 'github URL: ',
                name: 'github',
            },
            {
                type: 'number',
                message: 'Worker Number: ',
                name: 'worknum',
                validate: function (worknum) {
                    var valid = Number.isInteger(worknum)
                    return valid || `Please enter a valid whole number`
                }
            },
            {
                type: 'input',
                message: 'School',
                name: 'school',
            },
            {
                type: 'list',
                message: 'Do you want to add another employee?',
                choices: ['Yes', 'No'],
                name: 'add',
            },
        ])
    };

// build cards for employees 
function teamCard({ fname, lname, role, email, github, worknum, school }) {
    return `<div>
    <h2>${fname} ${lname}</h2>
    <h3>${role}</h3>
    <section>
        <ul>
            <li>${fname}</li>
            <li>${lname}</li>
            <li>${role}</li>
            <li><a href="mailto:${email}">${email}</a></li>
            <li><a href="https://${github}">${github}</a></li>
            <li>${worknum}</li>
            <li>${school}</li>
        </ul>
    </section>
</div>`;
}

// make sure every employee gets a card 
const generateHTML = (data) => {
    let teamData = '';

    for (var i = 0; i < data.length; i++) {
        teamData = teamData + teamCard(data[i])
    }
// build the HTML 
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>Super Awesome App</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
            <style>
                /* our shizzle goes here */
                .flex-container {
                    display: flex;
                    justify-content: center;
                }
    
                .flex-container > div {
                    margin: 10px;
                    font-size: 30px;
                    flex-wrap: wrap;
                    width: 300px;
                    box-shadow: 6px 6px 6px #ccc;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
    
                .flex-container > div > h2,
                .flex-container > div > h3
                {
                    color: #f2f2f2;
                    background-color: #0073ff;
                    padding: 0 10px;
                    margin: 0;
                }
    
                .flex-container > div > section {
                    background: #f2f2f2;
                }
    
                .flex-container > div > section > ul {
                    font-size: 18px;
                    padding: 0;
                    margin: 0;
                    list-style-type: none;
                }
    
                .flex-container > div > section > ul li {
                    background: #fff;
                    padding: 10px;                
                }
    
                .flex-container > div > section > p {
                    font-size: 18px;
                    background: #fff;
                }
    
                header {
                    box-sizing: content-box;
                    width: 100%;
                    background: #fe4650;
                    text-align: center;
                }
                header h1 {
                    line-height: 120px;
                    padding: 0;
                    margin: 0;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>My Team</h1>
            </header>
            <main>
                <div class="flex-container">
                    ${teamData}
                </div>
            </main>
        </body>
    </html>`;
}
// initialize the app 
const init = () => {
    promptuser()
        .then((data) => {
            employees.push(data)
            if (data.add === "Yes") {
                init();
            } else {
                fs.writeFileSync('index.html', generateHTML(employees))
            }
        });
};

// call the initialization function 
init();
// check out html on local browser 
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
// export html 
function buildHtml(req) {
    try {
        var body = fs.readFileSync('index.html', 'utf8')
    } catch (err) {
        var body = err;
    }




    return body;
}

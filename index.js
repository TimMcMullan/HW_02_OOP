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

    `<!DOCTYPE html>
    <html>
        <head>
            <title>Super Awesome App</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
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
                    <div>
                        <h2>${fname} ${lname}</h2>
                        <h3>${role}</h3>
                        <section>
                            <ul>
                                <li>${fname}</li>
                                <li>${lname}</li>
                                <li>${role}</li>
                                <li><a href="mailto:${email}">${email}</a></li>
                                <li><a href="https://${github}">${github}</a></li>
                                <li>${workplaceID}</li>
                                <li>${school}</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </body>
    </html>`;

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
    try {
        var body = fs.readFileSync('index.html', 'utf8')
    } catch (err) {
        var body = err;
    }


    // concatenate header string
    // concatenate body string

    return body;
}

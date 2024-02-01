const inquirer = require('inquirer')
const mysql = require('mysql2')


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // password: "password",
  database: "employee_tracker"
});


//connection id
connection.connect(function (err) {
  if (err) throw err
  console.log("Connected as Id" + connection.threadId)
  startPrompt();
});



class DB {
  constructor(connection) {
    this.connection = connection;
  };
};

async function startPrompt() {
  const val = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View All Employees?",
        "View All Employee's By Roles?",
        "View all Emplyees By Deparments",
        "Update Employee",
        "Add Employee?",
        "Add Role?",
        "Add Department?"
      ]
    }
  ]);

  switch (val.choice) {
    case "View All Employees?":
      viewAllEmployees();
      break;
    case "View All Employee's By Roles?":
      viewAllRoles();
      break;
    case "View all Emplyees By Deparments":
      viewAllDepartments();
      break;
    case "Add Employee?":
      addEmployee();
      break;
    case "Update Employee":
      updateEmployee();
      break;
    case "Add Role?":
      addRole();
      break;
    case "Add Department?":
      addDepartment();
      break;
  }
}

//view all employees
function viewAllEmployees() {
  connection.query(
    `SELECT 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            role.salary, 
            department.name, 
        CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee 
        INNER JOIN role on role.id = employee.role_id 
        INNER JOIN department on department.id = role.department_id 
        left join employee e on employee.manager_id = e.id;`,
    function (err, res) {
      if (err) throw err

      console.table(res)

      startPrompt()
    })
}

//view all roles
function viewAllRoles() {
  connection.query(
    `SELECT * FROM role`, function (err, res) {
      if (err) throw err

      console.table(res)

      startPrompt()
    })
}

//view all roles by department
function viewAllDepartments() {
  connection.query(
    `SELECT 
            employee.first_name, 
            employee.last_name, 
            department.name AS Department 
            FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;`,
    function (err, res) {
      if (err) throw err

      console.table(res)

      startPrompt()
    })
}

//select role queries and role title for add employee
// async function selectRole() {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT * FROM role`, function(err, res) {
//       if (err) {
//         reject(err);
//       } else {
//         const roleArr = res.map(role => role.title);
//         resolve(roleArr);
//       }
//     });
//   });
// }

async function selectRole() {
  const res = await connection.query("SELECT * FROM role");
  return res.map(role => ({ id: role.id, title: role.title }));
}


async function renderRole() {
  try {
    const roleArr = await selectRole();
    console.log(roleArr);
  } catch (err) {
    console.error(err);
  }
}

renderRole();

//select role queries and manager for add employee
async function selectManager() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT first_name FROM employee WHERE manager_id IS NULL`, function (err, res) {
      if (err) {
        reject(err);
      } else {
        const managersArr = res.map(manager => manager.first_name);
        resolve(managersArr);
      }
    });
  });
}

async function renderManager() {
  try {
    const managersArr = await selectManager();
    console.log(managersArr); // Use the managersArr array as needed
  } catch (err) {
    console.error(err);
  }
}

renderManager();

//add employee
async function addEmployee() {
  try {
    const answers = await inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name"
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name"
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: await selectRole()
      },
      {
        name: "choice",
        type: "rawlist",
        message: "What's their manager's name?",
        choices: await selectManager()
      }
    ]);

    const roleId = selectRole().indexOf(answers.role) + 1;
    console.log(roleId)
    const managerId = selectManager().indexOf(answers.choice) + 1;

     connection.query("INSERT INTO employee SET ?", {
      first_name: answers.firstname,
      last_name: answers.lastname,
      manager_id: managerId,
      role_id: roleId
    });

    console.table(answers);
    startPrompt();
  } catch (err) {
    console.error(err);
  }
}

//update employee
async function updateEmployee() {
  try {
    const res = await new Promise((resolve, reject) => {
      connection.query(`SELECT 
        employee.last_name, 
        role.title,
        role.id
    FROM 
        employee 
    JOIN 
        role 
    ON 
        employee.role_id = role.id;`,function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    console.log(res);

    const answers = await inquirer.prompt([
      {
        name: "lastName",
        type: "list",
        choices: () => res.map(employee => employee.last_name),
        message: "What is the Employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "What is the Employee's new title?",
        choices: () => res.map(role => role.title)
      }
    ]);
    // const roleTitle = await selectRole();

    // console.log(roleTitle);

    //const roleId = roleTitle.indexOf(toString(answers.role)) + 1;
    const roleId = res.find(role => role.title === answers.role);
    console.log(roleId.id);

    connection.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleId.id },
      { last_name: answers.lastName }
    ]);

    console.table(answers);
    startPrompt();
  } catch (err) {
    console.error(err);
  }
}

//add employee role
async function addRole() {
  try {
    const res = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
                role.title AS Title, 
                role.salary AS Salary 
            FROM 
                role`,

        function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });

    const answers = await inquirer.prompt([
      {
        name: "Title",
        type: "input",
        message: "What is the role's Title?"
      },
      {
        name: "Salary",
        type: "input",
        message: "What is the Salary?"
      }
    ]);

    connection.query("INSERT INTO role SET ?", {
      title: answers.Title,
      salary: answers.Salary
    });

    console.table(answers);
    startPrompt();
  } catch (err) {
    console.error(err);
  }
}

//Add dept
async function addDepartment() {
  try {
    const answers = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?"
      }
    ]);

    connection.query("INSERT INTO department SET ?", {
      name: answers.name
    });

    console.table(answers);
    startPrompt();
  } catch (err) {
    console.error(err);
  }
}


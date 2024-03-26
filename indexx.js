const inquirer = require('inquirer')
const mysql = require('mysql2')


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // password: "password",
  database: "employee_tracker"
}).promise();


//connection id
connection.connect().then(() => {
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
async function viewAllEmployees() {
  const [rows, fields] = await connection.query(
    `SELECT 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            role.salary, 
            department.name, 
        CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee 
        INNER JOIN role on role.id = employee.role_id 
        INNER JOIN department on department.id = role.department_id 
        left join employee e on employee.manager_id = e.id;`);
  console.table(rows);
  startPrompt()
}

//view all roles
async function viewAllRoles() {
  const [rows, columns] = await connection.query(`SELECT * FROM role`);
  console.table(rows);
  startPrompt();
}

//view all roles by department
async function viewAllDepartments() {
  const [rows, column] = await connection.query(
    `SELECT 
            employee.first_name, 
            employee.last_name, 
            department.name AS Department 
            FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;`)
  console.table(rows);
  startPrompt();
}



async function selectRole() {
  const [res] = await connection.query("SELECT * FROM role");
  return res.map(role => ({ value: role.id, name: role.title }));
}


async function renderRole() {
  try {
    const roleArr = await selectRole();

  } catch (err) {
    console.error(err);
  }
}

renderRole();

//select role queries and manager for add employee
async function selectManagers() {
  const [res] = await connection.query(`SELECT * FROM employee WHERE manager_id IS NULL`);
  const managersArr = res.map(manager => ({
    name: manager.first_name,
    value: manager.id
  }));
  return managersArr;
}


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
        name: "manager_id",
        type: "list",
        message: "What's their manager's name?",
        choices: await selectManagers()
      }
    ]);

  
    const roleId = answers.role;
    const managerId = answers.manager_id;

    await connection.query("INSERT INTO employee SET ?", {
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
    const [rows, columns] = await
      connection.query(
      `SELECT 
        employee.last_name, 
        role.title,
        role.id
    FROM 
        employee 
    JOIN 
        role 
    ON 
        employee.role_id = role.id;`);



    const answers = await inquirer.prompt([
      {
        name: "lastName",
        type: "list",
        choices: () => rows.map(employee => employee.last_name),
        message: "What is the Employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "What is the Employee's new title?",
        choices: () => rows.map(role => role.title)
      }
    ]);
    
    const roleId = rows.find(role => role.title === answers.role);


    await connection.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleId.id },
      { last_name: answers.lastName }
    ]);

   
    startPrompt();
  } catch (err) {
    console.error(err);
  }
}

//add employee role
async function addRole() {
  try {
    const [res] = await connection.query(
      `SELECT 
              role.title AS Title, 
              role.salary AS Salary 
        FROM 
              role`);

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

    await connection.query("INSERT INTO role SET ?", {
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


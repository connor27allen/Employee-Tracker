// const inquirer = require('inquirer');
// const db = require('./db');

// // Prompt for the main menu options
// function promptMainMenu() {
//   return inquirer.prompt([
//     {
//       type: 'list',
//       name: 'menuOption',
//       message: 'What would you like to do?',
//       choices: [
//         'View all departments',
//         'View all roles',
//         'View all employees',
//         'Add a department',
//         'Add a role',
//         'Add an employee',
//         'Update an employee role',
//         'Exit'
//       ]
//     }
//   ]);
// }

// // Prompt for adding a department
// function promptAddDepartment() {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'departmentName',
//       message: 'Enter the name of the department:'
//     }
//   ]);
// }

// // Prompt for adding a role
// function promptAddRole(departments) {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'roleTitle',
//       message: 'Enter the title of the role:'
//     },
//     {
//       type: 'input',
//       name: 'roleSalary',
//       message: 'Enter the salary for the role:'
//     },
//     {
//       type: 'list',
//       name: 'departmentId',
//       message: 'Select the department for the role:',
//       choices: departments.map(department => ({
//         name: department.departmentName,
//         value: department.departmentId
//       }))
//     }
//   ]);
// }

// // Prompt for adding an employee
// function promptAddEmployee(roles, employees) {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'firstName',
//       message: "Enter the employee's first name:"
//     },
//     {
//       type: 'input',
//       name: 'lastName',
//       message: "Enter the employee's last name:"
//     },
//     {
//       type: 'list',
//       name: 'roleId',
//       message: "Select the employee's role:",
//       choices: roles.map(role => ({
//         name: role.roleTitle,
//         value: role.roleId
//       }))
//     },
//     {
//       type: 'list',
//       name: 'managerId',
//       message: "Select the employee's manager:",
//       choices: employees.map(employee => ({
//         name: `${employee.firstName} ${employee.lastName}`,
//         value: employee.employeeId
//       }))
//     }
//   ]);
// }

// // Prompt for updating an employee role
// function promptUpdateEmployeeRole(employees, roles) {
//   return inquirer.prompt([
//     {
//       type: 'list',
//       name: 'employeeId',
//       message: 'Select the employee to update:',
//       choices: employees.map(employee => ({
//         name: `${employee.firstName} ${employee.lastName}`,
//         value: employee.employeeId
//       }))
//     },
//     {
//       type: 'list',
//       name: 'roleId',
//       message: 'Select the new role for the employee:',
//       choices: roles.map(role => ({
//         name: role.roleTitle,
//         value: role.roleId
//       }))
//     }
//   ]);
// }

// // Example usage
// promptMainMenu().then(answer => {
//   switch (answer.menuOption) {
//     case 'View all departments':
//       // Handle view all departments
//       const sql = 'SELECT * FROM departments';
//       d
//       break;
//     case 'View all roles':
//       // Handle view all roles
//       break;
//     case 'View all employees':
//       // Handle view all employees
//       break;
//     case 'Add a department':
//       promptAddDepartment().then(department => {
//         // Handle add department
//       });
//       break;
//     case 'Add a role':
//       // Fetch departments from the database
//       const departments = []; // Replace with actual database fetch
//       promptAddRole(departments).then(role => {
//         // Handle add role
//       });
//       break;
//     case 'Add an employee':
//       // Fetch roles and employees from the database
//       const roles = []; // Replace with actual database fetch
//       const employees = []; // Replace with actual database fetch
//       promptAddEmployee(roles, employees).then(employee => {
//         // Handle add employee
//       });
//       break;
//     case 'Update an employee role':
//       // Fetch employees and roles from the database
//       const employeesToUpdate = []; // Replace with actual database fetch
//       const rolesToUpdate = []; // Replace with actual database fetch
//       promptUpdateEmployeeRole(employeesToUpdate, rolesToUpdate).then(updatedEmployee => {
//         // Handle update employee role
//       });
//       break;
//     case 'Exit':
//       // Exit the application
//       break;
//   }
// });


// // init();
// // function init() {
// //     console.log('logo-text');
// //     callMainPrompt();
// // }

// // function callMainPrompt() {
// //     {p}
// // }

// // function updateEmployeeRole() {
// //     connection.query(`SELECT * FROM employee`, (err, data) => {
// //         const employeeOptions = data.map(({id, first_name, last_name}) => ({
// //             name: `${first_name} ${last_name}`,
// //             value: id
// //         }));
// //     connection.query(`SELECT * FROM role r JOIN department d ON r.department_id = d.id`, (err, data) => {
// //         const roleOptions = data.map(({id, title, name}) => ({
// //             name: `${title} / ${name}`,
// //             value: id
// //     }))

// //     inquirer.prompt([
// //         {
// //             type: 'list',
// //             name: 'employee_id',
// //             message: 'please select from the following list: ',
// //             choices: employeeOptions
// //         },
// //         {
// //             type: 'list',
// //             name: 'role',
// //             message: 'choose a new role for the employee ',
// //             choices: roleOptions
// //         }
// //     ])
// //     .then(answers => {
// //         connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answers.role_id, answers.employee_id], (err, data) => {
// //             if (err) throw err;
// //             console.log('The new role was updated successfully');
// //             menubar()
// //         })
// //     })
// //     })
// // })}
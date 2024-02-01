// const connection = require("./connection");

// class DB{
//     constructor(connection){
//         this.connection = connection;
//     };
// };

// findAllEmployees() {
//     return this.connection.promise().query(
//         "SELECT employee.id, employee.first_name, employ.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '  , manager.last_name) AS manager FROM employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
//     );

//     };

//  createEmployee(employee){
//     return this.connection.promise().query("INSERT INTO employee SET ?", employee);
//  }   

//  removeEmployee(employeeId){
//     return this.connection.promise().query(
//         "DELETE FROM employee WHERE id = ?",
//         employeeId
//     );
//  }

//  updateEmployeeRole(employeeId, roleId){
//     return this.connection.promise().query(
//         "UPDATE employee SET role_id = ? WHERE id = ?",
//         [roleId, employeeId]

//     );
//  }

 
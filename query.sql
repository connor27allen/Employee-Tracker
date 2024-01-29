USE employee_tracker;

SELECT
    e.first_name,
    e.last_name,
    r.title AS role_title,
    d.name AS department
    FROM employees e
        JOIN roles r 
            ON e.role_id = r.id
        JOIN department d
            ON r.department_id = d.id
    WHERE r.id = 1;


SELECT
        e.id,
        e.first_name,
        e.last_name,
        r.title AS role_title,
        d.name AS department,
        CONCAT(managers.first_name, '', managers.last_name) AS manager
    FROM employees e
        JOIN roles r
            ON e.role_id = r.id 
        JOIN department d 
            ON r.department_id = d.id
        LEFT JOIN employees manager
            ON e.manager_id = manager.id;
    

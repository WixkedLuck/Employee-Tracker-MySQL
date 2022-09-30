const inquirer =require('inquirer'); 
const express =require('express'); 
const MySql =require('mysq12'); 
const PORT =process.env.PORT || 3001; 
const app =express; 



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public')); 

//connect to database 
const db = mysql.creatConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
},
console.log(`now connected to ${database} table` )
);
//inquirer prompts
const Questions=() =>

inquirer.prompt([
    {
    type: 'list',
    name: 'Select',
    message: 'What would you like to do? ',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit'
    ]
}
]).then((select) => {
    if(select.Questions === 'View all departments'){
        allDepartments();
    }
    else if (select.Questions === 'View all roles'){
        viewAllRoles(); 
    }
    else if (select.Questions === 'View all employees'){
        viewAllEmployees();
    }
    else if (select.Questions === 'Add a department'){
        addDepartment(); 
    }
    else if (select.Questions === 'Add a role'){
        addRole(); 
    }
    else if (select.Questions === 'Add a employee'){
        addEmployee(); 
    }
    else if (select.Questions === 'Update employee role'){
        
    }
    else {
       return;  
    }
})
//function for allDepartments
const allDepartments =() => {
    const allDept = `SELECT * FROM department`;
    db.query(allDept, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        console.table(row);
        Questions();
     });
}
//function for allRoles
const viewAllRoles = () => {
    const viewRoles = 
    `SELECT roles.id, roles.title, roles.salary, department.name
    AS department
    FROM role
    LEFT JOIN department ON roles.departmentID = department.id`;
    db.query(viewRoles, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        console.table(row);
        Questions();
        });
    }


    const viewAllEmployees = () => {
        const All = 
        `SELECT employee.id, employee.first_name, employee.last_name, employee.managerID, roles.title
        AS role
        FROM employee
        LEFT JOIN role ON employee.roleID = roles.id;`
        db.query(All, (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            console.table(row);
            Questions();
            });
        }
    

//function for addDepartment
const addDepartment= () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'what is the departments id? '
        },
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter the name of the new department: ', 
        }
    ]).then((answer) => {
        const addDept = `INSERT INTO department (id,name) VALUES (?, ?)`;
        db.query(addDept, [answer.id, 
            answer.departmentId], (err, results) => {
            if (err) {
            console.log(err);
            }
            console.log('Department created successfully');
            Questions();
            })
        })
}


//function for addRole
const addRole= () => {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'roleId',
            message: 'What is the id for the new role: '
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'Please enter the name of the new role: ',  
        } ,
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter the salary of the new role $',  
        } ,
        {
            type: 'input',
            name: 'department',
            message: 'Please enter the department associated with this role: ',  
        } ,
    ]).then((answer) => {
        const sql = `INSERT INTO role (id, title, salary, departmentID) VALUES (?, ?, ?, ?)`
        db.query(sql, [answer.roleId, answer.newRole, answer.salary, answer.department], (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log('Role created successfully');
            Questions();
        }) 
        
    })
}




//function for addEmployee
const addEmployee = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'firstname',
        message: 'Please enter the FIRST name of the new employee: ',
        }, 
        {
            type: 'input',
            name: 'lastname',
            message: 'Please enter the LAST name of the new employee: ',
        }, 
        {
            type: 'input',
            name: 'role',
            message: 'Please enter the role of the employee: ',
        }, 
        {
            type: 'input',
            name: 'manager',
            message: 'Please enter the manager of the new employee: ',
        }, 

    ]).then((answer) => {
        const sql = `INSERT INTO employee (id, first_name, last_name, roleID,  managerID, departmentID) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [ answer.employee_id, answer.firstname, answer.lastname, answer.roleId, answer.manager_id, answer.dept_id], (err, results) => {
        if (err) {
        console.log(err);
        }
        console.log('Employee created successfully');
        Questions();
        })
    })
}





Questions(); 
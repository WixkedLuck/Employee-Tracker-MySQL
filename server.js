const inquirer =require('inquirer'); 
const express =require('express'); 
const MySql =require('mysq12'); 
const PORT =process.env.PORT || 3001; 
const app =express; 



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public')); 



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

    }
    else if (select.Questions === 'View all roles'){

    }
    else if (select.Questions === 'View all employees'){
        
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
        
    }
})






const addDepartment= () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter the name of the new department: ', 
        }
    ])
}









const addRole= () => {
    return inquirer.prompt([
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
    ])
}





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

    ])
}





Questions(); 
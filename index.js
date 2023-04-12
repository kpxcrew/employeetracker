const inquirer = require('inquirer')
const db = require('./db/connection')
require('console.table')

const utils = require('util')
const { start } = require('repl')
const { title } = require('process')
db.query = utils.promisify(db.query)

// starts the command line
async function beginApp() {
    const answer=await inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Hello, please select from an option down below!',
          // add choices for tracking purposes
          choices: [
            'View all the departments',
            'View all the roles',
            'View all the employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit',
          ],
        },
      ]) 

      switch (answer.choice) {
        case 'View all the departments':
          viewDepartments()
          break

        case 'View all the roles':
          viewRoles()
          break

        case 'View all the employees':
          viewEmployees()
          break

        case 'Add a department':
          addNewDepartment()
          break

        case 'Add a role':
          addNewRole()
          break

        case 'Add an employee':
          addNewEmployee()
          break

        case 'Update an employee role':
          updateEmployee()
          break

        case "Quit":
           db.close()
       
         
      }
}

// function for viewing current departments
async function viewDepartments(){
    const result=await db.query("select * from department")
    console.table(result)
    beginApp()
}

// function for viewing the current roles
async function  viewRoles(){
    const result = await db.query("select role.id, role.title, role.salary, department.name from role left join department on department.id = role.department_id")
    console.table(result)
    beginApp()
}

// function for viewing current employees
async function  viewEmployees(){
const sql = `SELECT employee.id, 
              employee.first_name AS "first name", 
              employee.last_name AS "last name", 
              role.title, 
              department.name AS department, 
              role.salary, 
              concat(manager.first_name,
              " ", 
              manager.last_name) AS manager
              FROM employee
              LEFT JOIN role
              ON employee.role_id = role.id
              LEFT JOIN department
              ON role.department_id = department.id
              LEFT JOIN employee manager
              ON manager.id = employee.manager_id`
const result = await db.query(sql)
console.table(result)
beginApp()
}

// function for adding a new department
async function addNewDepartment() {
  inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the new department called?"
        }
    ]).then(res => {
      var name = res;
      db.query("INSERT INTO department SET ?", name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => beginApp())
    })
}

// function for adding a new role
async function addNewRole() {
  db.query("Select * from department").then((rows) => {
    console.log(rows)
const choices = rows.map (({id , name })=> {
  return {
    name: name,
    value: id
  }
})

// quesiton prompts for role specifics
inquirer.prompt([
  {
      type: "input",
      name: "title",
      message: "what is the new role name?"
  },
  {
    type: "input",
    name: "salary",
    message: "what is the salary?"
},
{
  type: "list",
  name: "department_id",
  message: "what is the new role's department ID?",
  choices: choices
}
]).then(role => {
  console.log (role)
db.query(`INSERT INTO role (title, salary, department_id) values('${role.title}', ${role.salary}, ${role.department_id})`)
.then(() => console.log(`Added new role to the database`))
.then(() => beginApp())
})
  })
}

// function for adding new employees
  async function addNewEmployee() {
    const data = await db.query("Select * from employee")
    const employees = data.map (({first_name, last_name, id})=> {
      return {
        name: `${first_name} ${last_name} `,
        value: id
      }
    })
    db.query("Select * from role").then((rows) => {
  const choices = rows.map (({id , title })=> {
    return {
      name: title,
      value: id
    }
  })
  
// questionaire prompts for new employee info
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "what is the new employee's first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "what is the new employee's last name?"
  },
  {
    type: "list",
    name: "role_id",
    message: "what is the new employee's role ID?",
    choices: choices
  },
  {
    type: "list",
    name: "manager_id",
    message: "what is the new employee's manager ID?",
    choices: employees
  }
  ]).then(employee => {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values('${employee.first_name}', '${employee.last_name}', ${employee.role_id}, ${employee.manager_id})`)
  .then(() => console.log(`Added new employee to the database`))
  .then(() => beginApp())
  })
    })
  }


beginApp()
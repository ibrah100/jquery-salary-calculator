let employees = [];

$(document).ready(onReady);
 
// jQuery ready function
function onReady() {
    render();
    $('body').on('click', "#submitButton", submitEmp);
    $('body').on('click', ".removeButton", deleteEmp);
}

// function for submitting a new employee to table
function submitEmp() {
    
    // setting inputs to new values in the employees array
    let newFirst = $('#empFirstName').val();
    let newLast = $('#empLastName').val();
    let newNumber = $('#idNumber').val();
    let newTitle = $('#jobTitle').val();
    let newSalary = $('#annualSalary').val();

    let newEmployee = {
        first: newFirst,
        last: newLast,
        id: newNumber,
        title: newTitle,
        salary: newSalary
    }
    
    // after employee is added, added employee monthly salary to total monthly cost
    employees.push(newEmployee);
    render();
    calculateMonthlyCost();

    // clear input fields
    $('#empFirstName').val('');
    $('#empLastName').val('');
    $('#idNumber').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');

    
    

} 

// function to calculate total monthly cost
function calculateMonthlyCost(){
    let sum = 0;

    // for loop to iterate through employee array and adding up annual salary with each iteration
    for(let i = 0; i < employees.length; i++){
        sum += Number(employees[i].salary);
    }

    // turning total annual salary into monthly salary (just dividing by 12)
    let monthlyCost = (sum / 12);

    // getting total monthly cost and rounded to 2 decimal places to reflect money amount
    monthlyCost = (Math.round(monthlyCost * 100) / 100).toFixed(2);

    // monthly cost number turns red if more than $20,000
    if(monthlyCost > 20000){
        $('h2').addClass("problem");    
    } else {
        $('h2').removeClass("problem");    
    }

    $('#totalMonthly').text(monthlyCost); 
    // placing total monthly cost into the DOM dynamically by targeting that span id
   

}

function deleteEmp() {

    
    // traversing through siblings to get to the unique ID number to be removed
    let employeeIdMatch = $(this).parent().prev().prev().prev().text();

    console.log("Unique ID to delete is: " + employeeIdMatch);

    // looping through employees array to find any employees that don't match the unique Id above
    // then adding those employees to an array that won't be deleted
    let empToNotDelete = [];

    for (let employee of employees) {
        if (employeeIdMatch !== employee.id) {
            empToNotDelete.push(employee);
        }
    }

    employees = empToNotDelete;
    
    // re-rendering employees list and updating monthly cost number
    calculateMonthlyCost();
    render();



}

function render() {
    
    $('#empData').empty();

    for (let i = 0; i < employees.length; i++) {
        $('#empData').append(`
            <tr>
                <td>${employees[i].first}</td>
                <td>${employees[i].last}</td>
                <td class="idData">${employees[i].id}</td>
                <td>${employees[i].title}</td>
                <td>$${employees[i].salary}</td>
                <td><button class="removeButton">Remove</button></td>
            </tr>
        `)
    }

}
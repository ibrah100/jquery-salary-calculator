let employees = [
    {
        first: 'Malik',
        last: 'Ibrahim',
        id: '7634',
        title: 'Bartender',
        salary: '80000'
    }
];

$(document).ready(onReady);

function onReady() {
    render();
    $('body').on('click', "#submitButton", submitEmp);
}

function submitEmp() {
    
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

    employees.push(newEmployee);
    render();

    // clear input fields
    $('#empFirstName').val('');
    $('#empLastName').val('');
    $('#idNumber').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');

} 

function deleteEmp() {

}

function render() {
    
    $('#empData').empty();

    for (let i = 0; i < employees.length; i++) {
        $('#empData').append(`
            <tr>
                <td>${employees[i].first}</td>
                <td>${employees[i].last}</td>
                <td>${employees[i].id}</td>
                <td>${employees[i].title}</td>
                <td>${employees[i].salary}</td>
                <td><button class="removeButton"">Remove</button></td>
            </tr>
        `)
    }

}
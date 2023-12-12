var allData = [];
var clickedRowId = "";

$(document).ready(function () {
    getData();

    $("#empl_table tbody").on("click", 'button', function () {
        if ($(this).hasClass("btn-danger")) {
            deleteEmployee($(this));
        }
        else if ($(this).hasClass("btn-warning")) {
            editEmployee($(this));
        }
    })

    $('#editEmployeeModal').on('hidden.bs.modal', function () {
        $("#name").val("");
        $("#surname").val("");
        $("#email").val("");
        $("#jmbg").val("");
        $("#comment").val("");
    })

});

function getData() {
    var getRequest = $.ajax({
        type: "GET",
        url: "http://localhost:3000/employee"
    });
    getRequest.done(function (podaci) {
        allData = podaci;
        fillTable(podaci);
        $("#empl_table").dataTable();
    });
    getRequest.fail(function (error) {
        alert(error.statusText);
    });
}

function fillTable(data) {
    $("#empl_table_body").empty();
    $.each(data, function (i, podatak) {
        $("#empl_table_body").append(`
            <tr>
                <td> ${podatak.JMBG} </td>
                <td> ${podatak.name} </td>
                <td> ${podatak.surname} </td>
                <td> ${podatak.email} </td>
                <td> ${podatak.comment} </td>
                <td> <button class="btn btn-warning" id="edit_${podatak.id}">Edit</button> </td>
                <td> <button class="btn btn-danger" id="delete_${podatak.id}">Delete</button> </td>
            <\tr>
        `);
    })
}

function deleteEmployee(buttonObj) {
    let emplId = buttonObj.attr("id");
    let id = emplId.split("_")[1];
    var deleteRequest = $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/employee/" + id
    });
    deleteRequest.done(function (podaci) {
        //jedan nacin
        // getData();
        //drugi nacin
        buttonObj.parent().parent().remove();
        let tempIndex = allData.findIndex(x => x.id == id);
        if (tempIndex != -1) {
            allData.splice(tempIndex, 1);
        }
    });
    deleteRequest.fail(function (error) {
        alert(error.statusText);
    });
}

function editEmployee(buttonObj) {
    $("#editEmployeeModal").modal('toggle');
    $("#editEmployeeModalLabel").text("Edit Employee");
    let emplId = buttonObj.attr("id");
    let id = emplId.split("_")[1];
    clickedRowId = id;
    let tempIndex = allData.findIndex(x => x.id == id);
    if (tempIndex != -1) {
        let selectedEmployee = allData[tempIndex];
        $("#name").val(selectedEmployee.name);
        $("#surname").val(selectedEmployee.surname);
        $("#email").val(selectedEmployee.email);
        $("#jmbg").val(selectedEmployee.JMBG);
        $("#comment").val(selectedEmployee.comment);
    }

    //get only one employee with selected ID
    let getOneRequest = $.ajax({
        type: "GET",
        url: "http://localhost:3000/employee/"+id
    });
    getOneRequest.done(function(data){
        console.log(data);
    })
}

function saveChanges() {
    let name = $("#name").val();
    let surname = $("#surname").val();
    let email = $("#email").val();
    let jmbg = $("#jmbg").val();
    let comment = $("#comment").val();
    var editedEmployee = {
        name: name,
        surname: surname,
        email: email,
        JMBG: jmbg,
        comment: comment
    };

    let typeOfSaving = $("#editEmployeeModalLabel").text();
    if (typeOfSaving == "Edit Employee") {
        let editRequest = $.ajax({
            type: "PUT",
            url: "http://localhost:3000/employee/" + clickedRowId,
            data: editedEmployee
        });
        editRequest.done(function () {
            $("#editEmployeeModal").modal('toggle');
            getData();
        });
        editRequest.fail(function () {
            alert("Izmena podataka nije uspela");
        })
    }
    else {
        let addNewRequest = $.ajax({
            type: "POST",
            url: "http://localhost:3000/employee",
            data: editedEmployee
        });
        addNewRequest.done(function (savedData) {
            $("#editEmployeeModal").modal('toggle');
            // getData();
            $("#empl_table_body").append(`
            <tr>
                <td> ${savedData.JMBG} </td>
                <td> ${savedData.name} </td>
                <td> ${savedData.surname} </td>
                <td> ${savedData.email} </td>
                <td> ${savedData.comment} </td>
                <td> <button class="btn btn-warning" id="edit_${savedData.id}">Edit</button> </td>
                <td> <button class="btn btn-danger" id="delete_${savedData.id}">Delete</button> </td>
            <\tr>
        `);
        });
        addNewRequest.fail(function () {
            alert("Dodavanje podataka nije uspela");
        })
    }
}

function addNewEmployee() {
    $("#editEmployeeModal").modal('toggle');
    $("#editEmployeeModalLabel").text("Add New Employee");
}
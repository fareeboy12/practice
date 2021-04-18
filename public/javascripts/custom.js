$(document).ready(function () {
    getstudents();
});


//function to get data using ajax
function getstudents() {
    $.ajax({
        url: "student/marks"
    }).then(function (studentsmarks) {
        console.log(studentsmarks);
        const students = `${studentsmarks.map(student => `
        <tr>
            <th scope="row">1</th>
            <td>${student.name}</td>
            <td>${student.regno}</td>
            ${student.scores.map(score => 
            `<td>${score.marks}</td>`
        )}
        </tr>
        `)}`;
        $("tbody").html(students);
    })
}
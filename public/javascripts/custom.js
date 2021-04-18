var sno=0;
$(document).ready(function () {
    getstudents();
});


//function to get data using ajax
function getstudents() {
    $.ajax({
        url: "student/marks"
    }).then(function (studentsmarks) {
        console.log(studentsmarks);
        const students = `${studentsmarks.sort((a,b)=>
            parseFloat(a.regno)-parseFloat(b.regno)).map(student => `
        <tr>
            <th scope="row">${++sno}</th>
            <td><a href="./">${student.name}</a></td>
            <td>${student.regno}</td>
            ${student.scores.sort((a,b)=>
				parseFloat(a.head)-parseFloat(b.head)).map(score => 
            `<td>${score.marks}</td>`
        )}
        </tr>
        `)}`;
        $("tbody").html(students);
    });
}
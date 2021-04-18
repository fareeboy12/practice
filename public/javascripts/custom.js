$(document).ready(function () {
    getstudents();
    gethead();
    $("body").on("click", ".student", function(){
        var sno = $(this).parent().parent().children().eq(0).text();
        var name = $(this).text();
        var regno = $(this).parent().parent().children().eq(1).text();
    });
});

//function to get data using ajax
function getstudents() {
    $.ajax({
        url: "student/marks"
    }).then(function (studentsmarks) {
        let total = 0;
       // console.log(studentsmarks);
        const students = `${studentsmarks.sort((a,b)=>
            parseFloat(a.regno)-parseFloat(b.regno)).map(student => `
        <tr id="student-${student._id}">
            <th scope="row">${student._id}</th>
            <td><a class="student" href="./student/${student._id}">${student.name}</a></td>
            <td>${student.regno}</td>
            ${student.scores.sort((a,b)=>
				parseFloat(a.head)-parseFloat(b.head)).map(score => 
            `<td>${score.marks}</td>
            ${total+=score.marks}`
        )}
            <td>${total}</td>
            
            <td>${Math.round(total*100/100)} %</td>
            ${total=0}
        </tr>
        `)}`;
        $("tbody").html(students);
    });
}

//function to get head info for table
function gethead(){
    $.ajax({
        url: "/head"
    }).then(function(headid){
        let headtitle = `
        <th scope="col">S #</th>
        <th scope="col">Name</th>
        <th scope="col">Reg. #</th>
        ${headid.map(headData => 
            `<th scope="col">${headData.headname}</th>`)}
            <th scope="col">Total</th>
            <th scope="col">Percentage</th>
            <th scope="col">Grade</th>
            `
        
        $("table thead tr").html(headtitle);
    });
}

function studentform(){

}
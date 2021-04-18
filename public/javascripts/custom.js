var inputvalue = "";
$("body").on("focus", "input", function(){
    inputvalue = $(this).val();
})   
$(document).ready(function () {
 
    getstudents();
    gethead();
    getchanges();
    $(".student-dataupdate").hide();
    $("body").on("click", ".student", function () {
        studentform(this);
    });
});

//function to get data using ajax
function getstudents() {
    $.ajax({
        url: "student/marks"
    }).then(function (studentsmarks) {
        let total = 0;
        // console.log(studentsmarks);
        const students = `${studentsmarks.sort((a, b) =>
            parseFloat(a.regno) - parseFloat(b.regno)).map(student => `
            <tr id="student-${student._id}">
                <th scope="row">${student._id}</th>
                <td><a class="student" href="#">${student.name}</a></td>
                <td>${student.regno}</td>
                ${student.scores.sort((a, b) =>
                parseFloat(a.head) - parseFloat(b.head)).map(score =>
                    `<td>${score.marks}</td>
                ${total += score.marks}`
                )}
                <td>${total}</td>
                <td>${Math.round(total * 100 / 100)}%</td>
                <td>${
                    $.ajax({
                        url: "/grade"
                    }).then( (grades) => { 
                        grades.map(Grade => {
                            if (total >= Grade.start && total <= Grade.end) {
                                //Grade.grade
                                console.log(JSON.stringify(Grade))
                                
                            }
                        })
                    })
                }</td>
                ${total = 0}
                <td></td>
            </tr>
        `)}`;
        $(".table-hover tbody").html(students);
    });
}

//function to get head info for table
function gethead() {
    $.ajax({
        url: "/head"
    }).then(function (headid) {
        let headtitle = `
        <th scope="col">S#</th>
        <th scope="col">Name</th>
        <th scope="col">Reg.#</th>
        ${headid.map(headData =>
            `<th scope="col" hid="${headData._id}" marks="${headData.total}">${headData.headname}</th>`)}
            <th scope="col">Total</th>
            <th scope="col">Percentage</th>
            <th scope="col">Grade</th>
            `
        $(".table-hover thead tr").html(headtitle);
    });
}
// function getgrades(total) {

//     $.ajax({
//         url: "/grade"
//     }).then( (grades) => { 
//         grades.map(Grade => {
//             if (total >= Grade.start && total <= Grade.end) {
//                 Grade.grade
//             }
//         })
//     })
// }




function getchanges(){
    $("body").on('keydown', 'input.form-control', function(e) {
        var input = $(this).val();
        var total = parseInt($(this).parent().prev().text());

        var keyCode = e.keyCode || e.which; 
        if (keyCode == 9) { 
            if(input <= total){
                var updatedmarks = $(this).val();
                var headid = $(this).parent().parent().children().eq(0).text();
                var stno = $(this).parent().parent().parent().prev().children().eq(0).children().eq(1).attr("sno");
                // studentform();
                $.ajax({
                    url: "marks/save",
                    method: "POST",
                    data: {
                        marks: updatedmarks,
                        stid: stno,
                        headid: headid
                    }
                }).then(getstudents()).then(changecolors(stno));
              } 
              else{
                var minmarks = $(this).attr("min");
                var maxmarks = $(this).attr("max");
                var headname = $(this).parent().parent().children().eq(1).text();
                $("h4").html(headname+" Marks can only be between "+minmarks+" and "+maxmarks);
                $(this).val(input);
                $(this).addClass("border-danger");
                $(this).val(inputvalue);


                

              }
            }
            
        //   e.preventDefault(); 
          
      });
}

function changecolors(stno){
    $("#student-"+stno).css("background","green");
    $("#student-"+stno).css("color","white");
}

function studentform(student){
    $(".student-dataupdate").show();
    var sno = $(student).parent().parent().children().eq(0).text();
    var name = $(student).text();
    var regno = $(student).parent().parent().children().eq(2).text();
    var quiz1head = $(student).parent().parent().parent().prev().children().eq(0).children().eq(3);
    var quiz1id = $(quiz1head).attr("hid");
    var quiz2head = $(student).parent().parent().parent().prev().children().eq(0).children().eq(4);
    var quiz2id = $(quiz2head).attr("hid");
    var assign1head = $(student).parent().parent().parent().prev().children().eq(0).children().eq(5);
    var assign1id = $(assign1head).attr("hid");
    var assign2head = $(student).parent().parent().parent().prev().children().eq(0).children().eq(6);
    var assign2id = $(assign2head).attr("hid");
    var finalhead = $(student).parent().parent().parent().prev().children().eq(0).children().eq(7);
    var finalid = $(finalhead).attr("hid");
    var midhead = $(student).parent().parent().parent().prev().children().eq(0).children().eq(8);
    var midid = $(midhead).attr("hid");
    var projecthead = $(student).parent().parent().parent().prev().children().eq(0).children().eq(9);
    var projectid = $(projecthead).attr("hid");
    var cp1head = $(student).parent().parent().parent().prev().children().eq(0).children().eq(10);
    var cpid = $(cp1head).attr("hid");
    var totalhead = $(student).parent().parent().parent().prev().children().eq(0).children().eq(11);
    var percentagehead = $(student).parent().parent().parent().prev().children().eq(0).children().eq(12);
    var gradehead = $(student).parent().parent().parent().prev().children().eq(0).children().eq(13);

    //getting obtained marks for each head
    var quiz1obt = $(student).parent().parent().children().eq(3).text();
    var quiz2obt = $(student).parent().parent().children().eq(4).text();
    var assign1obt = $(student).parent().parent().children().eq(5).text();
    var assign2obt = $(student).parent().parent().children().eq(6).text();
    var final1obt = $(student).parent().parent().children().eq(7).text();
    var mid1obt = $(student).parent().parent().children().eq(8).text();
    var project1obt = $(student).parent().parent().children().eq(9).text();
    var cp1obt = $(student).parent().parent().children().eq(10).text();
    var totalobt = $(student).parent().parent().children().eq(11).text();
    var percentageobt = $(student).parent().parent().children().eq(12).text();
    var gradeobt = $(student).parent().parent().children().eq(13).text();
    
    $(".table-bordered thead").children().eq(0).children().eq(1).attr("sno", sno);
    $(".table-bordered thead").children().eq(0).children().eq(1).text(regno);
    $(".table-bordered thead").children().eq(1).children().eq(1).text(name);
    $(".table-bordered tbody").children().eq(0).children().eq(1).text(quiz1head.text());
    $(".table-bordered tbody").children().eq(0).children().eq(2).text($(quiz1head).attr("marks"));
    $(".table-bordered tbody").children().eq(0).children().eq(3).children().eq(0).val(quiz1obt);
    $(".table-bordered tbody").children().eq(0).children().eq(3).children().eq(0).attr("hid", quiz1id);
    $(".table-bordered tbody").children().eq(1).children().eq(1).text(quiz2head.text());
    $(".table-bordered tbody").children().eq(1).children().eq(2).text(quiz2head.attr("marks"));
    $(".table-bordered tbody").children().eq(1).children().eq(3).children().eq(0).val(quiz2obt);
    $(".table-bordered tbody").children().eq(1).children().eq(3).children().eq(0).attr("hid", quiz2id);
    $(".table-bordered tbody").children().eq(2).children().eq(1).text(assign1head.text());
    $(".table-bordered tbody").children().eq(2).children().eq(2).text(assign1head.attr("marks"));
    $(".table-bordered tbody").children().eq(2).children().eq(3).children().eq(0).val(assign1obt);
    $(".table-bordered tbody").children().eq(2).children().eq(3).children().eq(0).attr("hid", assign1id);
    $(".table-bordered tbody").children().eq(3).children().eq(1).text(assign2head.text());
    $(".table-bordered tbody").children().eq(3).children().eq(2).text(assign2head.attr("marks"));
    $(".table-bordered tbody").children().eq(3).children().eq(3).children().eq(0).val(assign2obt);
    $(".table-bordered tbody").children().eq(3).children().eq(3).children().eq(0).attr("hid", assign2id);
    $(".table-bordered tbody").children().eq(4).children().eq(1).text(finalhead.text());
    $(".table-bordered tbody").children().eq(4).children().eq(2).text(finalhead.attr("marks"));
    $(".table-bordered tbody").children().eq(4).children().eq(3).children().eq(0).val(final1obt);
    $(".table-bordered tbody").children().eq(4).children().eq(3).children().eq(0).attr("hid", finalid);
    $(".table-bordered tbody").children().eq(5).children().eq(1).text(midhead.text());
    $(".table-bordered tbody").children().eq(5).children().eq(2).text(midhead.attr("marks"));
    $(".table-bordered tbody").children().eq(5).children().eq(3).children().eq(0).val(mid1obt);
    $(".table-bordered tbody").children().eq(5).children().eq(3).children().eq(0).attr("hid", midid);
    $(".table-bordered tbody").children().eq(6).children().eq(1).text(projecthead.text());
    $(".table-bordered tbody").children().eq(6).children().eq(2).text(projecthead.attr("marks"));
    $(".table-bordered tbody").children().eq(6).children().eq(3).children().eq(0).val(project1obt);
    $(".table-bordered tbody").children().eq(6).children().eq(3).children().eq(0).attr("hid", projectid);
    $(".table-bordered tbody").children().eq(7).children().eq(1).text(cp1head.text());
    $(".table-bordered tbody").children().eq(7).children().eq(2).text(cp1head.attr("marks"));
    $(".table-bordered tbody").children().eq(7).children().eq(3).children().eq(0).val(cp1obt);
    $(".table-bordered tbody").children().eq(7).children().eq(3).children().eq(0).attr("hid", cpid);
    $(".table-bordered tbody").children().eq(8).children().eq(1).text(totalobt);
    $(".table-bordered tbody").children().eq(9).children().eq(1).text(percentageobt);
    $(".table-bordered tbody").children().eq(10).children().eq(1).text(gradeobt);
}
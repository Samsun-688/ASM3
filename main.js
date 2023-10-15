  $(document).ready(function() {
    let studentTable = $("#studentTable");
    let studentList = [];

    function addStudent() {
      let name = $("#name").val();
      let dob = $("#dob").val();
      let math = parseFloat($("#math").val());
      let physics = parseFloat($("#physics").val());
      let chemistry = parseFloat($("#chemistry").val());

      if (!name || !dob || isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
        alert("Vui lòng điền đầy đủ thông tin hợp lệ.");
        return;
      }

      let newStudent = {
        name: name,
        dob: dob,
        math: math,
        physics: physics,
        chemistry: chemistry,
      };
      studentList.push(newStudent);
      console.log(newStudent);
      displayTable(false);
    }

    function calculateAverage() {
      for (let i = 0; i < studentList.length; i++) {
        const student = studentList[i];
        let avg = (student.math + student.physics + student.chemistry) / 3;
        student.avg = avg.toFixed(2);
      }

      displayTable(true);
    }

    function determineRank() {
      let rank;

      for (let i = 0; i < studentList.length; i++) {
        const student = studentList[i];

        if (student.avg >= 8.0) {
          rank = "Giỏi";
        } else if (student.avg >= 6.5) {
          rank = "Khá";
        } else if (student.avg >= 5.0) {
          rank = "Trung Bình";
        } else if (student.avg < 5.0) {
          rank = "Yếu";
        }
        student.rank = rank;
        displayTable(false, true);
        determineExcellence();
      }
    }

    function determineExcellence() {
      const rows = studentTable.find("tr");

      for (let i = 0; i < rows.length; i++) {
        const average = parseFloat($(rows[i]).find("td:eq(5)").text());
        if (!isNaN(average) && average >= 8.0) {
          $(rows[i]).addClass("excellent");
        }
      }
    }

    function displayTable(isAverage, isRank) {
      studentTable.empty();

      for (let i = 0; i < studentList.length; i++) {
        const student = studentList[i];

        let row = $("<tr>");
        row.append($("<td>").text(student.name));
        row.append($("<td>").text(student.dob));
        row.append($("<td>").text(student.math));
        row.append($("<td>").text(student.physics));
        row.append($("<td>").text(student.chemistry));
        if (student.avg !== undefined && isAverage) {
          row.append($("<td>").text(student.avg));
        }
        if (student.rank !== undefined && isRank) {
          row.append($("<td>").text(student.rank));
        }

        studentTable.append(row);
      }
    }

    $("#addSudent").click(addStudent);
    $("#calculateAverage").click(calculateAverage);
    $("#determineRank").click(determineRank);
  });


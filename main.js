const input = document.getElementById("input");
const btnTest = document.getElementById("btn");

let file;

input.addEventListener("change", (event) => {
  file = event.target.files[0];
  console.log(file);
});

btnTest.addEventListener("click", () => {
  const reader = new FileReader();

  reader.readAsBinaryString(file);

  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, {
      type: "binary",
    });
    workbook.SheetNames.forEach(function (sheet) {
      // Here is your object
      const content = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheet]
      );
      const jsonString = JSON.stringify(content);
      const json = JSON.parse(jsonString);
      console.log(json);
    });
  };

  reader.onerror = function (ex) {
    console.log(ex);
  };
});

document.getElementById("submitBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) {
    alert("Please select a file first.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result.split(",")[1];
    sendFileToAPI(base64String);
  };

  reader.readAsDataURL(file);
});

function sendFileToAPI(base64File) {
  fetch("http://65.2.153.51:3001/admin/Create_QrCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file: base64File }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong!");
    });
}

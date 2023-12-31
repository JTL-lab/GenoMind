const OpenAI = require("openai-api");
const openai = new OpenAI();

document.getElementById("send-btn").addEventListener("click", function () {
  let userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    addMessageToChat("User", userInput);
    fetch("/getResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        addMessageToChat("Assistant", data.reply);
      });
    document.getElementById("user-input").value = "";
  }
});

function addMessageToChat(sender, message) {
  let chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function uploadPDFs() {
  var fileInput = document.getElementById("pdfUploader");
  var files = fileInput.files;
  if (files.length > 0) {
    // Loop through the FileList
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      const file = await openai.files.create({
        file: f,
        // file: fs.createReadStream("mydata.jsonl"),
        purpose: "fine-tune",
      });
      console.log("PDF uploaded: ", file.name);
    }
  } else {
    alert("Please select one or more PDF files to upload.");
  }
}
}

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("."));

const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci/completions";

const OPENAI_API_KEY = "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";

app.post("/getResponse", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt: userMessage,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error data: ", error.response.data);
      console.error("Error status: ", error.response.status);
      console.error("Error headers: ", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request: ", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    res.json({ reply: "Error: Unable to fetch response from OpenAI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

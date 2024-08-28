require('dotenv').config();
const express = require('express')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    return error.message;
  }
}

const app = express()
const port = process.env.PORT || 4000;

let text;

app.get('/', (req, res) => {
  res.send('NULL');
})

app.get('/api/:slug', async (req, res) => {
  text = await run(req.params.slug)
  res.end(text)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
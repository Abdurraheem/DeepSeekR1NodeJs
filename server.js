import express from 'express';
import bodyParser from 'body-parser';
import ollama from 'ollama';

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/query', async (req, res) => {
  const { prompt } = req.body;
  console.log(req)
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await ollama.chat({
      model: 'deepseek-r1:1.5b',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: response.message.content });
  } catch (err) {
    console.error('Error querying Ollama:', err);
    res.status(500).json({ error: 'Failed to process the request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

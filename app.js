// KMTmzw8YAtYn3o6FQyyPzMb9Po9du4m3

const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello, Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

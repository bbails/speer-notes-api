const express = require('express');

const app = express ();
app.use(express.json());

const PORT = 3000;//process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
     };
     
     response.send(status);
});
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = 2410;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
  res.header("Access-Control-Expose-Headers", "Authorization");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors());
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));


app.post('/myserver', async (req, res) => {
  let { method, fetchURL, body, headerKey1, headerKey2, headerKey3, headerValue1, headerValue2, headerValue3 } = req.body;
  let opt = (headerKey1 || headerKey2 || headerKey3) && { headers: { [headerKey1 || headerKey2 || headerKey3]: +(headerValue1 || headerValue2 || headerValue3) } }
  
  console.log(opt);
  let reqBody = body && JSON.parse(body);
  try {
    if (method === 'GET') {
      let response = await axios.get(fetchURL, opt)
      return res.status(200).send(JSON.stringify(response.data))
      // return res.status(200).send(response.data)
    }
    if (method === 'POST') {
      let response = await axios.post(fetchURL, reqBody, opt)
      // return res.status(200).send(response.data)
      return res.status(200).send(JSON.stringify(response.data))
    }
    if (method === 'PUT') {
      let response = await axios.put(fetchURL, reqBody, opt)
      // return res.status(200).send(response.data)
      return res.status(200).send(JSON.stringify(response.data))
    }
    if (method === 'DELETE') {
      let response = await axios.delete(fetchURL, opt)
      // return res.status(200).send(response.data)
      return res.status(200).send(JSON.stringify(response.data))
    }
  } catch (error) {
    console.log(error.response);
    return res.status(404).send(error.message)
  }
})



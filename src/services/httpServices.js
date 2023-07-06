import axios from 'axios';

// const baseURL = 'http://localhost:2410';
const baseURL = 'https://postman-like-app.onrender.com';

const post = async (body) => {
  let start, end, response;
  try {
    start = Date.now()
    response = await axios.post(`${baseURL}/myserver`, body)
    console.log(response);
    end = Date.now()
    return { data: response.data, status: response.status, statusText: response.statusText, time: end - start };
  } catch (error) {
    console.log(error);
    let { data, status, statusText } = error.response;
    end = Date.now()
    return { data: data, status: status, statusText: statusText, time: end - start };
  }
}

export { post }
import axios from "axios";

const apiTasks = axios.create({
  baseURL: "http://localhost:3000",
});
export default apiTasks;

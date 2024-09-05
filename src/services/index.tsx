import axios from "axios";

const apiTasks = axios.create({
  baseURL: "http://localhost:3333",
});
export default apiTasks;

import axios from "axios";
import { API_URL } from "@env";
const createTodo = async (token, todo) => {
  try {
    const res = await axios.post(
      `${API_URL}/todo/create-todo?token=${token}`,
      todo
    );
    console.log("From Add todo = > ", res.data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchTodos = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/todo/get-all-todo?token=${token}`);
    console.log(res.data);
    if (res.data.status === 200) {
      return res.data.data;
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchOneTodo = async (token, id) => {
  try {
    const res = await axios.get(
      `${API_URL}/todo/get-todo?todo_id=${id}&token=${token}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (token, todo, todo_id) => {
  try {
    const res = await axios.patch(
      `${API_URL}/todo/update-todo?token=${token}&todo_id=${todo_id}`,
      todo
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export { createTodo, fetchTodos, fetchOneTodo, updateTodo };

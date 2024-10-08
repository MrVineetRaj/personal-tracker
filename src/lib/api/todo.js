import axios from "axios";
import { API_URL } from "@env";
const createTodo = async (token, todo) => {
  try {
    const res = await axios.post(
      `https://personal-guide-backend.onrender.com/todo/create-todo?token=${token}`,
      todo
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchTodos = async (token) => {
  try {
    const res = await axios.get(
      `https://personal-guide-backend.onrender.com/todo/get-all-todo?token=${token}`
    );

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
      `https://personal-guide-backend.onrender.com/todo/get-todo?todo_id=${id}&token=${token}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (token, todo, todo_id) => {
  try {
    const res = await axios.patch(
      `https://personal-guide-backend.onrender.com/todo/update-todo?token=${token}&todo_id=${todo_id}`,
      todo
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (token, todo_id) => {
  try {
    const res = await axios.delete(
      `https://personal-guide-backend.onrender.com/todo/delete-todo?token=${token}&todo_id=${todo_id}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export { createTodo, fetchTodos, fetchOneTodo, updateTodo, deleteTodo };

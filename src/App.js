import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [todo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [toDoId, setToDoId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setToDoId(_id);
    setText(text);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDO App</h1>
        <div className="top">
          <input
            type="text"
            name="todo"
            value={text}
            placeholder="Add Todo..."
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setText, setToDo, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item) => (
            <Todo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

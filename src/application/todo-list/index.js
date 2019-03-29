import React, { useState } from "react";
import { Lista, Item, Form } from "components";

const TodoListApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    setTodos([...todos, todo]);
  };

  const onRemoveTodo = index => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  const onCompleteTodo = index => {
    const _todos = [...todos];
    _todos[index].complete = true;
    setTodos(_todos);
  };

  return (
    <div className="App">
      <Form onCreate={addTodo} todos={todos} />
      <Lista>
        {todos.map((todo, i) => (
          <Item
            key={i}
            {...todo}
            onComplete={_ => onCompleteTodo(i)}
            onRemove={_ => onRemoveTodo(i)}
          />
        ))}
      </Lista>
      {todos.length === 0 && (
        <span className="todo-empty">Ainda nao foi cadastrado nenhum TODO</span>
      )}
    </div>
  );
};

export { TodoListApp };

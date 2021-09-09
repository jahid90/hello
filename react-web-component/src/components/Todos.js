import React from 'react';
import Todo from './Todo';

const todos = [
    {
        id: 1,
        title: 'Do stuff',
        completed: true,
    },
    {
        id: 2,
        title: 'Do more stuff',
        completed: false
    }
];

const Todos = (props) => {
    return (
        <div>
            <h2>Todos</h2>
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default Todos;

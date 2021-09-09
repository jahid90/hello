import React from 'react';

const Todo = (props) => {

    const  { todo } = props;

    return (
        <div>
            <input type='checkbox' defaultChecked={todo.completed} /> { todo.title }
        </div>
    )
};

export default Todo;

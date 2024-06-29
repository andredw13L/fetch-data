import { useEffect, useState } from 'react';
import Todo from './Todo'; 

const Component: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp: Response) => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then((data: Todo[]) => {
            setTodos(data);
        })
        .catch((err: Error) => console.log(err));
    }, []);

    return (
        <div>
            {/* Renderização dos todos */}
            {todos.map(todo => (
                <div key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>Completed: {todo.isDone ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
};

export default Component;
import React from 'react';

import Header from './Header';
import Todo from './Todo';
import Form from './Form';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    // componentDidMount() {
    //     fetch('http://localhost:5000/api/todos')
    //         .then(response => response.json())
    //         .then(todos => this.setState({todos}));
    // }

    nextId() {
        this.lastId = this.lastId + 1 || 4;

        return this.lastId;
    }

    handleAdd(title) {
        const todo = {
            id: this.nextId(),
            title,
            completed: false,
        };

        const {todos} = this.state;
        todos.push(todo);

        this.setState({todos});
    }

    handleDelete(id) {
        const {todos} = this.state;
        todos.filter(todo => todo.id !== id);
        this.setState({todos});
    }

    handleToggle(id) {
        const {todos} = this.state;
        const currentTodo = todos.find(todo => todo.id === id);
        currentTodo.completed = !currentTodo.completed;
        this.setState({todos});
    }

    handleEdit(id, title) {
        const {todos} = this.state;
        const currentTodo = todos.find(todo => todo.id === id);
        currentTodo.title = title;
        this.setState({todos});
    }

    render() {
        return (
            <main>
                <Header todos={this.state.todos} />

                <section className="todo-list">
                    {this.state.todos.map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onDelete={this.handleDelete}
                            onToggle={this.handleToggle}
                            onEdit={this.handleEdit}
                        />
                    ))}
                </section>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

export default App;

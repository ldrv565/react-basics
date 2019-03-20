import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

    componentDidMount() {
        axios.get('/api/todos')
            .then(response => response.data)
            .then(todos => this.setState({todos}));
    }

    handleAdd(title) {
        axios.post('/api/todos', {title})
            .then(response => response.data)
            .then((todo) => {
                this.setState(prevState => ({
                    todos: [...prevState.todos, todo],
                }));
            });
    }

    handleDelete(id) {
        axios.delete(`/api/todos/${id}`)
            .then(() => {
                this.setState(prevState => ({
                    todos: prevState.todos.filter(todo => todo.id !== id),
                }));
            });
    }

    handleToggle(id) {
        axios.patch(`/api/todos/${id}`)
            .then((response) => {
                this.setState(prevState => ({
                    todos: prevState.todos.map((todo) => {
                        if (todo.id === id) {
                            return response.data;
                        }

                        return todo;
                    }),
                }));
            });
    }

    handleEdit(id, title) {
        axios.put(`/api/todos/${id}`, {title})
            .then((response) => {
                this.setState(prevState => ({
                    todos: prevState.todos.map((todo) => {
                        if (todo.id === id) {
                            return response.data;
                        }

                        return todo;
                    }),
                }));
            });
    }

    render() {
        return (
            <main>
                <Header todos={this.state.todos} />

                <ReactCSSTransitionGroup
                    component="section"
                    className="todo-list"
                    transitionName="slide"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
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
                </ReactCSSTransitionGroup>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

export default App;

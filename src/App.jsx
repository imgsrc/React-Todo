import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import todos from './todos';
import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';
import './app.sass';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          todos: []
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

  componentDidMount() {
      axios.get('/api/todos')
        .then(response => response.data)
        .then(todos => setState({todos}))
        .catch(error => console.error(error));
  }

    nextId() {
        this._nextId = this._nextId || 4;
        return this._nextId++;
    }

    handleAdd(title) {
        const todo = {
            id: this.nextId(),
            title,
            completed: false
        };

        const todos = [...this.state.todos, todo];

        this.setState({ todos });
    } 

    handleDelete(id) {
        const todos = this.state.todos.filter(todo => todo.id !== id);

        this.setState({ todos });
    }

    handleToggle(id) {
        const todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        this.setState({ todos });
    }

    handleEdit(id, title) {
        const todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title;
            }

            return todo;
        });

        this.setState({ todos });
    }

    render() {
        return (
            <main>
                <Header todos={this.state.todos} />

              <ReactCSSTransitionGroup
                component="section"
                className="todo-list"
                transitionName="slide"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                    {this.state.todos.map(todo => 
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onDelete={this.handleDelete}
                            onToggle={this.handleToggle}
                            onEdit={this.handleEdit}
                        />)
                    }
              </ReactCSSTransitionGroup>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

App.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired
};

ReactDOM.render(<App initialData={todos} />, document.getElementById('root'));
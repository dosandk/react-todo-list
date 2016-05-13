var TodoList = React.createClass({
    render: function() {
        var Tasks = this.props.todoData.map(function(value, i) {
            return <Task key={i} title={value} />
        });

        return (
            <ul className="list-group">
                {Tasks}
            </ul>
        )
    }
});

var Task = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">
                {this.props.title}
            </li>
        )
    }
});

var App = React.createClass({
    events: {
        createTodoList: function(e) {
            var data = this.state.data;
            var inputValue = this.state.inputValue.trim();
            var updatedData = data.concat([inputValue]);

            e.preventDefault();

            if (inputValue) {
                this.setState({
                    data: updatedData,
                    inputValue: '',
                    isFormDisabled: true
                });
            }

            this.myTextInput.focus();
        },
        changeInput: function(e) {
            const value = e.target.value.trim();

            this.setState({
                inputValue: value,
                isFormDisabled: !value.length
            });
        }
    },
    getInitialState: function() {
        return {
            inputPlaceholder: 'Input...',
            inputValue: '',
            isFormDisabled: true,
            data: []
        }
    },
    render: function () {
        return (
            <div className="jumbotron container">
                <form onSubmit={this.events.createTodoList.bind(this)} role="form" className="margin-bottom-20">
                    <div className="form-group">
                        <label>Create TODO</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={(ref) => this.myTextInput = ref}
                            value={ this.state.inputValue }
                            onChange={ this.events.changeInput.bind(this) }
                            placeholder={ this.state.inputPlaceholder } />
                    </div>
                    <input type="submit" value="Submit" className={'btn btn-primary ' + (this.state.isFormDisabled ? 'disabled' : '')} />
                </form>

                <TodoList todoData={ this.state.data }/>
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

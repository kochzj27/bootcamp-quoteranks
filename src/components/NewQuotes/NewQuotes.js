import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { updateAuthor } from '../../redux';
import { connect } from 'react-redux';

class NewQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      selectedObject: null,
      redirect: false,
      selection: ''
    }
  }

  componentDidMount() {
    if (this.props.authors && this.props.authors.length > 0 && this.props.selectedAuthor !== null) {
      let selection = this.props.authors.filter(x => x.id === this.props.selectedAuthor);
      this.setState({
        selection: selection[0],
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let nextId = this.state.selection.quotes.length > 0 ? parseInt(this.state.selection.quotes[this.state.selection.quotes.length - 1].id) + 1 : 1;
    let newQ = [...this.state.selection.quotes, { id: nextId, text: this.state.quote, score: 0 }]
    let newObj = Object.assign({ id: this.state.selection.id, name: this.state.selection.name, quotes: newQ });
    this.props.send({ type: 'updateItem', data: newObj })
    this.props.updateAuthor(this.state.selection.id);
    this.setState({ redirect: true, });
  }

  handleChange = (event) => {
    this.setState({
      quote: event.target.value,
    });
  }

  render() {
    if (this.state.redirect === true) {
      return (
        <div>
          <Redirect to='/quotes'></Redirect>
        </div>
      )
    }

    return (
      <div>
        <Link to='/'>Home</Link>
        <p>Provide a new quote by {this.state.selection.name}:</p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control' value={this.state.quote} onChange={this.handleChange} placeholder="Enter a quote" aria-describedby="emailHelp" />
          {this.state.quote.length < 3 ? <small id="emailHelp" className="form-text text-muted">Quote must be at least 3 characters!!</small> : null}
          <button className='btn btn-danger' onClick={() => this.setState({ redirect: true })}>Cancel</button>
          <button className='btn btn-primary' disabled={this.state.quote.length < 3}>Submit</button>
        </form>
      </div>)
  }
}
const mapStateToProps = (state) => ({
  authors: state.authors,
  selectedAuthor: state.selectedAuthor,
})

const mapDispatchToProps = (dispatch) => ({
  updateAuthor: (value) => dispatch(updateAuthor(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewQuotes);
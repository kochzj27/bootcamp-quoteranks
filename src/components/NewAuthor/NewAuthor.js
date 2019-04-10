import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: false,
      author: '',
      selectedObject: null,
      redirect: false,
    }
  }

  componentDidMount() {
    if (this.props.selectedAuthor && this.props.selectedAuthor !== '') {
      let name = this.props.authors.filter(x => x.id === this.props.selectedAuthor);
      console.log(name)
      this.setState({
        editFlag: true,
        author: name[0].name,
        selectedObject: name[0],
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.editFlag) {
      //send update
      let newObj = Object.assign({ id: this.state.selectedObject.id, name: this.state.author, quotes: this.state.selectedObject.quotes })
      this.props.send({ type: 'updateItem', data: newObj })
    } else {
      //send post
      let newObj = Object.assign({ name: this.state.author })
      this.props.send({ type: 'newItem', data: newObj })
    }
    this.setState({ redirect: true, });
  }

  handleChange = (event) => {
    this.setState({
      author: event.target.value,
    });
  }

  render() {

    if (this.state.redirect === true) {
      return (
        <div>
          <Redirect to='/'></Redirect>
        </div>
      )
    }

    return (
      <div>
        <Link to='/'>Home</Link>
        <p>Add a new quoteable author:</p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control' value={this.state.author} onChange={this.handleChange} placeholder="Enter a name" />
          <button className='btn btn-danger' onClick={() => this.setState({ redirect: true })}>Cancel</button>
          <button className='btn btn-primary' disabled={this.state.author === ''}>Submit</button>
        </form>
      </div>)
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors,
  selectedAuthor: state.selectedAuthor
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAuthor);

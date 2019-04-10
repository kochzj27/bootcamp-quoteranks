import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuthor } from '../../redux';
import "./Home.css";


const Home = (props) => {
  const [newFlag, setNewFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);


  const handleEdit = (value) => {
    props.updateAuthor(value);
    setNewFlag(true)
  }

  const handleView = (value) => {
    props.updateAuthor(value);
    setViewFlag(true)
  }

  let display;
  if (props.authors && props.authors.length > 0) {
    display = props.authors.map((per, idx) => {
      return (
        <tr key={idx}><td>{per.name}</td><td><button className='btn btn-dark' onClick={() => handleView(per.id)}>View Quotes</button><button className='btn btn-warning' onClick={() => handleEdit(per.id)}>Edit</button></td></tr>
      )
    })
  }

  if (newFlag) {
    return (<Redirect to='/new' />)
  }

  if (viewFlag) {
    return (<Redirect to='/quotes' />)
  }

  return (
    <div>
      <Link to='/new' onClick={() => handleEdit(null)}>Add a quoteable author</Link>
      <p>We have quotes by:</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Author</th>
            <th>Actions Available</th>
          </tr>
        </thead>
        <tbody>
          {display || <tr><td>Add one above :)</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authors: state.authors
})

const mapDispatchToProps = (dispatch) => ({
  updateAuthor: (value) => dispatch(updateAuthor(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
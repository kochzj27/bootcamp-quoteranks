import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuthor } from '../../redux';
import './ViewQuotes.css';

const ViewQuotes = (props) => {
  let authorName;
  let selectedAuth;

  const vote = (id, amt) => {
    // console.log(id, amt);
    let quote = selectedAuth[0].quotes.filter(x => x.id === id);
    quote[0].score += (amt);
    console.log(quote);
    let tempQ = { id: quote[0].id, text: quote[0].text, score: quote[0].score }
    let newQ = selectedAuth[0].quotes.filter(x => x.id !== id);
    newQ.push(tempQ);
    // console.log(newQ);
    let newObj = Object.assign({ id: selectedAuth[0].id, name: selectedAuth[0].name, quotes: newQ });
    // console.log(newObj)
    props.send({ type: 'updateItem', data: newObj })
  }

  const deleteQuote = (id) => {
    let newQ = selectedAuth[0].quotes.filter(x => x.id !== id);
    let newObj = Object.assign({ id: selectedAuth[0].id, name: selectedAuth[0].name, quotes: newQ });
    // console.log(newObj)
    props.send({ type: 'updateItem', data: newObj })
  }


  if (props.authors && props.authors.length > 0 && props.selectedAuthor !== null) {
    selectedAuth = props.authors.filter(x => x.id === props.selectedAuthor);
    authorName = selectedAuth[0].name;
    // console.log(selectedAuth);
    // console.log(authorName);
  }

  let display;
  if (props.authors && props.authors.length > 0 && props.selectedAuthor !== null) {
    if (selectedAuth[0].quotes.length > 0) {
      display = selectedAuth[0].quotes.map((quote, idx) => {
        return (
          <tr key={idx}>
            <td>"{quote.text}"</td>
            <td>{quote.score}</td>
            <td><button className='btn btn-success' onClick={() => vote(quote.id, 1)}><i className="fas fa-angle-up"></i></button><button className='btn btn-warning' onClick={() => vote(quote.id, -1)}><i className="fas fa-angle-down"></i></button><button className='btn btn-danger' onClick={() => deleteQuote(quote.id)}><i className="fas fa-trash"></i></button></td>
          </tr>
        )
      })
    }
  }

  return (
    <div>
      <div className='flex-cont'>
        <Link to='/' onClick={() => props.updateAuthor(null)}>Home</Link>
        <Link to='/write'>Add Quote</Link>
      </div>
      <p>Quotes by {authorName}:</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Quote</th>
            <th>Votes</th>
            <th>Actions Available</th>
          </tr>
        </thead>
        <tbody>
          {display && display.length > 0 ? display : null}
        </tbody>
      </table>
    </div >
  )
}

const mapStateToProps = (state) => ({
  authors: state.authors,
  selectedAuthor: state.selectedAuthor,
})

const mapDispatchToProps = (dispatch) => ({
  updateAuthor: (value) => dispatch(updateAuthor(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuotes);
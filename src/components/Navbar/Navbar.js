import React from 'react';
import Link from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {
  console.log(props)
  let current = props.match.path;
  console.log(current);

  return (<div>
    link
  </div>)
}

export default Navbar;
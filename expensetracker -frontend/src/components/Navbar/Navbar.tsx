import React from 'react';
import './Navbar.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import ExpenseImage from './expenses.png'; // Import the image

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
      <img src={ExpenseImage} alt="Expense Logo"  className='log'/>
        ExpenseTracker</div>
      <ul className="nav-list">
        <Link to='/' className='links'><li>Home</li></Link>
        <Link to='/chart' className='links'><li>Charts</li></Link>
        <li><a href='https://www.linkedin.com/in/prasanna-govindaraju-880634215/' className='links'>Contact</a></li>
      </ul>
    </div>
  );
}

export default Navbar;

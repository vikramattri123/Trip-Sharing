import React from 'react'
import '../css/OptionButton.css';
const OptionButton = () => {
  return (
    <div id="container">
    <div className="dots">
    <div></div>
  </div>
  <div id="menu">
    <div>
      <ul>
        <li><a href="#" className="link">Option one</a></li>
        <li><a href="#" className="link">Option two</a></li>
        <li><a href="#" className="link">Option three</a></li>
      </ul>
    </div>
 </div>
 </div>
  )
}

export default OptionButton
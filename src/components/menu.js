
import React, { useState } from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleToggle = () => {
    setMenuExpanded(!menuExpanded);
  };


  return (
    <header className="header">
      <div className="title">
        <h1><Link to="/">Yifan Gong</Link></h1>
      </div>
      <FontAwesomeIcon icon={faBars} onClick={handleToggle} className="bars"/>
      <nav className={menuExpanded ? "expanded": ""}>
        <li className="menu-item"><Link to="/about" activeClassName="link-active">Biography</Link></li>
        <li className="menu-item"><Link to="/live-performance" activeClassName="link-active">Live Performance</Link></li>
        <li className="menu-item"><Link to="/painting" activeClassName="link-active">Painting</Link></li>
        <li className="menu-item"><Link to="/photography" activeClassName="link-active">Photography</Link></li>
        <li className="menu-item"><Link to="/showreel" activeClassName="link-active">Showreel</Link></li>
        <li className="menu-item"><Link to="/video-performance" activeClassName="link-active">Video Performance</Link></li>
        <li className="menu-item"><Link to="/works" activeClassName="link-active">Works</Link></li>
        <li className="menu-item"><Link to="/writing" activeClassName="link-active">Writing</Link></li>
      </nav>      
    </header>
  )
}



export default Menu
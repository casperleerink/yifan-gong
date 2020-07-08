
import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleToggle = () => {
    setMenuExpanded(!menuExpanded);
  };
  useEffect(() => {    
    // Update the document title using the browser API  
    const navbar = document.getElementById('header');
    const sticky = navbar.offsetTop;
    window.onscroll = () => {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    };
  });
  const data = useStaticQuery(graphql`
    query MenuQuery {
      works: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "work-page"}}}) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
      }
    `);
  const workDropdownItems = data.works.nodes.map((item) =>
    <Link to={`${item.fields.slug}`}>
      {item.frontmatter.title}
    </Link>
  );
  return (
    <header className="header" id="header">
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
        <li className="menu-item dropdown">
          <Link to="/works" activeClassName="link-active">Works</Link>
          <div class="dropdown-content">
            {workDropdownItems}
          </div>
        </li>
        <li className="menu-item"><Link to="/writing" activeClassName="link-active">Writing</Link></li>
      </nav>      
    </header>
  )
}



export default Menu

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
      videoPerformances: allMarkdownRemark(filter: {fields: {slug: {regex: "/video-performances/"}}}) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
      livePerformances: allMarkdownRemark(filter: {fields: {slug: {regex: "/live-performances/"}}}) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
      music: allMarkdownRemark(filter: {fields: {slug: {regex: "/music/"}}}) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
      paintings: allMarkdownRemark(filter: {fields: {slug: {regex: "/paintings/"}}}) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
      photographs: allMarkdownRemark(filter: {fields: {slug: {regex: "/photographs/"}}}) {
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
  const videoPerformances = data.videoPerformances.nodes.map((item) =>
    <Link to={item.fields.slug} key={item.fields.slug}>
      {item.frontmatter.title}
    </Link>
  );
  const livePerformances = data.livePerformances.nodes.map((item) =>
    <Link to={item.fields.slug} key={item.fields.slug}>
      {item.frontmatter.title}
    </Link>
  );
  const music = data.music.nodes.map((item) =>
    <Link to={item.fields.slug} key={item.fields.slug}>
      {item.frontmatter.title}
    </Link>
  );
  const paintings = data.paintings.nodes.map((item) =>
    <Link to={item.fields.slug} key={item.fields.slug}>
      {item.frontmatter.title}
    </Link>
  );
  const photographs = data.photographs.nodes.map((item) =>
    <Link to={item.fields.slug} key={item.fields.slug}>
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
        <li key="about" className="menu-item"><Link to="/about" activeClassName="link-active">Biography</Link></li>
        <li key="showreel" className="menu-item"><Link to="/showreel" activeClassName="link-active">Showreel</Link></li>
        <li key="video-performances" className="menu-item dropdown">
          <Link to="/video-performances" activeClassName="link-active">Video</Link>
          <div className="dropdown-content">
            {videoPerformances}
          </div>
        </li>
        <li key="live-performance" className="menu-item dropdown">
          <Link to="/live-performances" activeClassName="link-active">Live Performance</Link>
          <div className="dropdown-content">
            {livePerformances}
          </div>
        </li>
        <li key="painting" className="menu-item dropdown">
          <Link to="/painting" activeClassName="link-active">Painting</Link>
          <div className="dropdown-content">
            {paintings}
          </div>
        </li>

        <li key="photographs" className="menu-item dropdown">
          <Link to="/photographs" activeClassName="link-active">Photography</Link>
          <div className="dropdown-content">
            {photographs}
          </div>
        </li>
        
        <li key="music" className="menu-item dropdown">
          <Link to="/music" activeClassName="link-active">Music/Sound</Link>
          <div className="dropdown-content">
            {music}
          </div>
        </li>

        <li key="writing" className="menu-item"><Link to="/writing" activeClassName="link-active">Writing</Link></li>
      </nav>      
    </header>
  )
}



export default Menu
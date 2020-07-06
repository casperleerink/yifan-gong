
//See: https://www.gatsbyjs.org/docs/use-static-query/
import React from "react"
import PropTypes from "prop-types"
// import {useStaticQuery, graphql} from "gatsby"

import Menu from "./menu"


const Layout = ({children}) => {
  return (
    <>
      <Menu />
      <main className="main-content">{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
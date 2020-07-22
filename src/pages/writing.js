import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

const WritingsPage = ({data}) => {
    const works = data.allMarkdownRemark.edges.map(({node}) => {
        return (
          <li key={node.frontmatter.title}>
            <a href={node.frontmatter.file} style={{marginLeft: `${Math.random() * 50}%`}}>{node.frontmatter.title}</a>
          </li>
        )
    });
    return (
      <Layout>
        <SEO title="Writings"/>
        <div className="writing-list">
          <ul>
          {works}
          </ul>
        </div> 
      </Layout>
    )
}

export default WritingsPage

export const writingsPageQuery = graphql`
query writingsQuery {
    allMarkdownRemark(filter: {fields: {slug: {regex: "/writings/"}}}) {
      edges {
        node {
          frontmatter {
            title
            file
          }
        }
      }
    }
  }  
`
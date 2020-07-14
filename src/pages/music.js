import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from 'gatsby'



const MusicPage = ({data}) => {
    const works = data.allMarkdownRemark.edges.map(({node}) => {
        return (
          <div className="works-item">
              <Link to={node.fields.slug}>
                <img src={node.frontmatter.image} alt={node.frontmatter.title}/>
                <div className="title-excerpt">
                  <h2>{node.frontmatter.title}</h2>
                  <h3>{node.frontmatter.date}</h3>
                  <p>{node.excerpt}</p>
                </div>
              </Link>
          </div>
        )
    });
    return (
      <Layout>
        <SEO title="Works"/>
        <div className="works-container">
            {works}
        </div> 
      </Layout>
    )
}

export default MusicPage

export const musicPageQuery = graphql`
query musicQuery {
    allMarkdownRemark(filter: {fields: {slug: {regex: "/music/"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM YYYY")
            image
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }  
`
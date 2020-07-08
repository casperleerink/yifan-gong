import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'



const WorksPage = ({data}) => {
    const works = data.allMarkdownRemark.edges.map(({node}) => {
        return (
          <div className="works-item">
              <Link to={node.fields.slug}>
                <img src={`${node.frontmatter.image}?nf_resize=smartcrop&w=400&h=400`} alt={node.frontmatter.title}/>
                <h5>{node.frontmatter.title}</h5>
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

export default WorksPage

export const worksPageQuery = graphql`
query worksQuery {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "work-page"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image
          }
        }
      }
    }
  }  
`
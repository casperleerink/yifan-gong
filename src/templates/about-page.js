import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import Content, {HTMLContent} from "../components/Content"
import Img from "gatsby-image"


export const AboutTemplate = ({content, contentComponent}) => {
  const PageContent = contentComponent || Content;
  return (
    <div class="about-container">
      <PageContent className={'content'} content={content.html} />
      <Img fluid={content.frontmatter.image.childImageSharp.fluid}/>
    </div>
  )
}

const AboutPage = ({data}) => {
  return (
  <Layout>
    <SEO title="About" />
    <AboutTemplate contentComponent={HTMLContent} content={data.markdownRemark}/>
  </Layout>
  )
}

export default AboutPage


export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
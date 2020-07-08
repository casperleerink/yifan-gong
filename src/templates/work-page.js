import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import Content, {HTMLContent} from "../components/Content"
// import Img from "gatsby-image"

export const WorkTemplate = ({content, contentComponent}) => {
  const PageContent = contentComponent || Content;
  return (
    <div class="work-page-container">
        <h1>{content.frontmatter.title}</h1>
        <p>{content.frontmatter.date}</p>
        <PageContent className={'content'} content={content.html} />
        <img src={content.frontmatter.image}/>
    </div>
  )
}

const WorkPage = ({data}) => {
  return (
  <Layout>
    <SEO title="About" />
    <WorkTemplate contentComponent={HTMLContent} content={data.markdownRemark}/>
  </Layout>
  )
}

export default WorkPage


export const workPageQuery = graphql`
  query workPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        image
        title
        date(formatString: "MMMM YYYY")
      }
    }
  }
`
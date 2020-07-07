import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import Content, {HTMLContent} from "../components/Content"


export const AboutTemplate = ({content, contentComponent}) => {
  const PageContent = contentComponent || Content;
  return (
    <PageContent className={'about-container'} content={content} />
  )
}

const AboutPage = ({data}) => {
  
  
  return (
  <Layout>
    <SEO title="About" />
    <AboutTemplate contentComponent={HTMLContent} content={data.markdownRemark.html}/>
  </Layout>
  )
}

export default AboutPage


export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`
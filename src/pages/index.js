import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

export default function Home({data}) {
  return (
    <div className="landing-page" style={{backgroundImage: `url(${data.markdownRemark.frontmatter.image})`}}>
      <Layout>
        <SEO title="Home"/>
      </Layout>
    </div>
  )
}

export const homePageQuery = graphql`
query homeQuery {
  markdownRemark(fields: {slug: {regex: "/home/"}}) {
    frontmatter {
      image
    }
  }
  }  
`
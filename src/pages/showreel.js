import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

export default function Showreel({data}) {
  const youtube_parser = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match&&match[7].length===11) ? match[7] : '';
  }

  const works = data.allMarkdownRemark.edges.map(({node}) => {
    return (
      <>
        <h1>{node.frontmatter.title}</h1>
        <div className="video-container">
          <iframe 
            src= {`https://www.youtube.com/embed/${youtube_parser(node.frontmatter.url)}`}
            title={node.frontmatter.title}
            className="video" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </>
    )
});

  return (
    <Layout>
      <SEO title="Showreel"/>
      <div className="work-page-container">
        <div className="content">
        {works}
        </div>
      </div>
    </Layout>
  )
}

export const showreelPageQuery = graphql`
query showreelQuery {
    allMarkdownRemark(filter: {fields: {slug: {regex: "/showreel/"}}}) {
      edges {
        node {
          frontmatter {
            title
            url
          }
        }
      }
    }
  }  
`
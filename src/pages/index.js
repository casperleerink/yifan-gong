import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home() {
  return (
    <div className="landing-page">
      <Layout>
        <SEO title="Home"/>
        {/* <div>An image or some text?</div> */}
      </Layout>
    </div>
  )
}

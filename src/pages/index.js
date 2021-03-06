import React from "react"
import Hero from "../components/Hero/Hero"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Hero />
  </Layout>
)

export default IndexPage

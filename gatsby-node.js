const path = require(`path`);
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // fmImagesToRelative(node);
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
}
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
                slug
            }
            frontmatter {
              templateKey
            }
            id
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const data = result.data.allMarkdownRemark.edges;

  data.forEach((edge) => {
    const id = edge.node.id;
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(`src/templates/${edge.node.frontmatter.templateKey}.js`),
      context: {
        id,
      },
    })
  })
}
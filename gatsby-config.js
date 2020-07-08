module.exports = {
  siteMetadata: {
    title: `Yifan Gong`,
    description: `Portfolio Website of Yifan Gong`,
    author: `Casper Leerink`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {            
      resolve: `gatsby-source-filesystem`,      
      options: {
        path: `${__dirname}/static/assets`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    //transform markdown (including relative image paths)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // {
          //   resolve: `gatsby-remark-images`,
          //   options: {
          //     maxWidth: 800,
          //   }
          // },
        ]
      }
    },
    //netlify CMS
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      }
    },
  ],
}

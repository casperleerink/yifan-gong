import React, {useEffect} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import Content, {HTMLContent} from "../components/Content"


export const AboutTemplate = ({content, contentComponent}) => {
  const PageContent = contentComponent || Content;
  useEffect(() => {
    // Set a variable for our button element.
    const scrollToTopButton = document.getElementById('js-top');

    // Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
    const scrollFunc = () => {
      // Get the current scroll value
      let y = window.scrollY;
      
      // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
      if (y > 0) {
        scrollToTopButton.className = "top-link show";
      } else {
        scrollToTopButton.className = "top-link hide";
      }
    };

    window.addEventListener("scroll", scrollFunc);

    const scrollToTop = () => {
      // Let's set a variable for the number of pixels we are from the top of the document.
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      
      // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
      // We'll also animate that scroll with requestAnimationFrame:
      // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        // ScrollTo takes an x and a y coordinate.
        // Increase the '10' value to get a smoother/slower scroll!
        window.scrollTo(0, c - c / 10);
      }
    };

    // When the button is clicked, run our ScrolltoTop function above!
    scrollToTopButton.onclick = function(e) {
      e.preventDefault();
      scrollToTop();
    }
  });
  return (
    <div class="about-container">
      <img src={content.frontmatter.image} alt="Yifan Gong"/>
      <PageContent className={'content'} content={content.html} />
      <div className="table-of-contents" dangerouslySetInnerHTML={{ __html: content.tableOfContents }}/>
      <button className="top-link" href="" id="js-top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6"><path d="M12 6H0l6-6z"/></svg>
        <span className="screen-reader-text">Back to top</span>
      </button>
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
      tableOfContents
      frontmatter {
        image
      }
    }
  }
`
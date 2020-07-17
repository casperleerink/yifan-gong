import React from 'react'
import { AboutTemplate } from '../../templates/about-page'

const AboutPreview = ({ widgetFor}) => {
    const pageData = {
        html: widgetFor('body'),
        frontmatter: {
            image: widgetFor('image'),
        }
    }
    return (
        <AboutTemplate content={pageData}/>

    )
}


export default AboutPreview
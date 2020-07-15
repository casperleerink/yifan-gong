import React from 'react'
import { AboutTemplate } from '../../templates/about-page'

const AboutPreview = ({ widgetFor }) => {
    return (
        <AboutTemplate content={widgetFor('body')}/>
    )
}


export default AboutPreview
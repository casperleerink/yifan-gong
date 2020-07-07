import React from 'react'
import { AboutTemplate } from '../../templates/about-page'

const Preview = ({ widgetFor }) => {
    return (
        <AboutTemplate
            content={widgetFor('body')}
        />
    )
}


export default Preview
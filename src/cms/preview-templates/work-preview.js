import React from "react"
import Content from "../../components/Content"


const WorkPreview = ({entry, widgetFor}) => {
    const PageContent = Content;
    console.log(entry);
    return (
        <div className="work-page-container">
            <PageContent className={'content'} content={widgetFor('body')} />
        </div>
    )
}

export default WorkPreview
import CMS from 'netlify-cms-app';
import AboutPreview from './preview-templates/about-preview'
import WorkPreview from './preview-templates/work-preview'

import styles from '!css-loader!sass-loader!../styles/global.scss'
CMS.registerPreviewStyle(styles.toString(), { raw: true })
CMS.registerPreviewTemplate('about', AboutPreview);
CMS.registerPreviewTemplate('music', WorkPreview);
CMS.registerPreviewTemplate('video-performances', WorkPreview);
CMS.registerPreviewTemplate('live-performances', WorkPreview);
CMS.registerPreviewTemplate('paintings', WorkPreview);
CMS.registerPreviewTemplate('photographs', WorkPreview);




const youtube = {
    // Internal id of the component
    id: "youtube",
    // Visible label
    label: "Youtube",
    // Fields the user need to fill out when adding an instance of the component
    fields: [{name: 'id', label: 'Youtube Video ID', widget: 'string'}],
    // Pattern to identify a block as being an instance of this component
    pattern: /^<div class="video-container">.*youtube.com\/embed\/([^"]*).*<\/div>$/,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {
        id: match[1]
      };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
      return (
        `<div class="video-container"><iframe src="https://www.youtube.com/embed/${obj.id}" class="video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
      )
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
        return (
            `<div class="video-container"><iframe src="https://www.youtube.com/embed/${obj.id}" class="video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
        );
    },
}

// function youtube_parser(url){
//   var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
//   var match = url.match(regExp);
//   return (match&&match[7].length==11) ? match[7] : '';
// }

const imageTitleClass = {
  label: 'Styled Image',
  id: 'styledImage',
  fromBlock: match =>
    match && {
      image: match[2],
      alt: match[1],
      className: match[3],
    },
  toBlock: ({ alt, image, className }) =>
    `![${alt || ''}](${image || ''}#${className || ''})`,
  // eslint-disable-next-line react/display-name
  toPreview: ({ alt, image, className }, getAsset, fields) => {
    const imageField = fields?.find(f => f.get('widget') === 'image');
    const src = getAsset(image, imageField);
    return `<img src=${src || ''} alt=${alt || ''} class=${className || ''} />`;
  },
  pattern: /^!\[(.*)\]\((.*?)#(.*?)\)$/,
  fields: [
    {
      label: 'Image',
      name: 'image',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Alt Text',
      name: 'alt',
    },
    {
      label: 'Styling',
      name: 'className',
      widget: 'select',
      options: ["half-left", "half-right", "middle", "full"],
      default: "full",
    },
  ],
};

const fileLink = {
  label: 'File Link',
  id: 'fileLink',
  fromBlock: match =>
    match && {
      text: match[1],
      path: match[2],
    },
  toBlock: ({text, path}) =>
    `[${text}](${path})`,
  // eslint-disable-next-line react/display-name
  toPreview: ({text, path}) => {
    return `<a href=${path}>${text}</a>`;
  },
  pattern: /\[(.*)\]\((.*)\)/,
  fields: [
    {
      label: 'Link Text',
      name: 'text',
      required: true,
    },
    {
      label: 'File',
      name: 'path',
      widget: 'file',
      required: true,
    },
  ],
};

const whitespace = {
  // Internal id of the component
  id: "whitespace",
  // Visible label
  label: "Whitespace",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{
    name: 'className', 
    label: 'Whitespace Amount', 
    widget: 'select', 
    options: ['lines-1', 'lines-2', 'lines-3', 'lines-4', 'lines-5', 'lines-6'],
    default: 'lines-1',
  }],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<div\sclass="([^"]*)"><\/div>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
      return {
          className: match[1],
      };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return (
      `<div class="${obj.className ? obj.className : ''}"></div>`
    )
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
      return (
        `<div class="${obj.className ? obj.className : ''}"></div>`
        )
  },
}

CMS.registerEditorComponent(youtube);
CMS.registerEditorComponent(imageTitleClass);
CMS.registerEditorComponent(fileLink);
CMS.registerEditorComponent(whitespace);
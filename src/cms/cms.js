import CMS from 'netlify-cms-app';



import Preview from './preview-templates/preview'

import styles from '!css-loader!sass-loader!../styles/global.scss'
CMS.registerPreviewStyle(styles.toString(), { raw: true })
CMS.registerPreviewTemplate('about', Preview);
// CMS.registerMediaLibrary(cloudinary);




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

const imageWithClass = {
    label: 'Image with styling',
    id: 'imageStyling',
    // pattern: /^!\[(.*)\]\((.*?)(\s"(.*)")?\)$/,
    pattern: /^<img\ssrc="([^"]*)"\salt="([^"]*)"\stitle="([^"]*)"\sclass="([^"]*)"><\/img>$/,
    fromBlock: match => {
        // console.log(match);
        const classes = match[4] ? match[4].split(" ") : [];
        return match && {
            image: match[1],
            alt: match[2],
            title: match[3],
            className: classes,
        }
    },
    toBlock: ({ alt, image, title, className }) => {
        const classes = className ? className.join(' ') : "";
        return `<img src="${image || ''}" alt="${alt || ''}" title="${title || ""}" class="${classes}"></img>`;
    },
    toPreview: ({ alt, image, title, className }, getAsset, fields) => {
      const imageField = fields?.find(f => f.get('widget') === 'image');
      const src = getAsset(image, imageField);
      const classes = className ? className.join(' ') : "";
      return `<img src="${src || ''}" alt="${alt || ''}" title="${title || ""}" class="${classes || ''}"></img>`;
    },
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
        label: 'Title',
        name: 'title',
      },
      {
        label: 'Styling',
        name: 'className',
        widget: 'select',
        multiple: true,
        options: ["half", "half-left", "half-right", "middle"],
        default: ["half", "half-left"],
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
      console.log(match[1]);
        return {
            className: match[1],
        };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
      console.log(obj.className);
      return (
        `<div class="${obj.className ? obj.className : ''}"></div>`
      )
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
      console.log(obj.className);
        return (
          `<div class="${obj.className ? obj.className : ''}"></div>`
          )
    },
}

  CMS.registerEditorComponent(youtube);
  CMS.registerEditorComponent(imageWithClass);
  CMS.registerEditorComponent(whitespace);
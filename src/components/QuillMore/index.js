import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
// import { ImageResize } from 'quill-image-resize-module';
// import { ImageDrop } from 'quill-image-drop-module';

import 'react-quill/dist/quill.snow.css';
import styles from './index.less'
/*
 * Simple editor component that takes placeholder text as a prop
 */

// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize);


class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
    this.insertToEditor = this.insertToEditor.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.editorHtml !== '') return
    if ('defaultValue' in nextProps) {
      this.setState({
        editorHtml: nextProps.defaultValue,
      });
    }
  }

  imageHandler = (image, callback) => {
     const self = this;
      if(image){
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.click();

          // Listen upload local image and save to server
          input.onchange = () => {
              const file = input.files[0];

              // file type is only image.
              let bool = this.beforeUpload(file);

              if(bool){
                 this.saveToServer(file);
              };
          };
      }
   };
   // 图片校验
  beforeUpload(file,allType = ['jpg','png','jpeg'],maxSize=5, type) {
      let fileType = file.type;
      let { name } = file;
      if (!fileType) {
          fileType = name.split('.').pop();
      } else {
          fileType = fileType.split('/')[1];
      }
      const isJPG = allType.indexOf(fileType) > -1;
      if (!isJPG) {
          message.error('请上传正确的格式！');
          return false;
      }
      const isLt3M = file.size / 1024 / 1024 < maxSize;
      if (!isLt3M && isJPG) {
          message.error(`上传图片必须小于${maxSize}M!`);
          return false;
      }
      let isSuccess = isJPG && isLt3M;
      return  isSuccess;
  }
  // 上传到服务端
  saveToServer(file){
      const self = this;
      var formData = new FormData();
      formData.append('file', file, file.name);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://47.104.27.184:8000/sysAnno/uploadImage', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const url = JSON.parse(xhr.responseText).data;
          self.insertToEditor(url);
        }
      };
      xhr.send(formData);
  }

  // 替换文件
  insertToEditor(url) {
    const range = this.quillRef.getEditor().getSelection();
    this.quillRef.getEditor().insertEmbed(range.index, 'image', url);
  }

  handleChange (html) {
    this.setState({ editorHtml: html });
    if (this.props.onChange) {
      this.props.onChange(html)
    }
  }
  render () {
    const modules = {
      // toolbar: [
      //   [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      //   [{size: []}],
      //   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      //   [{'list': 'ordered'}, {'list': 'bullet'},
      //    {'indent': '-1'}, {'indent': '+1'}],
      //   ['link', 'image', 'video'],
      //   ['clean'],
      //   [handlers: {
      //      // handlers object will be merged with default handlers object
      //   'image': imageHandler
      //   }],
      // ],
      toolbar: {
            container:  [['bold', 'italic', 'underline', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean']],
         handlers: {
             'image': this.imageHandler
        }
      },
      // imageDrop: true,
      // ImageResize: {
      //   displaySize: true
      // },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    }
    return (
      <div className={styles.app}>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={modules}
          formats={Editor.formats}
          ref={(el) => { this.quillRef = el }}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         />
       </div>
     )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
 Editor.formats = [
   'header', 'font', 'size',
   'bold', 'italic', 'underline', 'strike', 'blockquote',
   'list', 'bullet', 'indent',
   'link', 'image', 'video'
 ]

/*
 * PropType validation
 */
// Editor.propTypes = {
//   placeholder: React.PropTypes.string,
// }
export default Editor;

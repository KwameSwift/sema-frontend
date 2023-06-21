import React from 'react'
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./editToolbar";
// import "./styles.css";

export const CustomEditor = ({ className, placeholder, setData, data }) => {
  const handleChange = value => {
    setData(value);
  };

  return (
    <div className={`text-editor ${className}`}>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={data}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default CustomEditor;
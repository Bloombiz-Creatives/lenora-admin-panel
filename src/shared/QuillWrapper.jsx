// import  { forwardRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const QuillWrapper = forwardRef((props, ref) => {
//   return <ReactQuill ref={ref} {...props} />;
// });

// export default QuillWrapper;



import  { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillWrapper = forwardRef((props, ref) => {
  return <ReactQuill ref={ref} {...props} />;
});

QuillWrapper.displayName = 'QuillWrapper';

export default QuillWrapper;

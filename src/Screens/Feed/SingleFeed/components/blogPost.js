import React from "react";
import { useNavigate } from "react-router-dom";


function BlogPost(props) {
  const navigate = useNavigate();
  const testImageRetrieve = (data) => {
    return data?.cover_image === "null" || data?.cover_image === null;
  }
  return (
    <div className="other-post cursor-pointer" onClick={() => navigate(`/blog/${props.id}`)}>
      <div className="flex justify-center">
        {!testImageRetrieve(props) && (
          <img
            src={`${process.env.REACT_APP_BACKEND_DOMAIN}${
              props?.cover_image
            }`}
            alt=""
            className="post-img"
          />
        )}
      </div>
      <div className="bg-[#fff] p-4 inner-blog">
        <div className="mt-5">
          <h3 className="font-bold text-[16px] text-center">{props.title}</h3>
          <p className="mb-5 blog-desc text-center">{props.preview_text}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

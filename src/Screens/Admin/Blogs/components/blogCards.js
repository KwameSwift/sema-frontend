import React from 'react'
import { calculateTime } from '../../../../utils/helpers';

function BlogCards({ img, title, description, author, posted_on }) {
  return (  
    <div className="blog-card pb-3 pr-3">
      <div>
        {img && <img src={img} width={300} height={300} />}
      </div>
      <div className='bg-[#fff] p-4'>
        <div> 
          <p className='font-bold text-[20px]'>{title}</p>
        </div>
        <div>
          <p className='text-[15px]'>{description}</p>
        </div>
      </div>
      <div className='relative px-4 bottom-0'>
        <span className='font-bold'>Author: </span> 
        <p className='text-[15px]'>
          <span>{author}</span>
        </p>
      </div>
      <span className='flex text-[14px] text-[gray] justify-end items-end'>{calculateTime(posted_on)}</span>
    </div>
  );
}

export default BlogCards;
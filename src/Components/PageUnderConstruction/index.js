import React from 'react';
import ConstructionImage from "../../Assets/images/under-construction.png";

function UnderConstructionPage() {
  return (
    <div className="flex items-center h-[90vh] justify-center bg-gray-200 overflow-auto">
      <div className="flex flex-col items-center">
        <div className="">
          <img src={ConstructionImage} width={200} height={200} alt="Under Construction" />
        </div>
        <div className='max-w-lg px-2'>
          <h1 className="text-4xl md:text-5xl font-bold mt-5 text-center">Exciting Changes are Coming Soon!</h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-5 text-center">
            Stay tuned for updates and follow us on social media for the latest news. Thank you for your patience and support!
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnderConstructionPage;

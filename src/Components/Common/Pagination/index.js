import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagination({ data, setData }) {
  console.log(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`/api/data?page=${page}`);
      const { data, totalPages } = response.data;

      setData(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Render your data using the 'data' state */}
      <ul>
        {data.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>

      {/* Render pagination buttons */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;

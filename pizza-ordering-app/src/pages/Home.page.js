import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h1
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          fontFamily: "'Pacifico', cursive",
          height: "150px",
        }}
      >
        Best Stone Oven Pizza in London
      </h1>
      {/* Grid starts here */}
      <div className="container mt-4">
        <div className="row">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
              <div className="bg-danger p-3">Item {index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default HomePage
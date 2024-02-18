import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayComponent = () => {
    const [packages, setPackages] = useState([]);
    
  // React component to display packages
useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL)
    .then(response => {
        // Assuming the response data is the array of packages
        setPackages(response.data);
    })
    .catch(error => {
        console.error('Error fetching packages:', error);
    });
}, []);  

  return (
    <div>
        {Array.isArray(packages) ? (
            packages.map((pkg, index) => (
                <div key={index}>
                    {/* Make sure the image URL is valid and not null/undefined */}
                    {/* {pkg.imageUrl ? <img src={pkg.imageUrl} alt={pkg.packageName || 'Package Image'} /> : <p>No image available</p>} */}
                    <img src={`${process.env.REACT_APP_UPLOAD_API_URL}/${pkg.imageUrl}`} alt={pkg.packageName || 'Package Image'} />
                    <h3>{pkg.packageName || 'No Name'}</h3>
                    <p>Price: {pkg.packagePrice ? `$${pkg.packagePrice}` : 'Not available'}</p>
                    <p>Date: {pkg.packageDate || 'Not available'}</p>
                </div>
            ))
        ) : (
            <p>No packages available.</p>
        )}
    </div>
  );
}

export default DisplayComponent;
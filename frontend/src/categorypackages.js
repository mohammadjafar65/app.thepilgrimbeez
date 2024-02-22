import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./header/header";
import Footer from "./footer/footer";
import { Link } from 'react-router-dom'; // Ensure you import Link from 'react-router-dom'

const CategoryPackages = () => {
  const { category } = useParams();
  const [packages, setPackages] = useState([]);
  console.log('Category:', category);

  useEffect(() => {
    axios.get(`https://thepilgrimbeez.com/${encodeURIComponent(category)}`)
       .then(response => {
        console.log('Packages data:', response.data); // Add this line
        setPackages(response.data);
      })
      .catch(error => {
        console.error('Error fetching category packages:', error);
      });
  }, [category]);

  return (
    <div>
        <Header />
        <section id="banner" className="package">
            <div class="css-zixqbe e7svxqc1"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12  col-12">
                        <div class="inner_banner">
                            <h1>{category}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="our-packages" className="package">
            <div class="container-fluid">
                <div class="row">
                    {packages.map((pkg, index) => ( // Added map function to iterate over packages
                        <div class="col-lg-3 col-md-3 col-12">
                            <div className="item" key={index}>
                                <Link to={`/package/id/${pkg.id}`}>
                                    <div className="card">
                                        <span className="over_hover">
                                            <img src={`${process.env.REACT_APP_UPLOAD_API_URL}/${pkg.imageUrl}`} alt={pkg.packageName || 'Package Image'} className="card-img" /></span> {/* Corrected className */}
                                        <div className="card_content">
                                            <h2>{pkg.packageName || 'No Name'}</h2>
                                            <p>{pkg.packagePrice ? `₹${pkg.packagePrice}` : 'Not available'}</p>
                                            <div className="ft">
                                                <span>
                                                    <label>Duration</label>
                                                    <h3><iconify-icon icon="carbon:time"></iconify-icon> {pkg.packageDurationDate || 'Not available'}</h3>
                                                </span>
                                                <span>
                                                    <label>Start Date</label>
                                                    <h3><iconify-icon icon="uiw:date"></iconify-icon> {pkg.packageDate || 'Not available'}</h3>
                                                </span>
                                            </div>
                                            <div className="btn_yellow">View Package Details</div>
                                        </div>
                                    </div>
                                </Link>
                            </div> 
                        </div>
                    ))}
                </div>
            </div>  
        </section>
        <Footer/>
    </div>
  );
};

export default CategoryPackages;

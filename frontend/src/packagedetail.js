import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./header/header";
import Footer from "./footer/footer";

const PackageDetail = () => {
    const [packageDetails, setPackageDetails] = useState(null);
    const { id } = useParams(); // This id should correspond to the package's identifier

    useEffect(() => {
        if (id) {
            axios
                .get(`https://thepilgrimbeez.com/packages/id/${id}`)
                .then((response) => {
                    console.log(response); // Log the full response for debugging
                    if (response.data) {
                        console.log("Package Data:", response.data); // Check the structure here
                        setPackageDetails(response.data);
                    } else {
                        console.error("Package data is empty:", response.data);
                        // Consider displaying a message or redirecting the user
                    }
                })
                .catch((error) => {
                    console.error("Error fetching package details:", error);
                    // Consider displaying an error message to the user
                });
        }
    }, [id]);

    if (!packageDetails) {
        return <div>Loading...</div>;
    }

    // Ensure that imageUrl is correct. For example, if your server stores the full URL, you may not need to prepend REACT_APP_UPLOAD_API_URL
    const imageUrl = `${process.env.REACT_APP_UPLOAD_API_URL}/${packageDetails.imageUrl}`;

    // Ensure these fields are spelled correctly and match the database schema
    const { packageName, packageDurationDate, packageLocation, packageDescription, amenitiesInHotel, agentName, packagePrice, packageDate } = packageDetails;

    // const { imageUrl } = packageDetails;

    return (
        <>
            <Header />
            {packageDetails ? (
                <>
                    <section id="banner" className="package" style={{ backgroundImage: `url(${imageUrl})` }}>
                        <div class="css-zixqbe e7svxqc1"></div>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12  col-12">
                                    <div class="inner_banner">
                                        <h1>{packageName}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="package_details">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-8 col-md-8 col-12">
                                    <h2>Overview</h2>
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-12">
                                            <label>Duration</label>
                                            <h3>
                                                <iconify-icon icon="carbon:time"></iconify-icon> {packageDurationDate}
                                            </h3>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-12">
                                            <label>Location</label>
                                            <h3>
                                                <iconify-icon icon="mingcute:location-line"></iconify-icon> {packageLocation}
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-12">
                                            <p>
                                                <b>{packageDescription}</b>
                                                <br />
                                                <br />
                                                <b>Aminities in hotel :</b> {amenitiesInHotel}
                                                <br />
                                                <br />
                                                <b>Just drop your luggage and stay comfortable with TPB</b>
                                            </p>
                                            <h5>Low Budget Package at affordable price</h5>
                                            <p>Facilities</p>
                                            <ul>
                                                <li>
                                                    <iconify-icon icon="fluent-mdl2:air-tickets"></iconify-icon> Air Ticket
                                                </li>
                                                <li>
                                                    <iconify-icon icon="ri:visa-line"></iconify-icon> Visa
                                                </li>
                                                <li>
                                                    <iconify-icon icon="fluent:food-16-regular"></iconify-icon> Hygenic Food
                                                </li>
                                                <li>
                                                    <iconify-icon icon="fontisto:hotel"></iconify-icon> Hotel
                                                </li>
                                                <li>
                                                    <iconify-icon icon="material-symbols:ac-unit"></iconify-icon> All Transportation in A/C coach
                                                </li>
                                                <li>
                                                    <iconify-icon icon="material-symbols:ac-unit"></iconify-icon> All Ziyarat in A/C coach
                                                </li>
                                                <li>
                                                    <iconify-icon icon="material-symbols:checkroom"></iconify-icon> Laundry
                                                </li>
                                                <li>
                                                    <iconify-icon icon="icon-park-outline:handbag"></iconify-icon> Hand bag + passport bag{" "}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-12">
                                    <div class="agent_card">
                                        <h2>
                                            <span>Total Price:</span>
                                            {packagePrice}{" "}
                                        </h2>
                                        <hr />
                                        <div class="ag_name">
                                            <span>
                                                <iconify-icon icon="dashicons:admin-users"></iconify-icon>
                                            </span>
                                            <h3>{agentName} </h3>
                                        </div>
                                        <hr />
                                        <div class="pg_date">
                                            <span>
                                                <label for="">Start Date</label>
                                                <h4>{packageDate} </h4>
                                            </span>
                                            <iconify-icon icon="uiw:date"></iconify-icon>
                                        </div>
                                        <div class="line_al">
                                            <a href="contact_us.html" class="btn_yellow">
                                                Contact Now
                                            </a>
                                            <a href="https://api.whatsapp.com/send?phone={packageDetails.agentNumber}" class="whatsapp">
                                                <iconify-icon icon="logos:whatsapp-icon"></iconify-icon>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="gallery">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-12">
                                    <h2>Gallery</h2>
                                </div>
                            </div>
                            <div className="row">
                                {packageDetails && packageDetails.imageUrls && packageDetails.imageUrls.length > 0 ? (
                                    packageDetails.imageUrls.map((imageUrl, index) => (
                                        <a key={index} href={`${process.env.REACT_APP_UPLOAD_API_URL}/${imageUrl}`} data-toggle="lightbox" data-gallery="gallery" className="col-md-4">
                                            <img src={`${process.env.REACT_APP_UPLOAD_API_URL}/${imageUrl}`} className="img-fluid rounded" alt={`Gallery Image ${index}`} />
                                        </a>
                                    ))
                                ) : (
                                    <p>No images available for this package.</p>
                                )}
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <div>Loading or no package found...</div>
            )}
            <Footer />
        </>
    );
};

export default PackageDetail;
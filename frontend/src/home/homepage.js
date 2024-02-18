import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
    const [packages, setPackages] = useState([]);
    const [packagesByCategory, setPackagesByCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const categories = ["POPULAR PACKAGES", "DUBAI PACKAGES", "KASHMIR FAMILY PACKAGES"];

    useEffect(() => {
        setIsLoading(true); // Start loading
        axios
            .get(`${process.env.REACT_APP_API_URL}/packages`)
            .then((response) => {
                setPackages(response.data);
                categorizePackages(response.data);
                setIsLoading(false); // End loading
            })
            .catch((error) => {
                console.error("Error fetching packages:", error);
                setIsLoading(false); // End loading
            });
    }, []);

    // Function to categorize packages
    const categorizePackages = (packagesArray) => {
        const categorized = categories.reduce((acc, category) => {
            acc[category] = packagesArray.filter((pkg) => pkg.category === category);
            return acc;
        }, {});

        setPackagesByCategory(categorized);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    return (
        <>
            <Header />
            <section id="banner">
                <div className="css-zixqbe e7svxqc1"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12  col-12">
                            <div className="inner_banner">
                                <h1>
                                    Affortability, Comfortability <br />
                                    now comes in budget with TPB
                                </h1>
                                {/* <a href="#our-packages">
                                    <button className="button button--surtur">
                                        <svg className="textcircle" viewBox="0 0 500 500">
                                            <title>Scroll Down &amp; OUR PACKAGES </title>
                                            <defs>
                                                <path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"></path>
                                            </defs>
                                            <text>
                                                <textPath xlinkHref="#textcircle" aria-label="Scroll Down &amp; OUR PACKAGES" textLength="900">
                                                    Scroll Down & OUR PACKAGES
                                                </textPath>
                                            </text>
                                        </svg>
                                        <svg aria-hidden="true" className="eye" width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                                            <path className="eye__outer" d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"></path>
                                            <path className="eye__lashes-up" d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"></path>
                                            <path className="eye__lashes-down" d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"></path>
                                            <circle className="eye__iris" cx="35" cy="35.31" r="5.221"></circle>
                                            <circle className="eye__inner" cx="35" cy="35.31" r="10.041"></circle>
                                        </svg>
                                    </button>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Packages by Category */}
            {categories.map((category, index) => (
                <section id="our-packages" key={category} className={index % 2 === 0 ? "alternate-class" : "gray_bg"}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                                <div className="title_head">
                                    <h2>{category || "Default Category"}</h2>
                                    <Link to={`/package/${category}`} className="btn">
                                        View All &nbsp;<iconify-icon icon="cil:arrow-right"></iconify-icon>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                                <OwlCarousel
                                    className="owl-carousel owl-theme projects"
                                    margin={30}
                                    nav
                                    responsive={{
                                        0: {
                                            items: 1,
                                        },
                                        600: {
                                            items: 3,
                                        },
                                        1000: {
                                            items: 5,
                                        },
                                    }}
                                >
                                    {packagesByCategory[category] && packagesByCategory[category].length > 0 ? (
                                        packagesByCategory[category].map((pkg) => (
                                            <div className="item" key={pkg.id}>
                                                <Link to={`/package/id/${pkg.id}`}>
                                                    <div className="card">
                                                        <span className="over_hover">
                                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/${pkg.imageUrl}`} alt={pkg.packageName || "Package Image"} className="card-img" />
                                                        </span>
                                                        <div className="card_content">
                                                            <h2>{pkg.packageName || "No Name"}</h2>
                                                            <p>{pkg.packagePrice ? `₹${pkg.packagePrice}` : "Not available"}</p>
                                                            <div className="ft">
                                                                <span>
                                                                    <label>Duration</label>
                                                                    <h3>
                                                                        <iconify-icon icon="carbon:time"></iconify-icon> {pkg.packageDurationDate || "Not available"}
                                                                    </h3>
                                                                </span>
                                                                <span>
                                                                    <label>Start Date</label>
                                                                    <h3>
                                                                        <iconify-icon icon="uiw:date"></iconify-icon> {pkg.packageDate || "Not available"}
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                            <div className="btn_yellow">View Package Details</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No packages available.</p>
                                    )}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
            <section id="about_us">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h2>About Us</h2>
                            <h5>
                                We are backed by a team of highly qualified,
                                <br />
                                sincere and passionate professionals, who strive <br />
                                to offer commandable range of packages specially <br />
                                for Umrah and Visa service.
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
            <section id="services">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h2>OUR SERVICES</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="services_card">
                                <img src="/img/icon.png" alt="" />
                                <h3>Counselling</h3>
                                <p>
                                    Before your took off from your origin, our experienced staff will guide you briefly about your destination. Get a free counselling season for any place you are visiting, from preparation of documents to
                                    the packing of your luggage
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="services_card">
                                <img src="/img/icon.png" alt="" />
                                <h3>Umrah Training</h3>
                                <p>
                                    Your visit to the two holy city should be lessen in errors, and thats the reason we are conducting free umrah training season in a guidance of religious scholars, so you get through assistance before your
                                    visit to the holy cities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default HomePage;
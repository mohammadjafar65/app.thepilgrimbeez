import React from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";

function AboutPage() {
    return (
        <>
            <Header />
            <section id="banner" class="about">
                <div class="css-zixqbe e7svxqc1"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12  col-12">
                            <div class="inner_banner">
                                <h1>About Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about_us" class="about">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-12">
                            <h2>WHY US</h2>
                            <p>We offer end to end service to our client, our very plus point is we do escort tour, on every single point you will find us with you starting from destination till origin and from origin to the destination. Where ever you go wheather to Ziyarat or having your food everywhere our staff and executives are available in your service.</p>
                            <br/>
                            <p>We think this is positive service because when guest are travelling to abroad, sometimes the feel alone and we try to make them comfortable by accompaning them.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-12">
                            <br/>
                            <br/>
                            <br/>
                            <h2>OUR SELECTION</h2>
                            <p>Basically we offer 3 star or plus categories of hotel and airlines which we prefers are probably Star Alliance member. We even try better to serve our client and we always put our effort for the enhancement of service. </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default AboutPage;

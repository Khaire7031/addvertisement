import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight, MapPin } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "./ui/button";

const Footer = () => {
    return (
        <footer className="footer">

            <section className="cta">
                <div className="container">

                    <div className="cta-card">
                        <div className="card-content">
                            <h2 className="h2 card-title">Looking for a dream PG?</h2>

                            <p className="card-text">We can help you realize your dream of a new PG</p>
                        </div>

                        <NavLink to="/list-your-pg">
                            <button className="btn cta-btn">
                                <span>List Your PG Now</span>

                                <ArrowRight className="ml-2" />
                            </button>
                        </NavLink>
                    </div>

                </div>
            </section>
            <div className="footer-top">
                <div className="container">

                    <div className="footer-brand">

                        <a href="#" className="logo">
                            <span className="logo-text">Add Avertisement</span>
                        </a>

                        <p className="section-text">
                            Discover affordable and comfortable PG accommodations with all modern amenities. Find verified listings from trusted landlords with easy booking and transparent pricing.
                        </p>

                        <ul className="contact-list">

                            <li>
                                <a href="#" className="contact-link">
                                    <MapPin className="inline-block mr-2" />

                                    <address>Viman Nagar, Pune, India</address>
                                </a>
                            </li>

                            <li>
                                <a href="tel:+0123456789" className="contact-link">
                                    <Phone className="inline-block mr-2" />

                                    <span>9689818674</span>
                                </a>
                            </li>

                            <li>
                                <a href="mailto:pranavkhaire28@gmail.com" className="contact-link">
                                    <Mail className="inline-block mr-2" />

                                    <span>pranavkhaire28@gmail.com</span>
                                </a>
                            </li>

                        </ul>

                        <ul className="social-list">

                            <li>
                                <a href="#" className="social-link">
                                    <Facebook />
                                </a>
                            </li>

                            <li>
                                <a href="#" className="social-link">
                                    <Twitter />
                                </a>
                            </li>

                            <li>
                                <a href="#" className="social-link">
                                    <Linkedin />
                                </a>
                            </li>

                            <li>
                                <a href="#" className="social-link">
                                    <Instagram />
                                </a>
                            </li>

                        </ul>

                    </div>

                    <div className="footer-link-box">

                        <ul className="footer-list">

                            <li>
                                <p className="footer-list-title">Company</p>
                            </li>

                            <li>
                                <a href="#" className="footer-link">About</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Blog</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">All Products</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Locations Map</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">FAQ</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Contact us</a>
                            </li>

                        </ul>

                        <ul className="footer-list">

                            <li>
                                <p className="footer-list-title">Services</p>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Order tracking</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Wish List</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Login</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">My account</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Terms & Conditions</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Promotional Offers</a>
                            </li>

                        </ul>

                        <ul className="footer-list">

                            <li>
                                <p className="footer-list-title">Customer Care</p>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Login</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">My account</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Wish List</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Order tracking</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">FAQ</a>
                            </li>

                            <li>
                                <a href="#" className="footer-link">Contact us</a>
                            </li>

                        </ul>

                    </div>

                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">

                    <p className="copyright">
                        &copy; 2025 <a href="#">codewithpranav</a>. All Rights Reserved
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
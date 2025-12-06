import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Footer = () => {
    return (
        <footer className="bg-secondary border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Home className="h-6 w-6 text-primary" />
                            <span className="text-xl font-heading font-bold">PG Finder</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Find your perfect PG accommodation across India. Safe, verified, and trusted by thousands of students and professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2">
                            <NavLink to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                Home
                            </NavLink>
                            <NavLink to="/listings" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                Find PG
                            </NavLink>
                            <NavLink to="/list-your-pg" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                List Your PG
                            </NavLink>
                            <NavLink to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                About Us
                            </NavLink>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:info@pgfinder.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                <Mail className="h-4 w-4" />
                                info@pgfinder.com
                            </a>
                            <a href="tel:+919876543210" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                <Phone className="h-4 w-4" />
                                +91 98765 43210
                            </a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} PG Finder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
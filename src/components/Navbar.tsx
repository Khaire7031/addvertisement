import { Home, Menu, X, User, LogOut, Heart } from "lucide-react";
import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut, loading } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    const getInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase();
    };

    return (
        <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/" className="flex items-center gap-2">
                        <Home className="h-6 w-6 text-primary" />
                        <span className="text-xl font-heading font-bold text-foreground">PG Finder</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <img
                                src="https://visitor-badge.laobi.icu/badge?page_id=addvertisement-red.vercel.app
                                        &left_color=fb923c
                                        &right_color=fb923c
                                        &left_text=Visitors"
                                className="h-5"
                                alt="Visitors"
                            />


                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink
                            to="/"
                            end
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            activeClassName="text-primary font-semibold"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/listings"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            activeClassName="text-primary font-semibold"
                        >
                            Find PG
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            activeClassName="text-primary font-semibold"
                        >
                            About
                        </NavLink>
                        <NavLink to="/list-your-pg">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                                Post Your Ad
                            </Button>
                        </NavLink>

                        {!loading && (
                            <>
                                {user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                                        {getInitials(user.email || "U")}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end">
                                            <div className="flex items-center justify-start gap-2 p-2">
                                                <div className="flex flex-col space-y-1 leading-none">
                                                    <p className="font-medium text-sm">{user.user_metadata?.full_name || "User"}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <DropdownMenuSeparator />
                                            <NavLink to="/profile">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <User className="mr-2 h-4 w-4" />
                                                    My Profile
                                                </DropdownMenuItem>
                                            </NavLink>
                                            <NavLink to="/profile">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Heart className="mr-2 h-4 w-4" />
                                                    My Wishlist
                                                </DropdownMenuItem>
                                            </NavLink>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <NavLink to="/auth">
                                        {/* <Button variant="outline">Cart</Button> */}
                                    </NavLink>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            <NavLink
                                to="/"
                                end
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                                activeClassName="text-primary font-semibold"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/listings"
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                                activeClassName="text-primary font-semibold"
                            >
                                Find PG
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                                activeClassName="text-primary font-semibold"
                            >
                                About
                            </NavLink>
                            {user && (
                                <NavLink
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-2"
                                    activeClassName="text-primary font-semibold"
                                >
                                    <Heart className="h-4 w-4" />
                                    My Wishlist
                                </NavLink>
                            )}
                            <NavLink to="/list-your-pg" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                    List Your PG
                                </Button>
                            </NavLink>
                            {/* {!loading && (
                                <>
                                    {user ? (
                                        <Button
                                            variant="outline"
                                            onClick={() => { handleSignOut(); setIsOpen(false); }}
                                            className="w-full"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </Button>
                                    ) : (
                                        <NavLink to="/auth" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="w-full">Login</Button>
                                        </NavLink>
                                    )}
                                </>
                            )} */}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

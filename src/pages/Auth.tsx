import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Home, Mail, Lock, User, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");

const Auth = () => {
    const navigate = useNavigate();
    const { user, signUp, signIn } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Login form
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Signup form
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            emailSchema.parse(loginEmail);
            passwordSchema.parse(loginPassword);
        } catch (err) {
            if (err instanceof z.ZodError) {
                toast({
                    title: "Validation Error",
                    description: err.errors[0].message,
                    variant: "destructive",
                });
                return;
            }
        }

        setLoading(true);
        const { error } = await signIn(loginEmail, loginPassword);
        setLoading(false);

        if (error) {
            toast({
                title: "Login Failed",
                description: error.message === "Invalid login credentials"
                    ? "Invalid email or password. Please try again."
                    : error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
            });
            navigate("/");
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            nameSchema.parse(signupName);
            emailSchema.parse(signupEmail);
            passwordSchema.parse(signupPassword);
        } catch (err) {
            if (err instanceof z.ZodError) {
                toast({
                    title: "Validation Error",
                    description: err.errors[0].message,
                    variant: "destructive",
                });
                return;
            }
        }

        if (signupPassword !== signupConfirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "Passwords do not match. Please try again.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        const { error } = await signUp(signupEmail, signupPassword, signupName);
        setLoading(false);

        if (error) {
            if (error.message.includes("already registered")) {
                toast({
                    title: "Account Exists",
                    description: "This email is already registered. Please login instead.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Signup Failed",
                    description: error.message,
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Account Created!",
                description: "Welcome to PG Finder!",
            });
            navigate("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Home className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-heading font-bold text-foreground">PG Finder</span>
                    </div>
                    <p className="text-muted-foreground">Find your perfect paying guest accommodation</p>
                </div>

                <Card className="shadow-lg border-border/50">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-heading text-center">Welcome</CardTitle>
                        <CardDescription className="text-center">
                            Login or create an account to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="login-email"
                                                type="email"
                                                placeholder="your@email.com"
                                                className="pl-10"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="login-password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Logging in...
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup">
                                <form onSubmit={handleSignup} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="pl-10"
                                                value={signupName}
                                                onChange={(e) => setSignupName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-email"
                                                type="email"
                                                placeholder="your@email.com"
                                                className="pl-10"
                                                value={signupEmail}
                                                onChange={(e) => setSignupEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={signupPassword}
                                                onChange={(e) => setSignupPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="signup-confirm-password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={signupConfirmPassword}
                                                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Auth;

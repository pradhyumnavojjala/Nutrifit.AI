"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Dumbbell, DumbbellIcon, HomeIcon, LibraryBigIcon, PandaIcon, PhoneCallIcon, ShieldAlertIcon, UserIcon, ZapIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
    const {isSignedIn} = useUser()
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded">
                    <PandaIcon className="w-4 h-4 text-primary"/>
                </div>
                <span className="font-bold text-lg">Nutri<span className="text-primary">Fit</span>.AI</span>
                </Link>

                {/*Navigation Links*/}
                <nav className="flex items-center gap-5">
                    {isSignedIn ? (
                        <>
                        <Link href="/" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                        <HomeIcon size={16} />
                        <span>Home</span>
                        </Link>
                        <Link href="/generate-program" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                        <DumbbellIcon size={16} />
                        <span>Diet Plans</span>
                        </Link>
                        <Link href="/Profile" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                        <UserIcon size={16} />
                        <span>Profile</span>
                        </Link>
                        <Link href="/AboutUs" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                        <LibraryBigIcon size={16} />
                        <span>Diet Info</span>
                        </Link>
                        <Link href="/Contact_Us" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                        <PhoneCallIcon size={16} />
                        <span>Contact</span>
                        </Link>
                        <Button asChild variant="outline" className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10">
                        <Link href="/generate-program">Get Started</Link>
                        </Button>
                        <UserButton/>
                        </>
                        ) : (
                            <>
                            <SignInButton>
                                <Button variant={"outline"} className="">Sign In</Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className="">Sign Up</Button>
                            </SignUpButton>
                            </>
                        )}
                </nav>
                </div>

        </header>
    )
};
export default Navbar;
"use client"

import { useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import AddBookForm from "@/components/AddBookForm";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const activeLinkClass = 'text-primary font-bold';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={'fixed top-0 left-0 right-0 py-4 shadow-lg px-4 sm:px-0 bg-background z-50'}>
                <Container>
                    <nav className={'flex justify-between items-center'}>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="sm:hidden"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>

                        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:block fixed sm:static top-16 left-0 right-0 bg-background z-40 px-4 py-2 sm:p-0 shadow-md sm:shadow-none`}>
                            <ul className={'flex flex-col sm:flex-row gap-4'}>
                                <li>
                                    <Link 
                                        href={'/'} 
                                        className={pathname === '/' ? activeLinkClass : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Каталог
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href={'/profile'} 
                                        className={pathname === '/profile' ? activeLinkClass : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Профиль
                                    </Link>
                                </li>
                                <li className="sm:hidden">
                                    <Button 
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setIsMenuOpen(false);
                                        }} 
                                        variant="default"
                                        className="w-auto px-4"
                                    >
                                        Добавить книгу
                                    </Button>
                                </li>
                            </ul>
                        </div>

                        <div className={'flex gap-4'}>
                            <Button 
                                onClick={() => setIsModalOpen(true)} 
                                variant={'default'}
                                className="hidden sm:inline-flex"
                            >
                                Добавить книгу
                            </Button>
                            <ModeToggle/>
                        </div>
                    </nav>
                </Container>
            </header>

            <div className="h-16"></div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background p-6 rounded-lg w-full max-w-xl mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Добавить книгу</h2>
                            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>✕</Button>
                        </div>
                        <AddBookForm onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
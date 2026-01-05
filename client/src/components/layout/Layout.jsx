import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    // Paths where bottom nav is hidden (e.g., login, full-screen success)
    const hideNav = ['/login', '/success', '/admin'].includes(location.pathname);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans text-white pb-24 md:pb-0 md:flex md:items-center md:justify-center">
            {/* Background Ambient Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
            </div>

            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full md:h-[85vh] md:max-w-[400px] md:rounded-[40px] md:border-[8px] md:border-surface md:shadow-2xl md:overflow-hidden md:relative relative px-4 pt-6 md:bg-black"
                >
                    <div className="h-full overflow-y-auto no-scrollbar pb-24 md:pb-24">
                        <Outlet />
                    </div>
                    {!hideNav && (
                        <div className="absolute bottom-0 left-0 right-0 z-50">
                            <BottomNav />
                        </div>
                    )}
                </motion.main>
            </AnimatePresence>
        </div>
    );
};

export default Layout;

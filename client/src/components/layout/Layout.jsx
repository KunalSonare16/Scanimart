import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    // Paths where bottom nav is hidden (e.g., login, full-screen success)
    const hideNav = ['/login', '/success', '/admin'].includes(location.pathname);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans text-white pb-24">
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
                    className="max-w-md mx-auto px-4 pt-6"
                >
                    <Outlet />
                </motion.main>
            </AnimatePresence>

            {!hideNav && <BottomNav />}
        </div>
    );
};

export default Layout;

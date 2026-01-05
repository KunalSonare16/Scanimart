import React from 'react';
import { Home, ScanLine, ShoppingCart, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const BottomNav = () => {
    const location = useLocation();
    const path = location.pathname;

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: ScanLine, label: 'Scan', path: '/scan', isMain: true },
        { icon: ShoppingCart, label: 'Cart', path: '/cart' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
            <div className="glass backdrop-blur-xl rounded-2xl p-2 flex justify-around items-center max-w-md mx-auto pointer-events-auto border-t border-white/10 shadow-2xl">
                {navItems.map((item) => {
                    const isActive = path === item.path;
                    return (
                        <Link key={item.label} to={item.path} className="relative">
                            {item.isMain ? (
                                <div className="relative -mt-12">
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className={cn(
                                            "w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_theme('colors.primary')]",
                                            "bg-gradient-to-tr from-primary to-blue-600 text-black"
                                        )}
                                    >
                                        <item.icon size={32} />
                                    </motion.div>
                                    {/* Ring Pulse Animation */}
                                    <div className="absolute inset-0 rounded-full bg-primary -z-10 animate-ping opacity-20" />
                                </div>
                            ) : (
                                <motion.div
                                    className={cn(
                                        "p-3 rounded-xl flex flex-col items-center gap-1 transition-colors",
                                        isActive ? "text-primary bg-white/5" : "text-gray-400 hover:text-white"
                                    )}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <item.icon size={24} />
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"
                                        />
                                    )}
                                </motion.div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;

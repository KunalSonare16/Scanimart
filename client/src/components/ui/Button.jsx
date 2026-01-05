import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Button = ({ children, variant = 'primary', className, onClick, ...props }) => {
    const variants = {
        primary: 'bg-primary text-black shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)]',
        secondary: 'bg-secondary text-white shadow-[0_0_15px_rgba(189,0,255,0.5)] hover:shadow-[0_0_25px_rgba(189,0,255,0.8)]',
        outline: 'border border-primary text-primary hover:bg-primary/10 shadow-[0_0_10px_rgba(0,240,255,0.2)]',
        danger: 'bg-danger text-white shadow-[0_0_15px_rgba(255,0,85,0.5)]',
        ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'relative px-6 py-3 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden',
                variants[variant],
                className
            )}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant !== 'ghost' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
            )}
        </motion.button>
    );
};

export default Button;

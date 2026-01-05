import React, { useState } from 'react';
import { ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import useCartStore from '../store/useCartStore';

const Cart = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, getCartTotal } = useCartStore();

    const total = getCartTotal();

    return (
        <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold mb-6">My Cart <span className="text-primary">({items.length})</span></h1>

            <div className="flex-1 overflow-y-auto space-y-4 pb-24 hide-scrollbar">
                <AnimatePresence mode='popLayout'>
                    {items.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="relative"
                        >
                            {/* Swipe Hints - simplified for this demo as buttons */}
                            <GlassCard className="p-4 flex items-center gap-4 bg-white/5 border-white/5">
                                <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center text-3xl">
                                    {item.image}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-primary font-mono">{formatCurrency(item.price)}</p>
                                </div>

                                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 rounded-md bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/30 active:scale-90 transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-3xl">
                            🛒
                        </div>
                        <p>Your cart is empty.</p>
                        <Button variant="ghost" className="mt-4" onClick={() => navigate('/scan')}>Start Scanning</Button>
                    </div>
                )}
            </div>

            {/* Checkout Bar */}
            <GlassCard className="absolute bottom-[90px] left-4 right-4 p-4 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-40 max-w-md mx-auto !bg-[#0f111a]/90 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl font-bold font-mono text-primary">{formatCurrency(total)}</span>
                </div>
                <Button
                    variant="primary"
                    className="w-full text-lg py-4 shadow-[0_0_20px_theme('colors.primary')]"
                    onClick={() => navigate('/success')}
                >
                    Pay Now <ArrowRight size={20} />
                </Button>
            </GlassCard>
        </div>
    );
};

export default Cart;

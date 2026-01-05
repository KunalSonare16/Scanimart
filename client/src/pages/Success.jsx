import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { generateTransactionId, formatCurrency } from '../lib/utils';

import useCartStore from '../store/useCartStore';

const Success = () => {
    const navigate = useNavigate();
    const [txnId] = useState(generateTransactionId());
    const { checkOut, getCartTotal } = useCartStore();
    const [amountPaid, setAmountPaid] = useState(0);

    useEffect(() => {
        const total = getCartTotal();
        if (total > 0) {
            setAmountPaid(total);
            checkOut();
        }
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">

            {/* Background Burst */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse-fast" />
            </div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 rounded-full bg-accent text-black flex items-center justify-center mb-8 relative z-10 shadow-[0_0_50px_theme('colors.accent')]"
            >
                <Check size={48} strokeWidth={4} />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2"
            >
                Payment Successful!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-8"
            >
                Your exit verification pass is ready.
            </motion.p>

            {/* Ticket / Pass */}
            <GlassCard
                delay={0.4}
                className="w-full max-w-xs p-0 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20"
            >
                <div className="p-6 bg-white flex flex-col items-center gap-4">
                    <QRCodeSVG value={`SCANIMART-EXIT-${txnId}`} size={180} />
                    <p className="text-black font-mono text-sm tracking-widest">{txnId}</p>
                </div>
                <div className="p-4 bg-[#0f111a] border-t border-dashed border-gray-700 flex justify-between items-center relative">
                    {/* Cutouts */}
                    <div className="absolute -left-3 top-[-12px] w-6 h-6 rounded-full bg-background" />
                    <div className="absolute -right-3 top-[-12px] w-6 h-6 rounded-full bg-background" />

                    <div className="text-left">
                        <span className="text-xs text-gray-500 block">Total Paid</span>
                        <span className="text-xl font-bold text-accent">
                            {amountPaid > 0 ? formatCurrency(amountPaid) : '--'}
                        </span>
                    </div>

                    <Button variant="ghost" className="p-2 h-auto text-accent">
                        <Download size={20} />
                    </Button>
                </div>
            </GlassCard>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 w-full max-w-xs"
            >
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                    Return Home <ArrowRight size={18} />
                </Button>
            </motion.div>
        </div>
    );
};

export default Success;

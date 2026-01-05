import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Flashlight, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from 'sonner';
import useCartStore from '../store/useCartStore';

const Scan = () => {
    const navigate = useNavigate();
    const [scannedProduct, setScannedProduct] = useState(null);
    const scannerRef = useRef(null);
    const isRunningRef = useRef(false);

    useEffect(() => {
        // Create instance
        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode("reader");
        }

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            supportedScanTypes: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.UPC_A, Html5QrcodeSupportedFormats.UPC_E, Html5QrcodeSupportedFormats.EAN_13]
        };

        const startScanner = async () => {
            if (isRunningRef.current) return;

            try {
                // Check if element exists
                if (!document.getElementById("reader")) return;

                await scannerRef.current.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText) => {
                        handleScan(decodedText);
                    },
                    (errorMessage) => {
                        // ignore failures
                    }
                );
                isRunningRef.current = true;
            } catch (err) {
                console.warn("Scanner start failed:", err);
                // If it fails because it's already running, we verify state
                if (err?.trim?.() === "Html5Qrcode is already running.") {
                    isRunningRef.current = true;
                }
            }
        };

        // Delay slighty to ensure DOM is ready
        const timer = setTimeout(() => {
            startScanner();
        }, 100);

        return () => {
            clearTimeout(timer);
            if (scannerRef.current && isRunningRef.current) {
                scannerRef.current.stop()
                    .then(() => {
                        isRunningRef.current = false;
                        console.log("Scanner stopped successfully");
                    })
                    .catch(err => {
                        console.warn("Failed to stop scanner", err);
                    });
            }
        };
    }, []);

    const handleScan = (decodedText) => {
        if (!scannedProduct && scannerRef.current && isRunningRef.current) {
            scannerRef.current.pause();

            // Simulate Product Fetch
            setTimeout(() => {
                setScannedProduct({
                    id: decodedText,
                    name: "Cyber Energy Drink",
                    price: 4.50,
                    image: "🥤",
                    desc: "Boost your neural pathways."
                });
            }, 500);
        }
    };

    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        addItem(scannedProduct);
        toast.success("Added to cart!");
        setScannedProduct(null);
        if (scannerRef.current && isRunningRef.current) {
            scannerRef.current.resume();
        }
    };

    const handleCancel = () => {
        setScannedProduct(null);
        if (scannerRef.current && isRunningRef.current) {
            scannerRef.current.resume();
        }
    };

    return (
        <div className="h-screen w-full bg-black relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={() => navigate('/')} className="p-2 rounded-full bg-white/10 text-white backdrop-blur-md">
                    <ArrowLeft size={24} />
                </button>
                <span className="text-white font-bold tracking-widest uppercase text-sm">Scanner Active</span>
                <button className="p-2 rounded-full bg-white/10 text-white backdrop-blur-md">
                    <Flashlight size={24} />
                </button>
            </div>

            {/* Camera Viewport */}
            <div className="flex-1 relative bg-black overflow-hidden bg-transparent">
                <style>{`
                    #reader {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    #reader video {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
                <div id="reader" className="w-full h-full"></div>

                {/* Custom Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                    <div className="w-[280px] h-[280px] border border-white/20 rounded-3xl relative">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-[0_0_15px_theme('colors.primary')]" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-[0_0_15px_theme('colors.primary')]" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-[0_0_15px_theme('colors.primary')]" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-[0_0_15px_theme('colors.primary')]" />

                        {/* Scanning Laser */}
                        <div className="scan-overlay top-0" />

                        {/* Center Guide */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <Plus size={40} className="text-white" />
                        </div>
                    </div>

                    <p className="absolute bottom-32 text-white/70 text-sm font-medium animate-pulse">
                        Align barcode within frame
                    </p>
                </div>
            </div>

            {/* Product Found Modal */}
            <AnimatePresence>
                {scannedProduct && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 left-0 right-0 z-50 p-4 pb-20"
                    >
                        <GlassCard className="!bg-[#0f111ae6] border-t border-primary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 rounded-xl bg-surface flex items-center justify-center text-4xl border border-white/10 shrink-0">
                                    {scannedProduct.image}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-white">{scannedProduct.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{scannedProduct.desc}</p>
                                    <span className="text-xl font-bold text-primary font-mono">${scannedProduct.price.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button variant="ghost" className="flex-1 border border-white/10 text-white" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="primary" className="flex-[2]" onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Scan;

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login
        navigate('/');
    };

    return (
        <div className="h-screen w-full relative flex flex-col items-center justify-end pb-12 px-6 overflow-hidden bg-background">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[-10%] w-[250px] h-[250px] bg-secondary/30 rounded-full blur-[80px]" />
            </div>

            <div className="z-10 w-full max-w-sm space-y-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)]">
                        <span className="text-4xl">⚡</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Scanimart</h1>
                    <p className="text-gray-400">The Future of Retail checkout.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="space-y-4"
                >
                    <Button variant="primary" onClick={handleLogin} className="w-full bg-white text-black hover:bg-gray-200">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="G" />
                        Check in with Google
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        By continuing, you agree to our Terms of Service & Privacy Policy.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

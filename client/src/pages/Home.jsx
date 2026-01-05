import React from 'react';
import { ArrowRight, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-400 text-sm font-medium">Welcome back,</p>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Alex Chen
                    </h1>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full bg-surface grid place-items-center">
                        <span className="text-xs font-bold">AC</span>
                    </div>
                </div>
            </div>

            {/* Hero Card */}
            <GlassCard className="relative overflow-hidden group border-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                        <Sparkles size={16} />
                        <span className="text-xs font-bold tracking-widest uppercase">Smart Shopping</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 leading-tight">
                        Skip the generic<br />
                        <span className="text-white">Checkout Lines</span>
                    </h2>
                    <Button onClick={() => navigate('/scan')} variant="primary" className="w-full">
                        Start Scanning <ArrowRight size={18} />
                    </Button>
                </div>
            </GlassCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <GlassCard delay={0.1} className="p-4 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <ShoppingBag size={20} />
                    </div>
                    <div>
                        <span className="text-2xl font-bold block">12</span>
                        <span className="text-xs text-gray-400">Total Orders</span>
                    </div>
                </GlassCard>
                <GlassCard delay={0.2} className="p-4 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <span className="text-2xl font-bold block">$342</span>
                        <span className="text-xs text-gray-400">Saved Time</span>
                    </div>
                </GlassCard>
            </div>

            {/* Recent Activity */}
            <div>
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                        <GlassCard key={i} delay={0.3 + (i * 0.1)} className="p-4 flex items-center justify-between !bg-white/5 border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center border border-white/5">
                                    🛒
                                </div>
                                <div>
                                    <p className="font-medium text-white">Grocery Run</p>
                                    <p className="text-xs text-gray-500">2 mins ago • 5 items</p>
                                </div>
                            </div>
                            <span className="font-mono text-primary font-bold">$42.50</span>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

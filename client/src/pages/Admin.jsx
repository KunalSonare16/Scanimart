import React from 'react';
import { ArrowLeft, TrendingUp, Users, ShoppingCart, Package } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Admin = () => {
    const navigate = useNavigate();

    const stats = [
        { title: 'Total Sales', value: '$12,450', icon: TrendingUp, color: 'text-primary' },
        { title: 'Active Users', value: '843', icon: Users, color: 'text-secondary' },
        { title: 'Orders Today', value: '156', icon: ShoppingCart, color: 'text-accent' },
        { title: 'Low Stock', value: '12', icon: Package, color: 'text-danger' },
    ];

    return (
        <div className="pb-24">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <GlassCard key={i} delay={i * 0.1} className="p-4">
                        <div className={`p-2 rounded-lg bg-white/5 w-fit mb-3 ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </GlassCard>
                ))}
            </div>

            <h2 className="text-lg font-bold mb-4">Live Sales Feed</h2>
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <GlassCard key={i} delay={0.4 + (i * 0.1)} className="p-4 flex justify-between items-center !bg-white/5 border-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface text-xs flex items-center justify-center border border-white/10">
                                USR
                            </div>
                            <div>
                                <p className="font-medium">New Order #{2390 + i}</p>
                                <p className="text-xs text-gray-500">Just now</p>
                            </div>
                        </div>
                        <span className="text-primary font-mono">+$24.00</span>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default Admin;

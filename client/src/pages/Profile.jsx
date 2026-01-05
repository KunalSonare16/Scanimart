import React from 'react';
import { User, Settings, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: CreditCard, label: 'Payment Methods', sub: 'Visa **42' },
        { icon: Bell, label: 'Notifications', sub: 'On' },
        { icon: Settings, label: 'Settings', sub: 'Account, Security' },
    ];

    return (
        <div className="pb-24 space-y-6">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            {/* Profile Header */}
            <GlassCard className="flex items-center gap-4 !bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full bg-surface grid place-items-center">
                        <span className="text-xl font-bold">AC</span>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold">Alex Chen</h2>
                    <p className="text-gray-400 text-sm">alex.chen@example.com</p>
                    <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-wider">
                            Gold Member
                        </span>
                    </div>
                </div>
            </GlassCard>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <GlassCard className="p-3 text-center">
                    <span className="text-3xl font-bold block mb-1">12</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Orders</span>
                </GlassCard>
                <GlassCard className="p-3 text-center">
                    <span className="text-3xl font-bold block mb-1 text-accent">342</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Points</span>
                </GlassCard>
            </div>

            {/* Menu */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">General</h3>
                {menuItems.map((item, i) => (
                    <GlassCard key={i} className="p-0 overflow-hidden !bg-white/5 hover:!bg-white/10 transition-colors">
                        <button className="w-full p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-gray-300">
                                    <item.icon size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-white">{item.label}</p>
                                    <p className="text-xs text-gray-500">{item.sub}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-500" />
                        </button>
                    </GlassCard>
                ))}
            </div>

            <Button
                variant="danger"
                className="w-full mt-8 bg-white/5 border border-danger/20 text-danger hover:bg-danger/10"
                onClick={() => navigate('/login')}
            >
                <LogOut size={18} /> Log Out
            </Button>

            <p className="text-center text-xs text-gray-600 mt-4">Version 1.0.5 • Build 2024</p>
        </div>
    );
};

export default Profile;

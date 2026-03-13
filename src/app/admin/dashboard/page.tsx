"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink,
  Phone,
  MessageCircle,
  Scissors,
  Sparkles,
  Wand2,
  Star
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SALON_DETAILS } from "@/lib/constants";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("bookings");
  
  // Mock data for bookings
  const [bookings, setBookings] = useState([
    {
      id: "BK-001",
      customer: "Sanya Gupta",
      phone: "+91 98765 43210",
      service: "Nail Extensions",
      category: "Nails",
      date: "2024-03-15",
      time: "11:00 AM",
      status: "confirmed",
      price: "₹1,500",
    },
    {
      id: "BK-002",
      customer: "Rohan Chatterjee",
      phone: "+91 98765 43211",
      service: "Hair Coloring",
      category: "Hair",
      date: "2024-03-15",
      time: "02:00 PM",
      status: "pending",
      price: "₹3,500",
    },
    {
      id: "BK-003",
      customer: "Priya Sharma",
      phone: "+91 98765 43212",
      service: "Facials",
      category: "Skin",
      date: "2024-03-16",
      time: "10:00 AM",
      status: "completed",
      price: "₹2,500",
    },
    {
      id: "BK-004",
      customer: "Amit Singh",
      phone: "+91 98765 43213",
      service: "Haircuts & Styling",
      category: "Hair",
      date: "2024-03-16",
      time: "04:30 PM",
      status: "cancelled",
      price: "₹1,200",
    },
  ]);

  const stats = [
    { label: "Total Bookings", value: "124", icon: Calendar, color: "text-soft-gold" },
    { label: "New Customers", value: "32", icon: Users, color: "text-blue-400" },
    { label: "Revenue", value: "₹45,200", icon: Sparkles, color: "text-green-400" },
    { label: "Pending Tasks", value: "12", icon: Bell, color: "text-red-400" },
  ];

  const handleLogout = () => {
    router.push("/admin/login");
  };

  return (
    <div className="bg-luxury-black min-h-screen flex text-champagne">
      {/* Sidebar */}
      <aside className="w-72 bg-white/5 border-r border-soft-gold/10 flex flex-col p-8 hidden lg:flex">
        <Link href="/" className="flex flex-col mb-16">
          <span className="text-3xl font-serif font-bold tracking-wider text-soft-gold">
            HABIBS
          </span>
          <span className="text-[10px] tracking-[0.4em] font-sans text-champagne/40">
            DASHBOARD
          </span>
        </Link>

        <nav className="flex flex-col space-y-4 flex-grow">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "customers", label: "Customers", icon: Users },
            { id: "services", label: "Services", icon: Scissors },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-4 px-6 py-4 rounded-sm transition-all duration-300 text-sm font-bold uppercase tracking-widest ${
                activeTab === item.id 
                  ? "bg-soft-gold text-luxury-black shadow-xl" 
                  : "text-champagne/40 hover:text-soft-gold hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-4 px-6 py-4 rounded-sm text-red-400 hover:bg-red-500/10 transition-all duration-300 text-sm font-bold uppercase tracking-widest mt-auto border border-red-500/20"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 border-b border-soft-gold/10 flex items-center justify-between px-10 bg-white/5 backdrop-blur-md">
          <h2 className="text-2xl font-serif font-bold text-soft-gold uppercase tracking-widest">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          <div className="flex items-center space-x-8">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne/40" />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="bg-white/5 border border-soft-gold/20 p-3 pl-12 rounded-sm focus:outline-none focus:border-soft-gold transition-all text-xs italic font-sans text-champagne w-64"
              />
            </div>
            
            <button className="relative p-2 text-champagne/60 hover:text-soft-gold transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-luxury-black"></span>
            </button>

            <div className="flex items-center space-x-4 pl-8 border-l border-soft-gold/10">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-champagne">{SALON_DETAILS.owner}</span>
                <span className="text-[10px] text-soft-gold uppercase tracking-widest">Administrator</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-soft-gold flex items-center justify-center text-luxury-black font-bold">
                {SALON_DETAILS.owner.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-grow p-10 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-soft-gold/10 p-8 rounded-sm hover:border-soft-gold/30 transition-all shadow-xl group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-sm bg-white/5 group-hover:bg-soft-gold/10 transition-colors`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-sm">+12%</span>
                </div>
                <h4 className="text-champagne/40 text-xs uppercase tracking-[0.2em] font-bold mb-2">{stat.label}</h4>
                <p className="text-3xl font-serif font-bold text-champagne">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Bookings Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 border border-soft-gold/10 rounded-sm overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-soft-gold/10 flex items-center justify-between bg-white/5">
              <h3 className="text-xl font-serif font-bold text-soft-gold uppercase tracking-widest">Recent Bookings</h3>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-champagne/60 hover:text-soft-gold transition-colors border border-soft-gold/20 px-4 py-2 rounded-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest bg-soft-gold text-luxury-black px-6 py-2 rounded-sm hover:bg-champagne transition-colors shadow-lg">
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-soft-gold/10">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-gold">Customer</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-gold">Service</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-gold">Date & Time</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-gold">Status</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-gold">Price</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-gold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soft-gold/5">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-champagne">{booking.customer}</span>
                          <div className="flex items-center mt-2 space-x-3">
                            <a href={`tel:${booking.phone}`} className="text-[10px] text-champagne/40 hover:text-soft-gold flex items-center transition-colors">
                              <Phone className="w-3 h-3 mr-1" />
                              {booking.phone}
                            </a>
                            <a href="#" className="text-[10px] text-champagne/40 hover:text-soft-gold flex items-center transition-colors">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="p-2 rounded-sm bg-soft-gold/10 mr-4">
                            {booking.category === "Hair" && <Scissors className="w-4 h-4 text-soft-gold" />}
                            {booking.category === "Nails" && <Sparkles className="w-4 h-4 text-soft-gold" />}
                            {booking.category === "Skin" && <Wand2 className="w-4 h-4 text-soft-gold" />}
                          </div>
                          <span className="text-sm font-sans italic text-champagne/80">{booking.service}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-champagne">{booking.date}</span>
                          <span className="text-xs text-soft-gold mt-1 italic font-sans flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {booking.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest inline-flex items-center ${
                          booking.status === "confirmed" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                          booking.status === "pending" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                          booking.status === "cancelled" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                          "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                          {booking.status === "confirmed" && <CheckCircle2 className="w-3 h-3 mr-2" />}
                          {booking.status === "pending" && <Clock className="w-3 h-3 mr-2" />}
                          {booking.status === "cancelled" && <XCircle className="w-3 h-3 mr-2" />}
                          {booking.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-2" />}
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-champagne">{booking.price}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <button className="p-2 hover:bg-soft-gold/10 rounded-sm text-champagne/40 hover:text-soft-gold transition-colors shadow-lg">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          <button className="p-2 hover:bg-soft-gold/10 rounded-sm text-champagne/40 hover:text-soft-gold transition-colors shadow-lg">
                            <ExternalLink className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 border-t border-soft-gold/10 flex items-center justify-between bg-white/5">
              <span className="text-xs text-champagne/40 italic">Showing 1 to 4 of 124 bookings</span>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-soft-gold/10 rounded-sm text-xs text-champagne/40 hover:text-soft-gold transition-colors">Previous</button>
                <button className="px-4 py-2 bg-soft-gold text-luxury-black rounded-sm text-xs font-bold">1</button>
                <button className="px-4 py-2 border border-soft-gold/10 rounded-sm text-xs text-champagne/40 hover:text-soft-gold transition-colors">2</button>
                <button className="px-4 py-2 border border-soft-gold/10 rounded-sm text-xs text-champagne/40 hover:text-soft-gold transition-colors">3</button>
                <button className="px-4 py-2 border border-soft-gold/10 rounded-sm text-xs text-champagne/40 hover:text-soft-gold transition-colors">Next</button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { 
  User, Mail, ShieldCheck, CreditCard, 
  LogOut, Camera, Save, ChevronRight, Menu, X
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ayna",
    email: "ayna@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayna",
    subscription: "Pro Plan",
    expiry: "Dec 2026"
  });

  const handleLogout = () => {
    console.log("Logging out...");
    // navigate('/login');
  };

  return (
    <div className="h-full bg-gray-50 ">
      <div className="w-full h-screen sm:h-auto bg-white border-2 border-gray-200 overflow-hidden flex flex-col md:flex-row md:rounded-lg lg:rounded-lg md:h-[750px] lg:h-[800px] xl:h-[850px]">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6  border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img 
              src={profile.avatar} 
              alt="Profile" 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-md"
            />
            <div>
              <h2 className="font-bold text-gray-800">{profile.name}</h2>
              <p className="text-xs text-gray-500 font-medium">{profile.subscription}</p>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* LEFT NAV: Sidebar */}
        <div className={`
          ${mobileMenuOpen ? 'block' : 'hidden'} 
          md:block w-full md:w-64 lg:w-72 xl:w-80 bg-gray-50 md:border-r border-gray-100 p-6 lg:p-8 flex flex-col
          transition-all duration-300
        `}>
          {/* Desktop Avatar */}
          <div className="hidden md:block relative w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 group">
            <img 
              src={profile.avatar} 
              alt="Profile" 
              className="w-full h-full rounded-3xl object-cover ring-4 ring-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-brand-primary text-white rounded-xl shadow-lg transform translate-x-1 translate-y-1 hover:scale-110 transition-all duration-300">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="hidden md:block text-center mb-10">
            <h2 className="font-bold text-gray-800 text-lg lg:text-xl">{profile.name}</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{profile.subscription}</p>
          </div>

          <nav className="space-y-2 flex-1">
            <TabButton 
              active={activeTab === 'details'} 
              onClick={() => {
                setActiveTab('details');
                setMobileMenuOpen(false);
              }}
              icon={<User size={18} />} 
              label="Edit Profile" 
            />
            <TabButton 
              active={activeTab === 'password'} 
              onClick={() => {
                setActiveTab('password');
                setMobileMenuOpen(false);
              }}
              icon={<ShieldCheck size={18} />} 
              label="Security" 
            />
            <TabButton 
              active={activeTab === 'billing'} 
              onClick={() => {
                setActiveTab('billing');
                setMobileMenuOpen(false);
              }}
              icon={<CreditCard size={18} />} 
              label="Subscription" 
            />
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all mt-auto"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* RIGHT SIDE: Content Area */}
        <div className="flex-1 p-6 lg:p-10 xl:p-12 overflow-y-auto">
          {activeTab === 'details' && (
            <div className="animate-fadeIn max-w-2xl xl:max-w-3xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Profile Details</h3>
              <div className="space-y-6">
                <InputGroup label="Full Name" value={profile.name} placeholder="Enter your name" />
                <InputGroup label="Email Address" value={profile.email} placeholder="Enter your email" type="email" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputGroup label="Phone Number" value="+1 234 567 890" placeholder="Enter phone number" type="tel" />
                  <InputGroup label="Location" value="New York, USA" placeholder="Enter location" />
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2 justify-center">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="animate-fadeIn max-w-2xl xl:max-w-3xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Change Password</h3>
              <div className="space-y-6">
                <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputGroup label="New Password" type="password" placeholder="Min. 8 characters" />
                  <InputGroup label="Confirm New Password" type="password" placeholder="Confirm new password" />
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="animate-fadeIn max-w-3xl xl:max-w-4xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Subscription</h3>
              <p className="text-gray-500 mb-8">Manage your billing and plan details.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-brand-primary rounded-2xl md:rounded-[2rem] p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <span className="text-white/80 text-xs font-black uppercase tracking-widest">Active Plan</span>
                    <h4 className="text-2xl lg:text-3xl font-bold mt-1 mb-4">{profile.subscription}</h4>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <ShieldCheck size={16} />
                      <span>Next billing date: {profile.expiry}</span>
                    </div>
                  </div>
                  <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl md:rounded-[2rem] p-6 lg:p-8 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4">Plan Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                      Unlimited Projects
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                      Priority Support
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                      Advanced Analytics
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                      Custom Integrations
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 lg:p-6 border border-gray-100 rounded-2xl md:rounded-3xl flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl group-hover:bg-brand-primary/20 transition-colors">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Update Payment Method</p>
                      <p className="text-xs text-gray-500">Visa ending in •••• 4242</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-brand-primary transition-colors" />
                </div>

                <div className="p-4 lg:p-6 border border-gray-100 rounded-2xl md:rounded-3xl flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl group-hover:bg-brand-primary/20 transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Billing History</p>
                      <p className="text-xs text-gray-500">View past invoices</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-brand-primary transition-colors" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-4 rounded-2xl font-bold text-sm transition-all ${
      active 
      ? 'bg-white text-brand-primary shadow-sm' 
      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const InputGroup = ({ label, value, type = "text", placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
    />
  </div>
);

export default ProfilePage;
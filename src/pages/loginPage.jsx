import { Mail,Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* The Inset Card */}
      <div className="w-full max-w-md bg-white rounded-lg border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-12">
        
        {/* Logo/Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-brand-primary rounded-2xl shadow-lg shadow-brand-primary/20 flex items-center justify-center mb-4">
            <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Please enter your details to sign in</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5 ml-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs font-semibold text-brand-primary hover:text-brand-dark">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          <button className="w-full py-3.5 bg-brand-primary hover:bg-brand-dark text-white font-semibold rounded-lg shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98]">
            Sign In
          </button>
        </form>

        {/* Divider */}

        {/* Social Logins */}
         

        <p className="text-center text-sm text-slate-500 mt-10">
          Don't have an account? <Link to="/signup" className="font-semibold text-brand-primary hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
import { Building2, Columns, GraduationCap, Languages, Lock, Mail, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';


const SignupPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      {/* The Inset Card - Wider for multi-column layout */}
      <div className="w-full max-w-2xl bg-white rounded-lg border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Join our community and start your journey.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Row 1: Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          {/* Row 2: School Selection (Full Width) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Select School</label>
            <div className="relative group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <select className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all appearance-none">
                <option value="">Choose your school</option>
                <option value="high-school">North High School</option>
                <option value="academy">Global Academy</option>
                <option value="institute">Science Institute</option>
              </select>
            </div>
          </div>

          {/* Row 3: Grade & Section (Two Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Grade</label>
              <div className="relative group">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <select className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all appearance-none">
                  <option value="">Grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Section</label>
              <div className="relative group">
                <Columns className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <select className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all appearance-none">
                  <option value="">Section</option>
                  <option value="a">Section A</option>
                  <option value="b">Section B</option>
                  <option value="c">Section C</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Language Selection (Radio Buttons) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3 ml-1 items-center gap-2">
              <Languages size={16} /> Preferred Language
            </label>
            <div className="flex flex-wrap gap-4 px-1">
              {['English', 'Spanish', 'French', 'German'].map((lang) => (
                <label key={lang} className="flex items-center cursor-pointer group">
                  <input type="radio" name="language" className="sr-only peer" />
                  <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary transition-all text-sm font-medium text-slate-600 group-hover:bg-slate-100">
                    {lang}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Row 5: Email */}
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

          {/* Row 6: Passwords (Two Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full py-4 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-lg shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] mt-4">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account? <Link to="/login" className="font-semibold text-brand-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
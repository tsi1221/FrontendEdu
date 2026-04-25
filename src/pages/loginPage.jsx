import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '../../src/assets/logo.png';

// Demo accounts
const DEMO_ACCOUNTS = {
  'student@demo.com': { password: 'demo123', role: 'student', redirect: '/dashbored' },
  'teacher@demo.com': { password: 'demo123', role: 'teacher', redirect: '/teacher-dashbored' },
  'admin@demo.com': { password: 'demo123', role: 'admin', redirect: '/subscription-stats' },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = DEMO_ACCOUNTS[email.toLowerCase()];

    if (!account) {
      setError('Invalid email or account type.');
      return;
    }

    if (password !== account.password) {
      setError('Incorrect password.');
      return;
    }

    // Store role and redirect
    localStorage.setItem('userRole', account.role);
    navigate(account.redirect);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="w-full max-w-sm border border-gray-200 bg-white p-6">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="EduTwin Logo" className="w-10 h-10 object-contain mb-3" />
          <h1 className="text-xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-xs text-gray-500 mt-1">Sign in to continue learning</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-8 pr-8 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="text-right mt-1">
              <a href="/forgot-password" className="text-xs text-[#0056D2] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#0056D2] text-white text-sm font-medium hover:bg-[#0045b0] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-[#0056D2] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
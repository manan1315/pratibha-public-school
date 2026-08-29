import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiMail, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Logo from '../../components/Logo';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const res = await fetch('/api/captcha');
      const data = await res.json();
      setCaptcha(data);
      setCaptchaAnswer('');
    } catch {
      // silent — captcha is best-effort on the client
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha || !captchaAnswer) {
      toast.error('Please complete the CAPTCHA.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password, captcha.token, captchaAnswer);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error?.response?.data || error.message);
      const msg = error?.response?.data?.message || 'Invalid credentials. Please try again.';
      toast.error(msg);
      fetchCaptcha();
      setCaptchaAnswer('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a237e] to-[#0d1452] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Logo size={84} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1a237e]">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Pratibha Public School Basna</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]"
              required
            />
          </div>

          {/* CAPTCHA */}
          {captcha && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">Security Check</span>
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="text-gray-400 hover:text-[#1a237e] transition-colors"
                >
                  <FiRefreshCw size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#1a237e] text-white px-4 py-2 rounded-lg font-mono text-lg tracking-wider select-none">
                  {captcha.question}
                </div>
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Answer"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e] text-center"
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full btn-primary py-3">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {import.meta.env.DEV && (
          <p className="text-center text-xs text-gray-400 mt-6">
            Dev only — admin@ppsbasna.com / PPS@admin2025
          </p>
        )}

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a237e] transition-colors"
          >
            <FiArrowLeft size={14} /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

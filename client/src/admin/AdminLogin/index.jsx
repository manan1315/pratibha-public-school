import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Logo from '../../components/Logo';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [captchaRendered, setCaptchaRendered] = useState(false);
  const captchaRef = useRef(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => { if (user) navigate(from, { replace: true }); }, [user, from, navigate]);

  // Explicitly render reCAPTCHA when script is ready
  useEffect(() => {
    const renderCaptcha = () => {
      if (window.grecaptcha && captchaRef.current && !captchaRendered) {
        try {
          window.grecaptcha.render(captchaRef.current, {
            sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            callback: (token) => setRecaptchaToken(token),
            'expired-callback': () => setRecaptchaToken(''),
          });
          setCaptchaRendered(true);
        } catch (e) {
          // already rendered
        }
      }
    };

    // Try immediately
    renderCaptcha();

    // If grecaptcha not loaded yet, wait for it
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        renderCaptcha();
        clearInterval(interval);
      }
    }, 500);

    // Cleanup
    return () => clearInterval(interval);
  }, [captchaRendered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) { toast.error('Please complete the CAPTCHA.'); return; }
    setLoading(true);
    try {
      await login(email, password, recaptchaToken);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
      setRecaptchaToken('');
      if (window.grecaptcha) window.grecaptcha.reset();
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]" required />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e]" required />
          </div>
          {/* Google reCAPTCHA */}
          <div className="flex justify-center">
            <div ref={captchaRef} id="g-recaptcha" />
          </div>
          <button type="submit" disabled={loading || !recaptchaToken} className="w-full btn-primary py-3 disabled:opacity-50">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {import.meta.env.DEV && <p className="text-center text-xs text-gray-400 mt-6">Dev only — admin@ppsbasna.com / PPS@admin2025</p>}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a237e] transition-colors"><FiArrowLeft size={14} /> Back to Website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

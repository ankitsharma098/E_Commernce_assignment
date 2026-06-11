import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ShoppingBag, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Login() {
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  // Already logged in
  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 600)); // simulate network
      login(data);
      toast.success('Welcome back! 👋');
      navigate(from, { replace: true });
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <motion.div
      key="login"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl card-shadow p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black text-gradient">ShopVibe</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="login-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button
              id="login-submit"
              type="submit"
              loading={isSubmitting}
              className="w-full"
              size="lg"
            >
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400">
                Demo credentials
              </span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>📧 <strong>any@email.com</strong></p>
            <p>🔑 <strong>any password (6+ chars)</strong></p>
            <p className="text-slate-400 italic">Mock auth — any valid email & password works</p>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

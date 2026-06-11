import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ShoppingBag, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Signup() {
  const { signup, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 600));
      signup(data);
      toast.success('Account created! Welcome to ShopVibe 🎉');
      navigate('/');
    } catch {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <motion.div
      key="signup"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-md">
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
              Create account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Join thousands of happy shoppers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="signup-name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={User}
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              id="signup-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="signup-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              id="signup-confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              id="signup-submit"
              type="submit"
              loading={isSubmitting}
              className="w-full mt-2"
              size="lg"
            >
              Create Account <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4">
            By signing up you agree to our{' '}
            <span className="text-violet-600 dark:text-violet-400 cursor-pointer hover:underline">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-violet-600 dark:text-violet-400 cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </p>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

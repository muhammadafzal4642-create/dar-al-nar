import React, { useState } from 'react';
import { ArrowLeft, LockKeyhole, LogIn, ShieldCheck } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { localAdminAvailable, supabaseConfigured } from '../../lib/supabase';

export const AdminLogin: React.FC = () => {
  const { language, setAppView, signInAdmin } = useRestaurant();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isArabic = language === 'ar';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const result = await signInAdmin(email, password);
      if (result) setError(result);
    } catch {
      setError(isArabic ? 'تعذر الاتصال بخدمة تسجيل الدخول.' : 'Could not reach the login service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d10] text-[#e8dfc8] flex items-center justify-center p-5">
      <section className="w-full max-w-md border border-[#c5a059]/25 bg-[#141419] p-7 sm:p-9 shadow-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c5a059]/15 text-[#c5a059]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-white">DAR AL NAR</p>
            <p className="text-xs text-[#9a9181]">{isArabic ? 'دخول الإدارة' : 'Administrator sign in'}</p>
          </div>
        </div>

        {supabaseConfigured || localAdminAvailable ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <h1 className="font-heading text-2xl font-bold text-white">
                {isArabic ? 'تسجيل دخول الإدارة' : 'Admin login'}
              </h1>
              
            </div>

            <label className="block text-xs font-medium text-[#b5ab99]">
              {supabaseConfigured ? (isArabic ? 'البريد الإلكتروني' : 'Email') : (isArabic ? 'اسم المستخدم' : 'Username')}
              <input
                autoComplete="username"
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#0f0f12] px-3 py-3 text-sm text-white outline-none focus:border-[#c5a059]"
                onChange={(event) => setEmail(event.target.value)}
                required
                type={supabaseConfigured ? 'email' : 'text'}
                value={email}
              />
            </label>

            <label className="block text-xs font-medium text-[#b5ab99]">
              {isArabic ? 'كلمة المرور' : 'Password'}
              <span className="relative mt-1.5 block">
                <LockKeyhole aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#827969]" />
                <input
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-white/10 bg-[#0f0f12] py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-[#c5a059]"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </span>
            </label>

            {error && <p className="text-sm text-rose-400" role="alert">{error}</p>}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c5a059] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-[#d8b56f] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              <LogIn className="h-4 w-4" />
              {isSubmitting ? (isArabic ? 'جارٍ التحقق...' : 'Signing in...') : (isArabic ? 'تسجيل الدخول' : 'Sign in')}
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <h1 className="font-heading text-2xl font-bold text-white">
              {isArabic ? 'الإدارة غير مهيأة' : 'Admin access is not configured'}
            </h1>
            <p className="text-sm leading-relaxed text-[#b5ab99]">
              {isArabic
                ? 'أضف إعدادات Supabase إلى ملف البيئة، ثم أنشئ حساب مدير مصرحاً به.'
                : 'Add the Supabase project URL and publishable key to your local environment, then authorize an administrator account.'}
            </p>
          </div>
        )}

        <button
          className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-[#c5a059] transition-colors hover:text-white"
          onClick={() => setAppView('website')}
          type="button"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {isArabic ? 'العودة إلى الموقع' : 'Back to website'}
        </button>
      </section>
    </main>
  );
};
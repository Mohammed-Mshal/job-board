import SignupForm from '@/components/Forms/SignupForm';
import { Link } from '@/i18n/navigation';
import { noIndexMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import './signup.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Signup');
  return noIndexMetadata(locale, '/signup', t('title'));
}

export default async function SignupPage() {
  const t = await getTranslations('Signup');

  return (
    <div className="login-page relative z-10 pt-12">
      <div className="page-container flex flex-col gap-8 py-2">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-xl font-bold text-[var(--accent)] sm:text-2xl lg:text-3xl">
            {t('title')}
          </h1>
          <p className="auth-description max-w-2xl">
            {t('description')}
          </p>
        </div>
        <div className="mx-auto w-full max-w-4xl p-6 lg:p-8">
          <SignupForm />
          <hr className="form-divider" />
          <div className="form-footer">
            <p className="text-body-sm">{t('already-have-account')}</p>
            <Link href="/login" className="text-link">
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

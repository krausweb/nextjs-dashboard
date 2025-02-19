import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { serverTranslation } from '@/app/i18n';
import ErrorBoundaryWithUI from '@/app/ui/error-boundary';

type LanguageType = {
  lng: string
};

export default async function Page(props: { params: Promise<LanguageType> }) {
  const { lng } = await props.params;
  const { t } = await serverTranslation(lng, 'dashboard');

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {t('dashboard')}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ErrorBoundaryWithUI>
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper lng={lng} />
          </Suspense>
        </ErrorBoundaryWithUI>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <ErrorBoundaryWithUI>
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart lng={lng} />
          </Suspense>
        </ErrorBoundaryWithUI>
        <ErrorBoundaryWithUI>
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestInvoices lng={lng} />
          </Suspense>
        </ErrorBoundaryWithUI>
      </div>
    </div>
  );
}

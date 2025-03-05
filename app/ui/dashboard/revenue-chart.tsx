import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
import { serverTranslation } from '@/app/i18n';
import { Trans } from 'react-i18next/TransWithoutContext'

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

type LanguageType = {
  lng: string
}

export default async function RevenueChart({ lng }: LanguageType) {
  const revenue = await fetchRevenue();
  const { t } = await serverTranslation(lng, 'dashboard');

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">{t('no-data-available')}</p>;
  }

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  const monthsCount = revenue.length;

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {t('recent-revenue')}
      </h2>

      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {t(month.month.toLowerCase())}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">            
            <Trans i18nKey="last12Months" t={t} values={{ monthsCount }}>
              Last {monthsCount} months              
            </Trans>
          </h3>
        </div>
      </div>
    </div>
  );
}

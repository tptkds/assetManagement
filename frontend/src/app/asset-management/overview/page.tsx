// pages/asset/overview/page.tsx

import {
  EstimateDividend,
  InvestmentPerformanceChart,
  StockComposition,
} from "@/widgets";
import { Suspense } from "react";

const Overview = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 except-mobile:grid-cols-5">
        <div className="col-span-2">
          <Suspense fallback={<div>종목 구성 로딩</div>}>
            <StockComposition />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<div>투자 성과 로딩</div>}>
            <InvestmentPerformanceChart />
          </Suspense>
        </div>
      </div>
      <div className="grid-cols grid grid-cols-1 gap-4 except-mobile:grid-cols-2">
        <Suspense fallback={<div>자산 적립 추이 로딩</div>}>
          <div title="자산 적립 추이">
            <div>자산 적립 추이 차트 여기</div>
          </div>
        </Suspense>
        <Suspense fallback={<div>예산 배당액 로딩</div>}>
          <EstimateDividend />
        </Suspense>
      </div>
    </div>
  );
};

export default Overview;

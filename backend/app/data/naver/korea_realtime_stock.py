import asyncio

from app.data.common.constant import STOCK_CACHE_SECOND, STOCK_CHUNK_SIZE
from app.data.common.service import get_korea_stock_code_list
from app.data.naver.sources.service import get_stock_prices
from app.module.asset.schema.stock_schema import StockInfo
from database.dependency import get_redis_pool
from database.redis import RedisRealTimeStockRepository


async def main():
    redis_client = get_redis_pool()
    while True:
        stock_code_list: list[StockInfo] = get_korea_stock_code_list()

        for i in range(0, len(stock_code_list), STOCK_CHUNK_SIZE):
            stock_info_list: list[StockInfo] = stock_code_list[i : i + STOCK_CHUNK_SIZE]
            code_price_pairs: list[tuple[str, int | Exception]] = await get_stock_prices(stock_info_list)

            for code, price in code_price_pairs:
                if isinstance(price, Exception):
                    print(f"다음의 코드가 에러가 발생했습니다 : {code=}, {price=}")
                else:
                    await RedisRealTimeStockRepository.save(redis_client, code, price, expire_time=STOCK_CACHE_SECOND)


if __name__ == "__main__":
    asyncio.run(main())

from redis.asyncio import Redis


class RedisTipRepository:
    @staticmethod
    async def get(redis_client: Redis, key: str) -> str:
        return await redis_client.get(key)

    @staticmethod
    async def save(redis_client: Redis, key: str, data: int, expire_time: int) -> None:
        await redis_client.set(key, data, ex=expire_time)

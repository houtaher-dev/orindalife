from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    DATABASE_URL: str = "postgres://orenda:orenda@orenda_database:5432/orendaa?sslmode=disable"
    ALLOWED_ORIGINS: str = "https://orendaa.shop,http://localhost:3000"

    META_ACCESS_TOKEN: str = ""
    META_PIXEL_ID: str = ""
    META_TEST_EVENT_CODE: str = ""

    TIKTOK_ACCESS_TOKEN: str = ""
    TIKTOK_PIXEL_ID: str = ""

    SNAPCHAT_ACCESS_TOKEN: str = ""
    SNAPCHAT_PIXEL_ID: str = ""
    SNAPCHAT_ORGANIZATION_ID: str = ""

    GOOGLE_SHEETS_WEBHOOK_URL: str = ""

    MAXMIND_ACCOUNT_ID: str = ""
    MAXMIND_LICENSE_KEY: str = ""

    ENVIRONMENT: str = "production"

    @property
    def sqlalchemy_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        sslmode_idx = url.find("?sslmode=")
        if sslmode_idx != -1:
            url = url[:sslmode_idx]
        return url

    @property
    def allowed_origins_list(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import geoip2.webservice
import geoip2.errors

from app.database import get_db
from app.models.page_view import PageView
from app.config import settings

router = APIRouter(prefix="/track", tags=["tracking"])


class PageViewIn(BaseModel):
    page_url: str
    referrer: Optional[str] = None
    session_id: Optional[str] = None


@router.post("/pageview", status_code=204)
def track_pageview(
    payload: PageViewIn,
    request: Request,
    db: Session = Depends(get_db),
):
    ip_address = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    if not ip_address:
        ip_address = str(request.client.host) if request.client else ""

    user_agent = request.headers.get("user-agent", "")

    country_code = None
    city = None
    is_vpn = False
    is_proxy = False
    is_tor = False
    is_hosting = False
    is_valid = False

    if settings.MAXMIND_ACCOUNT_ID and settings.MAXMIND_LICENSE_KEY and ip_address:
        if ip_address not in ("127.0.0.1", "::1", "localhost"):
            try:
                with geoip2.webservice.Client(
                    int(settings.MAXMIND_ACCOUNT_ID),
                    settings.MAXMIND_LICENSE_KEY,
                ) as client:
                    resp = client.insights(ip_address)
                    country_code = resp.country.iso_code
                    city = resp.city.name if resp.city else None

                    traits = resp.traits
                    is_vpn = bool(traits.is_anonymous_vpn)
                    is_proxy = bool(traits.is_anonymous_proxy)
                    is_tor = bool(traits.is_tor_exit_node)
                    is_hosting = bool(traits.is_hosting_provider)

                    is_valid = (
                        country_code == "QA"
                        and not is_vpn
                        and not is_proxy
                        and not is_tor
                        and not is_hosting
                    )
            except (geoip2.errors.AddressNotFoundError, geoip2.errors.GeoIP2Error, ValueError):
                pass

    pv = PageView(
        session_id=payload.session_id,
        page_url=payload.page_url,
        referrer=payload.referrer,
        ip_address=ip_address,
        user_agent=user_agent,
        country_code=country_code,
        city=city,
        is_vpn=is_vpn,
        is_proxy=is_proxy,
        is_tor=is_tor,
        is_hosting=is_hosting,
        is_valid=is_valid,
    )
    db.add(pv)
    db.commit()

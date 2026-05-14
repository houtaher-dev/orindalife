import hashlib
import re
import unicodedata


def sha256_normalize(value: str) -> str:
    """Normalize and SHA-256 hash a PII value per CAPI spec."""
    if not value:
        return ""
    normalized = unicodedata.normalize("NFC", value.strip().lower())
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()


def normalize_phone_qa(phone: str) -> str:
    """Normalize Qatar phone numbers to E.164 format (+974XXXXXXXX)."""
    cleaned = re.sub(r"[\s\-\(\)\.]", "", phone)
    if cleaned.startswith("+974"):
        digits = cleaned[4:]
    elif cleaned.startswith("00974"):
        digits = cleaned[5:]
    elif cleaned.startswith("974") and len(cleaned) == 11:
        digits = cleaned[3:]
    elif cleaned.startswith("0") and len(cleaned) == 9:
        digits = cleaned[1:]
    else:
        digits = cleaned
    if re.match(r"^[3-7]\d{7}$", digits):
        return f"+974{digits}"
    return phone


def hash_phone(phone: str) -> str:
    normalized = normalize_phone_qa(phone)
    return sha256_normalize(normalized)


def hash_name(name: str) -> str:
    """Hash full name — split first/last where possible."""
    parts = name.strip().split()
    if len(parts) >= 2:
        first = sha256_normalize(parts[0])
        last = sha256_normalize(" ".join(parts[1:]))
        return first, last
    single = sha256_normalize(name)
    return single, single

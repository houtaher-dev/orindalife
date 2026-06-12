-- ============================================================
-- Migration: Admin Dashboard - Page Views Tracking Table & Products Update
-- Run this SQL against your PostgreSQL database (orendaa)
-- ============================================================

-- 1. Create page_views table for click/visit tracking
CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    page_url VARCHAR(500) NOT NULL,
    referrer VARCHAR(500),
    ip_address VARCHAR(50),
    user_agent TEXT,
    country_code VARCHAR(10),
    city VARCHAR(100),
    is_vpn BOOLEAN DEFAULT FALSE,
    is_proxy BOOLEAN DEFAULT FALSE,
    is_tor BOOLEAN DEFAULT FALSE,
    is_hosting BOOLEAN DEFAULT FALSE,
    is_valid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for efficient dashboard queries
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_is_valid ON page_views (is_valid);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_valid_created ON page_views (is_valid, created_at);

-- 3. Add JSON fields to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients JSON;
ALTER TABLE products ADD COLUMN IF NOT EXISTS problems_solutions JSON;
ALTER TABLE products ADD COLUMN IF NOT EXISTS theme JSON;

-- 4. Verify
SELECT 'Migration complete. page_views table created and products table updated.' AS result;

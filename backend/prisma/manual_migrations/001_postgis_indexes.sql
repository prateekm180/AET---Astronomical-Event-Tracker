-- PostGIS Spatial Extensions & GIST Index Initialization
-- Database Engine Target: PostgreSQL 14+ / PostGIS 3+

CREATE EXTENSION IF NOT EXISTS postgis;

-- Spatial Index for User Location Queries
DROP INDEX IF EXISTS "idx_user_home_location";
CREATE INDEX "idx_user_home_location" 
  ON "User" USING GIST ("homeLocation");

-- Spatial Index for Astronomical Event Visibility Contours
DROP INDEX IF EXISTS "idx_event_visibility_polygon";
CREATE INDEX "idx_event_visibility_polygon" 
  ON "AstronomicalEvent" USING GIST ("visibilityPolygon");
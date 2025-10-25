-- =====================================================
-- URBANNEST FIREBASE TO SUPABASE MIGRATION SQL
-- =====================================================
-- This SQL script creates the equivalent Supabase schema
-- for migrating from Firebase Firestore to Supabase PostgreSQL

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
-- Replaces Firebase Auth + Firestore user documents
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    profile_image_url TEXT,
    roles TEXT[] DEFAULT ARRAY['user'], -- ['user', 'owner', 'admin']
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    -- Firebase Auth fields
    firebase_uid VARCHAR(255) UNIQUE,
    provider VARCHAR(50) DEFAULT 'email', -- 'email', 'google', 'facebook'
    -- Additional user data
    date_of_birth DATE,
    gender VARCHAR(20),
    occupation VARCHAR(100),
    preferences JSONB DEFAULT '{}'
);

-- =====================================================
-- 2. PROPERTIES TABLE
-- =====================================================
-- Replaces Firestore 'properties' collection
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- Basic Details
    pg_name VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('independent', 'apartment', 'villa', 'hostel')),
    
    -- Location
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    full_address TEXT,
    
    -- Room Details
    single_rooms INTEGER DEFAULT 0,
    single_price DECIMAL(10, 2) DEFAULT 0,
    double_rooms INTEGER DEFAULT 0,
    double_price DECIMAL(10, 2) DEFAULT 0,
    triple_rooms INTEGER DEFAULT 0,
    triple_price DECIMAL(10, 2) DEFAULT 0,
    
    -- Amenities
    amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Preferences
    gender_preference VARCHAR(20) DEFAULT 'coliving' CHECK (gender_preference IN ('male', 'female', 'coliving')),
    food_included BOOLEAN DEFAULT FALSE,
    food_type VARCHAR(20) CHECK (food_type IN ('veg', 'nonveg', 'both')),
    
    -- Other Details
    rating DECIMAL(3, 2) DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    gate_closing_time TIME,
    rules TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Owner Information
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    owner_name VARCHAR(255),
    owner_phone VARCHAR(20),
    owner_email VARCHAR(255),
    
    -- Images
    main_image_url TEXT,
    image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Status and Timestamps
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Additional fields
    pan_number VARCHAR(20),
    aadhar_number VARCHAR(20),
    gst_number VARCHAR(20),
    -- Firebase reference (for migration)
    firebase_id VARCHAR(255) UNIQUE
);

-- =====================================================
-- 3. FAVORITES TABLE
-- =====================================================
-- Replaces Firestore 'favorites' subcollection
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- =====================================================
-- 4. BOOKINGS TABLE
-- =====================================================
-- For future booking system
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    move_in_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    message TEXT,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. REVIEWS TABLE
-- =====================================================
-- For property reviews and ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- =====================================================
-- 6. NOTIFICATIONS TABLE
-- =====================================================
-- For user notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. STORAGE BUCKETS (Supabase Storage)
-- =====================================================
-- These would be created in Supabase Storage, not SQL
-- But here's the structure for reference:

-- Bucket: 'properties'
-- - Path: {property_id}/{image_filename}
-- - Public access for approved properties

-- Bucket: 'profiles' 
-- - Path: {user_id}/{image_filename}
-- - Private access, authenticated users only

-- Bucket: 'temp'
-- - Path: {user_id}/{temp_filename}
-- - Temporary files, auto-cleanup

-- =====================================================
-- 8. INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_roles ON users USING GIN(roles);
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);

-- Properties indexes
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_locality ON properties(locality);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_verified ON properties(verified);
CREATE INDEX idx_properties_gender_preference ON properties(gender_preference);
CREATE INDEX idx_properties_amenities ON properties USING GIN(amenities);
CREATE INDEX idx_properties_location ON properties(latitude, longitude);
CREATE INDEX idx_properties_created_at ON properties(created_at);

-- Favorites indexes
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_property_id ON favorites(property_id);

-- Bookings indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Reviews indexes
CREATE INDEX idx_reviews_property_id ON reviews(property_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- =====================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND 'admin' = ANY(roles)
        )
    );

-- Properties policies
CREATE POLICY "Anyone can view approved properties" ON properties
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Property owners can view their own properties" ON properties
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Property owners can update their own properties" ON properties
    FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Property owners can insert their own properties" ON properties
    FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Admins can view all properties" ON properties
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND 'admin' = ANY(roles)
        )
    );

-- Favorites policies
CREATE POLICY "Users can manage their own favorites" ON favorites
    FOR ALL USING (user_id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can manage their own bookings" ON bookings
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Property owners can view bookings for their properties" ON bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM properties 
            WHERE id = property_id 
            AND owner_id = auth.uid()
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- =====================================================
-- 10. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate property rating
CREATE OR REPLACE FUNCTION calculate_property_rating(property_uuid UUID)
RETURNS DECIMAL(3,2) AS $$
BEGIN
    RETURN (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews 
        WHERE property_id = property_uuid
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT CASE 
            WHEN 'admin' = ANY(roles) THEN 'admin'
            WHEN 'owner' = ANY(roles) THEN 'owner'
            ELSE 'user'
        END
        FROM users 
        WHERE id = user_uuid
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 11. SAMPLE DATA MIGRATION QUERIES
-- =====================================================

-- Example: Migrate users from Firebase
-- INSERT INTO users (id, email, name, firebase_uid, roles, created_at)
-- SELECT 
--     uuid_generate_v4(),
--     firebase_data->>'email',
--     firebase_data->>'displayName',
--     firebase_data->>'uid',
--     ARRAY[firebase_data->>'role'],
--     (firebase_data->>'createdAt')::timestamp
-- FROM firebase_users_data;

-- Example: Migrate properties from Firebase
-- INSERT INTO properties (
--     id, pg_name, description, property_type, address, city, locality,
--     owner_id, status, created_at, firebase_id
-- )
-- SELECT 
--     uuid_generate_v4(),
--     firebase_data->>'pgName',
--     firebase_data->>'description',
--     firebase_data->>'propertyType',
--     firebase_data->>'address',
--     firebase_data->>'city',
--     firebase_data->>'locality',
--     (SELECT id FROM users WHERE firebase_uid = firebase_data->>'ownerId'),
--     firebase_data->>'status',
--     (firebase_data->>'createdAt')::timestamp,
--     firebase_data->>'id'
-- FROM firebase_properties_data;

-- =====================================================
-- 12. VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for approved properties with owner info
CREATE VIEW approved_properties AS
SELECT 
    p.*,
    u.name as owner_name,
    u.phone as owner_phone,
    u.email as owner_email,
    calculate_property_rating(p.id) as calculated_rating
FROM properties p
JOIN users u ON p.owner_id = u.id
WHERE p.status = 'approved';

-- View for user favorites with property details
CREATE VIEW user_favorites AS
SELECT 
    f.*,
    p.pg_name,
    p.city,
    p.locality,
    p.single_price,
    p.double_price,
    p.triple_price,
    p.main_image_url,
    p.verified
FROM favorites f
JOIN properties p ON f.property_id = p.id
WHERE p.status = 'approved';

-- View for property statistics
CREATE VIEW property_stats AS
SELECT 
    p.id,
    p.pg_name,
    COUNT(f.id) as favorite_count,
    COUNT(r.id) as review_count,
    COALESCE(AVG(r.rating), 0) as average_rating
FROM properties p
LEFT JOIN favorites f ON p.id = f.property_id
LEFT JOIN reviews r ON p.id = r.property_id
WHERE p.status = 'approved'
GROUP BY p.id, p.pg_name;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- This schema provides:
-- 1. Complete data structure equivalent to Firebase
-- 2. Proper relationships and constraints
-- 3. Row Level Security for data protection
-- 4. Performance indexes
-- 5. Helper functions and views
-- 6. Migration examples
-- 
-- Next steps would be:
-- 1. Set up Supabase Storage buckets
-- 2. Configure authentication
-- 3. Migrate data using the provided examples
-- 4. Update application code to use Supabase client
-- 5. Test all functionality

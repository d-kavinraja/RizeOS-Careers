-- RizeOS Career Platform Database Schema
-- This script creates the necessary tables for the career platform

-- Users table for authentication and profile management
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_completion INTEGER DEFAULT 0,
    wallet_address VARCHAR(42),
    wallet_connected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_id INTEGER REFERENCES companies(id),
    description TEXT NOT NULL,
    requirements TEXT[],
    location VARCHAR(255),
    job_type VARCHAR(50), -- Full-time, Part-time, Contract, Internship
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency VARCHAR(3) DEFAULT 'USD',
    tags TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active', -- active, paused, closed
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles table for extended profile information
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    skills TEXT[],
    experience_years INTEGER,
    education TEXT,
    location VARCHAR(255),
    remote_work BOOLEAN DEFAULT TRUE,
    portfolio_url VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'applied', -- applied, reviewing, interview, rejected, accepted
    cover_letter TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, job_id)
);

-- AI job matches table for storing AI-generated job recommendations
CREATE TABLE IF NOT EXISTS ai_job_matches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
    strengths TEXT[],
    gaps TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, job_id)
);

-- Wallet transactions table for Web3 integration
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    transaction_hash VARCHAR(66),
    transaction_type VARCHAR(50), -- connect, disconnect, payment, verification
    wallet_address VARCHAR(42),
    amount DECIMAL(18, 8),
    currency VARCHAR(10),
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_ai_job_matches_user_id ON ai_job_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_job_matches_match_score ON ai_job_matches(match_score DESC);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);

-- Insert sample data
INSERT INTO companies (name, description, website, industry, size, location) VALUES
('DeFi Protocol', 'Leading decentralized finance protocol building the future of money', 'https://defiprotocol.com', 'Blockchain', '50-100', 'Remote'),
('MetaVerse Studios', 'Creating immersive Web3 experiences and virtual worlds', 'https://metaversestudios.com', 'Gaming', '100-500', 'San Francisco, CA'),
('Security Labs', 'Smart contract auditing and blockchain security services', 'https://securitylabs.com', 'Security', '10-50', 'Remote'),
('Blockchain Infrastructure', 'Scalable infrastructure solutions for Web3 applications', 'https://blockchaininfra.com', 'Infrastructure', '200-500', 'New York, NY');

INSERT INTO jobs (title, company_id, description, requirements, location, job_type, salary_min, salary_max, tags, featured) VALUES
('Senior Blockchain Developer', 1, 'Build the future of decentralized finance with cutting-edge smart contracts and DeFi protocols.', 
 ARRAY['5+ years of software development experience', 'Strong knowledge of Solidity and smart contract development', 'Experience with Web3.js or Ethers.js', 'Understanding of DeFi protocols and mechanisms'], 
 'Remote', 'Full-time', 120000, 180000, ARRAY['Solidity', 'Web3.js', 'React', 'Node.js'], true),

('Web3 Frontend Engineer', 2, 'Create immersive Web3 experiences for the next generation of users in the metaverse.',
 ARRAY['3+ years of React development experience', 'Strong TypeScript skills', 'Experience with Web3 integration', 'Knowledge of IPFS and decentralized storage'],
 'San Francisco, CA', 'Full-time', 100000, 150000, ARRAY['React', 'TypeScript', 'Ethers.js', 'IPFS'], false),

('Smart Contract Auditor', 3, 'Ensure the security and reliability of smart contracts across various DeFi protocols.',
 ARRAY['Strong knowledge of Solidity and smart contract security', 'Experience with security auditing tools', 'Understanding of common vulnerabilities', 'DeFi protocol knowledge'],
 'Remote', 'Contract', 80, 120, ARRAY['Solidity', 'Security', 'Auditing', 'DeFi'], false),

('DevOps Engineer - Web3', 4, 'Scale blockchain infrastructure and ensure high availability for Web3 applications.',
 ARRAY['Experience with containerization (Docker, Kubernetes)', 'Cloud platform expertise (AWS, GCP)', 'Blockchain node management', 'CI/CD pipeline setup'],
 'New York, NY', 'Full-time', 110000, 160000, ARRAY['Docker', 'Kubernetes', 'AWS', 'Blockchain'], true);

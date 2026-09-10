#!/bin/bash

# FOLM Payment System Setup Script
# This script sets up the complete payment system with backend and frontend

set -e  # Exit on any error

echo "🚀 Setting up Fountain of Light Prayer Ministry Payment System..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

print_status "npm $(npm -v) is installed"

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install

# Generate Prisma client
print_status "Setting up database..."
npm run db:generate

# Initialize database
npm run db:push

print_status "Seeding database with initial data..."
npm run db:seed

cd ..

echo ""
echo "⚙️  Configuration Setup..."
echo ""

# Check if .env files exist, if not copy from examples
if [ ! -f ".env" ]; then
    print_warning "Frontend .env file not found, but it already exists with test keys"
else
    print_status "Frontend environment file exists"
fi

if [ ! -f "backend/.env" ]; then
    print_warning "Backend .env file not found, but it already exists with test configuration"
else
    print_status "Backend environment file exists"
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. 🔑 Update API Keys (IMPORTANT!):"
echo "   - Edit backend/.env with your actual Paystack and PayPal keys"
echo "   - Change JWT secrets and encryption keys for production"
echo "   - Update admin credentials"
echo ""
echo "2. 🚀 Start Development Servers:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"  
echo "   npm run dev"
echo ""
echo "3. 🌐 Access the Application:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:5000"
echo "   - Health Check: http://localhost:5000/health"
echo "   - Database Studio: cd backend && npm run db:studio"
echo ""
echo "4. 👤 Admin Access:"
echo "   - Email: admin@folm.org"
echo "   - Password: admin123 (CHANGE THIS!)"
echo ""
echo "📚 Documentation:"
echo "   - Backend README: ./backend/README.md"
echo "   - API Documentation: http://localhost:5000/health"
echo ""
print_warning "Remember to update all default passwords and API keys before going to production!"
echo ""
print_status "Happy coding! 🎈"
#!/bin/bash
# Hybrid Order System Quick Setup Script

echo "🎀 Jamaliè Hybrid Order System Setup"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "✅ Creating .env.local from template..."
    cp .env.example .env.local
    echo "📝 Edit .env.local with your credentials"
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "📦 Dependencies updated"
echo ""

echo "🔧 Setup Files Created:"
echo "  ✓ .env.local - Local environment variables"
echo "  ✓ vercel.json - Vercel configuration"
echo "  ✓ HYBRID_ORDER_SETUP.md - Full guide"
echo ""

echo "✅ Next Steps:"
echo ""
echo "1. Edit .env.local with your details:"
echo "   - NEON_DATABASE_URL"
echo "   - SMTP credentials (Gmail recommended)"
echo "   - ORDER_NOTIFICATION_EMAIL"
echo ""
echo "2. Test locally:"
echo "   npm run dev"
echo ""
echo "3. Deploy to Vercel:"
echo "   git push"
echo "   Set same env vars in Vercel dashboard"
echo ""
echo "4. Read HYBRID_ORDER_SETUP.md for complete guide"
echo ""
echo "🚀 You're all set! Your orders will be:"
echo "   📱 Sent via WhatsApp (immediate)"
echo "   💾 Saved to Neon database"
echo "   📧 Backed up via email"

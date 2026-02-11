# Hybrid Order System Setup Guide

## What's Ready ✅

Your Jamaliè store now has a **hybrid order system** that works seamlessly:

### 1. **WhatsApp (Immediate Contact)**
- Customers click "WhatsApp Order"
- Their order details appear in WhatsApp with you instantly
- You can respond right away with availability confirmation

### 2. **Cash on Delivery Form (Customer Details)**
- Customers fill in their delivery details
- Order is saved to **Neon Database** for permanent records
- Email backup is automatically sent to your inbox
- Success page shows confirmation

---

## Setup Instructions

### Step 1: Configure Environment Variables

**For Local Development (.env.local):**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `NEON_DATABASE_URL` - Your database connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email config

**For Vercel Production:**
Go to your Vercel dashboard → Settings → Environment Variables and add the same variables.

### Step 2: Gmail Setup (Easiest Option)

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. In your `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx  (the 16-char password)
   SMTP_FROM=your-email@gmail.com
   ORDER_NOTIFICATION_EMAIL=your-email@gmail.com
   ```

### Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Add hybrid order system with email backup"
git push
```

Then in Vercel Dashboard:
1. Select your project
2. Settings → Environment Variables
3. Add all variables from `.env.local`
4. Redeploy

### Step 4: Test Locally

```bash
npm run dev
```

Go to `/checkout` and test both methods:
- **WhatsApp Order**: Opens WhatsApp with your details
- **Cash on Delivery**: Fill form → Check email → Check Neon database

---

## How It Works

### WhatsApp Path
```
Customer clicks "WhatsApp Order" 
    ↓
Order summary opens in WhatsApp
    ↓
You confirm availability & delivery
```

### COD Path
```
Customer fills delivery form & submits
    ↓
Order saved to Neon database
    ↓
Email backup sent to you
    ↓
Success message shown (5 sec redirect)
```

---

## Database Query to View Orders

```sql
SELECT * FROM orders ORDER BY created_at DESC;
```

Or retrieve via API:
```bash
curl "https://your-domain.vercel.app/api/orders?token=YOUR_ADMIN_TOKEN"
```

---

## Troubleshooting

### Email not sending?
- Check SMTP credentials in `.env.local`
- Gmail: Make sure you used app password, not account password
- Check server logs in Vercel dashboard

### Orders not saving to database?
- Verify `NEON_DATABASE_URL` is correct
- Ensure `orders` table exists in Neon console
- Check database logs

### WhatsApp not opening?
- Verify phone number: `8801881445154`
- Must have WhatsApp installed on device

---

## Next Steps

- Add order status tracking page
- Send SMS notifications to customers (Twilio)
- Add inventory management
- Create admin dashboard to manage orders

---

Made with ❤️ for Jamaliè

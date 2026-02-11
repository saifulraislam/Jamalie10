import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type OrderPayload = {
  method: 'cod';
  customerName: string;
  phoneNumber: string;
  address: string;
  birthday: string;
  isGiftOrder: boolean;
  giftRecipientName: string | null;
  items: OrderItem[];
  totalAmount: number;
  timestamp: string;
};

const getBody = (req: { body?: unknown }) => {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }
  return req.body ?? {};
};

type RequestLike = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string | string[] | undefined>;
};

const getToken = (req: RequestLike) => {
  const authHeader = req.headers?.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }
  const queryToken = req.query?.token;
  if (Array.isArray(queryToken)) {
    return queryToken[0];
  }
  return typeof queryToken === 'string' ? queryToken : undefined;
};

export default async function handler(req: RequestLike, res: any) {
  if (!process.env.NEON_DATABASE_URL) {
    res.status(500).json({ error: 'NEON_DATABASE_URL is not configured' });
    return;
  }

  if (req.method === 'GET') {
    const adminToken = process.env.ADMIN_TOKEN;
    if (adminToken) {
      const token = getToken(req);
      if (!token || token !== adminToken) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    }

    const sql = neon(process.env.NEON_DATABASE_URL);
    const orders = await sql`
      select
        id,
        created_at,
        method,
        customer_name,
        phone_number,
        address,
        birthday,
        is_gift_order,
        gift_recipient_name,
        items,
        total_amount
      from orders
      order by created_at desc
      limit 100;
    `;

    res.status(200).json({ orders });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = getBody(req) as Partial<OrderPayload>;

  if (
    !body.customerName ||
    !body.phoneNumber ||
    !body.address ||
    !body.birthday ||
    !Array.isArray(body.items) ||
    body.items.length === 0 ||
    typeof body.totalAmount !== 'number'
  ) {
    res.status(400).json({ error: 'Invalid order payload' });
    return;
  }

  const sql = neon(process.env.NEON_DATABASE_URL);

  const orderRecord = await sql`
    insert into orders (
      method,
      customer_name,
      phone_number,
      address,
      birthday,
      is_gift_order,
      gift_recipient_name,
      items,
      total_amount
    ) values (
      ${body.method ?? 'cod'},
      ${body.customerName},
      ${body.phoneNumber},
      ${body.address},
      ${body.birthday},
      ${body.isGiftOrder ?? false},
      ${body.giftRecipientName ?? null},
      ${JSON.stringify(body.items)},
      ${body.totalAmount}
    )
    returning id;
  `;

  // Email backup (using nodemailer, e.g. with Gmail SMTP or Vercel SMTP)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const orderSummary = body.items?.map(
      (item, i) => `${i + 1}. ${item.name} (x${item.quantity}) - ${item.price * item.quantity} BDT`
    ).join('\n') || '';

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ORDER_NOTIFICATION_EMAIL || process.env.SMTP_USER,
      subject: `New Order from ${body.customerName}`,
      text: `Order Details:\n\nName: ${body.customerName}\nPhone: ${body.phoneNumber}\nAddress: ${body.address}\nBirthday: ${body.birthday}\nGift: ${body.isGiftOrder ? 'Yes' : 'No'}${body.isGiftOrder ? `\nGift Recipient: ${body.giftRecipientName}` : ''}\n\nItems:\n${orderSummary}\n\nTotal: ${body.totalAmount} BDT\nTime: ${body.timestamp}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    // Don't block order, just log
    console.error('Order email backup failed:', err);
  }

  res.status(200).json({ ok: true, orderId: orderRecord[0]?.id ?? null });
}

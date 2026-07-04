/**
 * GymSmart Database Seeder — Prisma v7
 * Run: npm run seed
 *
 * Creates default SuperAdmin user and sample data for all modules
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding GymSmart database...\n');

  // 1. Create SuperAdmin User
  const hashedPassword = await bcrypt.hash('superadmin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@gymsmart.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@gymsmart.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
      phone: '+91 98765 43210',
      branch: 'Main Branch',
      isActive: true,
    },
  });
  console.log('✅ SuperAdmin created');

  // 2. Plans
  const plans = [
    { id: 1, name: 'Basic', tier: 'BASIC' as const, price1Month: 1200, price3Month: 3000, price6Month: 5500, price12Month: 10000, features: ['Gym Access', 'Locker'] },
    { id: 2, name: 'Gold', tier: 'GOLD' as const, price1Month: 1800, price3Month: 4500, price6Month: 8000, price12Month: 15000, features: ['Gym Access', 'Group Classes'] },
    { id: 3, name: 'Premium', tier: 'PREMIUM' as const, price1Month: 2500, price3Month: 6500, price6Month: 12000, price12Month: 22000, features: ['24/7 Access', 'PT'] },
  ];
  for (const p of plans) {
    await prisma.plan.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log('✅ Plans created');

  // 3. Staff
  const staff = [
    { email: 'trainer@gymsmart.com', name: 'Rajesh Kumar', phone: '+91 91234 56789', role: 'Head Trainer', salary: 35000, branch: 'Main Branch', gender: 'MALE' as const, joinDate: new Date('2025-01-01') },
    { email: 'reception@gymsmart.com', name: 'Priya Desai', phone: '+91 92345 67890', role: 'Receptionist', salary: 22000, branch: 'Main Branch', gender: 'FEMALE' as const, joinDate: new Date('2025-03-01') },
    { email: 'trainer2@gymsmart.com', name: 'Amit Verma', phone: '+91 93456 78901', role: 'Trainer', salary: 28000, branch: 'Branch 2', gender: 'MALE' as const, joinDate: new Date('2025-06-01') },
    { email: 'manager@gymsmart.com', name: 'Sunita Rao', phone: '+91 94567 89012', role: 'Branch Manager', salary: 42000, branch: 'Branch 2', gender: 'FEMALE' as const, joinDate: new Date('2025-02-01') },
    { email: 'trainer3@gymsmart.com', name: 'Vikram Singh', phone: '+91 95678 90123', role: 'Yoga Instructor', salary: 25000, branch: 'Branch 3', gender: 'MALE' as const, joinDate: new Date('2026-01-01') },
  ];
  for (const s of staff) {
    await prisma.staff.upsert({ where: { email: s.email }, update: s, create: s });
  }
  console.log('✅ Staff created');

  // 4. Members
  const members = [
    { email: 'rahul@gmail.com', name: 'Rahul Sharma', phone: '+91 98765 43210', gender: 'MALE' as const, address: 'Andheri', branch: 'Main Branch', planId: 3, billingCycle: 'ONE_MONTH' as any, joinDate: new Date('2026-01-15'), expiryDate: new Date('2026-02-15'), paidAmount: 2500, pendingAmount: 0, status: 'ACTIVE' as any },
    { email: 'priya@gmail.com', name: 'Priya Patel', phone: '+91 87654 32109', gender: 'FEMALE' as const, address: 'Borivali', branch: 'Branch 2', planId: 1, billingCycle: 'THREE_MONTHS' as any, joinDate: new Date('2026-02-10'), expiryDate: new Date('2026-05-10'), paidAmount: 3000, pendingAmount: 0, status: 'ACTIVE' as any },
    { email: 'amit@gmail.com', name: 'Amit Kumar', phone: '+91 76543 21098', gender: 'MALE' as const, address: 'Powai', branch: 'Main Branch', planId: 2, billingCycle: 'ONE_MONTH' as any, joinDate: new Date('2026-03-08'), expiryDate: new Date('2026-04-08'), paidAmount: 900, pendingAmount: 900, status: 'PENDING' as any },
    { email: 'sneha@gmail.com', name: 'Sneha Mehta', phone: '+91 65432 10987', gender: 'FEMALE' as const, address: 'Dadar', branch: 'Branch 3', planId: 3, billingCycle: 'SIX_MONTHS' as any, joinDate: new Date('2026-01-05'), expiryDate: new Date('2026-07-05'), paidAmount: 12000, pendingAmount: 0, status: 'ACTIVE' as any },
    { email: 'vijay@gmail.com', name: 'Vijay Singh', phone: '+91 54321 09876', gender: 'MALE' as const, address: 'Thane', branch: 'Main Branch', planId: 1, billingCycle: 'ONE_MONTH' as any, joinDate: new Date('2025-05-01'), expiryDate: new Date('2025-06-01'), paidAmount: 1200, pendingAmount: 1200, status: 'EXPIRED' as any },
    { email: 'anita@gmail.com', name: 'Anita Gupta', phone: '+91 43210 98765', gender: 'FEMALE' as const, address: 'Bandra', branch: 'Branch 2', planId: 2, billingCycle: 'TWELVE_MONTHS' as any, joinDate: new Date('2026-06-20'), expiryDate: new Date('2027-06-20'), paidAmount: 15000, pendingAmount: 0, status: 'ACTIVE' as any },
  ];
  for (const m of members) {
    const mem = await prisma.member.upsert({ where: { email: m.email }, update: m, create: m });
    // create payment record if not exists
    const pCount = await prisma.payment.count({ where: { memberId: mem.id } });
    if(pCount === 0 && m.paidAmount > 0) {
      await prisma.payment.create({
        data: {
          memberId: mem.id, amount: m.paidAmount, method: 'UPI', status: 'PAID', invoiceNo: 'INV-' + mem.id, paidAt: m.joinDate
        }
      });
    }
  }
  console.log('✅ Members & Payments created');

  // 5. Products
  const products = [
    { name: 'Whey Protein', category: 'Supplements', price: 2500, stock: 50 },
    { name: 'Creatine Monohydrate', category: 'Supplements', price: 800, stock: 30 },
    { name: 'Gym Gloves', category: 'Accessories', price: 450, stock: 100 },
    { name: 'Resistance Bands', category: 'Accessories', price: 600, stock: 75 },
    { name: 'GymSmart T-Shirt', category: 'Merchandise', price: 599, stock: 200 },
    { name: 'Shaker Bottle', category: 'Accessories', price: 299, stock: 150 },
    { name: 'Pre-Workout', category: 'Supplements', price: 1800, stock: 25 },
    { name: 'Yoga Mat', category: 'Equipment', price: 1200, stock: 40 },
  ];
  for (const p of products) {
    const count = await prisma.product.count({ where: { name: p.name } });
    if (count === 0) await prisma.product.create({ data: p });
  }
  console.log('✅ Products created');

  // 6. Workouts
  const workouts = [
    { name: 'Bench Press', category: 'Chest', muscleGroup: ['Chest', 'Triceps'], sets: 4, reps: '8-12', difficulty: 'INTERMEDIATE' },
    { name: 'Deadlift', category: 'Back', muscleGroup: ['Back', 'Hamstrings'], sets: 4, reps: '5-8', difficulty: 'ADVANCED' },
    { name: 'Squats', category: 'Legs', muscleGroup: ['Quads', 'Glutes'], sets: 4, reps: '10-15', difficulty: 'INTERMEDIATE' },
    { name: 'Pull-ups', category: 'Back', muscleGroup: ['Lats', 'Biceps'], sets: 3, reps: '8-12', difficulty: 'INTERMEDIATE' },
    { name: 'Treadmill Run', category: 'Cardio', muscleGroup: ['Full Body'], duration: '30 min', difficulty: 'BEGINNER' },
    { name: 'Plank', category: 'Core', muscleGroup: ['Core'], duration: '60 sec', difficulty: 'BEGINNER' },
  ];
  for (const w of workouts) {
    const count = await prisma.workout.count({ where: { name: w.name } });
    if (count === 0) await prisma.workout.create({ data: w });
  }
  console.log('✅ Workouts created');

  // 7. Diet Plans
  const diets = [
    { name: 'Weight Loss', goal: 'Weight Loss', calories: 1800, protein: 150, carbs: 150, fats: 60, meals: ['Oats + Eggs', 'Chicken Salad', 'Protein Shake'] },
    { name: 'Muscle Gain', goal: 'Muscle Gain', calories: 3000, protein: 200, carbs: 350, fats: 80, meals: ['Eggs + Toast', 'Rice + Chicken', 'Protein Shake'] },
  ];
  for (const d of diets) {
    const count = await prisma.dietPlan.count({ where: { name: d.name } });
    if (count === 0) await prisma.dietPlan.create({ data: d });
  }
  console.log('✅ Diet Plans created');

  // 8. Inquiries
  const inquiries = [
    { name: 'Ravi Tiwari', phone: '+91 99887 76655', email: 'ravi@gmail.com', interest: 'Premium', status: 'NEW' as any, source: 'Walk-in' },
    { name: 'Meena Joshi', phone: '+91 88776 65544', interest: 'Gold', status: 'FOLLOW_UP' as any, source: 'Call' },
    { name: 'Karan Malhotra', phone: '+91 77665 54433', interest: 'PT', status: 'CONVERTED' as any, source: 'Referral' },
    { name: 'Pooja Shah', phone: '+91 66554 43322', interest: 'Basic', status: 'NEW' as any, source: 'Website' },
  ];
  for (const i of inquiries) {
    const count = await prisma.inquiry.count({ where: { phone: i.phone } });
    if (count === 0) await prisma.inquiry.create({ data: i });
  }
  console.log('✅ Inquiries created');

  console.log('\n🎉 Seeding complete!');
}

main().catch(e => { console.error('❌ Seed failed:', e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });

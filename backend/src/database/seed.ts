import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

// Entities
import { User } from '../modules/auth/entities/user.entity';
import { Plan } from '../modules/erp/plans/entities/plan.entity';
import { Staff } from '../modules/erp/hr/entities/staff.entity';
import { Gender } from '../modules/erp/members/utils/members.enums';
import { Member } from '../modules/erp/members/entities/member.entity';
import { Payment } from '../modules/erp/finance/entities/payment.entity';
import { Product } from '../modules/erp/store/entities/product.entity';
import { Exercise } from '../modules/erp/library/entities/exercise.entity';
import { Workout } from '../modules/erp/workout/entities/workout.entity';
import { DietPlan } from '../modules/erp/library/entities/diet-plan.entity';
import { Inquiry } from '../modules/erp/inquiries/entities/inquiry.entity';
import { Settings } from '../modules/erp/settings/entities/setting.entity';
import { Payroll } from '../modules/erp/hr/entities/payroll.entity';
import { Attendance } from '../modules/erp/attendance/entities/attendance.entity';
import { Order } from '../modules/erp/store/entities/order.entity';
import { OrderItem } from '../modules/erp/store/entities/order-item.entity';

const logger = new Logger('DatabaseSeed');

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Auto-create tables for the seed
  dropSchema: true, // Wipe existing schema to avoid conflict
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});

async function main() {
  await AppDataSource.initialize();
  logger.log('🌱 Seeding GymSmart database with TypeORM...');

  const userRepo = AppDataSource.getRepository(User);
  const planRepo = AppDataSource.getRepository(Plan);
  const staffRepo = AppDataSource.getRepository(Staff);
  const memberRepo = AppDataSource.getRepository(Member);
  const paymentRepo = AppDataSource.getRepository(Payment);
  const productRepo = AppDataSource.getRepository(Product);
  const workoutRepo = AppDataSource.getRepository(Workout);
  const dietRepo = AppDataSource.getRepository(DietPlan);
  const inquiryRepo = AppDataSource.getRepository(Inquiry);
  const settingsRepo = AppDataSource.getRepository(Settings);

  // 1. Create SuperAdmin User
  const hashedPassword = await bcrypt.hash('superadmin123', 10);
  let admin = await userRepo.findOne({
    where: { email: 'admin@gymsmart.com' },
  });
  if (!admin) {
    admin = userRepo.create({
      name: 'Super Admin',
      email: 'admin@gymsmart.com',
      password: hashedPassword,
      role: 'SUPERADMIN' as any,
      phone: '+91 98765 43210',
      branch: 'Main Branch',
      isActive: true,
    });
    await userRepo.save(admin);
  }
  logger.log('✅ SuperAdmin created');

  // 2. Plans
  const plans = [
    AppDataSource.manager.create(Plan, {
      name: 'Basic',
      tier: 'BASIC' as any,
      price1Month: 1200,
      price3Month: 3000,
      price6Month: 5500,
      price12Month: 10000,
      features: ['Gym Access', 'Locker'] as any,
    }),
    AppDataSource.manager.create(Plan, {
      name: 'Gold',
      tier: 'GOLD' as any,
      price1Month: 2000,
      price3Month: 5000,
      price6Month: 9500,
      price12Month: 18000,
      features: ['Gym Access', 'Locker', 'Cardio', 'Diet Plan'] as any,
    }),
    AppDataSource.manager.create(Plan, {
      name: 'Premium',
      tier: 'PREMIUM' as any,
      price1Month: 2500,
      price3Month: 6500,
      price6Month: 12000,
      price12Month: 22000,
      features: ['24/7 Access', 'PT'] as any,
    }),
  ];
  for (const p of plans) {
    const plan = await planRepo.findOne({ where: { name: p.name } });
    if (!plan) {
      await planRepo.save(planRepo.create(p));
    }
  }
  logger.log('✅ Plans created');

  // 3. Staff
  const staffData = [
    {
      email: 'trainer@gymsmart.com',
      name: 'Rajesh Kumar',
      phone: '+91 91234 56789',
      role: 'Head Trainer',
      salary: 35000,
      branch: 'Main Branch',
      gender: Gender.MALE,
      joinDate: new Date('2025-01-01'),
    },
    {
      email: 'reception@gymsmart.com',
      name: 'Priya Desai',
      phone: '+91 92345 67890',
      role: 'Receptionist',
      salary: 22000,
      branch: 'Main Branch',
      gender: Gender.FEMALE,
      joinDate: new Date('2025-03-01'),
    },
  ];
  for (const s of staffData) {
    const staff = await staffRepo.findOne({ where: { email: s.email } });
    if (!staff) {
      await staffRepo.save(staffRepo.create(s));
    }
  }
  logger.log('✅ Staff created');

  // 4. Members & Payments
  const membersData = [
    {
      email: 'rahul@gmail.com',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      gender: Gender.MALE,
      address: 'Andheri',
      branch: 'Main Branch',
      planName: 'Premium',
      joinDate: new Date('2026-01-15'),
      expiryDate: new Date('2026-02-15'),
      paidAmount: 2500,
      pendingAmount: 0,
      status: 'ACTIVE',
      billingCycle: 'ONE_MONTH' as any,
    },
  ];
  for (const m of membersData) {
    let mem = await memberRepo.findOne({ where: { email: m.email } });
    if (!mem) {
      const { planName, paidAmount, ...rest } = m;
      const plan = await planRepo.findOne({ where: { name: planName } });
      if (plan) {
        mem = await memberRepo.save(
          memberRepo.create({
            ...rest,
            plan: plan as any,
            status: rest.status as any,
          }),
        );
        if (paidAmount > 0) {
          const payment = paymentRepo.create({
            amount: paidAmount,
            method: 'UPI',
            status: 'PAID' as any,
            invoiceNo: 'INV-' + mem.id,
            paidAt: m.joinDate,
            member: mem as any,
          });
          await paymentRepo.save(payment);
        }
      }
    }
  }
  logger.log('✅ Members & Payments created');

  // 5. Products
  const products = [
    { name: 'Whey Protein', category: 'Supplements', price: 2500, stock: 50 },
  ];
  for (const p of products) {
    const product = await productRepo.findOne({ where: { name: p.name } });
    if (!product) await productRepo.save(productRepo.create(p));
  }
  logger.log('✅ Products created');

  // 6. Inquiries
  const inquiries = [
    {
      name: 'Ravi Tiwari',
      phone: '+91 99887 76655',
      email: 'ravi@gmail.com',
      interest: 'Premium',
      status: 'NEW' as any,
      source: 'Walk-in',
    },
  ];
  for (const i of inquiries) {
    const inquiry = await inquiryRepo.findOne({ where: { phone: i.phone } });
    if (!inquiry) await inquiryRepo.save(inquiryRepo.create(i as any));
  }
  logger.log('✅ Inquiries created');

  // 7. Settings
  const settings = await settingsRepo.findOne({ where: {} });
  if (!settings) {
    await settingsRepo.save(
      settingsRepo.create({
        gymName: 'GymSmart Fitness',
        ownerName: 'Admin',
        phone: '123',
        email: 'admin@a.com',
        city: 'Mumbai',
        gstNumber: '123',
      }),
    );
  }
  logger.log('✅ Settings created');

  logger.log('🎉 Seeding complete!');
  await AppDataSource.destroy();
}

main().catch((e) => {
  logger.error('❌ Seed failed:', e);
  process.exit(1);
});

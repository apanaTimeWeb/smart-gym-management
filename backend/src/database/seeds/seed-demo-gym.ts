import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/en_IN'; // Indian locale for realistic demo data

// Entities
import { User } from '../../modules/auth/entities/user.entity';
import { Plan } from '../../modules/erp/plans/entities/plan.entity';
import { Staff } from '../../modules/erp/hr/entities/staff.entity';
import { Gender } from '../../modules/erp/members/utils/members.enums';
import { Member } from '../../modules/erp/members/entities/member.entity';
import { Payment } from '../../modules/erp/finance/entities/payment.entity';
import { Settings } from '../../modules/erp/settings/entities/setting.entity';
import { Attendance } from '../../modules/erp/attendance/entities/attendance.entity';
import { Product } from '../../modules/erp/store/entities/product.entity';
import { Order } from '../../modules/erp/store/entities/order.entity';
import { OrderItem } from '../../modules/erp/store/entities/order-item.entity';
import { DietPlan } from '../../modules/erp/library/entities/diet-plan.entity';
import { Exercise } from '../../modules/erp/library/entities/exercise.entity';
import { Workout } from '../../modules/erp/workout/entities/workout.entity';
import { Inquiry } from '../../modules/erp/inquiries/entities/inquiry.entity';
import { AuditLog } from '../../modules/erp/audit/entities/audit-log.entity';

const logger = new Logger('DemoGymSeed');

async function main() {
  const masterUrl = process.env.DATABASE_URL;
  if (!masterUrl) {
    logger.error('❌ DATABASE_URL is missing in environment variables.');
    process.exit(1);
  }

  // 1. Connect to Master to ensure Gym and User exist
  const MasterDataSource = new DataSource({
    type: 'postgres',
    url: masterUrl,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  });
  await MasterDataSource.initialize();
  
  // Create or get the Gym entry in Master DB
  let tenantId: string;
  const existingGym = await MasterDataSource.query('SELECT id FROM gyms WHERE "adminEmail" = $1', ['demo_admin@gym.com']);
  if (existingGym.length > 0) {
    tenantId = existingGym[0].id;
    logger.log(`✅ Found existing Demo Gym in Master DB (id: ${tenantId})`);
  } else {
    // Insert new gym and get the generated UUID
    const result = await MasterDataSource.query(
      `INSERT INTO gyms (name, "ownerName", "adminEmail", phone, status, plan, "isDeleted", "databaseVersion") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      ['Demo Gym', 'Demo Admin', 'demo_admin@gym.com', '9876543210', 'ACTIVE', 'PREMIUM', false, '1.0.0']
    );
    tenantId = result[0].id;
    logger.log(`✅ Created new Demo Gym in Master DB (id: ${tenantId})`);
  }

  const connectionKey = `tenant_db_${tenantId}`;
  logger.log(`🌱 Seeding Demo Gym for Database: ${connectionKey}...`);

  // Create Database
  try {
    await MasterDataSource.query(`CREATE DATABASE "${connectionKey}"`);
    logger.log(`✅ Created database ${connectionKey}`);
  } catch (err: any) {
    if (err.code !== '42P04') throw err; // ignore if already exists
  }

  // Sync Demo Admin in Master
  const masterUserRepo = MasterDataSource.getRepository(User);
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  let masterUser = await masterUserRepo.findOne({ where: { email: 'demo_admin@gym.com' } });
  if (masterUser) {
    masterUser.password = hashedPassword;
    // ensure it's active and has correct role
    masterUser.isActive = true;
    masterUser.role = 'ADMIN' as any;
    await masterUserRepo.save(masterUser);
  } else {
    await masterUserRepo.save(masterUserRepo.create({
      name: 'Demo Admin',
      email: 'demo_admin@gym.com',
      password: hashedPassword,
      role: 'ADMIN' as any,
      isActive: true,
    }));
  }
  await MasterDataSource.destroy();
  logger.log('✅ Master Database User Updated (demo_admin@gym.com / demo123).');

  // 2. Now connect to Tenant Database to seed
  const parsedUrl = new URL(masterUrl);
  parsedUrl.pathname = `/${connectionKey}`;
  const tenantUrl = parsedUrl.toString();
  const AppDataSource = new DataSource({
    type: 'postgres',
    url: tenantUrl,
    synchronize: true, // Create tables
    dropSchema: true, // Wipe existing data to ensure a fresh demo
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  });

  await AppDataSource.initialize();
  logger.log('✅ Connected to Tenant Database.');

  const userRepo = AppDataSource.getRepository(User);
  const planRepo = AppDataSource.getRepository(Plan);
  const staffRepo = AppDataSource.getRepository(Staff);
  const memberRepo = AppDataSource.getRepository(Member);
  const paymentRepo = AppDataSource.getRepository(Payment);
  const settingsRepo = AppDataSource.getRepository(Settings);
  const attendanceRepo = AppDataSource.getRepository(Attendance);

  // 1. Settings (Mock Gym Details)
  await settingsRepo.save(
    settingsRepo.create({
      gymName: 'Titan Fitness (Demo)',
      ownerName: 'Admin',
      phone: faker.phone.number({ style: 'national' }),
      email: 'demo_admin@gym.com',
      city: 'Mumbai',
      gstNumber: '27AABCU9603R1ZX',
    }),
  );
  logger.log('✅ Gym Settings Created.');


  // We don't necessarily need to create the admin in the tenant DB if auth is master-only,
  // but keeping it for consistency if any tenant-level user queries exist.
  await userRepo.save(
    userRepo.create({
      name: 'Demo Admin',
      email: 'demo_admin@gym.com',
      password: hashedPassword,
      role: 'ADMIN' as any,
      phone: faker.phone.number({ style: 'national' }),
      branch: 'Demo Branch',
      isActive: true,
    })
  );
  logger.log('✅ Tenant Database Demo Admin Synced.');

  // 3. Plans
  const plansData = [
    { name: 'Basic Monthly', tier: 'BASIC', price1Month: 1500, price3Month: 4000, price6Month: 7500, price12Month: 12000, features: ['Gym Access'] },
    { name: 'Pro Quarterly', tier: 'GOLD', price1Month: 2500, price3Month: 6500, price6Month: 12000, price12Month: 20000, features: ['Gym Access', 'Cardio'] },
    { name: 'Elite Yearly', tier: 'PREMIUM', price1Month: 3500, price3Month: 9000, price6Month: 16000, price12Month: 25000, features: ['24/7 Access', 'PT', 'Diet Plan'] },
  ];
  
  const savedPlans: Plan[] = [];
  for (const p of plansData) {
    const created = planRepo.create(p as any) as any;
    savedPlans.push(await planRepo.save(created));
  }
  logger.log('✅ Pricing Plans Created.');

  // 4. Staff
  const savedStaff: Staff[] = [];
  for (let i = 0; i < 5; i++) {
    const created = staffRepo.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'national' }),
      role: i === 0 ? 'Manager' : 'Trainer',
      salary: faker.number.int({ min: 15000, max: 45000 }),
      branch: 'Demo Branch',
      gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]),
      joinDate: faker.date.past({ years: 1 }),
      isActive: true,
    }) as any;
    savedStaff.push(await staffRepo.save(created));
  }
  logger.log('✅ Staff Created.');

  // 5. Members & Payments
  const membersCount = 50;
  for (let i = 0; i < membersCount; i++) {
    const plan = faker.helpers.arrayElement(savedPlans);
    const joinDate = faker.date.past({ years: 1 });
    const isExpired = faker.datatype.boolean(); // Some expired, some active
    const expiryDate = new Date(joinDate);
    expiryDate.setMonth(expiryDate.getMonth() + (isExpired ? -1 : faker.number.int({ min: 1, max: 12 })));
    
    const member = await memberRepo.save(
      memberRepo.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'national' }),
        gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]),
        address: faker.location.city(),
        plan: plan,
        billingCycle: 'ONE_MONTH' as any,
        status: isExpired ? ('EXPIRED' as any) : ('ACTIVE' as any),
        joinDate: joinDate,
        expiryDate: expiryDate,
        paidAmount: plan.price1Month,
        pendingAmount: faker.helpers.arrayElement([0, 500, 1000]),
      })
    );

    // Payment Record
    if (member.paidAmount > 0) {
      await paymentRepo.save(
        paymentRepo.create({
          amount: member.paidAmount,
          method: faker.helpers.arrayElement(['UPI', 'CASH', 'CREDIT_CARD']),
          status: 'PAID' as any,
          invoiceNo: 'INV-' + faker.string.alphanumeric(6).toUpperCase(),
          paidAt: joinDate,
          member: member,
        })
      );
    }

    // Attendance (Random for last 30 days)
    if (!isExpired) {
      for (let j = 0; j < 15; j++) { // approx 15 visits
        const attendanceDate = faker.date.recent({ days: 30 });
        await attendanceRepo.save(
          attendanceRepo.create({
            date: attendanceDate,
            checkIn: new Date(attendanceDate.setHours(faker.number.int({ min: 6, max: 18 }))),
            checkOut: new Date(attendanceDate.setHours(faker.number.int({ min: 7, max: 20 }))),
            member: member,
            type: 'MEMBER' as any,
          })
        );
      }
    }
  }
  logger.log('✅ 50 Members, Payments, and Attendance records created.');

  // 6. Store
  const productRepo = AppDataSource.getRepository(Product);
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  
  const products = await productRepo.save([
    { name: 'Whey Protein 1kg', category: 'Supplements', price: 2500, stock: 20, isActive: true },
    { name: 'Gym T-Shirt', category: 'Apparel', price: 500, stock: 50, isActive: true },
    { name: 'Creatine 500g', category: 'Supplements', price: 1200, stock: 30, isActive: true },
  ]);

  const order1 = await orderRepo.save({ total: products[0].price, method: 'Card', status: 'COMPLETED' });
  await orderItemRepo.save([{ orderId: order1.id, productId: products[0].id, qty: 1, price: products[0].price }]);
  
  logger.log('✅ Store seeded.');

  // 7. Diet Library
  const dietRepo = AppDataSource.getRepository(DietPlan);
  await dietRepo.save([
    { name: 'Muscle Gain Protocol', goal: 'Muscle Gain', calories: 3000, protein: 180, carbs: 350, fats: 80, meals: ['Oats & Whey', 'Chicken & Rice', 'Beef & Potatoes', 'Cottage Cheese'], isActive: true },
    { name: 'Keto Shred', goal: 'Weight Loss', calories: 1800, protein: 140, carbs: 20, fats: 130, meals: ['Eggs & Bacon', 'Avocado Chicken Salad', 'Salmon & Asparagus'], isActive: true },
  ]);
  logger.log('✅ Diet Library seeded.');

  // 8. Workout Library
  const exerciseRepo = AppDataSource.getRepository(Exercise);
  await exerciseRepo.save([
    { name: 'Barbell Bench Press', category: 'Strength', muscleGroup: ['Chest', 'Triceps'], sets: 4, reps: '8-10', difficulty: 'Intermediate', isActive: true },
    { name: 'Squats', category: 'Strength', muscleGroup: ['Legs', 'Glutes'], sets: 4, reps: '8-10', difficulty: 'Intermediate', isActive: true },
  ]);
  const workoutRepo = AppDataSource.getRepository(Workout);
  await workoutRepo.save([
    { name: 'Push Pull Legs - Beginner', level: 'Beginner', days: 3, exercises: 15, focus: 'Hypertrophy', duration: '60 mins', tags: ['PPL', 'Beginner'], isActive: true },
  ]);
  logger.log('✅ Workout Library seeded.');

  // 9. Inquiries
  const inquiryRepo = AppDataSource.getRepository(Inquiry);
  await inquiryRepo.save([
    { name: 'Sanjay Kumar', phone: '9876543212', interest: 'Yearly Plan', status: 'NEW' as any, source: 'Instagram' },
    { name: 'Riya Singh', phone: '9876543213', interest: 'Personal Training', status: 'FOLLOW_UP' as any, source: 'Walk-in' },
  ]);
  logger.log('✅ Inquiries seeded.');

  // 10. Audit Logs
  const auditRepo = AppDataSource.getRepository(AuditLog);
  await auditRepo.save([
    { action: 'LOGIN', entityType: 'Auth', ipAddress: '192.168.1.1', actorId: 'system', actorRole: 'SYSTEM' },
    { action: 'CREATE', entityType: 'Member', entityId: savedPlans[0].id, ipAddress: '192.168.1.1', actorId: 'admin', actorRole: 'ADMIN' }
  ]);
  logger.log('✅ Audit Logs seeded.');

  logger.log('🎉 Demo Gym Seeding Complete!');
  await AppDataSource.destroy();
}

main().catch((e) => {
  logger.error('❌ Demo Gym Seed failed:', e);
  process.exit(1);
});

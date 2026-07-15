import 'dotenv/config';
import { DataSource } from 'typeorm';

// Entities
import { Attendance } from '../../modules/erp/attendance/entities/attendance.entity';
import { Staff } from '../../modules/erp/hr/entities/staff.entity';
import { Payroll } from '../../modules/erp/hr/entities/payroll.entity';
import { Product } from '../../modules/erp/store/entities/product.entity';
import { Order } from '../../modules/erp/store/entities/order.entity';
import { OrderItem } from '../../modules/erp/store/entities/order-item.entity';
import { DietPlan } from '../../modules/erp/library/entities/diet-plan.entity';
import { Exercise } from '../../modules/erp/library/entities/exercise.entity';
import { Workout } from '../../modules/erp/workout/entities/workout.entity';
import { Member } from '../../modules/erp/members/entities/member.entity';
import { Plan } from '../../modules/erp/plans/entities/plan.entity';

// Enums
import { AttendanceType, PlanTier, BillingCycle, MemberStatus, Gender } from '../../modules/erp/members/utils/members.enums';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [__dirname.replace(/\\/g, '/') + '/src/**/*.entity{.ts,.js}'],
});

async function seed() {
  console.log('Connecting to database...');
  await AppDataSource.initialize();
  console.log('Connected!');

  // 1. Ensure basic entities exist to attach attendance to
  console.log('Seeding basic entities (Plans, Members, Staff)...');
  const planRepo = AppDataSource.getRepository(Plan);
  let plan = await planRepo.findOne({ where: {} });
  if (!plan) {
    plan = planRepo.create({ name: 'Pro Plan', tier: PlanTier.GOLD, price1Month: 50, price3Month: 140, price6Month: 250, price12Month: 450, priceCustom: 0, features: ['All Gym Access'], isActive: true });
    await planRepo.save(plan);
  }

  const memberRepo = AppDataSource.getRepository(Member);
  let member = await memberRepo.findOne({ where: {} });
  if (!member) {
    member = memberRepo.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      gender: Gender.MALE,
      planId: plan.id,
      billingCycle: BillingCycle.ONE_MONTH,
      status: MemberStatus.ACTIVE,
      joinDate: new Date(),
      expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    });
    await memberRepo.save(member);
  }

  const staffRepo = AppDataSource.getRepository(Staff);
  let staff = await staffRepo.findOne({ where: { role: 'Trainer' } });
  if (!staff) {
    staff = staffRepo.create({
      name: 'Alice Trainer',
      email: 'alice@gymsmart.com',
      phone: '0987654321',
      role: 'Trainer',
      salary: 50000,
      branch: 'Main',
      gender: Gender.FEMALE,
      joinDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      isActive: true,
    });
    await staffRepo.save(staff);
  }

  // 2. HR (Payroll)
  console.log('Seeding Payroll...');
  const payrollRepo = AppDataSource.getRepository(Payroll);
  const payrolls = await payrollRepo.find();
  if (payrolls.length === 0) {
    await payrollRepo.save([
      { staffId: staff.id, month: '2026-06', amount: 50000, status: 'PAID', paidAt: new Date() },
      { staffId: staff.id, month: '2026-07', amount: 50000, status: 'PENDING' }
    ]);
  }

  // 3. Attendance
  console.log('Seeding Attendance...');
  const attendanceRepo = AppDataSource.getRepository(Attendance);
  const attendances = await attendanceRepo.find({ take: 1 });
  if (attendances.length === 0) {
    const today = new Date();
    await attendanceRepo.save([
      { memberId: member.id, date: today, checkIn: new Date(), type: AttendanceType.MEMBER },
      { staffId: staff.id, date: today, checkIn: new Date(new Date().setHours(9, 0, 0)), type: AttendanceType.STAFF },
      { memberId: member.id, date: new Date(today.setDate(today.getDate() - 1)), checkIn: new Date(), type: AttendanceType.MEMBER }
    ]);
  }

  // 4. Store
  console.log('Seeding Store Products & Orders...');
  const productRepo = AppDataSource.getRepository(Product);
  let products = await productRepo.find();
  if (products.length === 0) {
    products = await productRepo.save([
      { name: 'Whey Protein 1kg', category: 'Supplements', price: 60, stock: 20, isActive: true },
      { name: 'Gym T-Shirt', category: 'Apparel', price: 25, stock: 50, isActive: true },
      { name: 'Creatine 500g', category: 'Supplements', price: 35, stock: 30, isActive: true },
    ]);
  }

  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  const orders = await orderRepo.find();
  if (orders.length === 0 && products.length > 0) {
    const order1 = await orderRepo.save({ total: products[0].price, method: 'Card', status: 'COMPLETED' });
    await orderItemRepo.save([
      { orderId: order1.id, productId: products[0].id, quantity: 1, unitPrice: products[0].price, subtotal: products[0].price },
    ]);
    if (products.length > 1) {
      const order2 = await orderRepo.save({ total: products[1].price, method: 'Cash', status: 'COMPLETED' });
      await orderItemRepo.save([
        { orderId: order2.id, productId: products[1].id, quantity: 1, unitPrice: products[1].price, subtotal: products[1].price }
      ]);
    }
  }

  // 5. Diet Library
  console.log('Seeding Diet Plans...');
  const dietRepo = AppDataSource.getRepository(DietPlan);
  const diets = await dietRepo.find();
  if (diets.length === 0) {
    await dietRepo.save([
      { name: 'Muscle Gain Protocol', goal: 'Muscle Gain', calories: 3000, protein: 180, carbs: 350, fats: 80, meals: ['Oats & Whey', 'Chicken & Rice', 'Beef & Potatoes', 'Cottage Cheese'], isActive: true },
      { name: 'Keto Shred', goal: 'Weight Loss', calories: 1800, protein: 140, carbs: 20, fats: 130, meals: ['Eggs & Bacon', 'Avocado Chicken Salad', 'Salmon & Asparagus'], isActive: true },
    ]);
  }

  // 6. Workout Library (Exercises & Plans)
  console.log('Seeding Exercises...');
  const exerciseRepo = AppDataSource.getRepository(Exercise);
  const exercises = await exerciseRepo.find();
  if (exercises.length === 0) {
    await exerciseRepo.save([
      { name: 'Barbell Bench Press', category: 'Strength', muscleGroup: ['Chest', 'Triceps'], sets: 4, reps: '8-10', difficulty: 'Intermediate', isActive: true },
      { name: 'Squats', category: 'Strength', muscleGroup: ['Legs', 'Glutes'], sets: 4, reps: '8-10', difficulty: 'Intermediate', isActive: true },
      { name: 'Treadmill Sprints', category: 'Cardio', muscleGroup: ['Legs', 'Cardio'], duration: '15 mins', difficulty: 'Advanced', isActive: true },
    ]);
  }

  console.log('Seeding Workout Plans...');
  const workoutRepo = AppDataSource.getRepository(Workout);
  const workouts = await workoutRepo.find();
  if (workouts.length === 0) {
    await workoutRepo.save([
      { name: 'Push Pull Legs - Beginner', level: 'Beginner', days: 3, exercises: 15, focus: 'Hypertrophy', duration: '60 mins', tags: ['PPL', 'Beginner'], isActive: true },
      { name: 'Full Body Power', level: 'Advanced', days: 4, exercises: 20, focus: 'Strength', duration: '90 mins', tags: ['Strength', 'Powerlifting'], isActive: true },
    ]);
  }

  console.log('Seed completed successfully!');
  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error('Error seeding data:', err);
  process.exit(1);
});

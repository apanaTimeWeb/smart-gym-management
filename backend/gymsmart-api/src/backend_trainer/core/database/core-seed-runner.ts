// RESPONSIBILITY: Creates deterministic Trainer demo data in the master tenant and its isolated PostgreSQL database.
// FLOW: Seed command → master schema → tenant provisioning → tenant schema → deterministic feature rows.

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { AppModule } from '@/app.module';
import { CoreConfigService } from '@/backend_trainer/core/config/core-config.service';
import { CoreTenantProvisioningService } from '@/backend_trainer/core/database/core-tenant-provisioning.service';

const TENANT_ID = '00000000-0000-0000-0000-000000000001';
const TRAINER_ID = '00000000-0000-0000-0000-000000000010';
const DIET1 = '00000000-0000-0000-0000-000000000101';
const DIET2 = '00000000-0000-0000-0000-000000000102';
const WORKOUT1 = '00000000-0000-0000-0000-000000000201';
const WORKOUT2 = '00000000-0000-0000-0000-000000000202';
const MEMBER1 = '00000000-0000-0000-0000-000000001001';
const MEMBER2 = '00000000-0000-0000-0000-000000001002';

async function runSeed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const master = app.get<DataSource>(getDataSourceToken('master'));
    const provisioner = app.get(CoreTenantProvisioningService);
    const config = app.get(CoreConfigService);
    const passwordHash = await bcrypt.hash('Trainer@123', 12);

    await master.query(
      `INSERT INTO core_users(id,email,password_hash,name,role,is_active)
       VALUES($1,$2,$3,$4,$5,true)
       ON CONFLICT(email) DO UPDATE SET name=EXCLUDED.name,password_hash=EXCLUDED.password_hash,role=EXCLUDED.role,is_active=true,deleted_at=NULL`,
      [TRAINER_ID, 'trainer@smartgym.test', passwordHash, 'Demo Trainer', 'TRAINER'],
    );
    await master.query(
      `INSERT INTO core_tenants(id,name,database_name,is_active)
       VALUES($1,$2,$3,true)
       ON CONFLICT(id) DO UPDATE SET name=EXCLUDED.name,database_name=EXCLUDED.database_name,is_active=true,deleted_at=NULL`,
      [TENANT_ID, 'Demo Trainer Gym', 'tenant_db_trainer_demo'],
    );
    await master.query(
      `INSERT INTO core_tenant_memberships(id,user_id,tenant_id,role)
       VALUES(gen_random_uuid(),$1,$2,$3)
       ON CONFLICT(user_id,tenant_id) DO UPDATE SET role=EXCLUDED.role,deleted_at=NULL`,
      [TRAINER_ID, TENANT_ID, 'TRAINER'],
    );

    await provisioner.provisionTenant('tenant_db_trainer_demo');
    const tenant = new DataSource({ type: 'postgres', ...config.getTenantDatabase(), database: 'tenant_db_trainer_demo' });
    await tenant.initialize();
    const queryRunner = tenant.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.query(
      `INSERT INTO trainer_profiles(id,user_id,name,email,phone,role,specialization,joined_at,avatar_initial,created_at,updated_at)
       VALUES($1,$2,'Demo Trainer','trainer@smartgym.test','9999999999','TRAINER',$3,'2024-01-01','DT',now(),now())
       ON CONFLICT(id) DO UPDATE SET name=EXCLUDED.name,email=EXCLUDED.email,specialization=EXCLUDED.specialization,deleted_at=NULL`,
      [TRAINER_ID, TRAINER_ID, JSON.stringify(['Strength Training', 'Weight Loss'])],
    );
    await queryRunner.query(
      `INSERT INTO trainer_diet_plans(id,name,goal,calories,protein,carbs,fats,description,meals,is_active)
       VALUES($1,'Weight Loss Pro','Weight Loss',1800,140,160,55,'High protein calorie-controlled plan',$2,true),
             ($3,'Muscle Gain Plus','Muscle Gain',2600,190,290,75,'High protein lean bulk plan',$4,true)
       ON CONFLICT(id) DO NOTHING`,
      [DIET1, JSON.stringify([{ meal: 'Breakfast', items: ['Oats', 'Eggs'] }]), DIET2, JSON.stringify([{ meal: 'Breakfast', items: ['Eggs', 'Banana', 'Toast'] }])],
    );
    await queryRunner.query(
      `INSERT INTO trainer_exercises(id,trainer_id,name,category,muscle_group,equipment,difficulty,sets,reps,duration,description,is_active)
       VALUES($1,$2,'Barbell Squat','Strength',$3,'Barbell','Intermediate',4,'8','10 min','Compound lower-body movement',true),
             ($4,$2,'Push Up','Strength',$5,'Bodyweight','Beginner',3,'12','5 min','Upper-body bodyweight movement',true)
       ON CONFLICT(id) DO NOTHING`,
      [
        '00000000-0000-0000-0000-000000002101', TRAINER_ID, JSON.stringify(['Legs']),
        '00000000-0000-0000-0000-000000002102', JSON.stringify(['Chest', 'Arms']),
      ],
    );
    await queryRunner.query(
      `INSERT INTO trainer_workouts(id,trainer_id,name,level,days,exercises_count,focus,duration,tags,goal,instructions,assigned_member_id,is_active,workout_exercises)
       VALUES($1,$2,'Strength Builder','Intermediate',5,8,'Full Body','60 min',$3,'Muscle Gain','Progressive overload plan',$4,true,'[]'),
             ($5,$2,'Fat Loss Circuit','Beginner',4,6,'Cardio + Core','45 min',$6,'Weight Loss','Zone 2 plus core',$7,true,'[]')
       ON CONFLICT(id) DO NOTHING`,
      [WORKOUT1, TRAINER_ID, JSON.stringify(['strength', 'full-body']), MEMBER2, WORKOUT2, JSON.stringify(['cardio', 'fat-loss']), MEMBER1],
    );
    await queryRunner.query(
      `INSERT INTO trainer_members(id,name,email,phone,gender,address,branch,plan_id,plan_name,plan_tier,billing_cycle,status,join_date,expiry_date,age,height_cm,weight_kg,progress_status,assigned_trainer_id,assigned_trainer_name,is_pt,assigned_diet_id,assigned_workout_id,fitness_level,target_weight_kg,bmi,medical_restrictions,fitness_goal,days_since_last_check_in,membership_number,created_at,updated_at)
       VALUES($1,'Aman Kumar','aman@example.com','9000000001','Male','Patna','Main','00000000-0000-0000-0000-000000009001','Premium','Gold','Monthly','Active',now()-interval '120 days',now()+interval '245 days',28,175,78,'Good',$2,'Demo Trainer',true,$3,$4,'Intermediate',72,25.47,null,'Muscle Gain',2,'MEM-001',now(),now()),
             ($5,'Riya Sharma','riya@example.com','9000000002','Female','Patna','Main','00000000-0000-0000-0000-000000009002','Standard','Silver','Monthly','Active',now()-interval '90 days',now()+interval '180 days',26,163,68,'Average',$2,'Demo Trainer',false,$3,$7,'Beginner',60,25.59,null,'Weight Loss',5,'MEM-002',now(),now())
       ON CONFLICT(id) DO UPDATE SET assigned_trainer_id=EXCLUDED.assigned_trainer_id,assigned_diet_id=EXCLUDED.assigned_diet_id,assigned_workout_id=EXCLUDED.assigned_workout_id,deleted_at=NULL`,
      [MEMBER1, TRAINER_ID, DIET2, WORKOUT1, MEMBER2, WORKOUT2],
    );
    await queryRunner.query(
      `INSERT INTO trainer_sessions(id,trainer_id,title,type,time,session_date,duration,status,attendees,max_attendees,member_id,is_online,enrolled_members)
       VALUES('00000000-0000-0000-0000-000000002001',$1,'Aman PT','PT','09:00',CURRENT_DATE,'60 min','Upcoming',1,1,$2,false,'[]'),
             ('00000000-0000-0000-0000-000000002002',$1,'Group Strength','Group','11:00',CURRENT_DATE + 1,'45 min','Upcoming',4,8,null,false,'[]'),
             ('00000000-0000-0000-0000-000000002003',$1,'Riya Check-in','PT','17:00',CURRENT_DATE - 1,'45 min','Completed',1,1,$3,false,'[]')
       ON CONFLICT(id) DO NOTHING`,
      [TRAINER_ID, MEMBER1, MEMBER2],
    );
    await queryRunner.query(
      `INSERT INTO trainer_attendance_records(id,type,date,check_in,check_out,duration_minutes,check_in_method,member_id,created_by,staff_id)
       VALUES('00000000-0000-0000-0000-000000003001','MEMBER',CURRENT_DATE,now()-interval '60 min',now()-interval '10 min',50,'MANUAL',$1,$2,null),
             ('00000000-0000-0000-0000-000000003002','STAFF',CURRENT_DATE,now()-interval '90 min',null,null,'SELF',null,$2,$2)
       ON CONFLICT(id) DO NOTHING`,
      [MEMBER1, TRAINER_ID],
    );
    await queryRunner.query(
      `INSERT INTO trainer_progress_entries(id,member_id,date,weight_kg,height_cm,bmi,body_fat_percent,muscle_mass_kg,chest_cm,waist_cm,recorded_by,progress_photos)
       VALUES('00000000-0000-0000-0000-000000004001',$1,CURRENT_DATE - 30,80,175,26.12,22,33,102,88,$2,'[]'),
             ('00000000-0000-0000-0000-000000004002',$1,CURRENT_DATE,78,175,25.47,21,34,103,86,$2,'[]'),
             ('00000000-0000-0000-0000-000000004003',$3,CURRENT_DATE - 14,70,163,26.35,30,24,94,80,$2,'[]')
       ON CONFLICT(id) DO NOTHING`,
      [MEMBER1, TRAINER_ID, MEMBER2],
    );
    await queryRunner.query(
      `INSERT INTO trainer_weekly_availability(id,trainer_id,day,is_available,start_time,end_time)
       VALUES('00000000-0000-0000-0000-000000005001',$1,'Monday',true,'08:00','18:00'),
             ('00000000-0000-0000-0000-000000005002',$1,'Tuesday',true,'08:00','18:00'),
             ('00000000-0000-0000-0000-000000005003',$1,'Wednesday',true,'08:00','18:00'),
             ('00000000-0000-0000-0000-000000005004',$1,'Thursday',true,'08:00','18:00'),
             ('00000000-0000-0000-0000-000000005005',$1,'Friday',true,'08:00','18:00'),
             ('00000000-0000-0000-0000-000000005006',$1,'Saturday',true,'09:00','14:00'),
             ('00000000-0000-0000-0000-000000005007',$1,'Sunday',false,'09:00','13:00')
       ON CONFLICT(trainer_id,day) DO NOTHING`,
      [TRAINER_ID],
    );
    await queryRunner.query(
      `INSERT INTO trainer_notifications(id,trainer_id,title,message,is_read,type,created_at)
       VALUES('00000000-0000-0000-0000-000000006001',$1,'New Member','A new member was assigned to you',false,'MEMBER',now()),
             ('00000000-0000-0000-0000-000000006002',$1,'Session Reminder','You have a session at 11:00',false,'SYSTEM',now()-interval '1 day'),
             ('00000000-0000-0000-0000-000000006003',$1,'Profile Updated','Your profile was updated',true,'SYSTEM',now()-interval '2 days')
       ON CONFLICT(id) DO NOTHING`,
      [TRAINER_ID],
    );
    await queryRunner.query(
      `INSERT INTO trainer_earnings_history(id,trainer_id,external_reference,event_date,type,description,amount_minor,status,session_id,tds_deducted_minor,net_payout_minor,invoice_number)
       VALUES('00000000-0000-0000-0000-000000007001',$1,'EARN-001',CURRENT_DATE,'Session','PT session commission',250000,'settled',null,25000,225000,'INV-1001'),
             ('00000000-0000-0000-0000-000000007002',$1,'EARN-002',CURRENT_DATE - 3,'Bonus','Performance bonus',50000,'settled',null,5000,45000,'INV-1002')
       ON CONFLICT(id) DO NOTHING`,
      [TRAINER_ID],
    );
    await queryRunner.query(
      `INSERT INTO trainer_earnings_payouts(id,trainer_id,period,amount_minor,status,due_date)
       VALUES('00000000-0000-0000-0000-000000008001',$1,'September 2026',225000,'pending',CURRENT_DATE + 7)
       ON CONFLICT(id) DO NOTHING`,
      [TRAINER_ID],
    );
    await queryRunner.query(
      `INSERT INTO trainer_notification_preferences(id,trainer_id,email,push,sms,session_reminders,member_updates)
       VALUES('00000000-0000-0000-0000-000000006101',$1,true,true,false,true,true)
       ON CONFLICT(trainer_id) DO UPDATE SET email=EXCLUDED.email,push=EXCLUDED.push,sms=EXCLUDED.sms,session_reminders=EXCLUDED.session_reminders,member_updates=EXCLUDED.member_updates,deleted_at=NULL`,
      [TRAINER_ID],
    );
    await queryRunner.release();
    await tenant.destroy();
  } finally {
    await app.close();
  }
}

void runSeed();

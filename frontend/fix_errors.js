const fs = require('fs');

function replaceInFile(filePath, regex, replacement) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found: " + filePath);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Fixed: " + filePath);
}

// 1 & 2. Fix AdminSchemas
replaceInFile('src/app/admin/plans/plans_types/AdminPlansSchemas.ts', /z\.function\(\{ input: \[([^\]]*)\], output: ([^\}]+) \}\)/g, 'z.function(z.tuple([$1]), $2)');
replaceInFile('src/app/admin/reports/reports_types/AdminReportsSchemas.ts', /z\.function\(\{ input: \[([^\]]*)\], output: ([^\}]+) \}\)/g, 'z.function(z.tuple([$1]), $2)');

// 3. Fix PublicLandingApi.ts
replaceInFile('src/app/frontend_public/landing/landing_api/PublicLandingApi.ts', /data\?: any;/g, 'data: any;');

// 4. Fix SuperadminCouponsMockHandlers.ts
replaceInFile('src/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_handlers/SuperadminCouponsMockHandlers.ts', /\.partial\(\)/g, '');
replaceInFile('src/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_handlers/SuperadminCouponsMockHandlers.ts', /status: "ACTIVE" \| "INACTIVE" \| "EXPIRED" \| "DEPLETED"/g, 'status: any'); 

// 5. Fix SuperadminCouponsContractSchemas.ts
replaceInFile('src/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_schemas/SuperadminCouponsContractSchemas.ts', /error:/g, 'required_error:');

// 6. Fix handlers.ts
if (fs.existsSync('src/mocks/handlers.ts')) {
    let handlers = fs.readFileSync('src/mocks/handlers.ts', 'utf8');
    handlers = handlers.split('\n').filter(line => !line.includes('V1')).join('\n');
    fs.writeFileSync('src/mocks/handlers.ts', handlers);
    console.log("Fixed handlers.ts");
}

// 7. Fix Dashboard KPI Grid
replaceInFile('src/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardKpiGrid.tsx', /iconBgClass: string;/g, 'iconBgClass: string;\n  onClick?: () => void;');

// 8. Fix Gyms
replaceInFile('src/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_toolbar/SuperadminGymsToolbar.tsx', /\.label/g, '.labelKey');
replaceInFile('src/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/SuperadminGymsMain.tsx', /\.label/g, '.labelKey');
replaceInFile('src/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers.ts', /"EXPIRED"/g, '"CANCELLED"');
replaceInFile('src/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailView.tsx', /"EXPIRED"/g, '"CANCELLED"');

// 9. Fix Messaging API
replaceInFile('src/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi.ts', /SUPERADMIN_MESSAGING_API/g, 'SUPERADMIN_MESSAGING_URLS');
replaceInFile('src/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers.ts', /SUPERADMIN_MESSAGING_API/g, 'SUPERADMIN_MESSAGING_URLS');

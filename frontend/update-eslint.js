const fs = require('fs');
const content = fs.readFileSync('eslint.config.mjs', 'utf8');

const managerFeatures = [
  'attendance', 'communications', 'dashboard', 'expenses', 'finance', 'hr', 'inquiries',
  'library', 'members', 'notifications', 'plans', 'profile', 'pt', 'referrals', 'reports',
  'sales', 'schedule', 'settings', 'store', 'workout'
];

let newElements = managerFeatures.map(f => `        { type: "manager_${f}", pattern: "src/app/manager/${f}/*" }`).join(',\n');
newElements += ',\n        { type: "manager_shared", pattern: "src/app/manager/manager_*/*" }';

let newPolicies = managerFeatures.map(f => `            { from: { element: { type: "manager_${f}" } }, allow: [{ to: { element: { type: "manager_${f}" } } }, { to: { element: { type: "manager_shared" } } }] }`).join(',\n');
newPolicies += ',\n            { from: { element: { type: "manager_shared" } }, allow: [{ to: { element: { type: "manager_shared" } } }] }';

let newContent = content.replace(
  /"boundaries\/elements": \[[\s\S]*?\]/,
  `"boundaries/elements": [\n        { type: "admin", pattern: "src/app/admin/*" },\n        { type: "trainer", pattern: "src/app/trainer/*" },\n        { type: "member", pattern: "src/app/member/*" },\n        { type: "superadmin", pattern: "src/app/superadmin/*" },\n${newElements}\n      ]`
);

newContent = newContent.replace(
  /policies: \[[\s\S]*?\]/,
  `policies: [\n            { from: { element: { type: "admin" } }, allow: [{ to: { element: { type: "admin" } } }] },\n            { from: { element: { type: "trainer" } }, allow: [{ to: { element: { type: "trainer" } } }] },\n            { from: { element: { type: "member" } }, allow: [{ to: { element: { type: "member" } } }] },\n            { from: { element: { type: "superadmin" } }, allow: [{ to: { element: { type: "superadmin" } } }] },\n${newPolicies}\n          ]`
);

fs.writeFileSync('eslint.config.mjs', newContent);
console.log('Successfully updated eslint config');

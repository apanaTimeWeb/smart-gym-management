const fs = require('fs');
const path = require('path');

const replacements = [
  // Imports
  { from: /import Header from ['"]@?\/?[^'"]*components\/Header['"];?/g, to: "import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';" },
  { from: /import Sidebar from ['"]@?\/?[^'"]*components\/Sidebar['"];?/g, to: "import ErpSidebar from '@/app/(erp)/erp_components/ErpSidebar';" },
  { from: /import Layout from ['"]@?\/?[^'"]*components\/Layout['"];?/g, to: "import ErpLayout from '@/app/(erp)/erp_components/ErpLayout';" },
  { from: /import Toast[^'"]*from ['"]@?\/?[^'"]*components\/Toast['"];?/g, to: "import ErpToast, { ToastType } from '@/app/(erp)/erp_components/ErpToast';" },
  { from: /import MessageModal[^'"]*from ['"]@?\/?[^'"]*components\/MessageModal['"];?/g, to: "import ErpMessageModal, { ErpMessageRecipient, MessageType } from '@/app/(erp)/erp_components/ErpMessageModal';" },
  { from: /import StatCard from ['"]@?\/?[^'"]*components\/StatCard['"];?/g, to: "import ErpStatCard from '@/app/(erp)/erp_components/ErpStatCard';" },
  { from: /import ThermalReceipt[^'"]*from ['"]@?\/?[^'"]*components\/ThermalReceipt['"];?/g, to: "import ErpThermalReceipt, { ErpReceiptData } from '@/app/(erp)/erp_components/ErpThermalReceipt';" },

  // JSX
  { from: /<Header /g, to: "<ErpHeader " },
  { from: /<Sidebar /g, to: "<ErpSidebar " },
  { from: /<Layout /g, to: "<ErpLayout " },
  { from: /<Layout>/g, to: "<ErpLayout>" },
  { from: /<\/Layout>/g, to: "</ErpLayout>" },
  { from: /<Toast /g, to: "<ErpToast " },
  { from: /<MessageModal /g, to: "<ErpMessageModal " },
  { from: /<StatCard /g, to: "<ErpStatCard " },
  { from: /<ThermalReceipt /g, to: "<ErpThermalReceipt " },

  // Type imports that were missed
  { from: /import \{ ToastType \} from ['"]@?\/?[^'"]*components\/Toast['"];?/g, to: "import { ToastType } from '@/app/(erp)/erp_components/ErpToast';" },
  { from: /import type \{ ToastType \} from ['"]@?\/?[^'"]*components\/Toast['"];?/g, to: "import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';" },
  
  { from: /import \{ MessageType \} from ['"]@?\/?[^'"]*components\/MessageModal['"];?/g, to: "import { MessageType } from '@/app/(erp)/erp_components/ErpMessageModal';" },
  { from: /import type \{ MessageType \} from ['"]@?\/?[^'"]*components\/MessageModal['"];?/g, to: "import type { MessageType } from '@/app/(erp)/erp_components/ErpMessageModal';" },
  
  // Types
  { from: /MessageRecipient/g, to: "ErpMessageRecipient" },
  { from: /ReceiptData/g, to: "ErpReceiptData" },
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const targetDir = path.join(__dirname, 'src', 'app', '(erp)');
const files = walkDir(targetDir);

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  replacements.forEach(r => {
    newContent = newContent.replace(r.from, r.to);
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedFiles++;
    console.log('Updated:', file);
  }
});

console.log(`Refactor complete. Updated ${changedFiles} files.`);

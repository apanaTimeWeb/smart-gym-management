import { getRequestConfig } from 'next-intl/server';
import fs from 'fs';
import path from 'path';

function getAllLocales(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getAllLocales(path.join(dir, file), fileList);
    } else if (file.endsWith('en.json') || file === 'en.json') {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

export default getRequestConfig(async () => {
  const locale = 'en-IN';
  
  let messages = {};
  try {
    const srcDir = path.join(process.cwd(), 'src', 'app');
    const localeFiles = getAllLocales(srcDir);
    
    for (const file of localeFiles) {
      try {
        const fileContent = fs.readFileSync(file, 'utf-8');
        const parsed = JSON.parse(fileContent);
        messages = { ...messages, ...parsed };
      } catch (e) {
        console.error('Failed to parse locale file:', file);
      }
    }
  } catch (error) {
    console.error('Failed to load messages from src/app:', error);
  }

  return {
    locale,
    messages
  };
});

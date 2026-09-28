const fs = require('fs');
const path = require('path');

const backendDir = 'c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api';
const managerModulesDir = path.join(backendDir, 'src/backend_manager/manager_modules');

const modules = fs.readdirSync(managerModulesDir).filter(f => fs.statSync(path.join(managerModulesDir, f)).isDirectory());

// 1. Fix module files (TypeOrm + JSDoc)
for (const mod of modules) {
    const modFile = path.join(managerModulesDir, mod, manager- + mod + .module.ts);
    if (fs.existsSync(modFile)) {
        let content = fs.readFileSync(modFile, 'utf8');
        
        // Ensure TypeOrmModule import
        if (!content.includes('TypeOrmModule')) {
            content = "import { TypeOrmModule } from '@nestjs/typeorm';\n" + content;
        }
        
        // Entity Import
        const entityName = Manager + mod.charAt(0).toUpperCase() + mod.slice(1) + Entity;
        const entityImport = import { \ } from '@/backend_manager/manager_modules/\/manager-\.entity';;
        if (!content.includes(entityName)) {
            content = content.replace(/import { Module } from '@nestjs\/common';/, import { Module } from '@nestjs/common';\n\);
        }

        // Add to imports array
        if (!content.includes('TypeOrmModule.forFeature')) {
            content = content.replace(/imports: \[([^\]]*)\],/g, (match, p1) => {
                if (p1.trim() === '') return imports: [TypeOrmModule.forFeature([\])],;
                return imports: [TypeOrmModule.forFeature([\]), \],;
            });
            // If it doesn't have imports: [], add it
            if (!content.includes('imports: [')) {
                content = content.replace(/(@Module\({)/, $1\n  imports: [TypeOrmModule.forFeature([\])],);
            }
        }
        
        // Add JSDoc
        if (!content.includes('/**') && !content.includes('Primary Intent:')) {
            const jsdoc = /**\n * Primary Intent: Defines Manager\Module as an explicit backend construct in its owning role/module boundary.\n * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.\n * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.\n * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.\n */\n;
            content = content.replace(/@Module\({/, jsdoc + '@Module({');
        }

        fs.writeFileSync(modFile, content);
    }
}
console.log('Fixed TypeOrmModule and JSDoc in all modules.');

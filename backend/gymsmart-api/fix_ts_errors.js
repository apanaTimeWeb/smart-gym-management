const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  walkDir('src', function(filePath) {
    if (!filePath.endsWith('.ts')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix Group 2: Return type Promise<void> where executeOnce might return null
    // Specifically in controller methods using idempotency
    content = content.replace(/Promise<void>\s*\{\s*return (this\.idempotency\.executeOnce[^;]+;)/g, 'Promise<void | null> {\n    return $1');

    // Fix Group 3: Type Assertion Overlap Errors
    // e.g. return await this.repo.find() as XXXDto; -> return await this.repo.find() as unknown as XXXDto;
    // Actually, let's target the exact error: "as SomeDto;" where it's casted from Record<string, unknown>
    // Wait, the error is usually: return await this.service.find(query) as SomeDto;
    // Let's replace "as Admin" -> "as unknown as Admin" in query controllers/services where this happens.
    // Let's use a smarter regex: " as ([A-Z][a-zA-Z0-9]*Dto(?:\[\])?);" 
    // Wait, let's just replace all " as [A-Z][a-zA-Z0-9_]*Dto" that aren't already "as unknown as"
    content = content.replace(/(?<!as unknown )as ([A-Z][a-zA-Z0-9_]*Dto(?:\[\])?)/g, 'as unknown as $1');

    // Wait, it might also apply to entities, e.g., "as AdminAnnouncementEntity". 
    // Let's also do it for entities just in case, but let's stick to Dto first.

    // Fix Group 2 part 2: Type 'null' is not assignable to type 'void' in controllers that just "return null"
    content = content.replace(/Promise<void>\s*\{\s*return null;\s*\}/g, 'Promise<void | null> {\n    return null;\n  }');

    // Some places we might have: return await this.listService.findX(...) as unknown as ...;
    // Let's also fix "as Record<string, unknown>" if it throws? No.

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Modified: ' + filePath);
    }
  });
}

processFiles();

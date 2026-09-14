const fs = require('fs');
const file = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin\\jobs\\jobs_utils\\useJobsPage.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove FALLBACK_JOBS
content = content.replace(/\/\*\* Mock fallback jobs.*?\];/s, '');

// 2. Fix allJobs initialization
content = content.replace('const allJobs: BackgroundJob[] = rawJobs.length > 0 ? rawJobs : FALLBACK_JOBS;', 'const allJobs: BackgroundJob[] = rawJobs;');

// 3. Fix handleRetryJob
content = content.replace(/function handleRetryJob\(id: string\) \{.*?void queryClient.invalidateQueries\(\{ queryKey: \['superadmin', 'jobs'\] \}\);\n  \}/s, `function handleRetryJob(id: string) {
    jobsApi.retryJob(id).then((res) => {
      if (res.success) {
        toast.success(res.message || \`Job \${id} queued for retry.\`);
        void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
      } else {
        toast.error(res.message || \`Failed to retry job \${id}.\`);
      }
    });
  }`);

// 4. Fix handleCancelJob
content = content.replace(/function handleCancelJob\(id: string\) \{.*?void queryClient.invalidateQueries\(\{ queryKey: \['superadmin', 'jobs'\] \}\);\n  \}/s, `function handleCancelJob(id: string) {
    jobsApi.cancelJob(id).then((res) => {
      if (res.success) {
        toast.success(res.message || \`Job \${id} cancelled successfully.\`);
        void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
      } else {
        toast.error(res.message || \`Failed to cancel job \${id}.\`);
      }
    });
  }`);

// 5. Fix handleDeleteJob
content = content.replace(/function handleDeleteJob\(id: string\) \{.*?return next;\n    \}\);\n  \}/s, `function handleDeleteJob(id: string) {
    jobsApi.deleteJob(id).then((res) => {
      if (res.success) {
        toast.success(res.message || \`Job \${id} deleted.\`);
        setSelectedJobIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
      } else {
        toast.error(res.message || \`Failed to delete job \${id}.\`);
      }
    });
  }`);

// 6. Fix handleClearCompleted
content = content.replace(/function handleClearCompleted\(\) \{.*?setSelectedJobIds\(new Set\(\)\);\n  \}/s, `function handleClearCompleted() {
    jobsApi.clearCompleted().then((res) => {
      if (res.success) {
        toast.success(res.message || 'Cleared all completed jobs.');
        setSelectedJobIds(new Set());
        void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
      } else {
        toast.error(res.message || 'Failed to clear completed jobs.');
      }
    });
  }`);

// 7. Fix handleBulkRetry
content = content.replace(/function handleBulkRetry\(\) \{.*?setSelectedJobIds\(new Set\(\)\);\n  \}/s, `function handleBulkRetry() {
    const ids = Array.from(selectedJobIds);
    if (ids.length === 0) return;
    jobsApi.bulkRetry(ids).then((res) => {
      if (res.success) {
        toast.success(res.message || \`Queued \${ids.length} jobs for retry.\`);
        setSelectedJobIds(new Set());
        void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
      } else {
        toast.error(res.message || 'Failed to retry jobs.');
      }
    });
  }`);

// 8. Fix handleBulkDelete
content = content.replace(/function handleBulkDelete\(\) \{.*?setSelectedJobIds\(new Set\(\)\);\n  \}/s, `function handleBulkDelete() {
    const ids = Array.from(selectedJobIds);
    if (ids.length === 0) return;
    jobsApi.bulkDelete(ids).then((res) => {
      if (res.success) {
        toast.success(res.message || \`Deleted \${ids.length} jobs.\`);
        setSelectedJobIds(new Set());
        void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
      } else {
        toast.error(res.message || 'Failed to delete jobs.');
      }
    });
  }`);

fs.writeFileSync(file, content);
console.log('Fixed useJobsPage.ts');

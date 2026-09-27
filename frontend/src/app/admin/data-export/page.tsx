import React from 'react';

export default function AdminDataExportPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Export</h1>
      <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
        <p className="text-gray-600 mb-4">
          The Data Export feature is currently under construction.
          Once completed, you will be able to export gym analytics and reporting data directly from this dashboard.
        </p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50" disabled>
          Export Data (Coming Soon)
        </button>
      </div>
    </div>
  );
}

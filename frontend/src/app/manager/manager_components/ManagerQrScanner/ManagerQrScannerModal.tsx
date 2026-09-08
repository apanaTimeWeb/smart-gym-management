// RESPONSIBILITY: Renders the Kiosk-mode QR Scanner for the front desk. Handles face verification and check-in.
'use client';

import { X, ScanLine, UserCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useManagerQrScannerLogic } from './useManagerQrScannerLogic';
import { MANAGER_QR_MOCK_ACTIVE_NAME, MANAGER_QR_MOCK_ACTIVE_ID, MANAGER_QR_MOCK_PT_INFO } from './ManagerQrScannerConstants';

interface ManagerQrScannerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ManagerQrScannerModal({ open, onClose }: ManagerQrScannerModalProps) {
  const { status, history, handleSimulateScan, handleCheckIn, resetStatus } = useManagerQrScannerLogic();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm motion-safe:transition-opacity">
      <div className="w-full max-w-5xl h-[85vh] bg-overlay rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        
        {/* Left Side - The Scanner */}
        <div className="flex-1 bg-black/95 relative flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={24} />
          </button>
          
          <h2 className="absolute top-8 text-xl font-bold text-white tracking-widest uppercase opacity-80">Front Desk Kiosk</h2>

          {/* Scanner Viewport */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
            
            {/* Scanning Line Animation */}
            {(status === 'IDLE' || status === 'SCANNING') && (
              <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(250,204,21,0.8)] motion-safe:animate-qr-scan"></div>
            )}
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <ScanLine size={80} className="text-white" />
            </div>
          </div>

          <p className="text-white/60 mb-6 font-medium text-center max-w-xs">Align the member's QR Code within the frame to scan.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => handleSimulateScan(true)}
              disabled={status === 'SCANNING'}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            >
              Simulate Active
            </button>
            <button 
              onClick={() => handleSimulateScan(false)}
              disabled={status === 'SCANNING'}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            >
              Simulate Expired
            </button>
          </div>
        </div>

        {/* Right Side - Verification & History */}
        <div className="w-full md:w-[450px] flex flex-col overflow-hidden">
          {/* Verification Panel */}
          <div className="p-6 border-b border-border min-h-[350px] flex flex-col justify-center relative">
            {status === 'IDLE' && (
              <div className="flex flex-col items-center justify-center text-center text-secondary h-full">
                <ScanLine size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Waiting for Scan...</p>
              </div>
            )}

            {status === 'SCANNING' && (
              <div className="flex flex-col items-center justify-center text-center text-primary h-full">
                <Loader2 size={48} className="mb-4 motion-safe:animate-spin" />
                <p className="text-lg font-bold">Verifying...</p>
              </div>
            )}

            {(status === 'ACTIVE' || status === 'EXPIRED') && (
              <div className="flex flex-col items-center text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
                <div className={`w-32 h-32 rounded-full mb-4 border-4 overflow-hidden ${status === 'ACTIVE' ? 'border-success shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-danger shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/300?u=a042581f4e29026704d" alt="Member" className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-2xl font-black text-foreground">{MANAGER_QR_MOCK_ACTIVE_NAME}</h3>
                <p className="text-sm font-bold text-secondary mb-1">{MANAGER_QR_MOCK_ACTIVE_ID}</p>
                
                <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${status === 'ACTIVE' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
                  {status === 'ACTIVE' ? <UserCheck size={16} /> : <AlertCircle size={16} />}
                  {status === 'ACTIVE' ? 'MEMBERSHIP ACTIVE' : 'MEMBERSHIP EXPIRED'}
                </div>

                {status === 'ACTIVE' && (
                  <p className="text-xs text-warning font-medium mt-3 bg-warning/10 px-3 py-1 rounded-lg">{MANAGER_QR_MOCK_PT_INFO}</p>
                )}

                <div className="mt-8 w-full">
                  {status === 'ACTIVE' ? (
                    <button 
                      onClick={handleCheckIn}
                      className="w-full py-4 bg-success hover:bg-success/90 text-white text-lg font-black rounded-2xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-success shadow-lg shadow-success/20 flex items-center justify-center gap-2"
                    >
                      <UserCheck size={24} /> Verify Face & Check-in
                    </button>
                  ) : (
                    <button 
                      onClick={resetStatus}
                      className="w-full py-4 bg-danger hover:bg-danger/90 text-white text-lg font-black rounded-2xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-danger shadow-lg shadow-danger/20 flex items-center justify-center gap-2"
                    >
                      <AlertCircle size={24} /> Block & Collect Payment
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* History Panel */}
          <div className="flex-1 bg-input/30 p-6 overflow-y-auto">
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Recent Check-ins</h4>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="bg-card border border-border p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold">
                      {h.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{h.name}</p>
                      <p className="text-xs text-secondary">{h.id}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-secondary bg-input px-2 py-1 rounded-md">{h.time}</span>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-center text-sm text-secondary mt-8">No recent check-ins.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

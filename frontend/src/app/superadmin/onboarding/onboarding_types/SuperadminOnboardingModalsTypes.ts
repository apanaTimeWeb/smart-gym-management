export interface SuperadminOnboardingModalsProps {
  extendModalId: string | null;
  setExtendModalId: (id: string | null) => void;
  extendDays: string;
  setExtendDays: (days: string) => void;
  handleExtendTrial: (id: string) => void;
  convertConfirmId: string | null;
  setConvertConfirmId: (id: string | null) => void;
  handleConvertToPaidConfirmed: (id: string) => void;
}

"use client";
import { useState } from 'react';

/**
 * @description Manages independent visibility toggles for the three password fields in the Admin profile security form.
 * @dependencies React local state only.
 * @edge-case Toggling one field never changes the visibility state of the other fields.
 */
export function useAdminProfilePasswordVisibility() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return {
    showCurrent,
    showNew,
    showConfirm,
    toggleCurrent: () => setShowCurrent((value) => !value),
    toggleNew: () => setShowNew((value) => !value),
    toggleConfirm: () => setShowConfirm((value) => !value),
  };
}

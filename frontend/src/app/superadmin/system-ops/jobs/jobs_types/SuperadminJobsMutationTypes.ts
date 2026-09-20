import type { Dispatch, SetStateAction } from 'react';

export interface SuperadminJobsMutationOptions {
  setSelectedJobIds: Dispatch<SetStateAction<Set<string>>>;
  selectedJobIds: Set<string>;
}

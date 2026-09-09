// RESPONSIBILITY: Defines API endpoints for the Trainer Progress Tracking module.
// ROLE BOUNDARY: Trainers can only fetch progress for members they are assigned to (enforced by backend).

export const TrainerProgressUrlConfig = {
  BACKEND_API: {
    // GET /api/v1/trainer/progress/:memberId
    // Fetches progress history and measurements for a specific member
    GET_PROGRESS: (memberId: string) => `/api/v1/trainer/progress/${memberId}`,
    
    // POST /api/v1/trainer/progress/:memberId
    // Adds a new progress entry for a member
    ADD_ENTRY: (memberId: string) => `/api/v1/trainer/progress/${memberId}`,
    
    // PATCH /api/v1/trainer/progress/entries/:entryId
    // Updates a specific progress entry
    UPDATE_ENTRY: (entryId: string) => `/api/v1/trainer/progress/entries/${entryId}`,
    
    // DELETE /api/v1/trainer/progress/entries/:entryId
    // Deletes a specific progress entry
    DELETE_ENTRY: (entryId: string) => `/api/v1/trainer/progress/entries/${entryId}`,

    // GET /api/v1/trainer/progress/:memberId/export?format=pdf
    // Generates an exportable PDF/CSV report of the member's progress
    EXPORT_PROGRESS: (memberId: string, format: 'pdf' | 'csv' = 'pdf') => 
      `/api/v1/trainer/progress/${memberId}/export?format=${format}`,
  }
};

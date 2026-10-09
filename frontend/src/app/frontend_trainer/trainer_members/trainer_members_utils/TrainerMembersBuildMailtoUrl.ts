/**
 * Builds the external mailto delivery URL for the Members feature.
 * @param email Recipient email address.
 * @param subject User-approved email subject.
 * @param body User-approved message body.
 */
export function TrainerMembersBuildMailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// RESPONSIBILITY: Defines a trainer member note response independently from TypeORM.
// FLOW: TrainerMembersMemberNoteEntity → MembersMemberNoteMapper → Members service/controller.

export interface MembersMemberNoteDomain {
  id: string;
  text: string;
  date: string;
}

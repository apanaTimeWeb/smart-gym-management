// RESPONSIBILITY: Defines a trainer member note response independently from TypeORM.
// FLOW: MembersMemberNoteEntity → MembersMemberNoteMapper → Members service/controller.

export interface MembersMemberNoteDomain {
  id: string;
  text: string;
  date: string;
}

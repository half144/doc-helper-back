export class CreateProjectDto {
  projectName: string;
  projectDescription: string;
  projectOwner: string;
  projectMembers: any[];
  cards: any[];
}

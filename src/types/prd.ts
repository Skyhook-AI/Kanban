export interface UserStory {
  id: string;
  title: string;
  description: string;
  status?: string;
  acceptanceCriteria: string[];
  priority: number;
  passes: boolean;
  dependsOn: string[];
}

export interface Prd {
  name: string;
  branchName: string;
  userStories: UserStory[];
  metadata: {
    updatedAt: string;
  };
}

export type PunchItem = {
  guid: string;
  projectName: string;
  itemNo: string;
  category: string;
  description: string;
  createdBy: User;
  raisedByOrg: Org;
  clearingByOrg: Org;
  rowVersion: string;
  createdAtUtc: string;
  modifiedBy: User;
  modifiedAt: string;
  isReadyToBeCleared: boolean;
  isReadyToBeUncleared: boolean;
  clearedBy: User;
  isReadyToBeRejected: false;
  rejectedBy: User;
  rejectedAtUtc: string;
  isReadyToBeVerified: boolean;
  isReadyToBeUnverified: boolean;
  verifiedBy: User;
  verifiedAtUtc: string;
  clearedAtUtc: string;
};

export type User = {
  guid: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
};

export type Org = {
  guid: string;
  code: string;
  description: string;
};

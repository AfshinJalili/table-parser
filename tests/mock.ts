import { raw } from '../src/raw';

export enum actions {
  something,
  CameraViewInfo,
  CameraViewCriticalTechnicalInfo,
  CameraStreamPtz,
  UsersUpdatePassword
}

export const table: Array<raw> = [
  { action: 'CameraViewInfo', entityId: 'All' },
  { action: 'CameraViewCriticalTechnicalInfo', entityId: 24 },
  { action: 'CameraStreamPtz', entityId: 14000 },
  { action: 'UsersUpdatePassword', entityId: 0 },
  { action: 'something', entityId: 0 },
];

export const invalidBuffer = Buffer.from('notDivisibleByFive');

export const dataWithInvalidEID = [{ action: 'something', entityId: -1 }];

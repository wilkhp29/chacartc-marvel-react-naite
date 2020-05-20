/*
// Type Character
*/
export type character = {
  id: number;
  name: string;
  thumbnail: thumbnail;
  description: string;
};

export type thumbnail = {
  path: String;
  extension: String;
};
export type characterRequest = {
  limit: number | null;
  offset: number | null;
};
type Access = {
  publicKey: String;
  privateKey: String;
};

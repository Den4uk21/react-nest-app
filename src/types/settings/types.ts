export interface IUpdateProfile {
  bio: string,
  motto: string
}

export interface IUpdateUsername {
  userName: string
}

export interface IChangePassword {
  oldPassword: string,
  newPassword: string
}
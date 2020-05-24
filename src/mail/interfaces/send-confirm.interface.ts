import { ITokensData } from '../../auth/interfaces/auth-tokens.interface'

export interface ISendConfirmData {
  email: string,
  userName: string,
  tokenPayload: ITokensData
}
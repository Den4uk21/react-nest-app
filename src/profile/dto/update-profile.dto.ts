import { ApiProperty } from '@nestjs/swagger'

export class UpdateProfileDto {
  @ApiProperty()
  readonly motto: string | null

  @ApiProperty()
  readonly bio: string | null
}
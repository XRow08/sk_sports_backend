import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateTrafficDto {
  @IsOptional()
  @ApiPropertyOptional()
  ipAddress: string;
}

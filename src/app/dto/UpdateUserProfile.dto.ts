import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserProfileDto {
    @IsNotEmpty()
    userId: string;

    @Length(3, 16)
    @IsOptional()
    username: string;

    @Length(3, 16)
    @IsOptional()
    firstName: string;

    @Length(3, 16)
    @IsOptional()
    lastName: string;

    @IsOptional()
    photoUrl: string;
}

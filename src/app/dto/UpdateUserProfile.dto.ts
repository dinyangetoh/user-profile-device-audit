import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserProfileDto {
    @IsNotEmpty()
    userId: string;

    @Length(3, 16)
    username: string;

    @Length(3, 16)
    firstName: string;

    @Length(3, 16)
    lastName: string;
}

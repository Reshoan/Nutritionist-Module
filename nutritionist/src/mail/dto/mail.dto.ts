import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class sendMailDto {

    @IsEmail({}, { each: true })
    recipient: string[];

    @IsString()
    subject: string;

    @IsString()
    html: string;

    @IsOptional()
    @IsString()
    text?: string;
}
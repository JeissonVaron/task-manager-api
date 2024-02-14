import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;

    @IsBoolean()
    @IsOptional()
    favorite?: boolean;
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    description?: string;
}

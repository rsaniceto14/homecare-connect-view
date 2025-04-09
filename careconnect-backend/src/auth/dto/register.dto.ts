import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}

/**
 * class-validator valida os dados automaticamente

@IsEmail() garante que o campo seja um email

@MinLength(6) impõe senha mínima

DTO = Data Transfer Object → estrutura esperada no body da requisição
 */

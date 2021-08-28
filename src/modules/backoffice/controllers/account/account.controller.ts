import { HttpStatus } from "@nestjs/common";
import { Req } from "@nestjs/common";
import { Body, Controller, Get, HttpException, Post } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { Guid } from "guid-typescript";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../../dtos/account/authenticate.dto";
import { ChangePasswordDto } from "../../dtos/account/change-password.dto";
import { ResetPasswordDto } from "../../dtos/account/reset-password.dto";
import { Result } from "../../models/result.models";
import { AccountService } from "../../services/account.service";

@Controller('backoffice/v1/accounts/')
export class AccountController {
    constructor(private authService: AuthService,
        private accountService: AccountService,) { }

    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        // If user not found
        if (!customer)
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        // If user is inactive
        if (!customer.user.active)
            throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        // Generate token
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null);
    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try
        {
            // TODO: send e-mail with password
            
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            return new Result('Uma nova senha foi enviada para seu e-mail.', true, null, null);
        }
        catch (error)
        {
            throw new HttpException(new Result('Não foi possível restaurar sua senha.', false, null, null), HttpStatus.BAD_REQUEST); 
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: Encrypt password
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
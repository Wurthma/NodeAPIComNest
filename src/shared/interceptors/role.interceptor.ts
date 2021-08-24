import { CallHandler } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from 'src/modules/backoffice/models/result.models';
import { JwtPayload } from '../interfaces/jwt-payload';

export interface Response<T> {
    data: T;
}

@Injectable()
export class RoleInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(public roles: string[]) {

    }

    intercept(context: ExecutionContext, call$: CallHandler): Observable<Response<T>> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        console.log(payload);

        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        if (!hasRole) {
            throw new HttpException(
                new Result('Acesso não autorizado', false, null, null),
                HttpStatus.FORBIDDEN);
        }

        return call$.handle().pipe(map(data => ({ data })));
    }
}
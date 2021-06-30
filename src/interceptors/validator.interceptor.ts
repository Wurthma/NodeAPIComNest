import { CallHandler } from "@nestjs/common";
import { ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Contract } from "src/modules/backoffice/contracts/contracts";
import { Result } from "src/modules/backoffice/models/result.models";

export interface Response<T> {
    data: T;
}

// https://docs.nestjs.com/interceptors#response-mapping

@Injectable()
export class ValidatorInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(public contract: Contract) {

    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result(
                    'Ops, algo deu errado.',
                    false,
                    null,
                    this.contract.errors),
                HttpStatus.BAD_REQUEST
            );
        }

        return next.handle().pipe(map(data => ({ data })));
    }
}
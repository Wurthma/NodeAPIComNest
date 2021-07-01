export class CreateCreditCardDto
{
    constructor(
        public holder: string,
        // tslint:disable-next-line:variable-name
        public number: string,
        public expiration: string,
        ) 
    {
        
    }
}
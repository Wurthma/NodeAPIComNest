import { Body, Controller, Post } from "@nestjs/common";
import { RoomBookService } from "../services/room-book.service";

@Controller('agenda/v1/rooms')
export class AgendaController {
    constructor(
        private readonly service: RoomBookService
    ) {}

    @Post()
    async Book(@Body() body: any) {
        console.log('AppController:Book - Starting request');
        await this.service.Book(body.customer, body.room);
    }
}
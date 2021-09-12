import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { request } from "http";
import { Result } from "src/modules/backoffice/models/result.models";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { BookRoomCommand } from "../commands/book-room.command";
import { BookRoomDto } from "../dtos/book-room.dto";
import { RoomBookService } from "../services/room-book.service";

@Controller('agenda/v1/rooms')
export class AgendaController {
    constructor(
        private readonly service: RoomBookService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDto) {
        try{
            var command = new BookRoomCommand(request.user.document, model.roomId, model.date)
            await this.service.Book(command);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possível reservar sua sala', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
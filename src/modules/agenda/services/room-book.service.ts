import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";

@Injectable()
export class RoomBookService {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    async Book (customerId: string, roomId: string) {
        console.log("RoomBookService:Book - Executing service...");

        return await this.commandBus.execute(
            new BookRoomCommand(customerId, roomId)
        );
    }
}
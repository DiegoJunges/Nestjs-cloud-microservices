import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }

  @Patch('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() createPlayerDTO: CreatePlayerDTO,
    @Param('_id', PlayersValidationParametersPipe) _id: string,
  ) {
    await this.playersService.updatePlayer(createPlayerDTO, _id);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }

  @Get('/:_id')
  async getPlayerById(
    @Param('_id', PlayersValidationParametersPipe) _id: string,
  ): Promise<Player[] | Player> {
    return await this.playersService.getPlayerById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayersValidationParametersPipe) _id: string,
  ): Promise<void> {
    await this.playersService.deletePlayer(_id);
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    // const foundPlayer = this.players.find((player) => player.email === email);

    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    if (foundPlayer) {
      await this.update(createPlayerDTO);
    } else {
      await this.create(createPlayerDTO);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();

    // return this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    if (!foundPlayer) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return foundPlayer;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.remove({ email }).exec();

    // const foundPlayer = this.players.find((player) => player.email === email);
    // this.players = this.players.filter(
    //   (player) => player.email !== foundPlayer.email,
    // );
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDTO);

    return await playerCreated.save();

    // const { name, phoneNumber, email } = createPlayerDTO;

    // const player: Player = {
    //   _id: uuidv4(),
    //   name,
    //   phoneNumber,
    //   email,
    //   ranking: 'A',
    //   rankPosition: 1,
    //   urlPlayerAvatar: 'www.google.com/pic.jpg',
    // };
    // this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);

    // this.players.push(player);
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      )
      .exec();

    // const { name } = createPlayerDTO;
    // foundPlayer.name = name;
  }
}

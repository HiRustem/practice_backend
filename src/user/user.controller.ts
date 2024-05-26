import { Body, Controller, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddFeedbackDto, UserDto } from "../dto/user.dto";
import { RepeatDto } from "../dto/repeat.dto";

@Controller('user')
export class UserController {
  constructor( private readonly userService: UserService ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.create(userDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('repeatRegister')
  async repeatRegister(@Body() repeatDto: RepeatDto) {
    return await this.userService.repeatCreate(repeatDto)
  }

  @Put('addFeedback')
  async addFeedback(@Body() addFeedbackDto: AddFeedbackDto) {
    return await this.userService.addFeedback(addFeedbackDto)
  }
}
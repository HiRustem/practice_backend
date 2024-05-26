import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto, UpdateDateDto, UpdateStatusDto } from "../dto/admin.dto";

@Controller('admin')
export class AdminController {
  constructor( private readonly adminService: AdminService ) {}

  @UsePipes(new ValidationPipe)
  @Post('register')
  async createAdmin(@Body() adminDto: AdminDto) {
    return await this.adminService.create(adminDto)
  }

  @Get('getAll')
  async getAllUsers() {
    return await this.adminService.getAll()
  }

  @Get('getCount')
  async getAllUsersCount() {
    return await this.adminService.getAllCount()
  }

  @Get('get/:id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    return await this.adminService.getUserById(userId)
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return await this.adminService.deleteUserById(userId)
  }

  @Get('getUsersByUniversity/:university')
  async getUsersByUniversity(@Param('university') university: string) {
    return await this.adminService.getUsersByUniversity(university)
  }

  @Get('getUsersByDepartment/:department')
  async getUsersByDepartment(@Param('department') department: string) {
    return await this.adminService.getUsersByDepartment(department)
  }

  @Get('getUsersByStatus/:status')
  async getUsersByStatus(@Param('status', ParseBoolPipe) status: boolean) {
    return await this.adminService.getUsersByStatus(status)
  }

  @Put('updateUserStatus')
  async updateUserStatus(@Body() updateStatusDto: UpdateStatusDto) {
    const { id, done } = updateStatusDto

    return await this.adminService.updateUserStatus(id, done)
  }

  @Put('updateUserDate')
  async updateUserDate(@Body() updateDateDto: UpdateDateDto) {
    const { id, date } = updateDateDto

    return await this.adminService.updateUserDate(id, date)
  }
}
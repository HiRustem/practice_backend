import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto, AdminLoginDto, GetUsersByDepartmentDto, GetUsersByUniversityDto, GetUsersListDto, UpdateDateDto, UpdateStatusDto } from "../dto/admin.dto";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('login')
  async login(@Query() adminLoginDto: AdminLoginDto) {
    return await this.adminService.login(adminLoginDto)
  }

  @Get('loginWithKey/:key')
  async loginWithKey(@Param('key', ParseIntPipe) key: number) {
    return await this.adminService.loginWithKey(key)
  }

  @UsePipes(new ValidationPipe)
  @Post('register')
  async createAdmin(@Body() adminDto: AdminDto) {
    return await this.adminService.create(adminDto)
  }

  @UsePipes(new ValidationPipe)
  @Get('getUsersList')
  async getUsersList(@Query() usersListDto: GetUsersListDto) {
    return await this.adminService.getUsersList(usersListDto.skip, usersListDto.take)
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

  @Get('getUsersByUniversity')
  async getUsersByUniversity(@Query() getUsersByUniversityDto: GetUsersByUniversityDto) {
    const { skip, take, university } = getUsersByUniversityDto

    return await this.adminService.getUsersByUniversity(skip, take, university)
  }

  @Get('getUsersByDepartment')
  async getUsersByDepartment(@Query() getUsersByDepartmentDto: GetUsersByDepartmentDto) {
    const { skip, take, department } = getUsersByDepartmentDto

    return await this.adminService.getUsersByDepartment(skip, take, department)
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
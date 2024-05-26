import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AdminDto, AdminLoginDto } from "../dto/admin.dto";

@Injectable()
export class AdminService {
  constructor( private readonly databaseService: DatabaseService ) {}

  async login(adminLoginDto: AdminLoginDto) {
    const { username, password } = adminLoginDto

    const findAdmin = await this.databaseService.admin.findFirst({
      where: {
        username,
        password
      }
    })

    if (!findAdmin) {
      return {
        status: false,
        description: 'Введите корректные данные'
      }
    }

    return {
      status: true,
      description: findAdmin.key
    }
  }

  //Регистрация (потом убрать)
  async create(adminDto: AdminDto) {
    const key = Math.floor(Math.random() * 100000000)

    const admin = {
      ...adminDto,
      key
    }

    return await this.databaseService.admin.create({
      data: admin
    })
  }

  // Найти практиканта по id
  async getUserById(userId: number) {
    return await this.databaseService.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  // Удалить практиканта по id
  async deleteUserById(userId: number) {
    return await this.databaseService.user.delete({
      where: {
        id: userId
      }
    })
  }

  // Получить полный список практикантов
  async getAll() {
    return await this.databaseService.user.findMany()
  }

  // Получить общее количество практикантов
  async getAllCount() {
    return await this.databaseService.user.count()
  }

  
  // Сортировка по учебному заведению
  async getUsersByUniversity(university: string) {
    return await this.databaseService.user.findMany({
      where: {
        university,
      }
    })
  }

  // Сортировка по департаменту
  async getUsersByDepartment(department: string) {
    return await this.databaseService.user.findMany({
      where: {
        department
      }
    })
  }

  // Сортировка по статусу
  async getUsersByStatus(done: boolean) {
    return await this.databaseService.user.findMany({
      where: {
        done
      }
    })
  }

  // Обновить статус прохождения
  async updateUserStatus(userId: number, done: boolean) {
    return await this.databaseService.user.update({
      where: {
        id: userId
      },

      data: {
        done
      }
    })
  }

  // Обновить дату начала практики
  async updateUserDate(userId: number, date: string) {
    return await this.databaseService.user.update({
      where: {
        id: userId
      },

      data: {
        date
      }
    })
  }
}
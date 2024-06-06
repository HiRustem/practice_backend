import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AdminDto, AdminLoginDto } from "../dto/admin.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) { }

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

  async loginWithKey(key: number) {
    return await this.databaseService.admin.findFirst({
      where: {
        key
      }
    })
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

  // Найти практиканта по name
  async getUserByName(name: string) {
    return await this.databaseService.$queryRaw(
      Prisma.sql`SELECT * FROM "User" WHERE name LIKE ${'%' + name + '%'}`
    )
    .then(result => { return result })
    .catch(error => { return error })
  }

  // Удалить практиканта по id
  async deleteUserById(userId: number) {
    return await this.databaseService.user.delete({
      where: {
        id: userId
      }
    })
  }

  // Получить конкретное количество практикантов из любого места списка
  async getUsersList(skip: number, take: number) {
    return await this.databaseService.user.findMany({
      skip,
      take,
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
  async getUsersByUniversity(skip: number, take: number, university: string) {
    return await this.databaseService.user.findMany({
      skip,
      take,
      where: {
        university,
      }
    })
  }

  // Сортировка по департаменту
  async getUsersByDepartment(skip: number, take: number, department: string) {
    return await this.databaseService.user.findMany({
      skip,
      take,
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
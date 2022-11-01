import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default class UsersService {
  constructor (
    private prismaClient: PrismaClient
  ) {}

  async createUser( NUSP: number,  email: string, senha: string) {
    try {
      const { id, senha: psw, role, ...info } = await this.prismaClient.user.create({
        data: { NUSP, email, senha }
      })

      return info
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw ({ name: "ConflictionError", message: "Email já cadastrado" })
        }
      } else {
          throw(error);
      }
    }
  }

  async getStudents() {
    try {

    } catch (error) {

    }
  }
}

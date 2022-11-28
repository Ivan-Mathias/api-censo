import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prismaClient from '../config/prisma'
import NotFoundError from '../types/errors/NotFoundError'

export default class UsersService {
  constructor () {
  }

  async getAdminList() {
    console.log('pegando lista')
    const admins = await prismaClient.usuario.findMany({
      where: { role: 'ADMIN' }
    })

    return admins
  }

  async createAdmin (email: string) {
    try {
      await prismaClient.usuario.upsert({
        update: { role: 'ADMIN' },
        where: { email },
        create: { email, role: 'ADMIN' }
      })
    } catch (error) {
      throw(error)
    }
  }

  async removeAdminStatus (id: number) {
    try {
      await prismaClient.usuario.update({
        data: { role: 'USER' },
        where: { id }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundError('Usuário não encontrado')
      }

      throw error
    }
  }
}

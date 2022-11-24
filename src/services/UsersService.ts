import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import ConflictionError from '../types/errors/ConflictionError';

export default class UsersService {
  constructor (
    private prismaClient: PrismaClient
  ) {}
}

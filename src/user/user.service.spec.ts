import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from './../test/mocks/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um usuário', async () => {
    const dto = { email: 'test@test.com', name: 'Test', password: '123456' };
    prismaMock.user.create.mockResolvedValue({ id: 'abc123', ...dto });

    const result = await service.create(dto);

    expect(prismaMock.user.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual({ id: 'abc123', ...dto });
  });

  it('deve retornar uma lista de usuários', async () => {
    const users = [
      { id: '1', email: 'a@test.com' },
      { id: '2', email: 'b@test.com' },
    ];
    prismaMock.user.findMany.mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let mockService: Partial<UserService>;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um usuário', async () => {
    const dto = { email: 'a@test.com', name: 'User', password: '123' };

    const expected = {
      id: 'abc',
      email: dto.email,
      name: dto.name,
      googleId: null,
      picture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(mockService, 'create').mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(result).toEqual(expected);
  });

  it('deve retornar todos os usuários', async () => {
    const users = [
      {
        id: '1',
        email: 'a@test.com',
        name: 'User',
        googleId: null,
        picture: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(mockService, 'findAll').mockResolvedValue(users);

    const result = await controller.findAll();

    expect(result).toEqual(users);
  });
});

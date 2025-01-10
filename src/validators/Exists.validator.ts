import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/database/prisma.service';

@ValidatorConstraint({ async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments) {
    try {
      const [modelName, field] = args.constraints as string[];
      const model = this.prisma[modelName];
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma client`);
      }
      const record = await model.findFirst({
        where: { [field]: value },
      });
      return !!record;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [model, field] = args.constraints;
    return `${field} não encontrado no modelo ${model}.`;
  }
}

export function Exists(
  model: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field],
      validator: ExistsConstraint,
    });
  };
}

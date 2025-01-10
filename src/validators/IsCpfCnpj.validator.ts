import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpfCnpjValidator', async: false })
export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    if(!text) return false
    const cleanText = text?.replace(/\D/g, '');
    if (cleanText.length === 11) {
      return cpf.isValid(cleanText);
    }
    if (cleanText.length === 14) {
      return cnpj.isValid(cleanText);
    }
    return false;
  }

  defaultMessage() {
    return 'CPF ou CNPJ inválido';
  }
}

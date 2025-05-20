import { hash, compare } from "bcryptjs";

export async function hashSenha(senha: string): Promise<string> {
  return await hash(senha, 10);
}

export async function comparaSenha(
  senha: string,
  hashedSenha: string
): Promise<boolean> {
  return await compare(senha, hashedSenha);
}
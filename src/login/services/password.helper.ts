import * as bcrypt from 'bcrypt';

export const encryptPassword = async (userPassword): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(userPassword, salt);
  return hash;
};

export const decryptPassword = async (
  userSuppliedPassword,
  hash
): Promise<boolean> => {
  return await bcrypt.compareSync(userSuppliedPassword, hash);
};

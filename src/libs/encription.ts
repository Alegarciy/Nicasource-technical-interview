import bcrypt from 'bcrypt'

export const passwordEncription = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const passwordValidation = async (
  dbPassowrd: string,
  loggedPassword: string
): Promise<boolean> => {
  console.log(dbPassowrd)
  console.log(loggedPassword)
  const verifyPass = await bcrypt.compare(loggedPassword, dbPassowrd)
  return verifyPass
}

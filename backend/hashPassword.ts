import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export default hashPassword;
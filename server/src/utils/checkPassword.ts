import bcypt from "bcryptjs";

export const checkPassword = async (password: string, hashedPassword: string) => {
    const isMatch = await bcypt.compare(password, hashedPassword);
    return isMatch
}
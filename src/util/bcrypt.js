import bcrypt from "bcryptjs";

export const createHash = async (password) => {
  const hashedPW = await bcrypt.hash(password, 10).then((hash) => {
    return hash;
    // Store hash in your password DB.
  });
  return hashedPW;
};

export const compareHash = async (password, dbHash) => {
  bcrypt.compare(password, dbHash, function (err, result) {
    if (err) throw new Error(err);
    return result;
  });
};

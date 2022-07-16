import bcrypt from "bcryptjs";

export const createHash = (password) => {
  bcrypt.hash(password, 10).then((hash) => {
    return hash;
    // Store hash in your password DB.
  });
};

export const compareHash = async (password, dbHash) => {
  bcrypt.compare(password, dbHash, function (err, result) {
    if (err) throw new Error(err);

    return result;
  });
};

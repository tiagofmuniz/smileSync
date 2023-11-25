export function generateId() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!";

    let id = "";
    for (let i = 0, n = charset.length; i < 10; ++i) {
      id += charset.charAt(Math.floor(Math.random() * n));
    }
    return id;
  }
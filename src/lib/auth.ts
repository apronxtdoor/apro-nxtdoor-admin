import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    return null;
  }
}

// Simple password verification for demo (in production, use bcrypt)
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For demo purposes, we'll use a simple comparison
  // In production, you should use bcrypt.compare()
  return password === 'admin123' && hashedPassword === '$2a$12$LQv3c1yqBNWDnWrvTnz5Hejk8WjDtpMD6LtWHrk2ZzqUZAw7Dd.7u';
}
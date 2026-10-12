import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

const safeEqual = (actual: string, expected: string) => {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
};

const localAdminAuth = (env: Record<string, string>): Plugin => ({
  name: 'local-admin-auth',
  configureServer(server) {
    const username = env.ADMIN_USERNAME;
    const password = env.ADMIN_PASSWORD;
    const isConfigured = Boolean(username && password);
    const sessions = new Map<string, number>();
    const loginAttempts = new Map<string, { count: number; resetAt: number }>();
    const cookieName = 'dar_al_nar_admin_session';
    const cookieOptions = `HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${server.config.server.https ? '; Secure' : ''}`;
    const readSession = (request: import('express').Request) => {
      const cookie = request.headers.cookie?.split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`));
      const sessionId = cookie?.slice(cookieName.length + 1);
      if (!sessionId) return false;
      const expiresAt = sessions.get(sessionId);
      if (!expiresAt || expiresAt <= Date.now()) {
        sessions.delete(sessionId);
        return false;
      }
      return true;
    };
    const authApi = express();

    authApi.use(express.json({ limit: '8kb' }));
    authApi.get('/session', (request, response) => {
      response.json({ configured: isConfigured, authenticated: isConfigured && readSession(request) });
    });
    authApi.post('/login', (request, response) => {
      if (!isConfigured) {
        response.status(503).json({ error: 'Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local, then restart the dev server.' });
        return;
      }

      const address = request.socket.remoteAddress || 'local';
      const now = Date.now();
      const attempt = loginAttempts.get(address);
      if (attempt && attempt.resetAt > now && attempt.count >= 8) {
        response.status(429).json({ error: 'Too many login attempts. Try again in 15 minutes.' });
        return;
      }

      const submittedUsername = typeof request.body?.username === 'string' ? request.body.username : '';
      const submittedPassword = typeof request.body?.password === 'string' ? request.body.password : '';
      const isValid = safeEqual(submittedUsername, username) && safeEqual(submittedPassword, password);
      if (!isValid) {
        const nextAttempt = attempt && attempt.resetAt > now
          ? { count: attempt.count + 1, resetAt: attempt.resetAt }
          : { count: 1, resetAt: now + 15 * 60 * 1000 };
        loginAttempts.set(address, nextAttempt);
        response.status(401).json({ error: 'Invalid username or password.' });
        return;
      }

      loginAttempts.delete(address);
      const sessionId = randomBytes(32).toString('hex');
      sessions.set(sessionId, now + 8 * 60 * 60 * 1000);
      response.setHeader('Set-Cookie', `${cookieName}=${sessionId}; ${cookieOptions}`);
      response.json({ authenticated: true });
    });
    authApi.post('/logout', (request, response) => {
      const cookie = request.headers.cookie?.split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`));
      if (cookie) sessions.delete(cookie.slice(cookieName.length + 1));
      response.setHeader('Set-Cookie', `${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${server.config.server.https ? '; Secure' : ''}`);
      response.json({ authenticated: false });
    });

    server.middlewares.use('/api/admin', authApi);
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), localAdminAuth(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

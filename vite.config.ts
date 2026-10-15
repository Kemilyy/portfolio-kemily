import react from "@vitejs/plugin-react";
import type { ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Connect, type Plugin } from "vite";

// Os arquivos de api/ são JavaScript: o ts-ignore evita o erro de "sem declaração de tipos"
// @ts-ignore
import { handleCodando, CODANDO_PATH } from "./api/_codando.js";
// @ts-ignore
import { handleWakaTime, WAKATIME_PATH } from "./api/_wakatime.js";

type Env = Record<string, string>;
type Handler = (
    req: Connect.IncomingMessage,
    res: ServerResponse,
    env: Env,
) => Promise<unknown>;

// Rotas da API atendidas pelo próprio Vite no npm run dev (e no npm run preview).
// Em produção, quem atende são as Vercel Functions da pasta api/.
const ROUTES: Record<string, Handler> = {
    [WAKATIME_PATH]: handleWakaTime, // GET /api/wakatime → estatísticas
    [CODANDO_PATH]: handleCodando, //   GET /api/codando  → "codando agora"
};

// Assim o WAKATIME_ACCESS_TOKEN (e o App Secret / refresh token) fica só no
// servidor e nunca vai para o navegador.
function wakatimeApi(env: Env): Plugin {
    const middleware: Connect.NextHandleFunction = (req, res, next) => {
        const handler = ROUTES[new URL(req.url ?? "/", "http://localhost").pathname];
        if (!handler) return next();
        handler(req, res, env).catch(next);
    };

    return {
        name: "wakatime-api",
        // Chaves { } de propósito: se a função devolver algo, o Vite o executa depois
        configureServer(server) {
            server.middlewares.use(middleware);
        },
        configurePreviewServer(server) {
            server.middlewares.use(middleware);
        },
    };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Prefixo "" lê TODAS as variáveis do .env.local, inclusive as sem VITE_.
    // Isso não as expõe: para o navegador continuam indo só as VITE_*.
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), wakatimeApi(env)],
    };
});
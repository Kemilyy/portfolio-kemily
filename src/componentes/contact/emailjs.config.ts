// Credenciais do EmailJS lidas das variáveis de ambiente.
// A Public Key do EmailJS foi feita para ser pública; ainda assim, restrinja
// os domínios permitidos no painel do EmailJS (Account → Security).

// ---- Vite (padrão) ----
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as
    | string
    | undefined;
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
    | string
    | undefined;
// Template da confirmação enviada ao visitante (opcional)
export const EMAILJS_REPLY_TEMPLATE_ID = import.meta.env
    .VITE_EMAILJS_REPLY_TEMPLATE_ID as string | undefined;
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
    | string
    | undefined;

// ---- Next.js: apague o bloco do Vite acima e use este ----
// export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
// export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
// export const EMAILJS_REPLY_TEMPLATE_ID =
//   process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID;
// export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
"use client"; // necessário no Next.js (App Router); pode ser removido no Vite/CRA

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_REPLY_TEMPLATE_ID,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
} from "./emailjs.config";
import "./Contact.css";

const EMAIL = "kemilyeduardo240@gmail.com";

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/kemilyy" },
    { label: "LinkedIn", href: "https://linkedin.com/in/seuusuario" },
    { label: "Instagram", href: "https://instagram.com/kemy.ks" },
];

type Status = "idle" | "sending" | "success" | "error";

function ArrowIcon() {
    return (
        <svg
            className="contact__arrow"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M2.5 9.5L9.5 2.5M4 2.5h5.5V8" />
        </svg>
    );
}

export default function Contact() {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current || status === "sending") return;

        // Honeypot: bots costumam preencher este campo escondido.
        const honeypot = formRef.current.elements.namedItem(
            "website"
        ) as HTMLInputElement | null;
        if (honeypot?.value) return;

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            console.error(
                "EmailJS: variáveis de ambiente ausentes. Veja o arquivo .env.example."
            );
            setStatus("error");
            return;
        }

        setStatus("sending");

        const form = formRef.current;

        try {
            // 1) E-mail que chega para você
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
                publicKey: EMAILJS_PUBLIC_KEY,
            });

            // 2) Confirmação para quem enviou. Se falhar, a mensagem principal
            //    já chegou, então não tratamos como erro para o visitante.
            if (EMAILJS_REPLY_TEMPLATE_ID) {
                try {
                    await emailjs.sendForm(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_REPLY_TEMPLATE_ID,
                        form,
                        { publicKey: EMAILJS_PUBLIC_KEY }
                    );
                } catch (replyErr) {
                    console.error("EmailJS: falha ao enviar a confirmação", replyErr);
                }
            }

            setStatus("success");
            form.reset();
        } catch (err) {
            console.error("EmailJS: falha ao enviar", err);
            setStatus("error");
        }
    };

    return (
        <section className="contact" id="contatos">
            <div className="contact__container">
                <header className="contact__header">
                    <h2 className="contact__title">{t("contact.title")}</h2>
                </header>

                <div className="contact__grid">
                    {/* Coluna esquerda */}
                    <div className="contact__info">
                        <h3 className="contact__heading">
                            {t("contact.headingLine1")}
                            <br />
                            {t("contact.headingLine2")}
                        </h3>

                        <p className="contact__text">{t("contact.text")}</p>

                        <div className="contact__block">
                            <span className="contact__label">{t("contact.writeToMe")}</span>
                            <a className="contact__email" href={`mailto:${EMAIL}`}>
                                {EMAIL}
                                <ArrowIcon />
                            </a>
                        </div>

                        <ul className="contact__socials">
                            {SOCIALS.map((s) => (
                                <li key={s.label}>
                                    <a
                                        className="contact__social"
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {s.label}
                                        <ArrowIcon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna direita */}
                    <form ref={formRef} className="contact__card" onSubmit={handleSubmit}>
                        <h3 className="contact__card-title">{t("contact.cardTitle")}</h3>

                        <div className="contact__row">
                            <div className="contact__field">
                                <label htmlFor="contact-name">{t("contact.name")}</label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    placeholder={t("contact.namePlaceholder")}
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            <div className="contact__field">
                                <label htmlFor="contact-email">{t("contact.email")}</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    placeholder={t("contact.emailPlaceholder")}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact__field">
                            <label htmlFor="contact-subject">{t("contact.subject")}</label>
                            <input
                                id="contact-subject"
                                name="subject"
                                type="text"
                                placeholder={t("contact.subjectPlaceholder")}
                                required
                            />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="contact-message">{t("contact.message")}</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={5}
                                placeholder={t("contact.messagePlaceholder")}
                                required
                            />
                        </div>

                        {/* Honeypot anti-spam (invisível para pessoas) */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="contact__honeypot"
                        />

                        <div className="contact__actions">
                            <button
                                type="submit"
                                className="contact__submit"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? t("contact.sending") : t("contact.submit")}
                                {status !== "sending" && <ArrowIcon />}
                            </button>
                        </div>

                        <p
                            className={`contact__status contact__status--${status}`}
                            role="status"
                            aria-live="polite"
                        >
                            {status === "success" && t("contact.success")}
                            {status === "error" && t("contact.error")}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
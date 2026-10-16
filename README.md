# 💜 Portfólio — Kemily Eduardo da Luz 👩‍💻

> Portfólio pessoal de engenharia de software, feito em **React + TypeScript + Vite**. Apresenta quem eu sou, minha trajetória, meus projetos e as tecnologias que uso, com um globo 3D interativo de habilidades, estatísticas reais de código via WakaTime, formulário de contato com envio de e-mail e suporte a três idiomas (🇧🇷 🇺🇸 🇪🇸).

<p align="center">
  <img src="docs/imgs/logo.png" alt="Logo do Portfólio" width="160" />
</p>

## 🚧 Status do Projeto

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?logo=i18next&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)

---

## 📚 Índice

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [Instalação de Dependências](#-instalação-de-dependências)
  - [Como Executar](#-como-executar-a-aplicação)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Internacionalização (i18n)](#-internacionalização-i18n)
- [Demonstração](#-demonstração)
- [Scripts](#-scripts)
- [Documentações utilizadas](#-documentações-utilizadas)
- [Autora](#-autora)
- [Contribuição](#-contribuição)

---

## 🔗 Links Úteis

- 🌐 **Demo Online:** [Acesse o portfólio](https://kemilyy.vercel.app) 
  - 💻 Aplicação em produção, hospedada na Vercel.
- 💻 **Repositório:** [github.com/kemilyy](https://github.com/Kemilyy/portfolio-kemily)

---

## 📝 Sobre o Projeto

Este portfólio nasceu da necessidade de reunir, em um único lugar, minha trajetória como estudante de **Engenharia de Software (PUC Minas)** e técnica em **Redes de Computadores (CEFET-MG)**, além dos projetos que desenvolvi.

- **Por que existe:** para apresentar meu trabalho de forma profissional a recrutadores, professores e colegas, e para servir como projeto de aprendizado de **React** e **TypeScript**.
- **Qual problema resolve:** um currículo em PDF mostra o que eu fiz, mas não mostra *como* eu construo. O portfólio demonstra, na prática, minhas escolhas de código, organização e acessibilidade.
- **Contexto:** acadêmico e profissional. Foi construído durante a graduação, integrando componentes e conceitos vistos na disciplina de Desenvolvimento e Integração de Aplicações Web.
- **Onde pode ser utilizado:** processos seletivos, apresentação em eventos e como referência de organização de um projeto React com i18n.

> [!NOTE]
> O que torna o projeto interessante é a separação entre **estrutura** (`src/data`) e **texto** (`src/i18n`): adicionar um projeto, uma experiência ou um idioma não exige mexer na lógica dos componentes.

---

## ✨ Funcionalidades Principais

- 🌎 **Três idiomas (pt-BR, en, es):** troca instantânea pelas bandeiras, sem recarregar a página. A escolha fica salva no navegador.
- 🧭 **Navegação por âncoras** com rolagem suave entre as seções.
- 📄 **Visualizador de currículo em PDF:** abre dentro da página, com zoom, download e abertura em nova aba (carregado sob demanda para não pesar o site).
- 🧑‍💻 **Sobre mim:** apresentação e cards de experiência e formação.
- 🕒 **Linha do tempo de experiências** interativa, que se preenche acompanhando o mouse.
- 🗂️ **Projetos** em cards, com prévia, tags e links para demo e GitHub.
- 🌐 **Globo 3D de habilidades:** arraste para girar, clique para abrir a documentação da tecnologia. Também há a visão em **lista**, com filtro por categoria.
- 📊 **Atividade de código (WakaTime):** estatísticas e "Codando agora" em tempo real, via OAuth.
- 📨 **Formulário de contato** com envio por e-mail (EmailJS), proteção anti-spam (*honeypot*) e e-mail de confirmação para quem escreveu.
- ♿ **Acessibilidade:** `aria-label`, `aria-pressed`, `<html lang>` dinâmico e respeito a `prefers-reduced-motion`.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

- **Biblioteca:** React
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **Estilização:** CSS puro, um arquivo `.css` por componente
- **Fontes:** Plus Jakarta Sans (títulos) e Inter (texto)
- **Ícones:** `react-icons`
- **Internacionalização:** `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- **Bandeiras:** `country-flag-icons` (SVG)
- **Visualizador de PDF:** `react-pdf` (PDF.js)
- **E-mail:** `@emailjs/browser`
- **Globo 3D:** projeção 3D → 2D própria, com `<canvas>` e `requestAnimationFrame` (sem biblioteca 3D)

### 🔌 Integrações

- **WakaTime API** (OAuth): estatísticas de tempo de código
- **EmailJS:** envio de e-mails direto do navegador

### ⚙️ Infraestrutura

- **Hospedagem:** Vercel
- **Versionamento:** Git e GitHub
- **Qualidade:** ESLint

---

## 🏗 Arquitetura

O projeto é uma **SPA (Single Page Application)** organizada por **componentes de seção**: cada pasta em `src/componentes` guarda o `.tsx` e o `.css` de uma parte da página.

### Visão geral

```text
main.tsx ── import "./i18n" ──▶ i18n/index.ts
   │
   └── <App />
        ├── Navbar ── LanguageSwitcher
        ├── Sobre ── (currículo sob demanda: CurriculumViewer)
        ├── SobreMim
        ├── Experiencias ◀── data/Experiencias.ts
        ├── Projetos     ◀── data/projetos.ts
        ├── Tecnologias ── SkillsSection ── SkillsGlobe ◀── data/skills.ts
        ├── WakaTimeStats
        └── Contact ── EmailJS
```

### Decisões arquiteturais

| Decisão | Por quê |
|---|---|
| **Dados separados em `src/data`** | Os componentes só renderizam. Adicionar um projeto é editar uma lista, sem tocar no JSX (baixo acoplamento). |
| **Estrutura × texto** | O arquivo de dados guarda o `id`, links e tags. O texto traduzível fica nos `translation.json`, indexado pelo `id`. |
| **Chaves do i18n ≠ texto** | `t("navbar.about")` é um contrato estável. Corrigir um texto não afeta o código. |
| **Valor interno × rótulo exibido** | Filtros (ex.: categoria "Todas") guardam um valor fixo no estado. Só o rótulo passa por `t()`, então trocar de idioma não quebra a lógica. |
| **`React.lazy` no currículo** | O `react-pdf` pesa cerca de 600 kB, então só é baixado quando o currículo é aberto. |
| **Animação do globo fora do estado do React** | O movimento muda ~60 vezes por segundo. Ele fica em `useRef` e `requestAnimationFrame`, sem re-render. A animação pausa quando o globo sai da tela (`IntersectionObserver`). |
| **Variáveis `VITE_`** | Valores públicos por natureza (EmailJS). Segredos de verdade nunca usam esse prefixo. |

### Trade-offs e limitações

- Sem back-end próprio: o formulário e o WakaTime dependem de serviços de terceiros.
- Textos de `data/` precisam ser mantidos em **três** JSONs ao adicionar itens.
- O README está apenas em português.

---

## 🔧 Instalação e Execução

### Pré-requisitos

- **Node.js:** versão LTS (v18.x ou superior)
- **Gerenciador de pacotes:** npm (ou yarn)
- **Git**

### 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na **raiz do projeto** (ele já está no `.gitignore`).

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço de e-mail no EmailJS | `service_xxxxxxx` |
| `VITE_EMAILJS_TEMPLATE_ID` | Template do e-mail que chega para mim | `template_xxxxxxx` |
| `VITE_EMAILJS_REPLY_TEMPLATE_ID` | Template da confirmação para quem escreveu (opcional) | `template_xxxxxxx` |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS | `sua_public_key_aqui` |

<!-- TODO: confira se os nomes acima são os mesmos lidos em src/componentes/contact/emailjs.config.ts -->
<!-- TODO: liste aqui as variáveis do WakaTime (OAuth) que estão no seu .env.local, SEM os valores reais -->

> [!WARNING]
> Toda variável com prefixo `VITE_` é **embutida no JavaScript** enviado ao navegador, ou seja, é pública. Os valores do EmailJS foram feitos para isso (a proteção é feita no painel do EmailJS, com limites e domínios permitidos). **Nunca** use `VITE_` em tokens e chaves privadas.

#### Exemplo de `.env.local`

```bash
# EmailJS
VITE_EMAILJS_SERVICE_ID=seu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
VITE_EMAILJS_REPLY_TEMPLATE_ID=seu_template_de_confirmacao_aqui
VITE_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

### 📦 Instalação de Dependências

```bash
git clone <URL_DO_SEU_REPOSITÓRIO>
cd portfolio-kemily
npm install
```

### ⚡ Como Executar a Aplicação

```bash
npm run dev
```

🎨 A aplicação estará disponível em `http://localhost:5173`.

> [!NOTE]
> Reinicie o `npm run dev` sempre que alterar o `.env.local`.

---

## 🚀 Deploy

O deploy é feito na **Vercel**, conectada ao repositório do GitHub (cada `push` na branch principal gera um novo deploy).

1. Importe o repositório na Vercel (o Vite é detectado automaticamente).
2. Em **Settings → Environment Variables**, cadastre as variáveis `VITE_EMAILJS_*` com o tipo **Config** (não *Secret*, pois são públicas no navegador). Marque *Production* e *Preview*.
3. Faça um **Redeploy**: o Vite lê as variáveis na hora do *build*, então deploys antigos não as enxergam.

Para testar o build localmente:

```bash
npm run build
npm run preview
```

---

## 📂 Estrutura de Pastas

```text
.
├── .env.local                  # Variáveis do ambiente local (não versionado)
├── .gitignore
├── eslint.config.js            # Regras do ESLint
├── index.html
├── package.json
├── vite.config.ts              # Configuração do Vite (inclui proxy do WakaTime)
├── README.md
│
├── /docs/imgs                  # Logo e capturas de tela do README
├── /public                     # Arquivos estáticos (ex.: curriculo.pdf)
├── /scripts                    # Scripts auxiliares (WakaTime / OAuth)
│
└── /src
    ├── main.tsx                # Ponto de entrada (importa ./i18n antes do <App />)
    ├── App.tsx                 # Composição das seções
    ├── App.css / index.css     # Estilos globais
    │
    ├── /assets                 # Imagens (foto, prévias de projetos)
    │
    ├── /componentes            # Um componente (.tsx + .css) por seção
    │   ├── /navbar
    │   ├── /languageSwitcher   # Botões com bandeiras
    │   ├── /sobre              # Hero (foto, botões, currículo)
    │   ├── /sobreMim           # Apresentação e cards
    │   ├── /experiencias       # Linha do tempo
    │   ├── /projetos           # Cards de projetos
    │   ├── /tecnologias        # Título da seção
    │   ├── /skillsSection      # Filtros + alternância globo/lista
    │   ├── /skillsGlobe        # Globo 3D de habilidades
    │   ├── /curriculo          # Visualizador de PDF
    │   ├── /wakaTimeStats      # Estatísticas do WakaTime
    │   └── /contact            # Formulário (EmailJS)
    │
    ├── /config
    │   └── i18nConfig.ts       # Idiomas, bandeiras e chave do localStorage
    │
    ├── /data                   # Estrutura dos conteúdos (ids, links, tags)
    │   ├── Experiencias.ts
    │   ├── projetos.ts
    │   ├── skills.ts
    │   └── curriculumConfig.ts
    │
    ├── /i18n                   # Motor de tradução
    │   ├── index.ts            # Configuração do i18next
    │   └── /locales
    │       ├── /pt-BR/translation.json
    │       ├── /en/translation.json
    │       └── /es/translation.json
    │
    └── /services               # Integração com a API do WakaTime
```

---

## 🌎 Internacionalização (i18n)

O site é escrito em **português (pt-BR)** e traduzido para **inglês** e **espanhol** com `i18next` + `react-i18next`.

- **Detecção automática:** na primeira visita, o idioma do navegador é usado (`en-US` → inglês, `es-AR` → espanhol, qualquer outro → português).
- **Escolha persistida:** a troca pelas bandeiras fica salva no `localStorage` (chave `i18nextLng`).
- **Acessibilidade e SEO:** o `<html lang>` e o título da aba mudam junto com o idioma.
- **Textos de interface:** ficam nos `translation.json` e são usados com `t("chave")`.
- **Conteúdos em lista** (experiências e projetos): a estrutura fica em `src/data` e o texto em `experiences.items.<id>` / `projects.items.<id>`.

### ➕ Adicionando um idioma

1. Copie `src/i18n/locales/pt-BR/translation.json` para `src/i18n/locales/<código>/translation.json` e traduza os **valores** (as chaves ficam iguais).
2. Importe o JSON em `src/i18n/index.ts` e adicione em `resources`.
3. Acrescente o idioma em `src/config/i18nConfig.ts` (código, nome, sigla e bandeira).

### ➕ Adicionando um projeto ou experiência

1. Adicione o item em `src/data/projetos.ts` (ou `Experiencias.ts`) com um `id` único.
2. Adicione o texto correspondente em `projects.items.<id>` (ou `experiences.items.<id>`) **nos três** `translation.json`.

> [!TIP]
> Se faltar a tradução em um idioma, o i18next mostra o texto em português. Se faltar em todos, aparece a própria chave (ex.: `projects.items.projeto-4.type`), o que facilita achar o esquecimento.

---

## 🎥 Demonstração

<!-- TODO: grave GIFs/prints e salve em docs/imgs/. Prefira hospedar em CDN ou GitHub Pages para não quebrar o carregamento. -->

### 🌐 Aplicação Web

| Tela | Captura de Tela |
|---|---|
| **Página inicial (Home)** | ![Home](docs/imgs/home.png) |
| **Globo de habilidades** | ![Globo](docs/imgs/globo.gif) |
| **Linha do tempo de experiências** | ![Experiências](docs/imgs/experiencias.gif) |
| **Projetos** | ![Projetos](docs/imgs/projetos.png) |
| **Troca de idioma (🇧🇷 🇺🇸 🇪🇸)** | ![Idiomas](docs/imgs/idiomas.gif) |
| **Contato** | ![Contato](docs/imgs/contato.png) |

---

## 🧪 Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Testa o build localmente |
| `npm run lint` | Verifica o código com o ESLint |

> [!NOTE]
> Ainda não há testes automatizados. Eles estão no roadmap (por exemplo, Vitest + Testing Library para os componentes).

---

## 🔗 Documentações utilizadas

- 📖 [React](https://react.dev/)
- 📖 [Vite](https://vite.dev/guide/)
- 📖 [TypeScript](https://www.typescriptlang.org/docs/)
- 📖 [i18next](https://www.i18next.com/) e [react-i18next](https://react.i18next.com/)
- 📖 [react-pdf](https://github.com/wojtekmaj/react-pdf)
- 📖 [EmailJS](https://www.emailjs.com/docs/)
- 📖 [WakaTime API](https://wakatime.com/developers)
- 📖 [Vercel — Environment Variables](https://vercel.com/docs/environment-variables)
- 📖 [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)

---

## 👥 Autora

| 👤 Nome | :octocat: GitHub | 💼 LinkedIn | 📤 Gmail |
|---|---|---|---|
| **Kemily Eduardo da Luz** | [@kemilyy](https://github.com/kemilyy) | [LinkedIn](https://linkedin.com/in/) | [kemilyeduardo240@gmail.com](mailto:kemilyeduardo240@gmail.com) |

## 🤝 Contribuição

Sugestões e correções são bem-vindas!

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`).
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade X'`), seguindo o padrão **Conventional Commits**.
4. Faça o push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request.

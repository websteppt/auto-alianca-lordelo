# Auto Aliança Lordelo — Landing Page

Landing page institucional da **Auto Aliança**, oficina automóvel em Lordelo, Guimarães.

## 📁 Estrutura do projeto

```
auto-alianca-lordelo/
├── index.html              # Página principal (HTML semântico + SEO + JSON-LD)
├── css/
│   └── styles.css          # Estilos (design tokens, layout responsivo, componentes)
├── js/
│   └── script.js           # Interações (menu mobile, FAQ, validação de formulário)
├── assets/
│   ├── icons/
│   │   └── favicon.svg     # Ícone do site
│   └── images/             # Pasta reservada para imagens futuras (fotos da oficina, etc.)
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Como correr o projeto localmente

### Pré-requisito
Ter o [Node.js](https://nodejs.org/) instalado (inclui o `npm`).

### Passos

```bash
# 1. Instalar as dependências (só precisas de fazer isto uma vez)
npm install

# 2. Arrancar o servidor de desenvolvimento
npm run dev
```

Isto abre automaticamente o browser em `http://127.0.0.1:5500`, com recarregamento automático sempre que gravares alterações em qualquer ficheiro.

## 🎨 Personalização

### Cores
Todas as cores estão centralizadas em variáveis CSS no topo do ficheiro `css/styles.css`, dentro de `:root`. Paleta atual: **preto, branco e dourado**.

```css
--grafite: #0B0B0C;      /* preto principal */
--dourado: #B8912F;      /* accent / CTA */
--branco-oficina: #FAF9F6;
```

### Textos
Todo o copy está diretamente no `index.html`, em português europeu.

### Contactos
Antes de publicar, substitui os seguintes dados de exemplo pelos reais:
- Morada, telefone, email e WhatsApp (procura por `+351910490616`, `+351910490616` e `autoaliancalordelo@gmail.com`)
- NIPC no rodapé
- Ligações ao Instagram e Facebook (já estão corretas, mas confirma antes de publicar)
- Endpoint de envio do formulário de contacto (atualmente simula o envio — ver secção abaixo)

## 📬 Ligar o formulário a um envio real

O formulário em `js/script.js` está pronto a validar os campos, mas o envio é apenas simulado (`setTimeout`). Para ligar a um envio real, substitui esse bloco por um `fetch()` para o teu serviço de emails (ex: Formspree, EmailJS, ou uma API própria):

```js
fetch('https://o-teu-endpoint.com/enviar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
})
  .then(() => { /* mostrar sucesso */ })
  .catch(() => { /* mostrar erro */ });
```

## ✅ Boas práticas incluídas

- HTML semântico, com `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- Dados estruturados (`schema.org/AutoRepair`) para SEO local
- Acessibilidade: navegação por teclado, `aria-*`, foco visível, `prefers-reduced-motion`
- Totalmente responsivo (mobile-first, breakpoints em `1024px`, `880px` e `560px`)
- Sem dependências externas de imagens — ícones em SVG inline
- Performance: sem frameworks, CSS e JS nativos

## 📦 Publicar online

Este é um site estático — podes publicá-lo gratuitamente em serviços como:
- [Netlify](https://www.netlify.com/) (arrastar a pasta e pronto)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)

Basta fazer upload de toda a pasta do projeto (não precisas do `node_modules`).

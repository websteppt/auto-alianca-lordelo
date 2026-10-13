# Auto Aliança Lordelo — Landing Page

Landing page institucional da **Auto Aliança**, oficina automóvel em Lordelo, Guimarães.

## 📁 Estrutura do projeto

```
auto-alianca-lordelo/
├── index.html              # Página principal (HTML semântico + SEO + JSON-LD)
├── privacidade.html        # Política de Privacidade (RGPD)
├── 404.html                # Página de erro 404
├── api/
│   └── contacto.js         # Função serverless: envia o formulário por email (Resend)
├── css/
│   └── styles.css          # Estilos (fontes, design tokens, layout responsivo, componentes)
├── js/
│   └── script.js           # Interações (menu mobile, FAQ, validação e envio do formulário)
├── assets/
│   ├── fonts/              # Fontes Barlow, Barlow Condensed e IBM Plex Mono (woff2, alojadas no site)
│   ├── icons/              # Favicon, apple-touch-icon e ícones do manifest
│   └── images/             # logo.webp (cabeçalho), logo.png (dados estruturados), og-image.jpg (partilhas)
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json             # URLs limpos, cabeçalhos de segurança e cache
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
- Identificação legal (ENI: nome, NIF e morada) só na página `privacidade.html`, ligada pelo rodapé
- Link do Livro de Reclamações no rodapé (comentado)
- Link "Avaliar no Google" na secção Redes Sociais (comentado até existir o Google Business Profile)
- Ligações ao Instagram e Facebook (já estão corretas, mas confirma antes de publicar)

O domínio principal é `https://www.autoalianca.pt` (canonical, sitemap, Open Graph). Se mudares para o domínio sem `www`, atualiza esses endereços em `index.html`, `privacidade.html`, `robots.txt` e `sitemap.xml`.

A `privacidade.html` é um modelo: o cliente deve revê-la e confirmá-la antes de publicar.

## 📬 Ligar o formulário a um envio real

O formulário envia os dados para `/api/contacto` (função serverless em `api/contacto.js`), que manda o pedido por email através do [Resend](https://resend.com). A chave da API fica só no servidor, nunca no browser.

### Configuração (Vercel + Resend)

1. No Resend, verifica o domínio do site (Domains → Add Domain) e cria uma API key.
2. Na Vercel, em Settings → Environment Variables, define:
   - `RESEND_API_KEY`: a chave do Resend
   - `CONTACTO_PARA`: email que recebe os pedidos (podem ser vários, separados por vírgula)
   - `CONTACTO_DE`: remetente no domínio verificado, ex: `Site Auto Aliança <site@autoalianca.pt>`
3. Faz deploy. Responder ao email recebido responde diretamente ao cliente.

Sem domínio verificado, podes testar com `CONTACTO_DE=onboarding@resend.dev`, mas o Resend só entrega ao email da tua própria conta.

### Testar localmente

O `npm run dev` (live-server) não corre a função, por isso o formulário mostra a mensagem de erro. Para testar o envio real localmente, copia `.env.example` para `.env.local`, preenche as chaves e corre `npx vercel dev`.

## ✅ Boas práticas incluídas

- HTML semântico, com `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- Dados estruturados (`schema.org/AutoRepair`) para SEO local
- Acessibilidade: navegação por teclado, `aria-*`, foco visível, `prefers-reduced-motion`
- Totalmente responsivo (mobile-first, breakpoints em `1024px`, `880px` e `560px`)
- Sem pedidos a serviços externos: fontes alojadas no próprio site e ícones em SVG inline
- Performance: sem frameworks, CSS e JS nativos

## 📦 Publicar online

O site está preparado para a [Vercel](https://vercel.com/): o `vercel.json` ativa URLs sem `.html` (ex: `/privacidade`) e a função `api/contacto.js` trata o formulário. Noutros alojamentos, a função e os URLs limpos não funcionam sem adaptação.

Localmente (`npm run dev`), o link `/privacidade` não abre porque o live-server não conhece os URLs limpos; abre `/privacidade.html` diretamente.

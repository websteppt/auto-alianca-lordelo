// =========================================================
// AUTO ALIANÇA LORDELO — api/contacto.js
// Função serverless (Vercel) que recebe o formulário de
// contacto e envia o pedido por email através do Resend.
//
// Variáveis de ambiente necessárias:
//   RESEND_API_KEY      chave da API do Resend (re_...)
//   CONTACTO_PARA       email que recebe os pedidos
//   CONTACTO_DE         remetente, num domínio verificado no Resend
//                       ex: "Site Auto Aliança <site@autoalianca.pt>"
// =========================================================

const SERVICOS = {
  manutencao: 'Manutenção & Revisão',
  travoes: 'Travões & Suspensão',
  diagnostico: 'Diagnóstico Eletrónico',
  ipo: 'Pré-Inspeção IPO',
  outro: 'Outro / Não sei'
};

const escaparHtml = (texto) =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const limpar = (valor, max) => String(valor || '').trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  const { RESEND_API_KEY, CONTACTO_PARA, CONTACTO_DE } = process.env;
  if (!RESEND_API_KEY || !CONTACTO_PARA || !CONTACTO_DE) {
    console.error('Faltam variáveis de ambiente do Resend.');
    return res.status(500).json({ erro: 'Serviço de envio não configurado.' });
  }

  const corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  // Campo isco anti-spam: pessoas não o veem, bots preenchem-no.
  if (corpo.website) return res.status(200).json({ ok: true });

  const nome = limpar(corpo.nome, 100);
  const telefone = limpar(corpo.telefone, 30);
  const email = limpar(corpo.email, 150);
  const servico = limpar(corpo.servico, 30);
  const mensagem = limpar(corpo.mensagem, 3000);

  if (
    !nome ||
    !/^[+\d\s()-]{9,}$/.test(telefone) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !SERVICOS[servico]
  ) {
    return res.status(400).json({ erro: 'Dados do formulário inválidos.' });
  }

  const servicoNome = SERVICOS[servico];
  const linhas = [
    ['Nome', nome],
    ['Telemóvel', telefone],
    ['Email', email],
    ['Serviço', servicoNome],
    ['Mensagem', mensagem || '—']
  ];

  const html = `
    <h2 style="font-family:sans-serif">Novo pedido de orçamento</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${linhas
        .map(
          ([rotulo, valor]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top">${rotulo}</td>
          <td style="padding:6px 0;white-space:pre-wrap">${escaparHtml(valor)}</td>
        </tr>`
        )
        .join('')}
    </table>`;

  const texto = linhas.map(([rotulo, valor]) => `${rotulo}: ${valor}`).join('\n');

  try {
    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: CONTACTO_DE,
        to: CONTACTO_PARA.split(',').map((e) => e.trim()),
        reply_to: email,
        subject: `Pedido de orçamento — ${servicoNome} — ${nome}`,
        html,
        text: texto
      })
    });

    if (!resposta.ok) {
      console.error('Erro do Resend:', resposta.status, await resposta.text());
      return res.status(502).json({ erro: 'Não foi possível enviar o pedido.' });
    }

    return res.status(200).json({ ok: true });
  } catch (erro) {
    console.error('Falha ao contactar o Resend:', erro);
    return res.status(502).json({ erro: 'Não foi possível enviar o pedido.' });
  }
};

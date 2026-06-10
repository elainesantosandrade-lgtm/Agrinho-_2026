document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. COMPONENTE INTERATIVO: ACCORDION
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Comportamento clássico de sanfona (Fecha os outros abertos)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherHeader = otherItem.querySelector('.accordion-header');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.style.maxHeight = null;
                    otherContent.setAttribute('hidden', '');
                }
            });

            // Alterna o estado do item atual
            if (!isExpanded) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                content.removeAttribute('hidden');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
                setTimeout(() => {
                    if (header.getAttribute('aria-expanded') === 'false') {
                        content.setAttribute('hidden', '');
                    }
                }, 400);
            }
        });
    });

    // ==========================================
    // 2. ENVIAR FORMULÁRIO DO SEMINÁRIO
    // ==========================================
    const formSeminario = document.getElementById('form-seminario');
    const formFeedback = document.getElementById('form-feedback');

    formSeminario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('txt-nome').value;
        
        formFeedback.removeAttribute('hidden');
        formFeedback.className = "form-feedback-msg success";
        formFeedback.innerHTML = `<strong>Inscrição Realizada!</strong> Seja bem-vindo, ${nome}. O link de acesso ao seminário foi enviado ao seu e-mail.`;
        
        formSeminario.reset();
    });

    // ==========================================
    // 3. ÁREA DE COMENTÁRIOS DO LEITOR
    // ==========================================
    const formComentario = document.getElementById('form-comentario');
    const comentariosLista = document.getElementById('comentarios-lista');

    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const txtArea = document.getElementById('txt-comentario');
        const texto = txtArea.value.trim();

        if (texto) {
            const novoComentario = document.createElement('div');
            novoComentario.className = 'comentario-item';
            novoComentario.style.opacity = '0';
            novoComentario.style.transform = 'translateY(10px)';
            novoComentario.style.transition = 'all 0.4s ease';

            novoComentario.innerHTML = `
                <div class="comentario-meta"><strong>Leitor Participante</strong> &bull; Agora mesmo</div>
                <p>${texto}</p>
            `;

            comentariosLista.prepend(novoComentario);
            txtArea.value = '';

            setTimeout(() => {
                novoComentario.style.opacity = '1';
                novoComentario.style.transform = 'translateY(0)';
            }, 50);
        }
    });

    // ==========================================
    // 4. FERRAMENTAS DE ACESSIBILIDADE AVANÇADA
    // ==========================================
    let fatorFonteAtual = 1;
    const btnAumentarFonte = document.getElementById('btn-aumentar-fonte');
    const btnDiminuirFonte = document.getElementById('btn-diminuir-fonte');

    // Aumentar/Diminuir Fonte usando variáveis CSS relativas
    btnAumentarFonte.addEventListener('click', () => {
        if (fatorFonteAtual < 1.4) {
            fatorFonteAtual += 0.1;
            document.documentElement.style.setProperty('--fator-fonte', fatorFonteAtual);
        }
    });

    btnDiminuirFonte.addEventListener('click', () => {
        if (fatorFonteAtual > 0.8) {
            fatorFonteAtual -= 0.1;
            document.documentElement.style.setProperty('--fator-fonte', fatorFonteAtual);
        }
    });

    // Alternador de Modo Claro/Escuro
    const btnAlternarTema = document.getElementById('btn-alternar-tema');
    btnAlternarTema.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Leitura por Voz Semântica (SpeechSynthesis API)
    const btnOuvirVoz = document.getElementById('btn-ouvir-voz');
    const btnPararVoz = document.getElementById('btn-parar-voz');
    let msgLeitura = null;

    btnOuvirVoz.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // Para leituras residuais

        // Filtra estritamente as tags de conteúdo informativo real da página
        const elementosTexto = document.querySelectorAll('#leitura-artigo-1 p, #leitura-artigo-1 blockquote, #leitura-beneficios h2, #leitura-beneficios .intro-texto p, #leitura-beneficios .accordion-inner p');
        
        let textoParaLer = "";
        elementosTexto.forEach(el => {
            textoParaLer += el.innerText + " ";
        });

        if (textoParaLer.trim() !== "") {
            msgLeitura = new SpeechSynthesisUtterance(textoParaLer);
            msgLeitura.lang = 'pt-BR';
            msgLeitura.rate = 1.0;

            window.speechSynthesis.speak(msgLeitura);
            btnOuvirVoz.style.color = 'var(--cor-verde)';
        }
    });

    btnPararVoz.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        btnOuvirVoz.style.color = 'var(--cor-branco)';
    });

    // Controle de expansão do menu acessível via teclado/mobile
    const mainToggle = document.getElementById('btn-acessibilidade-toggle');
    mainToggle.addEventListener('click', () => {
        const expanded = mainToggle.getAttribute('aria-expanded') === 'true';
        mainToggle.setAttribute('aria-expanded', !expanded);
    });
});
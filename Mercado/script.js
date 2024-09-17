document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.getElementById("cadastroForm");
    const produtosList = document.getElementById("produtosList");

    // Evento de cadastro
    cadastroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nomeProduto = document.getElementById("nomeProduto").value;
        const precoProduto = document.getElementById("precoProduto").value;

        // Envia o produto para a API
        await fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nomeProduto,
                preco: parseFloat(precoProduto).toFixed(2)
            }),
        });

        mostrarProdutos(); // Atualiza a lista de produtos

        // Limpa o formulário
        cadastroForm.reset();
    });

    // Função para exibir produtos cadastrados
    async function mostrarProdutos() {
        produtosList.innerHTML = ""; // Limpa a lista

        // Obtém produtos da API
        const response = await fetch('/api/produtos');
        const produtos = await response.json();

        produtos.forEach((produto, index) => {
            const div = document.createElement("div");
            div.innerHTML = `Produto ${index + 1}: ${produto.nome} - R$ ${produto.preco}`;
            produtosList.appendChild(div);
        });
    }

    // Carrega os produtos ao iniciar
    mostrarProdutos();
});
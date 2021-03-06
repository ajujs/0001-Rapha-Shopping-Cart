let carrinho = {
  // render do carrinho de compras
  rProdutos: null, // render dos produtos
  rItens: null, // render dos itens
  itens: {}, // recebe os itens clicados

  // o carrinho será salvo no localstorage do navegador
  // função para salvar os itens no localstorage
  salvar: function () {
    localStorage.setItem("carrinho", JSON.stringify(carrinho.itens));
  },

  // função para carregar o carrinho do localstorage
  carregar: function () {
    carrinho.itens = localStorage.getItem("carrinho");
    if (carrinho.itens == null) {
      carrinho.itens = {};
    } else {
      carrinho.itens = JSON.parse(carrinho.itens);
    }
  },

  // função para esvaziar o carrinho
  esvaziar: function () {
    if (confirm("Deseja realmente esvaziar o carrinho?")) {
      carrinho.itens = {};
      localStorage.removeItem("carrinho");
      carrinho.listar();
    }
  },

  // inicializar a renderização
  inicializar: function () {
    carrinho.rProdutos = document.getElementById("c-produtos");
    carrinho.rItens = document.getElementById("c-itens");

    // renderizando/desenhando
    carrinho.rProdutos.innerHTML = "";
    let p, item, rendr;
    for (let id in produtos) {
      // Carrinho
      p = produtos[id];
      item = document.createElement("div");
      item.className = "p-item";
      carrinho.rProdutos.appendChild(item);

      // Imagem do produto
      rendr = document.createElement("img");
      rendr.src = "./img/" + p.imagem;
      rendr.className = "p-img";
      item.appendChild(rendr);

      // Nome do produto
      rendr = document.createElement("div");
      rendr.innerHTML = p.nome;
      rendr.className = "p-nome";
      item.appendChild(rendr);

      // Preço do produto
      rendr = document.createElement("div");
      rendr.innerHTML = "R$ " + p.valor;
      rendr.className = "p-valor";
      item.appendChild(rendr);

      // Adicionar ao carrinho
      rendr = document.createElement("input");
      rendr.type = "button";
      rendr.value = "Adicionar ao Carrinho";
      rendr.className = "carrinho p-adicionar";
      rendr.onclick = carrinho.adicionar;
      rendr.dataset.id = id;
      item.appendChild(rendr);
    }

    // Carregar o carrinho (sessões anteriores)
    carrinho.carregar();

    // Lista de produtos no carrinho
    carrinho.listar();
  },

  // Listar produtos no carrinho
  listar: function () {
    // Reset
    carrinho.rItens.innerHTML = "";
    let item, rendr, prod;
    let vazio = true;
    for (let key in carrinho.itens) {
      if (carrinho.itens.hasOwnProperty(key)) {
        vazio = false;
        break;
      }
    }

    // carrinho está vazio
    if (vazio) {
      item = document.createElement("div");
      item.innerHTML = "O carrinho está vazio";
      carrinho.rItens.appendChild(item);
    }
    // carrinho não está vazio
    else {
      let p,
        total = 0,
        subtotal = 0;
      for (let id in carrinho.itens) {
        // i
        p = produtos[id];
        item = document.createElement("div");
        item.className = "c-item";
        carrinho.rItens.appendChild(item);

        // nome
        rendr = document.createElement("div");
        rendr.innerHTML = p.nome;
        rendr.className = "c-nome";
        item.appendChild(rendr);

        // remover
        rendr = document.createElement("input");
        rendr.type = "button";
        rendr.value = "X";
        rendr.dataset.id = id;
        rendr.className = "c-apagar carrinho";
        rendr.addEventListener("click", carrinho.remover);
        item.appendChild(rendr);

        // quantidade
        rendr = document.createElement("input");
        rendr.type = "number";
        rendr.value = carrinho.itens[id];
        rendr.dataset.id = id;
        rendr.className = "c-quantidade";
        rendr.addEventListener("change", carrinho.quantidade);
        item.appendChild(rendr);

        // subtotal
        subtotal = carrinho.itens[id] * p.valor;
        total += parseFloat(subtotal.toFixed(2));
      }

      // botão esvaziar
      item = document.createElement("input");
      item.type = "button";
      item.value = "Esvaziar Carrinho";
      item.addEventListener("click", carrinho.esvaziar);
      item.className = "c-vazio carrinho";
      carrinho.rItens.appendChild(item);

      // botão comprar
      item = document.createElement("input");
      item.type = "button";
      item.value = "Comprar - " + "R$ " + total;
      item.addEventListener("click", carrinho.comprar);
      item.className = "c-comprar carrinho";
      carrinho.rItens.appendChild(item);
    }
  },

  // adicionar itens ao carrinho
  adicionar: function () {
    if (carrinho.itens[this.dataset.id] == undefined) {
      carrinho.itens[this.dataset.id] = 1;
    } else {
      carrinho.itens[this.dataset.id]++;
    }
    carrinho.salvar();
    carrinho.listar();
  },

  // mudar quantidade
  quantidade: function () {
    if (this.value == 0) {
      delete carrinho.itens[this.dataset.id];
    } else {
      carrinho.itens[this.dataset.id] = this.value;
    }
    carrinho.salvar();
    carrinho.listar();
  },

  // remover do carrinho
  remover: function () {
    delete carrinho.itens[this.dataset.id];
    carrinho.salvar();
    carrinho.listar();
  },

  // comprar
  comprar: function () {
    alert("Parabéns pela compra!!" + "\nEnviaremos o seu produto em breve!");
    carrinho.itens = {};
    localStorage.removeItem("carrinho");
    carrinho.listar();
  },
};

window.addEventListener("DOMContentLoaded", carrinho.inicializar);

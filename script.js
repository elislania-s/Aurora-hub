document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".menu a");
    const sections = document.querySelectorAll("section[id]");

    // Remove o "active" de todos os links e coloca só no que foi passado
    function ativarLink(link){
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    }

    // 1) Clique no menu -> ativa na hora (não precisa esperar o scroll "acertar")
    links.forEach(link => {
        link.addEventListener("click", () => {
            ativarLink(link);
        });
    });

    // 2) Scroll -> detecta qual seção está visível e ativa o link correspondente
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                const id = entry.target.getAttribute("id");
                const linkCorrespondente = document.querySelector(`.menu a[href="#${id}"]`);

                if(linkCorrespondente){
                    ativarLink(linkCorrespondente);
                }

            }

        });

    }, {
        // considera "visível" quando a seção passa pela faixa vertical
        // logo abaixo do header fixo (72px) até um pouco antes do meio da tela
        rootMargin: "-72px 0px -60% 0px",
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

});

const whatsapp = document.querySelector(".whatsapp-fixed");
const contato = document.querySelector("#contato");

const observerWhatsapp = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            whatsapp.classList.add("show");

        }else{

            whatsapp.classList.remove("show");

        }

    });

},{
    threshold:0.25
});

observerWhatsapp.observe(contato);

const form = document.getElementById("formContato");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");

    let valido = true;

    if(nome.value.trim() === ""){

        nome.style.border = "2px solid #E53935";
        nome.placeholder = "Campo obrigatório";

        valido = false;

    }else{

        nome.style.border = "none";

    }

    if(email.value.trim() === ""){

        email.style.border = "2px solid #E53935";
        email.placeholder = "Campo obrigatório";

        valido = false;

    }else{

        email.style.border = "none";

    }

    if(valido){

        alert("Mensagem enviada com sucesso!");

        form.reset();

    }

});
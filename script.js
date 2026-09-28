const areaPrevisao = document.getElementById("previsao");

const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=-25.43" +
    "&longitude=-49.27" +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max" +
    "&timezone=America%2FSao_Paulo" +
    "&forecast_days=7";

fetch(url)
    .then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados meteorológicos.");
        }

        return resposta.json();
    })

    .then((dados) => {
        const previsao = dados.daily;

        areaPrevisao.innerHTML = "";

        previsao.time.forEach((data, indice) => {

            const dataFormatada = new Date(
                `${data}T12:00:00`
            ).toLocaleDateString("pt-BR", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit"
            });

            const card = document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `
                <h3>${dataFormatada}</h3>

                <p class="temperatura">
                    ${previsao.temperature_2m_max[indice]}°C
                </p>

                <p class="detalhe">
                    Mínima: ${previsao.temperature_2m_min[indice]}°C
                </p>

                <p class="detalhe">
                    Chuva: ${previsao.precipitation_sum[indice]} mm
                </p>

                <p class="detalhe">
                    Chance de chuva:
                    ${previsao.precipitation_probability_max[indice]}%
                </p>
            `;

            areaPrevisao.appendChild(card);
        });
    })

    .catch((erro) => {
        console.error(erro);

        areaPrevisao.innerHTML = `
            <p>Não foi possível carregar os dados meteorológicos.</p>
        `;
    });

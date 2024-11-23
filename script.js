var lista = [];

var sorteados = [];

function iniciar() {
    lista = listInicial();
    sorteados = [];
    update({ lista, sorteados, resultado: "SORTEAR" });
}

function sortear() {
    let state = {};
    state.listaCount = lista.length;
    state.resultado = "";
    if (!state.listaCount) {
        state.resultado = "BINGO";
    } else {
        state.sorteioPosicao = getRandomInt(0, state.listaCount);

        state.resultado = lista[state.sorteioPosicao];

        sorteados.push(state.resultado);

        lista = lista.filter((x) => !sorteados.includes(x));

        state = {
            ...state,
            lista: lista,
            sorteados: sorteados,
        };
    }

    update(state);
}

function update(state) {
    $("#resultado").html(state.resultado);
    if (state.sorteados) {
        $("#sorteados").html(
            "<ul class='list-group'>" +
                state.sorteados
                    .reverse()
                    .map(
                        (x) =>
                            "<li class='list-group-item'><small>" +
                            x +
                            "</small></li>"
                    )

                    .join("") +
                "</ul>"
        );
    }
    if (state.lista.length > 0) {
        $("#sortear").show();
    } else {
        $("#sortear").hide();
    }
    console.log(state);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

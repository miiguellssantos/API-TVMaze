//Heitor Leite de Almeida, Raissa Moretto e Miguel Lordello
$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    $("#resultados").empty();
    let urlSearch = "https://api.tvmaze.com/search/shows?q=";
    let pesquisa = $("#input_search").val();
    $.ajax({
      url: urlSearch + pesquisa,
      type: "GET",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          var show = data[i].show;
          var nome = show.name;
          var desc = show.summary;
          var img = show.image;
          let uc = show.id;

          let div = $("<div>").attr({
            class: "card",
            style: "margin: 5% 15%;; border-radius: 15px;",
            id: uc,
          });
          if (img != null) {
            let imgMedium = img.medium;
            let imagem = $("<img>").attr({
              class: "card-img-top",
              src: imgMedium,
              style: "height: 300px; border-radius: 15px 15px 0px 0px",
            });
            div.append(imagem);
          } else if (img == null) {
            let imagem = $("<img>").attr({
              class: "card-img-top",
              src: "https://www.pngkey.com/png/full/233-2332677_ega-png.png",
              style: "height: 300px",
            });
            div.append(imagem);
          }

          let pNome = $("<p>");
          pNome.text(nome);
          div.append(pNome);

          let pDesc = $("<p>");
          //pDesc.text(desc);
          div.append(desc);

          let episodios = $("<button>")
            .attr({
              type: "button",
              class: "btn btn-primary",
              "data-bs-toggle": "modal",
              "data-bs-target": "#exampleModal",
              style: "border-radius: 0px 0px 15px 15px",
            })
            .click(function() {
              mostraEpisodios(uc);
            });
          episodios.text("Episódios");
          div.append(episodios);
          $("#resultados").append(div);
        }
      },
    });
  });
  function mostraEpisodios(idep) {
    $("tbody").empty();
    let urlEps = "https://api.tvmaze.com/shows/";
    //let idep = 431;
    $.ajax({
      url: urlEps + idep + "/episodes",
      type: "GET",
      success: function (eps) {
        for (var i = 0; i < eps.length; i++) {
          let nome = eps[i].name;
          let temporada = eps[i].season;
          let numero = eps[i].number;
          let data = eps[i].airdate;

          let tr = $("<tr>");
          let tdNome = $("<td>");
          tdNome.text(nome);
          tr.append(tdNome);

          let thTemp = $("<th>");
          thTemp.text(temporada);
          tr.append(thTemp);

          let thNumero = $("<th>");
          thNumero.text(numero);
          tr.append(thNumero);

          let thData = $("<th>");
          thData.text(data);
          tr.append(thData);
          $("tbody").append(tr);
        }
      },
    });
  }
});

// ------------------------ SCRIPT DESENVOLVIDO POR -----------------------------
// -------------------------------- DROYEN --------------------------------------
// ----------------------- ENCOMENDAS EM droyen#1563 ----------------------------
// ------------ MAIS PRODUTOS EM:https://discord.gg/HNAChDZ68f ------------------
// ------------------------------------------------------------------------------

/* ---------------------------------------------------------------------------------------------------------------- */
var boxContents = [];

$(document).ready(function () {
    window.addEventListener("message", function (event) {
        $(".popUp").hide();
        $(".itens-container").html("");
        boxContents = [];
        switch (event["data"]["openMenu"]) {
            case true:
                $("#container").fadeIn(100);
                $("body").css("background", "rgba(11, 16, 20, 0.4)");
                $.post("http://dyn_crafting/updateInventory", JSON.stringify({}), (data) => {
                    for (let x = 1; x <= 100; x++) {
                        const slot = x.toString();

                        if (data.inventario[slot] !== undefined) {
                            v = data.inventario[slot];
                            const item = `<div class="item-box">
              <p class="item-name">${v.name}</p>
              <img src="./imagens/${v.index}.png" class="item-image">
              <p class="item-amount">x${v.amount}</p>
              </div>`;
                            $(".itens-container").append(item);
                        }
                    }
                    $(".item-image").draggable({
                        start: function () {
                            $(this).css("opacity", "0.8");
                            parent = this.parentNode;
                            image = $(this).attr("src");
                        },
                        stop: function () {
                            $(this).css("opacity", "1");
                        },
                        helper: "clone",
                        revert: true,
                    });

                    for (let i = 0; i < 10; i++) {
                        $(`#${i}`).droppable({
                            accept: ".item-image",
                            drop: function (event, ui) {
                                if ($(`#${i}`).is(":empty")) {
                                    $(this).css("background", "rgba(8,8,8)");
                                    $(".popUp").fadeIn();
                                    $(`#${i}`).append(`<img src="${image}" class="craft-imageWaiting" alt="">`);
                                    boxColocada = `#${i}`;
                                    $("#buttonPopUp")
                                        .unbind()
                                        .click(function (event) {
                                            event.preventDefault();
                                            const valorPadrao = Number(parent.children[2].textContent.slice(1));
                                            const valorInserido = Number($(".inputPopUp").val());
                                            if (valorInserido <= valorPadrao) {
                                                if (valorInserido > 0) {
                                                    $(".craft-imageWaiting").css("opacity", "1");
                                                    $(`${boxColocada}`).append(`<p class="craft-amount">x${valorInserido}</p>`);
                                                    $(".popUp").hide();

                                                    if (valorPadrao === valorInserido) {
                                                        parent.remove();
                                                    } else {
                                                        parent.children[2].textContent = `x${valorPadrao - valorInserido}`;
                                                    }
                                                } else {
                                                    $(`${boxColocada}`).html("");
                                                    $(".popUp").fadeOut();
                                                    $(".error").show();
                                                    $(".error").html("O valor inserido é inválido!");
                                                    $(".box").css("background", "rgba(11, 16, 20, 0.7)");
                                                    setTimeout(() => {
                                                        $(".error").hide();
                                                    }, 3000);
                                                }
                                            } else {
                                                $(`${boxColocada}`).html("");
                                                $(".popUp").fadeOut();
                                                $(".error").show();
                                                $(".error").html("A quantia inserida no Craft é maior que a quantia da sua mochila!");
                                                $(".box").css("background", "rgba(11, 16, 20, 0.7)");
                                                setTimeout(() => {
                                                    $(".error").hide();
                                                }, 3000);
                                            }
                                        });
                                }
                            },
                            over: function (event, ui) {
                                if ($(`#${i}`).is(":empty")) {
                                    $(this).css("background", "rgba(47, 54, 61, 0.7)");
                                }
                            },
                            out: function (event, ui) {
                                if ($(`#${i}`).is(":empty")) {
                                    $(this).css("background", "rgba(11, 16, 20, 0.7)");
                                } else {
                                    $(this).css("background", "rgba(8,8,8)");
                                }
                            },
                        });
                    }
                });
                break;

            case false:
                $("#container").fadeOut(100);
                $("body").css("background", "none");
                break;
        }
    });
    $("#craft-button")
        .unbind()
        .click(function (event) {
            this.disabled = true;
            parent = this.parentNode;
            for (let i = 0; i <= 8; i++) {
                if (!$(`#${i + 1}`).is(":empty")) {
                    image = parent.children[i].children[0].getAttribute("src");
                    index = image.slice(10, -4);
                    quantia = Number(parent.children[i].children[1].textContent.substr(1));
                    boxContents.push(eval("[index,quantia]"));
                    tabela = boxContents;
                    conteudo = true;
                } else {
                    boxContents.push(eval("[]"));
                }
            }
            if (conteudo) {
                $.post("http://dyn_crafting/verificarCraft", JSON.stringify({ boxItens: JSON.stringify(tabela) }), (data) => {
                    $("#craft-button").hide();
                    if (data.itemCriado) {
                        const itemWinned = `<p class="createdItem-itemTitle">${data.itemCriado}</p>
          <img src="imagens/${data.indexItem}.png" class="createdItem-itemImage" alt="">
          <p class="createdItem-amount">x${data.qtdItem}</p>`;
                        $(".createdItem-box").append(itemWinned);
                        $(".craft-status").show();

                        if (data.statusCraft === "Você não tem permissao para fazer este item!") {
                            $(".craft-status").css("color", "crimson");
                            $(".craft-status").html(`${data.statusCraft}`);

                            for (let i = 0; i <= 9; i++) {
                                $(`#${i}`).html("");
                                $(`#${i}`).css("background", "rgba(11, 16, 20, 0.7)");
                            }

                            setTimeout(() => {
                                $(".craft-status").hide();
                                $(".createdItem-box").html("");
                            }, 2000);
                            $("#craft-button").show();
                        } else {
                            $(".craft-status").css("color", "rgb(75, 209, 120)");
                            $(".craft-status").html(`${data.statusCraft}`);

                            $(".createdItem-box").slideToggle("slow");

                            for (let i = 0; i <= 9; i++) {
                                $(`#${i}`).html("");
                                $(`#${i}`).css("background", "rgba(11, 16, 20, 0.7)");
                            }

                            setTimeout(() => {
                                $(".createdItem-box").slideToggle("slow");
                                $(".createdItem-box").html("");
                                $(".craft-status").hide();
                            }, 2000);
                            setTimeout(() => {
                                $("#craft-button").show();
                            }, 2500);
                        }
                    }
                });
            }
            this.disabled = false;
            boxContents = [];
            conteudo = false;
        });

    /* ---------------------------------------------------------------------------------------------------------------- */

    document.onkeyup = function (data) {
        if (data.which == 27) {
            if ($("#container").is(":visible")) {
                $.post("http://dyn_crafting/exit");
                $("body").css("background", "none");
                for (let i = 0; i < 10; i++) {
                    $(`#${i}`).html("");
                    $(`#${i}`).css("background", "rgba(11, 16, 20, 0.7)");
                }
            }
        }
    };
});

// ------------------------------------------------------------------------------
// ------------------------ SCRIPT DESENVOLVIDO POR -----------------------------
// -------------------------------- DROYEN --------------------------------------
// ----------------------- ENCOMENDAS EM droyen#1563 ----------------------------
// ------------ MAIS PRODUTOS EM:https://discord.gg/HNAChDZ68f ------------------
// ------------------------------------------------------------------------------

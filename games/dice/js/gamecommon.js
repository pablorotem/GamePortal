$(document).ready(function () {
    var clipboard = new Clipboard('#openkey');
$("#roll-dice").click(function () {
    startGame();
 });
initGame()
    $(".toggle-bg").click(function(){
			setContract();
			$("#total-rolls").html(call("getTotalRollMade"));
    $("#total-paid").html(paids + ' ETH');
    $("#total-send").html(sends + ' ETH (' + ((paids / sends) * 100).toFixed(2) + '%)');
            getContractBalance()
		});


    $('#your-balance').click(function(){
        
Refresh();
    })

    $('input#amount-one').keypress(function (e) {
        if (e.which == 13) {
            Refresh();
            $(this).blur();
        }
    })

    $('input#less-than-wins').keypress(function (e) {
        if (e.which == 13) {
            Refresh();
            $(this).blur();
        }
    })

    $(document).ready(function () {
        $('input#amount-one').keypress(function (e) {
            Refresh();
            if (!(e.which == 8 || e.which == 44 || e.which == 45 || e.which == 46 || (e.which > 47 && e.which < 58))) return false;
        });
    });
    $(document).ready(function () {
        $('input#less-than-wins').keypress(function (e) {
            Refresh();
            if (!(e.which == 8 || (e.which > 47 && e.which < 58))) return false;

        });


        $('input#amount-one').on('input keyup change', function () {
            var value = this.value;
            Refresh();
            if (/^\.|\d+\..*\.|[^\d\.{1}]/.test(value) || value > balance - 0.02)
                this.value = value.slice(0, -1);

                else Refresh();

        });

        $('input#less-than-wins').on('input keyup change', function () {
            var value = this.value;
            Refresh();
            if (value < 1 || value > 9900)
                this.value = value.slice(0, -1);
                
                else Refresh();

        });

    });


    /* SLIDER UI */
    $(function () {
        $('#less-than-wins').change(function () {
            var value = $("#less-than-wins").val();
            if (value > 9900) {
                value = 9900
            };
            if (value < 1) {
                value = 1
            };
            $("#less-than-wins").val(value);
            $("#slider-dice-two").slider("value", value);
            $("#amount-two").val(value / 100 + "%");
            chance = +value;
            Refresh();
        });
        $('#amount-one').change(function () {
            var value = $("#amount-one").val();

            if (value > balance) {
                value = balance - 0.02
                betEth = balance

            };
            if (value < 0.01) {
                value = 0.01
                betEth = 0.01
            };
            $("#amount-one").val(value);
            $("#slider-dice-one").slider("value", value * 1000);
            betEth = +value;
            Refresh();
        });


        $("#slider-dice-one").slider({
            range: "min",
            value: 200,
            min: 10,
            max: 2000,
            slide: function (event, ui) {
                betEth = ui.value / 1000;
                $("#amount-one").val(ui.value / 1000);
                Refresh();
            }
        });

        $("#slider-dice-two").slider({
            range: "min",
            value: 5000,
            min: 1,
            max: 9900,
            slide: function (event, ui) {
                chance = ui.value;
                $("#amount-two").val(ui.value / 100 + "%");
                $("#less-than-wins").val(ui.value);
                Refresh();
            }
        });
        $("#amount-two").val($("#slider-dice-two").slider("value") / 100 + "%");
        $("#amount-one").val($("#slider-dice-one").slider("value") / 1000);
        Refresh();
    });
})
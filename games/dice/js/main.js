var balance = ".::::.";
var urlBalance = ""; //balance
// 6 ETH var addressContract = "0x1c864f1851698ec6b292c936acfa5ac5288a9d27";
var addressContract = "0xe061a411d69853155d221edc7c837b338f23730d";
var betEth = 0.2; //0,2 ставка эфира
var mainnet, openkey, privkey, mainnetAddress, testnetAddress;
var chance = 5000;
var urlInfura = "https://ropsten.infura.io/JCnK5ifEPH9qcQkX0Ahl";
var urlEtherscan = "https://testnet.etherscan.io/api";
var lastTx, count, sends, paids;
var game = false;
var Timer;
// var maxBet = 2000;
/*
 * value - Дробное число.
 * precision - Количество знаков после запятой.
 */
function toFixed(value, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(value * precision) / precision;
}
function numToHex(num) {
    return num.toString(16);
}
function hexToNum(str) {
    return parseInt(str, 16);
}
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        console.log("localStorage_failed:", e);
        return false;
    }
}
function loadData() {
    if (isLocalStorageAvailable()) {
        testnetAddress = localStorage.getItem(' testnetAddress')
        mainnetAddress = localStorage.getItem('mainnetAddress')
        kovanAddress = localStorage.getItem('kovanAddress')
        mainnet = localStorage.getItem('mainnet')
        openkey = localStorage.getItem('openkey')
        privkey = localStorage.getItem('privkey')
    }
    console.log("version 0.41 Infura") // VERSION !
    console.log("mainnet:", mainnet)
    console.log("openkey:", openkey)
    console.log("privkey:", privkey)
};
loadData();
function call(callname) {
    var result;
    var callData;
    switch (callname) {
        case "totalRollsByUser":
            callData = "0x9288cebc";
            break;
        case "getShowRnd":
            callData = "0xdb571498";
            break;
        case "getTotalRollMade":
            callData = "0x9e92c991";
            break;
        case "getTotalEthSended":
            callData = "0x46f76648";
            break;
        case "getTotalEthPaid":
            callData = "0xf6353590";
            break;
    }
    $.ajax({
        type: "POST",
        url: urlInfura,
        dataType: 'json',
        async: false,
        data: JSON.stringify({
            "id": 0,
            "jsonrpc": '2.0',
            "method": "eth_call",
            "params": [{
                "from": openkey,
                "to": addressContract,
                "data": callData + pad(numToHex(openkey.substr(2)), 64)
            }, "latest"]
        }),
        success: function (d) {
            result = hexToNum(d.result);
        }
    });
    return result;
};
function setContract() {
    if (mainnet == "on") {
        urlEtherscan = "https://api.etherscan.io/api";
        addressContract = mainnetAddress;
    } else if (mainnet == "off") {
        urlEtherscan = "https://testnet.etherscan.io/api";
        addressContract = "0xe061a411d69853155d221edc7c837b338f23730d";
    }
};
function getContractBalance() {
    $.ajax({
        type: "POST",
        url: urlInfura,
        dataType: 'json',
        async: false,
        data: JSON.stringify({
            "id": 0,
            "jsonrpc": '2.0',
            "method": 'eth_getBalance',
            "params": [addressContract, "latest"]
        }),
        success: function (d) {
            $('#contractBalance').html("CONTRACT ( " + (d.result / 1000000000000000000).toFixed(5) + " ETH )");
        }
    });
};
function initGame() {
    //getGameContract();
    paids = (call("getTotalEthSended") / 10000000000000000000).toFixed(6);
    sends = (call("getTotalEthPaid") / 10000000000000000000).toFixed(6);
    Refresh();
    loadData();
    setContract();
    console.log("old_count", call("totalRollsByUser"));
    $("#total-rolls").html(call("getTotalRollMade"));
    $("#total-paid").html(paids + ' ETH');
    $("#total-send").html(sends + ' ETH (' + ((paids / sends) * 100).toFixed(2) + '%)');
    getContractBalance();
    $("#contract").html('<a target="_blank" href="' + urlEtherscan.slice(0, -3) + '/address/' + addressContract + '">...' + addressContract.slice(2, 24) + '...</a>')
    GetLogs();
};
function button(status) {
    if (status) {
        $("#roll-dice").css({
            background: 'gray'
        });
    } else {
        $("#roll-dice").removeAttr('style');
    }
}
function disabled(status) {
    $("#slider-dice-one").slider({
        disabled: status
    });
    $("#slider-dice-two").slider({
        disabled: status
    });
    $("#amount-one").attr('readonly', status);
    $("#less-than-wins").attr('readonly', status);
    $("#roll-dice").attr('disabled', status);
    button(status);

}
function Refresh() {
    $("#profit-on-win").val(((betEth * 9920 / chance) - betEth).toFixed(4));
    $("#payout").val("x" + (9920 / chance).toFixed(3));
};
setInterval(function () {
    if (openkey) {
        balance = $('#balance').html();
        balance = +balance.substr(0, balance.length - 4);
        balance = +balance.toFixed(8);
        if (balance < 0.1 && !game) {
            disabled(true);
            $("#label").text(" NO MONEY ");
        } else if (balance > 0.1 && !game) {
            disabled(false);
            $("#label").text("Click Roll Dice to place your bet:");
        }
        $("#your-balance").val(balance);
        if (balance) {
            $("#slider-dice-one").slider("option", "max", (balance * 1000) - 20);
        }
    } else {
        $("#label").text("Please, sign in");
        disabled(true);
    }
}, 1000);
function startGame() {
    game = true;
    if (openkey) {
        $.ajax({
            type: "POST",
            url: urlInfura,
            dataType: 'json',
            async: false,
            data: JSON.stringify({
                "id": 0,
                "jsonrpc": '2.0',
                "method": "eth_getTransactionCount",
                "params": [openkey, "latest"]
            }),
            success: function (d) {
                console.log("urlInfura:", urlInfura);
                console.log("get nonce action " + d.result);
                var callData = "0x1f7b4f30";
                var options = {};
                options.nonce = d.result;
                options.to = addressContract;
                // call function game() in contract
                options.data = callData + pad(numToHex(chance), 64); // method from contact
                options.gasPrice = "0x737be7600"; //web3.toHex('31000000000');
                options.gasLimit = 0x927c0; //web3.toHex('600000');
                options.value = betEth * 1000000000000000000;
                if (privkey) {
                    if (buf == undefined) {
                        console.log("ERROR_TRANSACTION");
                    } else {
                        //приватный ключ игрока, подписываем транзакцию
                        var tx = new EthereumTx(options);
                        tx.sign(new buf(privkey, 'hex'));
                        var serializedTx = tx.serialize().toString('hex');
                        console.log("The transaction was signed: " + serializedTx);
                        $.ajax({
                            type: "POST",
                            url: urlInfura,
                            dataType: 'json',
                            async: false,
                            data: JSON.stringify({
                                "id": 0,
                                "jsonrpc": '2.0',
                                "method": "eth_sendRawTransaction",
                                "params": ["0x" + serializedTx]
                            }),
                            success: function (d) {
                                console.log("Транзакция отправлена в сеть:", d.result);
                                lastTx = d.result;
                                if (lastTx == undefined) {
                                    $("#random").text("Sorry, transaction failed");
                                } else {
                                    $("#Tx").html('<a target="_blank" href="https://testnet.etherscan.io/tx/' + lastTx + '">...' + lastTx.slice(2, 24) + '...</a>')
                                    disabled(true);
                                    $("#random").text("Please, wait . . . ");
                                    $("#randomnum").text(" . . . ");
                                    Timer = setInterval(function () {
                                        $.ajax({
                                            type: "POST",
                                            url: urlInfura,
                                            dataType: 'json',
                                            async: false,
                                            data: JSON.stringify({
                                                "id": 0,
                                                "jsonrpc": '2.0',
                                                "method": "eth_call",
                                                "params": [{
                                                    "from": openkey,
                                                    "to": addressContract,
                                                    "data": "0x9288cebc000000000000000000000000" + openkey.substr(2),
                                                }, "latest"]
                                            }),
                                            success: function (d) {
                                                console.log("new_count", hexToNum(d.result));
                                                var new_count = hexToNum(d.result);
                                                console.log("detected count:", new_count, count);
                                                if (new_count != count) {
                                                    console.log("getStatusGame")
                                                    $.ajax({
                                                        type: "POST",
                                                        url: urlInfura,
                                                        dataType: 'json',
                                                        async: false,
                                                        data: JSON.stringify({
                                                            "id": 0,
                                                            "jsonrpc": '2.0',
                                                            "method": "eth_call",
                                                            "params": [{
                                                                "from": openkey,
                                                                "to": addressContract,
                                                                "data": "0x08199931000000000000000000000000" + openkey.substr(2),
                                                            }, "latest"]
                                                        }),
                                                        success: function (d) {
                                                            var result = hexToNum(d.result);
                                                            if (result == 0) {
                                                                console.log("идет игра");
                                                            } else if (result == 1) {
                                                                console.log("YOU WIN!");
                                                                $("#random").text("YOU WIN!!! ");
                                                                disabled(false);
                                                                GetLogs();
                                                                clearInterval(Timer);
                                                                count = new_count;
                                                                $("#randomnum").html(call("getShowRnd"));
                                                                game = false;
                                                            } else if (result == 2) {
                                                                console.log("YOU LOSER!");
                                                                $("#random").text("YOU LOSE!!! ");
                                                                disabled(false);
                                                                GetLogs();
                                                                $("#randomnum").html(call("getShowRnd"));
                                                                clearInterval(Timer);
                                                                count = new_count;
                                                                game = false;
                                                            } else if (result == 3) {
                                                                console.log("Sorry, No money in the bank");
                                                                $("#random").text("Sorry, no money in the bank");
                                                                disabled(false);
                                                                GetLogs();
                                                                $("#randomnum").html(call("getShowRnd"));
                                                                clearInterval(Timer);
                                                                count = new_count;
                                                                game = false;
                                                            }
                                                            //

                                                        }
                                                    })

                                                }
                                            }
                                        });
                                    }, 5000);
                                }

                            }
                        })
                    }
                }
            }
        })
    }
}
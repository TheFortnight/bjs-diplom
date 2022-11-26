let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) location.reload();
        throw new Error(response.error);
    })
}


let ratesBoard = new RatesBoard();

function checkCurrency() {
    ApiConnector.current(response => {

        if (!response.success) throw new Error(response.error);
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data.balance);
    })
}

let ind = setInterval(() => checkCurrency(), 60000);
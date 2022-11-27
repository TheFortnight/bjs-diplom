'use strict'
let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) location.reload();
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

function runCheck() {
    checkCurrency();
    setInterval(checkCurrency, 60000);
}

runCheck();

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, response => {
        moneyManager.setMessage(response.success, response.error || 'Баланс успешно пополнен');
        if (response.success) {
            ProfileWidget.showProfile(response.data);

        }

    });
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, response => {
        moneyManager.setMessage(response.success, response.error || 'Конвертация успешно выпополнена');
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    });
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, response => {
        moneyManager.setMessage(response.success, response.error || 'Перевод успешно выпополнен');
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    })
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, response => {
        favoritesWidget.setMessage(response.success, response.error || 'Пользователь добавлен в избранные');
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
}

favoritesWidget.removeUserCallback = function(data){
    ApiConnector.removeUserFromFavorites(data, response => {
        favoritesWidget.setMessage(response.success, response.error || 'Пользователь удален из избранных');
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    })
}
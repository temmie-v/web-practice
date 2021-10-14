window.addEventListener('DOMContentLoaded', function () {
    var favButton = document.getElementById('fav_btn');
    favButton.addEventListener('click', function () {
        var favNumberElement = document.getElementById('fav_number');
        var currentFavNumber = Number(favNumberElement.innerText);
        var newFavNumber = currentFavNumber + 1;
        favNumberElement.innerText = newFavNumber;
    });
});
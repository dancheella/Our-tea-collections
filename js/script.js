//Slider
$('.slider').slick({
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    draggable: true
});

//Accordion
$("#accordion").accordion({
    heightStyle: "content",
    collapsible: true
});

//Валидация формы
let inputName = $('#inputName');
let inputSurname = $('#inputSurname');
let inputPhone = $('#inputPhone');
let inputCountry = $('#inputCountry');
let inputIndex = $('#inputIndex');
let inputAddress = $('#inputAddress');

$('#btnSubmit').click(function () {

    if (!inputName.val().trim() || !inputSurname.val().trim() || !inputPhone.val().trim() || !inputCountry.val().trim() || !inputIndex.val().trim() || !inputAddress.val().trim()) {
        alert('Заполните все поля!');
        return;
    }

    if (inputIndex.val().trim().length !== 6) {
        alert('Индекс должен состоять из 6 символов!');
        return;
    }

    $('#form').remove();
    $('.title').text('Спасибо за заказ!');
});

//Всплывание картинки
$('.card-image').magnificPopup({
    type: 'image',
});

//Wow.js
new WOW({
    animateClass: 'animate__animated'
}).init();

//Маска
inputPhone.mask("+375 (99) 999-99-99");
inputIndex.mask("999999");

//поля input
let reg = /[^A-Za-zА-Яа-яЁё]/g;

inputName.on('input', function () {
    $(this).val($(this).val().replace(reg, ''));
});
inputSurname.on('input', function () {
    $(this).val($(this).val().replace(reg, ''));
});
inputCountry.on('input', function () {
    $(this).val($(this).val().replace(reg, ''));
});
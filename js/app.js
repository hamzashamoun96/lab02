'use strict';


let optionArr = [];
let objectArr = [];

$.ajax('./data/page-1.json')
    .then(data => {
        data.forEach(value => {
            let newImage = new Images(value);
            newImage.RenderOption();
            newImage.RenderTemplate();
            objectArr.push(newImage);
        });
        $('.photo-template').first().remove();
    })

$('select').on('change', function () {
    $('.photo-template').not(':first').remove();
    objectArr.forEach((value) => {
        if (value.keyword === $(this).val()) {
            let newTemplate = $('.photo-template').first().clone();
            newTemplate.find('h2').text(value.title);
            newTemplate.find('img').attr('src', value.url);
            newTemplate.find('p').text(value.description);
            $('main').append(newTemplate);
        }
    })
    

    if ($(this).val() === 'default') {
        objectArr.forEach((value) => {
            let newTemplate = $('.photo-template').first().clone();
            newTemplate.find('h2').text(value.title);
            newTemplate.find('img').attr('src', value.url);
            newTemplate.find('p').text(value.description);
            $('main').append(newTemplate);

        })
    }
    $('.photo-template').first().remove();
})





function Images(value) {
    this.url = value.image_url;
    this.title = value.title;
    this.description = value.description;
    this.keyword = value.keyword;
    this.horns = value.horns;
}
Images.prototype.RenderOption = function () {

    if (!(optionArr.includes(this.keyword))) {

        let newOption = $('option').first().clone();
        newOption.text(this.keyword);
        newOption.val(this.keyword)
        $('select').append(newOption);
        optionArr.push(this.keyword);
    }
}
Images.prototype.RenderTemplate = function () {

    let newTemplate = $('.photo-template').first().clone();
    newTemplate.find('h2').text(this.title);
    newTemplate.find('img').attr('src', this.url);
    newTemplate.find('p').text(this.description);
    $('main').append(newTemplate);
}
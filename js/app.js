'use strict';


let optionArr = [];
let objectArr = [];
let trigger = true;

$.ajax('./data/page-1.json')
    .then(data => {
        data.forEach(value => {
            let newImage = new Images(value);
            newImage.render();
            newImage.RenderOption();
            objectArr.push(newImage);
        });
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
        $('#selectType').append(newOption);
        optionArr.push(this.keyword);
    }
}
Images.prototype.render = function () {
    let template = $('#template-section1').html();
    let newImage = Mustache.render(template, this);
    $('#container').append(newImage);
    return newImage;
}
Images.prototype.render2 = function () {
    let template = $('#template-section2').html();
    let newImage = Mustache.render(template, this);
    $('#container').append(newImage);
    return newImage;
}


$('#btn1').on('click', function () {
    $('.photo-template2').hide();
    $('.photo-template1').show();
})

$('#btn2').on('click', function () {
    $('.photo-template1').hide();
    $('.photo-template2').show();
    if (trigger) {
        $.ajax('./data/page-2.json')
            .then(data => {
                data.forEach(value => {
                    let newImage = new Images(value);
                    newImage.render2();
                    newImage.RenderOption();
                    objectArr.push(newImage);
                });
            })
    }
    trigger = false;

})

$('#selectType').on('change', function () {
    $('.photo-template1').hide();
    $('.photo-template2').hide();

    objectArr.forEach((value) => {
        if (value.keyword === $(this).val()) {
            $(`.${value.keyword}`).show();
        }
    })

    if ($(this).val() === 'default') {
        $('.photo-template1').show();
        $('.photo-template2').hide();
    }

})

$('#selectSort').on('change', function () {
    $('.photo-template1').remove();
    $('.photo-template2').remove();

    if ($(this).val() === 'Horn') {
        objectArr.sort((a, b) => {
            if (a.horns < b.horns) {
                return -1;
            } else if (a.horns > b.horns) {
                return 1;
            } else {
                return 0;
            }
        })
        objectArr.forEach(value => {
            value.render();
        })
    } else {
        objectArr.sort((a, b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                //  console.log(a.name.toUpperCase())
                return -1;
            }
            else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            }

            else {
                return 0;
            }
        })
        objectArr.forEach(value => {
            value.render();
        })
    }

})
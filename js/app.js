'use strict';



$.ajax('./data/page-1.json')
.then(data =>{
    data.forEach(value => {
        let newImage = new Images (value);
        newImage.RenderOption();
        newImage.RenderTemplate();
    });
    $('#photo-template').first().remove();
})

$('select').on('change',function(){

    console.log($(this).val())
    $('main').html("");
  /*  data.forEach(value =>{
        if(value.keyword === $(this).val()){
            let newImage = new Images (value);
            newImage.RenderTemplate();
        }
    });*/
})









function Images (value){
    this.url = value.image_url;
    this.title = value.title;
    this.description = value.description;
    this.keyword = value.keyword;
    this.horns = value.horns;
}
Images.prototype.RenderOption = function(){
   let newOption = $('option').first().clone();
   newOption.text(this.title);
   newOption.val(this.keyword)
   $('select').append(newOption);
}
Images.prototype.RenderTemplate = function(){
    let newTemplate = $('#photo-template').first().clone();
    newTemplate.find('h2').text(this.title);
    newTemplate.find('.img').attr('src' , this.url);
    newTemplate.find('.p').text(this.description);
    $('main').append(newTemplate);
}
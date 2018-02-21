$.getJSON("/saved/articles", data => {
    console.log(data)
    // For each one
    data.forEach(el => {
        $("#saved_articles").append(`<div class ='card'> <div class='card-header'>${el.title}</div>
        <div class="card-body">
        <p class ='card-text '>${el.link}</p>
        <button type='button' data-id=${el._id} id='save-article' class='btn btn-danger' data-toggle='modal' data-target='#note-article'>Add Notes</button></div></div>`)
    })
  });
$(document).on('click','#save-article', function(){
    
    let id = $(this).attr('data-id')
    console.log(id)
    $('.modal-title').text(`Notes For Article: ${id}`)
    $('modal').modal()
})
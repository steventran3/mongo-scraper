$.getJSON("/saved/articles", data => {
    // console.log(data)
    // For each one
    data.forEach(el => {
        $("#saved_articles").append(`<div class ='card'> <div class='card-header'>${el.title}</div>
        <div class="card-body">
        <p class ='card-text '>${el.link}</p>
        <button type='button' data-id=${el._id} id='save-article' class='btn btn-danger' data-toggle='modal' data-target='#note-article'>Add Notes</button></div></div>`)
    })
  });
  let id
$(document).on('click','#save-article', function(){
    
    id = $(this).attr('data-id')
    // console.log(id)
    
   $.get('/note/' + id).then(function(data){
    console.log(data)
   })
    $('.modal-title').text(`Notes For Article: ${id}`)
    
    $('modal').modal()
})

$(document).on('click','#save-note', function(){
    console.log(id)
    let note = $('#note').val()
    console.log(note)
    $.ajax({
        method: 'POST',
        url: '/note/'+id,
        data:{
            note: note
        }
    })
        .then(function(data){
            console.log(data)
            $('#note').empty()
        })
})
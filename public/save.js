$.getJSON("/saved/articles", data => {
    console.log(data)
    // For each one
    data.forEach(el => {
        $("#saved_articles").append(`<div class ='card'> <div class='card-header'>${el.title}</div>
        <div class="card-body">
        <p class ='card-text '>${el.link}</p>
        <button data-id=${el._id} type='button' class='btn btn-danger id='myBtn'>Add Note</button></div></div>`)
    })
  });
$(document).on('click','#myBtn', function(){
    $('myModal').modal()
    alert('hello')
})
  


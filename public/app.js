// Grab the articles as a json
$.getJSON("/articles", data => {
    console.log(data)
    // For each one
    data.forEach(el => {
        $("#articles").append(`<div class ='card'> <div class='card-header'>${el.title}</div>
        <div class="card-body">
        <p class ='card-text '>${el.link}</p>
        <button data-id=${el._id} id='save-article' class='btn btn-danger'>Save Article</button></div></div>`)
    })
  });

  $('.scrape').on('click', () =>{
      $.get('/scrape').then(result => location.reload())
  });

  $(document).on('click', '#save-article', function(){
    let thisId = $(this).attr('data-id')
    console.log(thisId)

    $.ajax({
        method: 'POST',
        url: '/articles/'+thisId
    })

  });
/* JavaScript method */

/* call on the class or ID of the parent element of the .nav component */

$('body').scrollspy({ target: '.navbarLinks' });

/* if adding or removing DOM elements, call the refresh method */

$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh');
});

/* ------------------------
Image Gallery
-------------------------*/

//click on thumbnail image
//$(document).ready(function(){
$('li img').on('click',function(){
    var src = $(this).attr('src');
    var img = '<img src="' + src + '" class="img-responsive"/>';
    // index method traverses from thumbnail to parent li item and stores its index
    // first array index is 0
    var index = $(this).parent('li').index();

    var html = '';
    html += img;                
    html += '<div style="height:25px;clear:both;display:block;">';
    html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
    html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
    html += '</div>';

    $('#myModal').modal();
    $('#myModal').on('shown.bs.modal', function(){
    //hide or show the right links when first or last image is clicked
      $('#myModal .modal-body').html(html);
      $('a.controls').trigger('click');
    })
    $('#myModal').on('hidden.bs.modal', function(){
      $('#myModal .modal-body').html('');
    });
  });
//})

//set up click handler for previous and next buttons
$(document).on('click', 'a.controls', function(){
  var index = $(this).attr('href');
  var src = $('ul.imageGallery li:nth-child('+ index + ') img').attr('src');
  $('.modal-body img').attr('src', src);

  var newPrevIndex = parseInt(index) - 1;
  var newNextIndex = parseInt(newPrevIndex) + 2;

  if($(this).hasClass('previous')) {
    $(this).attr('href', newPrevIndex);
    $('a.next').attr('href', newNextIndex);
  } else {
    $(this).attr('href', newNextIndex);
    $('a.previous').attr('href', newPrevIndex);
  }

  // hide "next" link on last image and "prev" on first
  var total = $('ul.imageGallery li').length + 1;
  // hide next button
  if (total === newNextIndex) {
    $('a.next').hide();
  } else {
    $('a.next').show()
  }
  // hide previous button
  if (newPrevIndex === 0) {
    $('a.previous').hide();
  } else {
    $('a.previous').show()
  }
    return false;
});



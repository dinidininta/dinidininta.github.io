(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  var projects = [
      {projectID: "explorepalembang", projectName: "#ExplorePalembang", slides: "5",
      description: "#ExplorePalembang is an Android based quiz game that was developed as a participant of 'IT TODAY 2015' Game Development Competition in Institut Pertanian Bogor and 'Technology Euphoria 2015' Mobile Game Development Competition in Universitas Sriwijaya. In this game, there are five levels and each level consists of ten boxes of question. Behind the boxes is hidden a picture of Palembang landmark. Player is given 100 points of score by default for each level. Every opened box decreases the score by 10 points, so the player has to open as few boxes as possible.", 
      languages: "C#", tools: "Unity 2D"},
      {projectID: "quotegenerator", projectName: "Quote Generator", slides: "4", description: "Quote Generator is an Android application.", languages: "Java, XML", tools: "Android Studio"},
      {projectID: "saleskit", projectName: "Saleskit Bank Sumsel Babel", slides: "3", description: "Lorem ipsum dolor si amet", languages: "idk", tools: "idk"}];

  $(document).ready(function(){
    for(let i = 0; i < projects.length; i++) {
      $('<div class="gallery col-md-6 col-lg-4">'+
        '<a class="portfolio-item d-block mx-auto" href="#portfolio-modal-'+i+'">'+
        '<div class="portfolio-item-caption d-flex position-absolute h-100 w-100">'+
        '<div class="portfolio-item-caption-content my-auto w-100 text-center text-white">'+
        '<i class="fas fa-search-plus fa-3x"></i>'+
        '<br>'+projects[i].projectName+'</br></div></div>'+
        '<img class="img-fluid" src="img/portfolio/'+projects[i].projectID+'.png" alt=""></a></div>').appendTo('.projects-row');
      
      $('<!-- Protfolio Modal '+i+ ' -->'+
        '<div class="portfolio-modal mfp-hide" id="portfolio-modal-'+i+'" name="portfolio-modal-'+i+'">'+
        '<div class="portfolio-modal-dialog bg-white">'+
        '<a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">'+
        '<i class="fa fa-3x fa-times"></i></a>'+
        '<div class="container text-center">'+
        '<div class="row">'+
        '<div class="col-lg-8 mx-auto">'+
        '<h2 class="text-secondary text-uppercase mb-0">'+projects[i].projectName+'</h2>'+
        '<hr class="star-dark mb-5">'+
        '<!-- <img class="img-fluid mb-5" src="img/portfolio/cabin.png" alt=""> -->'+
        '<div id="carousel" class="carousel slide" data-ride="carousel">'+
        '<ol class="carousel-indicators" id="carousel-indicators-'+i+'"></ol>'+
        '<div class="carousel-inner" id="carousel-inner-'+i+'"></div>'+
        '<a class="left carousel-control-prev" href="#carousel" data-slide="prev">'+
        '<span class="carousel-control-prev-icon"></span></a>'+              
        '<a class="right carousel-control-next" href="#carousel" data-slide="next">'+
        '<span class="carousel-control-next-icon"></span></a></div>'+
        '<p class="mb-5">'+projects[i].description+'</p>'+
        '<p>*This game is a prototype, so it still lacks data saving feature and has bugs such as  unresponsive textfields in question boxes and changing symbol in Mute button.</p>'+
        '<p>Programming Languages: '+projects[i].languages+'</p>'+
        '<p>Tools: '+projects[i].tools+'</p>'+
        '<div class="row">'+
        '<div class="col"><a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">'+
        '<i class="fa fa-close"></i>Try Me</a></div>'+
        '<div class="col"><a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">'+
        '<i class="fa fa-close"></i>Preview Source Code</a></div></div></div></div></div></div></div>').appendTo('.modal-container');
      
      console.log(projects[i].projectID);
    }
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  var emptyCarousel = function(index){
    $('.carousel-inner').empty();
    $('.carousel-indicators').empty();
  };

  var loadCarousel = function(index){
    emptyCarousel();
    var n = parseInt(projects[index].slides);
    for(let i = 0; i < n; i++) {
      $('<div class="carousel-item"><img class="img-fluid" src="img/portfolio/explorepalembang/'+i+'.png" alt=""></div>').appendTo('.carousel-inner');
      $('<li data-target="#carousel" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
    }
      $('.carousel-item').first().addClass('active');
      $('.carousel-indicators > li').first().addClass('active');
      $('#carousel').carousel();
  };

  // Magnific Popup function
  $(document).on('click', '.portfolio-item', function(e){
    e.preventDefault();
    var contentID = $(this).attr('href');
    var index = $(this).attr('href').toString().split("-")[2];
    console.log(contentID);
    console.log(index);
    $(this).magnificPopup({
        items: {
          type: 'inline',
          src: contentID
        },
        callbacks: {
          open: function(){
            loadCarousel(index);
          }
        },
        preloader: false,
        focus: '#username',
        modal: true
    }).magnificPopup('open');
  });

  $(document).on('click', '.portfolio-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

  $(".left").click(function(){
    $("#carousel").carousel("prev");
  });

  $(".right").click(function(){
    $("#carousel").carousel("next");
  });

})(jQuery); // End of use strict

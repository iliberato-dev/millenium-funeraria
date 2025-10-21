(function ($) {
  "use strict";

  window.addEventListener("load", (event) => {
    //isotope
    $(".isotope-container").isotope({
      // options
      itemSelector: ".item",
      layoutMode: "masonry",
    });

    var $grid = $(".entry-container").isotope({
      itemSelector: ".entry-item",
      layoutMode: "masonry",
    });

    // Initialize Isotope
    var $container = $(".isotope-container").isotope({
      // options
      itemSelector: ".item",
      layoutMode: "masonry",
    });

    $(document).ready(function () {
      //active button
      $(".filter-button").click(function () {
        $(".filter-button").removeClass("active");
        $(this).addClass("active");
      });
    });

    // Filter items on button click
    $(".filter-button").click(function () {
      var filterValue = $(this).attr("data-filter");
      if (filterValue === "*") {
        // Show all items
        $container.isotope({ filter: "*" });
      } else {
        // Show filtered items
        $container.isotope({ filter: filterValue });
      }
    });
  });

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });
  };

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  };

  var initProductQty = function () {
    $(".product-qty").each(function () {
      var $el_product = $(this);
      var quantity = 0;

      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        $el_product.find("#quantity").val(quantity + 1);
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        if (quantity > 0) {
          $el_product.find("#quantity").val(quantity - 1);
        }
      });
    });
  };

  // Função para controlar o menu de navegação
  var initMenuNavigation = function () {
    let isNavigating = false;

    // Função para calcular a posição da seção
    function getTargetPosition(targetSection) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const rect = targetSection.getBoundingClientRect();
      return rect.top + window.pageYOffset - headerHeight - 20; // 20px de margem extra
    }

    // Função para rolar até a seção
    function scrollToSection(targetPosition) {
      isNavigating = true;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Resetar flag após a animação
      setTimeout(() => {
        isNavigating = false;
      }, 800);
    }

    // Handler para links do menu
    function handleMenuClick(e) {
      e.preventDefault();
      if (isNavigating) return;

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      const menuMobile = document.querySelector("#bdNavbar");
      const bsOffcanvas =
        menuMobile && bootstrap.Offcanvas.getInstance(menuMobile);

      if (bsOffcanvas && menuMobile.classList.contains("show")) {
        // Se o menu mobile estiver aberto, fecha ele primeiro
        const targetPosition = getTargetPosition(targetSection);
        bsOffcanvas.hide();

        // Espera o menu fechar antes de rolar
        menuMobile.addEventListener(
          "hidden.bs.offcanvas",
          function handler() {
            scrollToSection(targetPosition);
            menuMobile.removeEventListener("hidden.bs.offcanvas", handler);
          },
          { once: true }
        );
      } else {
        // Se não tiver menu mobile aberto, rola direto
        scrollToSection(getTargetPosition(targetSection));
      }
    }

    // Adiciona listeners aos links do menu
    document
      .querySelectorAll('a[href^="#"]:not([href="#"])')
      .forEach((link) => {
        link.addEventListener("click", handleMenuClick);
      });

    // Previne mudança de scroll ao fechar o menu mobile
    const menuMobile = document.querySelector("#bdNavbar");
    if (menuMobile) {
      let lastScroll = 0;

      menuMobile.addEventListener("show.bs.offcanvas", () => {
        lastScroll = window.pageYOffset;
      });

      menuMobile.addEventListener("hidden.bs.offcanvas", () => {
        if (!isNavigating) {
          window.scrollTo(0, lastScroll);
        }
      });
    }
  };

  // Função para inicializar o botão Voltar ao Topo
  var initBackToTop = function () {
    // Cria o botão dinamicamente
    const button = document.createElement("button");
    button.id = "backToTop";
    button.innerHTML = "&uarr;"; // Seta para cima
    button.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(button);

    // Controla a visibilidade do botão
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        button.classList.add("visible");
      } else {
        button.classList.remove("visible");
      }
    });

    // Adiciona o evento de clique
    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  $(document).ready(function () {
    // Inicializa a navegação do menu
    initMenuNavigation();
    // Inicializa o botão Voltar ao Topo
    initBackToTop();

    var swiper = new Swiper(".slider", {
      effect: "fade",
      navigation: {
        nextEl: ".main-slider-button-next",
        prevEl: ".main-slider-button-prev",
      },
    });

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      loop: true,
      slidesPerView: 3,
      autoplay: true,
      direction: "vertical",
      spaceBetween: 30,
    });

    var large_slider = new Swiper(".product-large-slider", {
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      effect: "fade",
      thumbs: {
        swiper: thumb_slider,
      },
    });

    var swiper = new Swiper(".swiper-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    // Animate on Scroll
    AOS.init({
      duration: 1000,
      once: true,
    });

    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585,
    });

    initChocolat();
    initJarallax();
    initProductQty();
  }); // End of a document
})(jQuery);

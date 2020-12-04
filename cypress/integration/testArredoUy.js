/// <reference types="cypress" />
context("Arredo Uy", { baseUrl: "https://www.arredo.com.uy/", defaultCommandTimeout: 10000 }, () => {
  describe("Buscador", () => {
    describe("Desplegable", () => {
      it("Request al endpoint de Braindw", () => {
        cy.visit("/");
        cy.wait(10000);
        cy.intercept({
          method: "GET",
          url:
            "https://u.braindw.com/vtex/buscaautocomplete/arredo-uy/?maxRows=10&productNameContains=sabana&suggestionsStack=&sc=2",
        }).as("apiCheck");
        cy.get(".fulltext-search-box").type("sabana", { force: true });
        cy.wait("@apiCheck").then((interception) => {
          assert.isNotNull(interception.response.body, "1st API call has data");
        });
      });
      it("La busqueda trae resultados", () => {
        cy.visit("/");
        cy.get(".fulltext-search-box").type("sabana", { force: true });
        cy.get(".ui-menu-item");
      });
    });
    describe("Grilla de resultados", () => {
      it("Request al endpoint de Braindw", () => {
        cy.visit("/");
        cy.intercept({
          method: "GET",
          url:
            "https://u.braindw.com/vtex/buscaautocompleteids/arredo-uy/?maxRows=100&productNameContains=sabana&suggestionsStack=&sc=2",
        }).as("apiCheck");
        cy.get(".fulltext-search-box").type("sabana{enter}", { force: true });
        cy.wait("@apiCheck").then((interception) => {
          assert.isNotNull(interception.response.body, "1st API call has data");
        });
      });
      it("Busqueda trae resultados", () => {
        cy.visit("/");
        cy.get(".fulltext-search-box").type("sabana{enter}", { force: true });
        cy.get(".box-item");
      });
    });
  });
  describe("Gondola checkout", () => {
    it("Agrego un producto al carro", () => {
      cy.visit("/habitacion/sabanas");
      cy.wait(5000);
      cy.get(".product-link").eq(0).click({ force: true });
      cy.wait(15000);
      cy.get(".buy-in-page-button").eq(0).click({ force: true });
    });
    it("Aparece gondola en checkout", () => {
      cy.visit("/checkout#/cart");
      cy.wait(10000);
      cy.getIframeBody("Braindw45").find(".owl-item:not(.cloned)");
    });
  });
  describe("Gondolas pagina de producto", () => {
    describe("Producto 1", () => {
      it("Aparece Gondola También podría interesarte", () => {
        cy.visit("/habitacion/sabanas");
        cy.wait(5000);
        cy.get(".product-link").eq(0).click({ force: true });
        cy.wait(15000);
        cy.getIframeBody("Braindw14").find(".owl-item:not(.cloned)");
      });
      it("Aparece Gondola Personas que se interesan en este producto compran", () => {
        cy.visit("/habitacion/sabanas");
        cy.wait(5000);
        cy.get(".product-link").eq(0).click({ force: true });
        cy.wait(15000);
        cy.getIframeBody("Braindw15").find(".owl-item:not(.cloned)");
      });
    });
    describe("Producto 2", () => {
      it("Aparece Gondola También podría interesarte", () => {
        cy.visit("/habitacion/sabanas");
        cy.wait(5000);
        cy.get(".product-link").eq(1).click({ force: true });
        cy.wait(15000);
        cy.getIframeBody("Braindw14").find(".owl-item:not(.cloned)");
      });
      it("Aparece Gondola Personas que se interesan en este producto compran", () => {
        cy.visit("/habitacion/sabanas");
        cy.wait(5000);
        cy.get(".product-link").eq(1).click({ force: true });
        cy.wait(15000);
        cy.getIframeBody("Braindw15").find(".owl-item:not(.cloned)");
      });
    });
    describe("Producto 3", () => {
      it("Aparece Gondola También podría interesarte", () => {
        cy.visit("/habitacion/sabanas");
        cy.wait(5000);
        cy.get(".product-link").eq(2).click({ force: true });
        cy.wait(15000);
        cy.getIframeBody("Braindw14").find(".owl-item:not(.cloned)");
      });
      it("Aparece Gondola Personas que se interesan en este producto compran", () => {
        cy.visit("/habitacion/sabanas");
        cy.wait(5000);
        cy.get(".product-link").eq(2).click({ force: true });
        cy.wait(15000);
        cy.getIframeBody("Braindw15").find(".owl-item:not(.cloned)");
      });
    });
  });
  describe("Gondola pagina categoria", () => {
    it("Categoria habitacion", () => {
      cy.visit("/habitacion");
      cy.wait(10000);
      cy.getIframeBody("Braindw12").find(".owl-item:not(.cloned)");
    });
    it("Categoria sabanas", () => {
      cy.visit("https://www.arredo.com.uy/habitacion/sabanas");
      cy.wait(10000);
      cy.getIframeBody("Braindw12").find(".owl-item:not(.cloned)");
    });
  });
  describe("Home", () => {
    it("Aparece caja de registro", () => {
      // load the page, but disable the service worker
      // https://glebbahmutov.com/blog/cypress-tips-and-tricks/#disable-serviceworker
      cy.visit("/", {
        onBeforeLoad (win) {
          delete win.navigator.__proto__.serviceWorker
        }
      });
      cy.get("#braindw_register", {timeout: 10000});
    });
    it("Gondola con imagen a la izquierda", () => {
      cy.visit("/");
      cy.getIframeBody("Braindw4").find(".owl-item:not(.cloned)");
    });
    it("Gondola te podria interesar", () => {
      cy.visit("/");
      cy.getIframeBody("Braindw3").find(".owl-item:not(.cloned)");
    });
    it("Gondola recomendado para vos", () => {
      cy.visit("/");
      cy.getIframeBody("Braindw8").find(".owl-item:not(.cloned)");
    });
    it("Gondola ultimos vistos", () => {
      cy.visit("/");
      cy.getIframeBody("Braindw9").find(".owl-item:not(.cloned)");
    });
  });
});

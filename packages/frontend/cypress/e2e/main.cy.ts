function getBasketItemsCount() {
  return cy
    .findByRole("link", {
      name: /корзина/i,
    })
    .invoke("html")
    .then((balance) => {
      const arrayOfNumbers = balance.match(/\d+/);
      return !Array.isArray(arrayOfNumbers) || arrayOfNumbers.length !== 1 ? 0 : +arrayOfNumbers[0];
    });
}

describe("main spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("select dx-racer tag", () => {
    cy.findByRole("button", {
      name: /dx\-racer/i,
    })
      .click()
      .should("satisfy", ($el) => $el[0].classList[0].includes("primary"));
  });

  it("basket add/remove item", () => {
    cy.findAllByRole("button", {
      name: /купить/i,
    }).then((buttons) => {
      if (buttons.length === 0) return;
      buttons[0].click();
    });

    cy.wait(500);

    getBasketItemsCount().should("equal", 1);

    cy.findByRole("link", {
      name: /корзина/i,
    }).click();

    cy.findByRole("button", {
      name: /убрать/i,
    }).click();

    cy.wait(500);

    getBasketItemsCount().should("equal", 0);
  });
});

export {};

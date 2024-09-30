/* eslint-disable */
// cypress/e2e/signup.cy.js
describe('Signup Modal Test', () => {
    it('sollte das Anmeldeformular im Modal erfolgreich ausfüllen', () => {
      // Besuche die Startseite
      cy.visit('/'); // Prüfen, dass die Hauptseite lädt
  
      // Finde den Button "Registrieren" in der Navigationsleiste und klicke darauf
      cy.contains('Register').click(); // Klicken auf den "Register"-Button
  
      // Überprüfe, ob das Modal angezeigt wird
      cy.get('.modal').should('be.visible'); // Modal sollte sichtbar sein
  
      // Generiere einen einzigartigen Benutzernamen und E-Mail
      const uniqueSuffix = Date.now(); // Aktuelle Zeit in Millisekunden
      const username = `testuser${uniqueSuffix}`; // z.B. testuser1633017089901
      const email = `testuser${uniqueSuffix}@example.com`; // z.B. testuser1633017089901@example.com
  
      // Fülle das Anmeldeformular im Modal aus
      cy.get('input[placeholder="Benutzernamen"]').type(username); // Benutzernamen eingeben
      cy.get('input[placeholder="Email"]').type(email); // E-Mail eingeben
      cy.get('input[placeholder="Passwort"]').type('Test123!'); // Passwort eingeben
  
      // Klicke auf den Registrierungsbutton im Modal
      cy.contains('Registrieren').click(); // Klicken auf den Button "Registrieren"
  
      // Überprüfe, ob das Modal nach der erfolgreichen Registrierung geschlossen wurde
    //   cy.get('.modal').should('not.exist'); // Modal sollte nicht mehr existieren
  
      // Optional: Überprüfen, ob eine Erfolgsmeldung angezeigt wird
      cy.contains('Registrierung erfolgreich! Bitte melde dich an.').should('be.visible');
    });
  });
  
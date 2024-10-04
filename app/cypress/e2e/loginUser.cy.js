/* eslint-disable */
// cypress/e2e/loginUser.cy.js
describe('Login Modal Test', () => {
  it('sollte das Login im Modal erfolgreich ausfüllen', () => {
    // Besuche die Startseite
    cy.visit('/') // Prüfen, dass die Hauptseite lädt

    // Finde den Button "Login" in der Navigationsleiste und klicke darauf
    cy.contains('Login').click() // Klicken auf den "Login"-Button

    // Überprüfe, ob das Modal angezeigt wird
    cy.get('.modal').should('be.visible') // Modal sollte sichtbar sein

    // E-Mail und Passwort eingeben
    const email = `testuser6@example.com`
    const password = `Test1234!`

    // Fülle das Login im Modal aus
    cy.get('input[placeholder="Email"]').type(email) // E-Mail eingeben
    cy.get('input[placeholder="Passwort"]').type(password) // Passwort eingeben

    // Klicke auf den Login im Modal
    cy.get('button[type="submit"].primary.w-100')
      .should('be.visible') // Überprüfe, ob der Button sichtbar ist
      .should('not.be.disabled') // Überprüfe, ob der Button nicht deaktiviert ist
      .click() // Klicken auf den Button "Login"

    // Überprüfe, ob das Modal nach dem Login geschlossen wurde
    cy.get('.modal').should('not.exist') // Modal sollte nicht mehr existieren

    // Überprüfe das Vorhandensein des Tokens im localStorage
    cy.window()
      .its('localStorage.token')
      .should('exist')
      .then((token) => {
        // Protokolliere das Token zur Fehlerbehebung
        cy.log(`Token: ${token}`)
        // Dekodiere das JWT-Token
        const decodedToken = JSON.parse(atob(token.split('.')[1])) // Dekodiere das JWT-Token (sofern es ein JWT ist)
        cy.log(`Decoded Token: ${JSON.stringify(decodedToken)}`) // Protokolliere das dekodierte Token

        // Überprüfe die Struktur des Tokens
        expect(decodedToken).to.have.property('role') // Sicherstellen, dass die Rolle vorhanden ist
        const userRole = decodedToken.role // Angenommene Struktur des Tokens

        // Überprüfe die URL basierend auf der Benutzerrolle
        if (userRole === 'admin') {
          cy.url().should('include', '/admin/dashboard') // Überprüfe, ob die URL das Admin-Dashboard enthält
        } else if (userRole === 'user') {
          cy.url().should('include', '/users/dashboard') // Überprüfe, ob die URL das User-Dashboard enthält
        }
      })
  })
})

/* eslint-disable */
import 'cypress-file-upload' // Importiere das Plugin für Datei-Uploads

describe('Event Creation Test', () => {
  const email = 'testuser6@example.com' // Test-E-Mail
  const password = 'Test1234!' // Test-Passwort

  const generateUniqueEventData = () => {
    const uniqueSuffix = Date.now() // Einzigartiger Suffix basierend auf der aktuellen Zeit
    const today = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(today.getFullYear() + 1) // Ein Jahr in die Zukunft

    // Generiere ein zufälliges Datum zwischen heute und maxDate
    const futureDate = new Date(
      today.getTime() + Math.random() * (maxDate - today)
    )
    const yyyy = futureDate.getFullYear()
    const mm = String(futureDate.getMonth() + 1).padStart(2, '0') // Monat mit führender Null
    const dd = String(futureDate.getDate()).padStart(2, '0') // Tag mit führender Null

    return {
      title: `Test Event-${uniqueSuffix}`, // Dynamischer Titel mit uniqueSuffix
      description: `Dies ist ein Test Event-${uniqueSuffix}.`, // Dynamische Beschreibung mit uniqueSuffix
      date: `${yyyy}-${mm}-${dd}`, // Generiertes Datum
    }
  }

  before(() => {
    // Vorab einloggen
    cy.visit('/') // Besuche die Startseite
    cy.contains('Login').click() // Klicke auf den "Login"-Button
    cy.get('.modal').should('be.visible') // Überprüfe, ob das Modal sichtbar ist

    // Fülle das Login im Modal aus
    cy.get('input[placeholder="Email"]').type(email) // E-Mail eingeben
    cy.get('input[placeholder="Passwort"]').type(password) // Passwort eingeben
    cy.get('button[type="submit"].primary.w-100').click() // Klicken auf den Button "Login"

    // Überprüfe, dass das Modal geschlossen wurde und der Benutzer auf das Dashboard geleitet wurde
    cy.get('.modal').should('not.exist')
    cy.url().should('include', '/users/dashboard') // Überprüfe die URL nach dem Login

    // Gehe zur Event-Erstellungsseite
    cy.contains('Event erstellen').should('be.visible').click() // Klicken auf "Event erstellen"
  })

  it('sollte ein Event erfolgreich erstellen', () => {
    // Generiere die Eventdaten vor dem Test
    const { title, description, date } = generateUniqueEventData()

    // Überprüfe, dass die Event-Erstellungsseite geladen ist
    cy.get('h1').should('contain', 'Event erstellen') // Überprüfe den Seitentitel

    // Fülle das Event-Erstellungsformular aus
    cy.get('input[placeholder="Gib den Titel des Events ein"]').type(title) // Titel eingeben
    cy.get('textarea[placeholder="Gib eine Beschreibung des Events ein"]').type(
      description
    ) // Beschreibung eingeben
    cy.get('input[type="date"]').type(date) // Datum eingeben

    // Überprüfe, dass das Input-Feld für Dateien vorhanden ist
    cy.get('input[type="file"]').should('exist').attachFile('image.jpg') // Bild hochladen

    // Klicke auf den Button "Event erstellen" im Formular
    cy.get('button.primary[type="submit"]').click() // Klicke auf "Event erstellen"

    // Überprüfe, dass eine Erfolgsmeldung angezeigt wird
    cy.get('.alert', { timeout: 10000 }) // Warte bis zu 10 Sekunden
      .should('exist') // Überprüfe, ob die Erfolgsmeldung existiert
      .and('be.visible') // Stelle sicher, dass sie sichtbar ist
      .should('contain', 'Event erfolgreich erstellt') // Erfolgsmeldung überprüfen
  })
})

// pages/forumguidelines.js
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const ForumGuidelines = () => {
  return (
    <Container className="forumguidelines-page mb-5 mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="headline mb-5">Forum-Richtlinien</h1>
          <p className="headline2 mt-2">Einleitung</p>
          <p>
            Willkommen im Ford Fiesta Enthusiasten-Forum! Um ein respektvolles
            und produktives Umfeld zu gewährleisten, bitten wir alle Mitglieder,
            die folgenden Richtlinien zu beachten.
          </p>
          <p className="headline2 mt-2">Verhaltensregeln</p>
          <ul className="text-start">
            <li>
              <strong>Respekt:</strong> Behandle alle Mitglieder mit Respekt.
              Persönliche Angriffe, Beleidigungen und Diskriminierungen werden
              nicht toleriert.
            </li>
            <li>
              <strong>Relevanz</strong> Beiträge sollten relevant und
              themenbezogen sein. Spam und Werbung sind untersagt.
            </li>
            <li>
              <strong>Urheberrechte</strong> Stelle sicher, dass du keine
              urheberrechtlich geschützten Inhalte ohne Erlaubnis teilst.
            </li>
            <li>
              <strong>Privatsphäre</strong> Veröffentliche keine persönlichen
              Informationen von dir oder anderen Mitgliedern.
            </li>
          </ul>
          <p className="headline2 mt-2">Moderation</p>
          <p>
            Unsere Moderatoren haben das Recht, Beiträge zu bearbeiten oder zu
            löschen, die gegen diese Richtlinien verstoßen. Bei wiederholten
            Verstößen kann es zu einer Sperrung des Accounts kommen.
          </p>
          <p className="headline2 mt-2">Meldung von Verstößen</p>
          <p>
            Wenn du einen Verstoß gegen die Richtlinien bemerkst, melde dies
            bitte einem Administrator. Wir werden die Angelegenheit so schnell
            wie möglich prüfen.
          </p>
          <p className="headline2 mt-2">Änderungen der Richtlinien</p>
          <p>
            Wir behalten uns das Recht vor, diese Richtlinien jederzeit zu
            ändern. Bitte überprüfe sie regelmäßig, um auf dem Laufenden zu
            bleiben.
          </p>
          <p className="headline2 mt-2">Kontakt</p>
          <p>
            Bei Fragen oder Anmerkungen zu den Forum-Richtlinien, wende dich
            bitte an:
          </p>
          <p>
            Max Mustermann
            <br />
            Musterstraße 1<br />
            12345 Musterstadt
            <br />
            E-Mail: max.mustermann@example.com
            <br />
            Telefon: 01234 567890
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default ForumGuidelines

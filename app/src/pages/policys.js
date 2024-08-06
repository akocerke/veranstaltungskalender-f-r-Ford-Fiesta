// pages/policys.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Policys = () => {
  return (
    <Container className="policys-page mb-5 mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="headline mb-5">Datenschutz</h1>
          <p className="headline2 mt-2">Einleitung</p>
          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzrichtlinie beschreibt, wie wir Ihre Daten erfassen, verwenden und schützen.
          </p>
          <p className="headline2 mt-2">Erfassung und Verwendung von Daten</p>
          <p>
            Wir erfassen verschiedene Arten von Informationen, um unseren Service bereitzustellen und zu verbessern:
          </p>
          <ul className="text-start">
            <li><strong>Persönliche Daten</strong> Informationen, die zur Identifizierung Ihrer Person verwendet werden können, wie Name, E-Mail-Adresse und Telefonnummer.</li>
            <li><strong>Nutzungsdaten</strong> Informationen darüber, wie Sie unseren Service nutzen, wie z.B. IP-Adresse, Browsertyp und Besuchsdauer.</li>
          </ul>
          <p className="headline2 mt-2">Datensicherheit</p>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen.
          </p>
          <p className="headline2 mt-2">Ihre Rechte</p>
          <p>
            Sie haben das Recht, jederzeit Auskunft über die zu Ihrer Person gespeicherten Daten zu verlangen. Weiterhin können Sie die Berichtigung, Löschung und Sperrung einzelner personenbezogener Daten verlangen.
          </p>
          <p className="headline2 mt-2">Änderungen dieser Datenschutzrichtlinie</p>
          <p>
            Wir behalten uns das Recht vor, diese Datenschutzrichtlinie jederzeit zu ändern. Die jeweils aktuelle Version ist auf unserer Webseite verfügbar.
          </p>
          <p className="headline2 mt-2">Kontakt</p>
          <p>
            Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigungen, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
          </p>
          <p>
            Max Mustermann<br />
            Musterstraße 1<br />
            12345 Musterstadt<br />
            E-Mail: max.mustermann@example.com<br />
            Telefon: 01234 567890
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Policys;

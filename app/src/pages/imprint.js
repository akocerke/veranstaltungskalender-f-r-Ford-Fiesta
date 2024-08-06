// pages/imprint.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Imprint = () => {
  return (
    <Container className="imprint-page mb-5 mt-5">
      <Row className="justify-content-center">
      <Col md={4}>
          <h1 className='headline mb-5'>Impressum</h1>
          <p className='headline2 mt-2'>Angaben gemäß § 5 TMG</p>
          <p>
            Max Mustermann<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
          <p className='headline2 mt-2'>Vertreten durch</p>
          <p>
            Max Mustermann
          </p>
          <p className='headline2 mt-2'>Kontakt</p>
          <p>
            Telefon: 01234 567890<br />
            E-Mail: max.mustermann@example.com
          </p>
          <p className='headline2 mt-2'>Umsatzsteuer-ID</p>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789
          </p>
          <p className='headline2 mt-2'>Haftungsausschluss</p>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Imprint;

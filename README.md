### Projekt: Veranstaltungskalender für Ford Fiesta (11/2001–08/2008)

#### Übersicht
Eine spezialisierte Plattform für Besitzer und Enthusiasten des Ford Fiesta (Modelljahr 11/2001–08/2008). Benutzer können Events finden, hinzufügen, bewerten und kommentieren. Events können Auto-Treffen, Reparatur-Workshops und Ausfahrten umfassen.

### Wichtige Komponenten und Funktionen

#### Benutzerverwaltung
- **Registrierung und Anmeldung**: Benutzer können sich registrieren und anmelden, um Events zu verwalten. AWS Cognito wird zur Benutzerverwaltung und Authentifizierung verwendet.
- **Profilverwaltung**: Benutzer können ihre Profile verwalten und persönliche Daten aktualisieren.

#### Event-Verwaltung
- **Event-Erstellung**: Benutzer können neue Events hinzufügen mit Details wie Titel, Beschreibung, Datum, Ort und Bild.
- **Event-Bearbeitung**: Benutzer können ihre eigenen Events bearbeiten.
- **Event-Löschung**: Benutzer können ihre eigenen Events löschen.
- **Event-Bewertung und Kommentare**: Benutzer können Events bewerten und Kommentare hinterlassen.
- **Event-Kalender**: Kalenderansicht zur Anzeige aller kommenden Events.

#### Benachrichtigungen und Erinnerungen
- **E-Mail-Benachrichtigungen**: Benutzer können sich für E-Mail-Benachrichtigungen für bevorstehende Events anmelden.
- **Push-Benachrichtigungen**: Optional können Push-Benachrichtigungen für neue oder bevorstehende Events implementiert werden.

#### Event-Suche und Filterung
- **Nach Datum filtern**: Benutzer können Events nach Datum filtern.
- **Nach Ort filtern**: Benutzer können Events nach Ort filtern.
- **Nach Kategorie filtern**: Benutzer können Events nach Kategorie (z.B. Treffen, Workshop, Ausfahrt) filtern.

### Technische Komponenten und Architektur

1. **Frontend**
   - **Technologie**: React
   - **Beschreibung**: Eine benutzerfreundliche Oberfläche zur Verwaltung und Anzeige von Events. Statische Dateien werden in AWS S3 gehostet und über CloudFront bereitgestellt.

2. **Backend**
   - **Technologie**: Express API
   - **Beschreibung**: API zur Verwaltung der Datenbankoperationen (CRUD) für Benutzer und Events.
   - **Auth**: AWS Cognito für Benutzerauthentifizierung und -verwaltung.

3. **Datenbank**
   - **Technologie**: MySQL
   - **Beschreibung**: Speicherung von Benutzerdaten, Events und Bewertungen. Gehostet auf AWS RDS.

4. **Deployment**
   - **Backend**: Gehostet auf AWS EC2
   - **Datenbank**: Gehostet auf AWS RDS
   - **Statische Dateien**: Gehostet auf AWS S3
   - **Content Delivery**: AWS CloudFront zur Beschleunigung der Auslieferung der statischen Dateien.
   - **Autoscaling**: AWS Autoscaling Groups zur automatischen Skalierung der Backend-Server.

### Datenstruktur und -management

#### Tabellenstruktur

**Benutzer**:
- ID
- Benutzername
- E-Mail
- Passwort (verschlüsselt)
- Erstellungsdatum

**Events**:
- ID
- Benutzer-ID (Referenz auf Benutzer)
- Titel
- Beschreibung
- Ort
- Datum
- Bild-URL
- Erstellungsdatum

**Bewertungen**:
- ID
- Event-ID (Referenz auf Event)
- Benutzer-ID (Referenz auf Benutzer)
- Bewertung (1-5)
- Kommentar
- Erstellungsdatum

### Mögliche Erweiterungen
- **Soziale Funktionen**: Integration von sozialen Medien zur einfachen Event-Teilung.
- **Geo-Location**: Automatische Erkennung des Standorts des Benutzers zur Anzeige von lokalen Events.
- **Event-Benachrichtigungen**: Erweiterte Benachrichtigungsoptionen wie SMS oder Push-Benachrichtigungen.

### Nächste Schritte
1. **Planung**: Detailplanung der Funktionen und Benutzeroberflächen.
2. **Design**: UI/UX-Design für eine benutzerfreundliche Oberfläche.
3. **Prototyping**: Erstellung eines funktionalen Prototyps zur Validierung der Idee.
4. **Implementierung**: Schrittweise Implementierung der einzelnen Komponenten.
5. **Testing**: Umfangreiche Tests zur Sicherstellung der Funktionalität und Benutzerfreundlichkeit.
6. **Deployment**: Vorbereitung und Durchführung des Deployments auf AWS.

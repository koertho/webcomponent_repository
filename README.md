# webcomponent_repository

Dieses Repository ist das Ergebniss eines Forschungsprojektes an der [TU Chemnitz](http://tu-chemnitz.de). 
Das Ziel ist die Entwicklung einer Schnittstellenbeschreibungssprache von Web Components unter Berücksichtigung der
[`Polymer.SmartComponentBehavior`](https://github.com/michikrug/SmartComposition) Erweiterung.

Die Schnittstellenbeschreibung basiert auf jsDoc.
Folgende Möglichkeiten werden unterstützt:

* Datentypen von Eigenschaften (siehe [Polymer property types](https://www.polymer-project.org/1.0/docs/devguide/properties.html))
* Textuelle Beschreibungen von Eigenschaften
* Datentypen der Parameter und Rückgabewerte von Funktionen (JS-Datentypen)
* Textuelle Beschreibungen der Methoden sowie deren Parameter und Rückgabewerte
* Datentypen und textuelle Beschreibungen von abonnierten und publizierten Topics von SmartComposition

Beispiel:
```
Polymer({
	/**
	 * Easy Example ist eine Beispielkomponente
	 * 
	 * @author Max Mustermann (max.mustermann@example.com)
	 * @subscribe {String} example  Beispiel zum Anzeigen und Speichern
	 * @publish {Number} example_count Anzahl der gesammelten Beispiele
	 */
	is: "easy-example",
	properties: {
		/**
		 * Aktuelle Beispielanuahl
		 * @type {Number}
		 */
		page: {
			type: Number,
			[...]
		}
	},
	/**
	 * Test, ob Beispiele gut sind
	 *
	 * @params {Number} Anzahl Anzahl der Beispiele
	 * @params {String} Beschreibung Beschreibung der Beispiele
	 * @returns {Boolean} TRUE wenn gutes Beispiel, FALSE wenn nicht
	 */
	beispiel_checker: function (count, desc) {
		[...]
		return result;
	}
}
	
```

Enthält eine Component keine Beschreibungen, können trotzdem Name und Eigenschaften der Komponente ausgelesen werden.

## Setup

### Vorraussetzungen

* node.js (entwickelt und getested mit Version 4.2.1)
* MongoDB (entwickelt und getestet mit Version 3.0.7)

### Einrichtung

#### 1. Download

Laden sie die Daten herunter und entpacken Sie die diese in ein beliebiges Verzeichnis. 
Die Verzeichnisstruktur sollte wie folgt aussehen:

```
webcomponent_repository
- import
- website
```

#### 2. Einrichten und starten der Datenbank

Davon ausgehend, dass Sie die Datenbank installiert haben.

Unter Windows (Batch-Datei:
* Bei der ersten Verwendung
	* Öffnen Sie die enthaltene `startMongoDB.cmd` und passen Sie den Pfad zur MongoDB-Installation an (`SET mongoPath=D:\Path\to\MongoDB\`)
* Führen sie `startMongoDB.cmd` aus und lassen Sie das Fenster während der gesamten Verwendung offen
* Die Datenbank wird unter import/database gespeichert. Sie können den Pfad in der `startMongoDB.cmd` ändern

Windows CMD: 
```
SET mongoPath=C:\Path\to\MongoDB\
start %mongoPath%\bin\mongod --dbpath %~dp0\import\database
```

Andere Systeme (nicht getestet)
```
> %mongoPath%\bin\mongod --dbpath %pathToRepository%\import\database
```

#### 3. Liste mit Web Components

* Web Components werden in einer statischen Liste unter `import/component.json` gespeichert
* Hier müssen alle Komponenten eingetragen werden, welche durch das Repository indexiert werden sollen

#### 4. Import
Der Import muss zu Beginn und bei jeder Änderung an den Komponenten 
(neue in die Liste eingetragen oder Änderungen am Code) ausgeführt werden.

Windows (Batch)
* Führen Sie `startImport.cmd` aus

Konsole
```
> node import.js
```

#### 5. Server/Website

Windows (Batch)
* Führen Sie `startWebsite.cmd` aus

Konsole
* Führen Sie im `/website`-Verzeichnis `npm start` aus

Nach dem starten des Webserver ist das Repository unter `http://localhost:3000` aufrufbar.